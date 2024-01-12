import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
﻿import { EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import Tips from "../../ui/commonUI/Tips";
import GameUtils from "../../utils/GameUtils";
import BoardMoculeS from "./BoardMoculeS";
import { GameConfig } from '../../config/GameConfig';

/** 木板脚本 */
@Component
export default class BoardScript extends mw.Script {
    /** 木板的位置 */
    @mw.Property({ replicated: true, onChanged: "onLocChanged" })
    private location: Vector = Vector.zero;
    /** 模板位置刷新计时 */
    private refreshTime: number = 0;
    /** 木板序号 */
    public index: number = -1;

    onLocChanged() {
        if (!this._board || !this._triggerC) {
            return;
        }
        this._board.asyncReady().then(() => {
            this._board.worldTransform.position = this.location;
        });
        this._triggerC.asyncReady().then(() => {
            this._triggerC.worldTransform.position = this.location;
        });
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.initBoard();
        } else {
            this.initTrigger();
        }
    }

    //#region 服务端
    /** 触发器，玩家获得木板 */
    private _triggerS: mw.Trigger;
    /**
     * 初始化触发器
     */
    private async initTrigger() {
        this._triggerS = await SpawnManager.asyncSpawn<mw.Trigger>({ guid: "Trigger" });
        this._triggerS.enabled = (true);
        this._triggerS.worldTransform.scale = GlobalData.triggerScale;

        // 要用属性同步，所以只能用bind(this)
        this._triggerS.onEnter.add(this.getBoardS.bind(this));
    }

    /**
     * 获得木板
     * @param go 碰到木板触发器的物体
     */
    private getBoardS(go: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(go)) || !go.player) {
            return;
        }
        let playerID = go.player.playerId;
        if (ModuleService.getModule(BoardMoculeS).getPlayerBoardCount(playerID) >= GlobalData.maxBoardCount) {
            return;
        }
        this.setLocation(GlobalData.recyclePos);
        Event.dispatchToLocal(EventsName.GET_BOARD, playerID, this.index);
    }

    /**
     * 设置木板位置
     * @param loc 木板新的位置
     */
    public setLocation(loc: Vector) {
        this._triggerS.asyncReady().then(() => {
            this._triggerS.worldTransform.position = loc;
            this.location = loc;
            this.refreshTime = Math.random() * 10;
            this.useUpdate = true;
        });
    }

    onUpdate(dt: number) {
        /** 刷新时间计时，超过规定时间就换个地方刷新
         * 有两个好处，1. 防止木板的位置不好，玩家找不到，2. 防止木板长时间未更新，新建来的玩家同步不到。
         */
        this.refreshTime += dt;
        if (this.refreshTime >= GlobalData.boardRefreshTime) {
            let loc = ModuleService.getModule(BoardMoculeS).getRandomLocation();
            this.setLocation(loc);
        }
    }

    //#endregion

    //#region 客户端
    /** 木板 */
    private _board: mw.GameObject;
    /** 触发器 */
    private _triggerC: mw.Trigger;
    /** 
     * 初始化木板
     */
    private async initBoard() {
        this._board = await SpawnManager.asyncSpawn({ guid: "3C14CCAB4FC1BCDB7A7A089A25F0362A" });
        this._triggerC = await SpawnManager.asyncSpawn<mw.Trigger>({ guid: "Trigger" });
        this._board.worldTransform.scale = new Vector(1, 1, 1);
        this._board.worldTransform.position = this.location;

        this._triggerC.worldTransform.scale = GlobalData.triggerScale;
        this._triggerC.worldTransform.position = this.location;
        this._triggerC.enabled = (true);
        this._triggerC.onEnter.add(this.getBoardC);
    }

    /**
     * 获得木板
     * @param go 进入触发器的物体
     */
    private getBoardC = (go: mw.GameObject) => {
        if (!GameUtils.isPlayerCharacter(go)) {
            return;
        }
        if (GlobalData.boardCount >= GlobalData.maxBoardCount) {
            Tips.show(GameConfig.SquareLanguage.Typhoon_Ts_0.Value);
            return;
        }
        Tips.show(GameConfig.SquareLanguage.Typhoon_Ts_1.Value);
    }
    //#endregion

}