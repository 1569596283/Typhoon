import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { Tween } from "../../ExtensionType";
import { EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import BoardModuleC from "./BoardModuleC";
import BoardScript from "./BoardScript";
import BoardCount from "./BoardCount";
import FenceModuleS from "../fence/FenceModuleS";
import { IBoardElement } from "../../config/Board";
import { GameConfig } from "../../config/GameConfig";
import GameUtils from "../../utils/GameUtils";
import PlayerManager from '../player/managers/PlayerManager';
import BuffMgr from '../buff/BuffMgr';

const BOARD_DEFAULT_LOC: Vector = new Vector(15, 0, -30);
const BOARD_ADD_LOC: Vector = new Vector(-1.3, 0, 17);

/** 木板刷新时间（秒） */
const BOARD_REFRESH_TIME: number = 10;

/** 木头飞到的锚点GUID */
const BOARD_ANCHOR_GUID: string = "3DB95C18";

/** 木头飞到锚点的时间（毫秒） */
const BOARD_ANCHOR_TIME: number = 700;

export default class BoardMoculeS extends ModuleS<BoardModuleC, null> {
    /** 随机生成的木板数组 */
    private randomBoards: BoardScript[] = [];
    /** 在固定点位生成的木板数组 */
    private immBoards: BoardScript[] = [];
    /** 玩家身上的木板 */
    private playerBoardsMap: Map<number, mw.GameObject[]> = new Map();
    /** 回收的木板数组 */
    private playerBoards: mw.GameObject[] = [];
    /** 待刷新木板序号数组 */
    private _refreshIndexs: number[] = [];
    /** 木头飞到的点的位置 */
    private _anchorLoc: Vector = Vector.zero;
    /** 木板数量脚本 */
    private _boardCountScript: BoardCount;
    /** 当前木板数量 */
    private _curCount: number = 0;
    /** 随机生成木板的配置信息数组 */
    private _boardRandomCfgs: IBoardElement[] = [];
    /** 木板权重 */
    private _boardWeight: number[] = [];
    /** 固定生成的木板配置信息数组 */
    private _boardImmCfgs: IBoardElement[] = [];
    /** 玩家卸木板的定时器 */
    private _playerUnloadIntervalMap: Map<number, number> = new Map();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        this._boardRandomCfgs = GameConfig.Board.findElements("Rules", 0);
        this._boardRandomCfgs.forEach((v) => {
            this._boardWeight.push(v.Radius);
        });
        this._boardImmCfgs = GameConfig.Board.findElements("Rules", 1);

        let index = 0;
        let interval = setInterval(() => {
            if (index > GlobalData.FenceTotal) {
                clearInterval(interval);
                return;
            }
            this.createRandomBoard(index);
            index++;
        }, 300)
        Event.addLocalListener(EventsName.GET_BOARD, this.addBoard);

        let immIndex = 0;
        let immInterval = setInterval(() => {
            if (immIndex >= this._boardImmCfgs.length) {
                clearInterval(immInterval);
                return;
            }
            this.createImmBoard(immIndex);
            immIndex++;
        }, 400)

        this.init();
    }

    private async init() {
        let anchor = await GameObject.asyncFindGameObjectById(BOARD_ANCHOR_GUID);
        this._anchorLoc = anchor.worldTransform.position;

        this._boardCountScript = await mw.ScriptManager.asyncFindScript("2EB67DCB") as BoardCount;
        this._boardCountScript.textNowProgress = this._curCount + "/" + GlobalData.FenceNum;
        
        BuffMgr.instance.createAllBuff();
    }

    /**
     * 玩家获得木板
     * @param playerID 获得木板的玩家的ID
     * @param index 获得木板的序号，序号为正是随机生成的木板，为负是固定生成的木板
     * @returns 
     */
    private addBoard = async (playerID: number, index: number) => {
        let character = Player.getPlayer(playerID)?.character;
        if (!this.playerBoardsMap.has(playerID) || !character) {
            return;
        }
        let arr = this.playerBoardsMap.get(playerID);
        let playerBoard = this.playerBoards.pop();
        if (!playerBoard) {
            playerBoard = await this.createPlayerBoard();
        }
        character.attachToSlot(playerBoard, mw.HumanoidSlotType.BackOrnamental);
        let loc = BOARD_DEFAULT_LOC.clone();
        loc.add(BOARD_ADD_LOC.clone().multiply(arr.length));
        playerBoard.localTransform.position = loc;
        arr.push(playerBoard);
        let str = arr.length + "/8";
        PlayerManager.instance.changeTitle(str, playerID);
        let time = BOARD_REFRESH_TIME + Math.random() * 10;
        if (index >= 0) {
            this._refreshIndexs.push(index);
            setTimeout(() => {
                this._refreshIndexs.splice(this._refreshIndexs.indexOf(index), 1);
                let board = this.randomBoards[index];
                let loc = this.getRandomLocation();
                board?.setLocation(loc);
            }, 1000 * time)
        } else {
            setTimeout(() => {
                let board = this.immBoards[-index];
                let loc = this._boardImmCfgs[(-index - 1)].Mid.clone();
                board?.setLocation(loc);
            }, 1000 * time)
        }
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.playerBoardsMap.set(player.playerId, []);
        this._boardCountScript.textNowProgress = this._curCount + "/" + GlobalData.FenceNum;
    }

    protected onPlayerLeft(player: mw.Player): void {
        const playerID = player.playerId;
        if (this._playerUnloadIntervalMap.has(playerID)) {
            clearInterval(this._playerUnloadIntervalMap.get(playerID));
            this._playerUnloadIntervalMap.delete(playerID);
            setTimeout(() => {
                this.recycleAllPlayerBoard(playerID);
                this.playerBoardsMap.delete(playerID);
            }, BOARD_ANCHOR_TIME);
        } else {
            this.recycleAllPlayerBoard(playerID);
            this.playerBoardsMap.delete(playerID);
        }
    }

    /**
     * 创建随机生成的木板
     * @param index 序号
     */
    private async createRandomBoard(index: number) {
        let board = await mw.Script.spawnScript(BoardScript, true);
        setTimeout(() => {
            board.index = index;
            this.randomBoards.push(board);
            let loc = this.getRandomLocation();
            board.setLocation(loc);
        }, 1000);
    }

    /**
     * 获得随机的坐标
     * @returns 坐标
     */
    public getRandomLocation(): Vector {
        let index = GameUtils.getRandomWeightIndex(this._boardWeight);
        let cfg = this._boardRandomCfgs[index];
        let loc: Vector = cfg.Mid.clone();
        loc.x += Math.random() * cfg.Radius * 2 - cfg.Radius;
        loc.y += Math.random() * cfg.Radius * 2 - cfg.Radius;
        loc.z += 1000;
        let end = loc.clone();
        end.z -= 2000;

        const res = QueryUtil.lineTrace(loc, end, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (PlayerManagerExtesion.isCharacter(element.gameObject)) continue;
            loc = element.position;
            break;
        }
        return loc;
    }

    /**
     * 创建固定生成的木板
     * @param index 序号
     */
    private async createImmBoard(index: number) {
        let board = await mw.Script.spawnScript(BoardScript, true);
        setTimeout(() => {
            board.index = -(index + 1);
            this.immBoards[index + 1] = board;
            let loc = this._boardImmCfgs[index].Mid.clone();
            board.setLocation(loc);
        }, 1000);
    }

    /** 
     * 创建玩家背后背的木板
     */
    private async createPlayerBoard(): Promise<mw.GameObject> {
        let playerBoard = await SpawnManager.asyncSpawn({ guid: "49953", replicates: true });
        playerBoard.setCollision(PropertyStatus.Off, true);
        return playerBoard;
    }

    /**
     * 通过玩家ID回收玩家身上的木板
     * @param playerID 玩家ID
     * @returns 
     */
    private recycleAllPlayerBoard(playerID: number) {
        let arr = this.playerBoardsMap.get(playerID);
        if (!arr || arr.length <= 0) {
            return;
        }
        while (arr.length > 0) {
            let playerBoard = arr.pop();
            if (!playerBoard) {
                break;
            }
            this.recyclePlayerBoard(playerBoard);
        }
    }

    /**
     * 回收玩家身上的木板
     * @param playerBoard 回收的木板
     */
    private recyclePlayerBoard(playerBoard: mw.GameObject) {
        playerBoard.parent = null;
        playerBoard.worldTransform.position = GlobalData.recyclePos;
        playerBoard.worldTransform.rotation = Rotation.zero;
        playerBoard.worldTransform.scale = Vector.one;
        this.playerBoards.push(playerBoard);
    }

    /**
     * 获取玩家木板数量
     * @param playerID 玩家ID
     */
    public getPlayerBoardCount(playerID: number) {
        if (this.playerBoardsMap.has(playerID)) {
            return this.playerBoardsMap.get(playerID)?.length;
        }
        return 0;
    }

    /**
     * 卸木板
     * @param playerID 玩家ID
     */
    public net_unloadBoard(playerID: number) {
        let arr = this.playerBoardsMap.get(playerID);
        if (!arr || arr.length <= 0 || this._playerUnloadIntervalMap.has(playerID)) {
            return;
        }
        let interval = setInterval(() => {
            let arr = this.playerBoardsMap.get(playerID);
            if (arr.length <= 0) {
                this._playerUnloadIntervalMap.delete(playerID);
                clearInterval(interval);
                return;
            }
            let playerBoard = arr.pop();
            playerBoard && this.playerBoardFly(playerBoard);
            PlayerManager.instance.changeTitle(arr.length.toString() + "/8", playerID);
        }, 300);
        this._playerUnloadIntervalMap.set(playerID, interval);
    }

    /**
     * 玩家的木板飞行
     * @param playerBoard 飞行的木板
     */
    private playerBoardFly(playerBoard: mw.GameObject) {
        playerBoard.parent = null;
        let curloc = playerBoard.worldTransform.position.clone();
        let tween = new Tween({ loc: curloc })
            .to({ loc: this._anchorLoc }, BOARD_ANCHOR_TIME)
            .onUpdate((T) => {
                playerBoard.worldTransform.position = T.loc;
            })
            .start()
            .onComplete(() => {
                this.addBoardCount();
                this.recyclePlayerBoard(playerBoard);
            })
    }

    /**
     * 增加木板数量
     */
    private addBoardCount() {
        this._curCount++;
        if (this._curCount >= GlobalData.FenceNum) {
            this._curCount -= GlobalData.FenceNum;
            ModuleService.getModule(FenceModuleS).addFence();
        }
        this._boardCountScript.textNowProgress = this._curCount + "/" + GlobalData.FenceNum;
    }
}