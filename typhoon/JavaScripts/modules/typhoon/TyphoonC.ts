import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { Tween } from "../../ExtensionType";
import { GameConfig } from "../../config/GameConfig";
import { ITyphoonElement } from "../../config/Typhoon";
import { EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import Tips from "../../ui/commonUI/Tips";
import GameUtils from "../../utils/GameUtils";
import FenceModuleC from "../fence/FenceModuleC";
import { GameModuleC } from "../gameModule/GameModuleC";
import TyphoonS from "./TyphoonS";
import DeadUI from "./ui/DeadUI";
import TyphoonResult from "./ui/TyphoonResult";
import TyphoonTip from "./ui/TyphoonTip";

//** 台风到来后的安全区域触发器 */
const TYPHOON_TRIGGER_GUID: string = "2BEDB91C";
/** 台风卷的物体的guid数组 */
const TYPHOON_GO_GUID_ARR: string[] = ["49953", "49992", "49996", "34026", "42550"];
/** 玻璃锚点 */
const GLASS_ANCHOR_GUID: string = "0527DDE3";

export default class TyphoonC extends ModuleC<TyphoonS, null> {
    /** 剩余时间 */
    private _time: number = 0;
    /** 总时间 */
    private _allTime: number = 0;
    /** 是否在台风期间 */
    private _typhoonIng: boolean = false;
    /** 当前台风配置信息 */
    private _curentCfg: ITyphoonElement;
    /** 台风特效 */
    private _typhoonEffect: mw.Effect;
    /** 台风当前位置 */
    private _typhoonLoc: Vector = Vector.zero;
    /** 台风速度 */
    private _speed: Vector = Vector.zero;
    /** 台风安全区触发器 */
    private _typhoonSafetyTrigger: mw.Trigger;
    /** 台风旋转锚点 */
    private _typhoonAnchor: mw.GameObject;
    /** 台风当前角度 */
    private _typhoonRot: Rotation = Rotation.zero;
    /** 台风卷起的物体数组 */
    private _typhoonGoArr: TyphoonGo[] = [];
    /** 台风上转动的物体，帧数计数 */
    private _typGoTime: number = 0;
    /** 创建间隔 */
    private _createInterval: number = 30;
    /** 当前角色 */
    private _character: mw.Character;
    /** 玩家飞向台风动画 */
    private _tween: Tween<{ lerp: number }>;
    /** 玩家是否在移动 */
    private _playerMove: boolean = false;
    /** 当前玩家坐标 */
    private _curPlayerLoc: Vector;
    /** 玩家移动速度 */
    private _playerMoveSpeed: Vector = Vector.zero;
    /** 临时变量 */
    private _playerTweenTmpLoc: Vector = Vector.zero;
    /** 台风半径 */
    private _radius: number = 0;
    /** 玻璃 */
    private _glass: mw.GameObject;
    /** 是新加入的玩家，新玩家不会被吹走 */
    private _isNewPlayer: boolean = true;
    /** 新进入的玩家的特效 */
    private _newPlayerEffect: number = null;

    protected onStart() {
        this.init();
    }

    private async init() {
        let player = await Player.asyncGetLocalPlayer()
        this._character = player.character;

        this._typhoonSafetyTrigger = await GameObject.asyncFindGameObjectById(TYPHOON_TRIGGER_GUID) as mw.Trigger;
        this._glass = await GameObject.asyncFindGameObjectById(GLASS_ANCHOR_GUID);

        if (SystemUtil.isPIE) {
            this._createInterval = 60;
        } else {
            this._createInterval = 30;
        }
        Fog.enabled = this._typhoonIng;
        AssetUtil.asyncDownloadAsset("113919");
        if (this._isNewPlayer) {
            this._newPlayerEffect = GeneralManager.rpcPlayEffectOnPlayer("113919", player, mw.HumanoidSlotType.Root, 0, new Vector(0, 0, 100), Rotation.zero, new Vector(1.2, 1.2, 1.2));
        }
    }

    /**
     * 等待台风到来
     * @param time 剩余时间
     * @param allTime 总时间
     */
    public net_waitTyphoon(time: number, allTime: number) {
        this._time = time;
        this._allTime = allTime;
        this._typhoonIng = false;
        Fog.enabled = this._typhoonIng;
        this._playerMove = false;
        this.destroyTyphoon();
        ModuleService.getModule(FenceModuleC).refreshFence();
        ModuleService.getModule(GameModuleC).playBGM(false);
        this._glass.setVisibility(PropertyStatus.Off, true);
        this._curentCfg = null;
        this._isNewPlayer = false;
        if (this._newPlayerEffect) {
            EffectService.stop(this._newPlayerEffect);
            this._newPlayerEffect = null;
        }
    }

    /**
     * 显示结果
     * @param win 是否胜利
     * @param destroyFloor 摧毁楼层数
     * @param ID 台风ID
     */
    public net_showRsult(win: boolean, destroyFloor: number, ID: number) {
        UIManager.hide(DeadUI);
        this._typhoonIng = false;
        this._curentCfg = GameConfig.Typhoon.getElement(ID);
        UIManager.show(TyphoonResult, win, destroyFloor, this._curentCfg.Name, this._time);
        UIManager.hide(TyphoonTip);
        this.resumeState();
    }

    /**
     * 台风到来
     * @param time 当前时间
     * @param allTime 总时间
     * @param ID 台风ID
     * @param curLoc 台风当前坐标
     * @param speed 台风移动速度
     */
    public async net_typhoonComing(time: number, allTime: number, ID: number, curLoc: Vector, speed: Vector) {
        UIManager.hide(TyphoonResult);
        this._time = time;
        this._allTime = allTime;
        this._typhoonIng = true;
        this._curentCfg = GameConfig.Typhoon.getElement(ID);
        Fog.enabled = this._typhoonIng;

        this._typhoonEffect = await SpawnManager.asyncSpawn({ guid: this._curentCfg.Guid });
        if (!this._typhoonAnchor) {
            this._typhoonAnchor = await SpawnManager.asyncSpawn({ guid: "Anchor" });
        }
        this._typhoonEffect.worldTransform.scale = this._curentCfg.Scale;
        this._typhoonEffect.play();
        this._radius = GlobalData.typhoonRadius * this._curentCfg.Scale.x;

        this._typhoonLoc = curLoc;
        this._speed = speed;
        this.setTyphoonLoc();
        UIManager.show(TyphoonTip).showTip(0.1);
        Tips.show(StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_8.Value, this._curentCfg.Name));
        ModuleService.getModule(GameModuleC).playBGM(true);
        this._glass.setVisibility(PropertyStatus.On, true);
    }

    /**
     * 玩家被吹飞
     */
    public dead() {
        Event.dispatchToLocal(EventsName.PlayerReset)
        UIManager.show(DeadUI, this._curentCfg.Name);

        if (!this._character) {
            this._character = Player.localPlayer?.character;
        }
        let playerLoc = this._character?.worldTransform.position.clone();
        let effectLoc = this._typhoonEffect?.worldTransform.position.clone();
        let camera = Camera.currentCamera;
        camera.springArm.collisionEnabled = false;
        if (playerLoc && effectLoc) {
            this._character.gravityScale = 0;
            PlayerManagerExtesion.changeStanceExtesion(this._character, "15118");
            this._character.setCollision(PropertyStatus.Off);
            this._tween = new Tween({ lerp: 0 })
                .to({ lerp: 1 }, 5000)
                .onUpdate((T) => {
                    let loc = Vector.lerp(playerLoc, this._playerTweenTmpLoc, T.lerp);
                    this._character.worldTransform.position = loc;
                })
                .start()
                .onComplete(() => {
                    this._tween = null;
                    this._character.worldTransform.position = this._playerTweenTmpLoc;
                    this._character.parent = this._typhoonAnchor;
                    this._curPlayerLoc = new Vector(0, 0, 1500);
                    this._playerMove = true;
                    this._playerMoveSpeed = this.getGoSpeed();
                })
        }
    }

    /**
     * 设置台风坐标
     * @param curLoc 当前位置
     * @param speed 速度
     */
    public net_setTyphoonVec(curLoc: Vector, speed: Vector) {
        this._typhoonLoc = curLoc;
        this._speed = speed;
    }

    /**
     * 销毁台风
     * @returns 
     */
    private destroyTyphoon() {
        if (!this._typhoonEffect) {
            return;
        }
        this._typhoonGoArr.forEach((go) => {
            go.go.destroy();
            go = null;
        })
        this._typhoonGoArr = [];
        this._typhoonEffect.forceStop();
        this._typhoonEffect.destroy();
        this._typhoonEffect = null;
    }

    /**
     * 改变台风变化
     * @param dt 每帧间隔
     */
    private changeTyphoonTransform(dt: number) {
        this._typhoonLoc.add(this._speed.clone().multiply(dt));
        this._typhoonGoArr.forEach((typhoonGo) => {
            if (typhoonGo.go) {
                typhoonGo.relativeLoc.add(typhoonGo.speed.clone().multiply(dt));
                typhoonGo.go.localTransform.position = typhoonGo.relativeLoc;
            }
        })
        let addZ = (Math.random() * 30 + 60) * dt
        this._typhoonRot.z += addZ;

        if (this._playerMove) {
            this._curPlayerLoc.add(this._playerMoveSpeed.clone().multiply(dt));
        }
        if (this._tween) {
            this._playerTweenTmpLoc.set(this._typhoonLoc);
            this._playerTweenTmpLoc.z += 1500;
        }
    }

    /**
     * 设置台风坐标
     */
    private setTyphoonLoc() {
        this._typhoonEffect.worldTransform.position = this._typhoonLoc;
        this._typhoonAnchor.worldTransform.position = this._typhoonLoc;
        this._typhoonAnchor.worldTransform.rotation = this._typhoonRot;
        if (this._playerMove) {
            this._character.localTransform.position = this._curPlayerLoc;
        }
    }

    /**
     * 获得台风中物体的速度
     * @param loc 物体相对坐标
     * @param speed 物体当前速度
     * @returns 合适的速度
     */
    private getTyphoonGoSpeed(loc: Vector, speed: Vector): Vector {
        let x = speed.x > 0 ? 1 : -1;
        let y = speed.y > 0 ? 1 : -1;
        let z = speed.z > 0 ? 1 : -1;
        if (loc.x > 160 * this._curentCfg.Scale.x) {
            x = -1;
        } else if (loc.x < -80 * this._curentCfg.Scale.x) {
            x = 1;
        }
        if (loc.y > 160 * this._curentCfg.Scale.y) {
            y = -1;
        } else if (loc.y < -80 * this._curentCfg.Scale.y) {
            y = 1;
        }
        if (loc.z > 300 * this._curentCfg.Scale.z) {
            z = -1;
        } else if (loc.z < 1000) {
            z = 1;
        }

        speed = this.getGoSpeed(x, y, z);
        return speed;
    }

    /** 获取物体速度 */
    private getGoSpeed(x: number = 1, y: number = 1, z: number = 1): Vector {
        let speed = Vector.zero;
        speed.x = x * (Math.random() * 10 + 20) * this._curentCfg.Scale.x;
        speed.y = y * (Math.random() * 10 + 30) * this._curentCfg.Scale.y;
        speed.z = z * (Math.random() * 10 + 20) * this._curentCfg.Scale.z;
        return speed;
    }

    /**
     * 创建台风中卷动的物体
     */
    private async createTyphoonGo() {
        if (!this._typhoonAnchor) {
            return;
        }
        let go = new TyphoonGo();
        let index = Math.floor(Math.random() * TYPHOON_GO_GUID_ARR.length);
        go.go = await SpawnManager.asyncSpawn({ guid: TYPHOON_GO_GUID_ARR[index] });
        go.go.worldTransform.scale = new Vector(2, 2, 2);
        go.go.parent = this._typhoonAnchor;
        go.relativeLoc = Vector.zero;
        go.relativeLoc.x = Math.random() * 2000;
        go.relativeLoc.y = Math.random() * 2000 - 1000;
        go.relativeLoc.z = 1.2 * go.relativeLoc.x + 1500;
        go.speed = this.getGoSpeed();
        go.go.localTransform.position = go.relativeLoc;
        this._typhoonGoArr.push(go);
    }

    /**
     * 检查玩家坐标，判断玩家是否被台风卷走
     * @returns 
     */
    private checkPlayerLoc() {
        if (!this._character || !this._typhoonLoc || this._playerMove || this._tween || this._isNewPlayer) {
            return;
        }
        let playerLoc: Vector2 = Vector2.zero;
        let typhoonLoc: Vector2 = Vector2.zero;
        playerLoc.x = this._character.worldTransform.position.x;
        playerLoc.y = this._character.worldTransform.position.y;
        typhoonLoc.x = this._typhoonLoc.x;
        typhoonLoc.y = this._typhoonLoc.y;
        let dis = Vector2.distance(playerLoc, typhoonLoc);
        if (dis <= this._radius) {
            let safety = this.inSafety();
            !safety && this.dead();
        }
    }

    /** 恢复状态 */
    private resumeState() {
        if (this._tween) {
            this._tween.stop();
            this._tween = null;
        }
        this._character.gravityScale = 1;
        this._character.setCollision(PropertyStatus.On);
        this._playerMove = false;
        let camera = Camera.currentCamera;
        camera.springArm.collisionEnabled = true;
        PlayerManagerExtesion.changeStanceExtesion(this._character, "");
        this._character.parent = null;
    }

    /**
     * 改变玻璃大小
     * @param num 层数
     */
    public changeGlassScale(num: number) {
        num += Math.floor(num / 5);
        let z = num * 0.84;
        let scale: Vector;
        let children = this._glass.getChildren();
        children.forEach((go) => {
            scale = go.worldTransform.scale;
            scale.z = z;
            go.worldTransform.scale = scale;
        })
    }

    /**
     * 按间隔创建台风中的物体，并检测玩家的位置是否会被卷走
     * @param dt 每帧间隔
     */
    protected onUpdate(dt: number): void {
        this._time -= dt;
        Event.dispatchToLocal(EventsName.SetTime, Math.floor(this._time), this._typhoonIng, this._curentCfg?.Name);

        if (this._typhoonIng && this._typhoonEffect) {
            this.changeTyphoonTransform(dt);
            this.setTyphoonLoc();

            this._typGoTime += 1;
            if (!(this._typGoTime % this._createInterval)) {
                this._typhoonGoArr.forEach((typhoonGo) => {
                    typhoonGo.speed = this.getTyphoonGoSpeed(typhoonGo.relativeLoc, typhoonGo.speed);
                })
                this._playerMove && (this._playerMoveSpeed = this.getTyphoonGoSpeed(this._curPlayerLoc, this._playerMoveSpeed));
                this.checkPlayerLoc();
            }
            if (this._typGoTime >= this._createInterval * this._typhoonGoArr.length) {
                SoundService.BGMVolumeScale = (this._allTime - this._time) / this._allTime * 0.8 + 0.2;
                this._typGoTime = 0;
                this.createTyphoonGo();
            }
        }
    }

    /**
     * 玩家是否在安全区内
     * @returns 
     */
    public inSafety(): boolean {
        if (!this._character) {
            return false;
        }

        if (ModuleService.getModule(FenceModuleC).getCurFence() > 0) {
            return this._typhoonSafetyTrigger.checkInArea(this._character);
        } else {
            return false;
        }
    }
}

class TyphoonGo {
    go: mw.GameObject;
    relativeLoc: Vector;
    speed: Vector;
}