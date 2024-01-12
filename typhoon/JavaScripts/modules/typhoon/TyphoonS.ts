import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import FenceModuleS from "../fence/FenceModuleS";
import TyphoonC from "./TyphoonC";


/** 台风位置锚点GUID */
const TyphoonLocGUID = "05DC5D7B";

export default class TyphoonS extends ModuleS<TyphoonC, null> {
    /** 距离下一阶段剩余时间 */
    private _time: number = 0;
    /** 台风信息 */
    private _curTyphoonInfo: TyphoonInfo;
    /** 是否在台风来袭状态 */
    private _typhoonIng: boolean = false;

    /** 摧毁建筑计时 */
    private _destroyTime: number = 0;
    /** 摧毁层数 */
    public destroyFloor: number = 0;
    /** 失败 */
    private _fail: boolean = false;
    /** 台风当前位置 */
    private _curPos: Vector;
    /** 台风目标点序号 */
    private _curTargetIndex: number = 0;
    /** 台风目标位置 */
    private _targetPos: Vector;
    /** 台风位置数组 */
    private _typhoonLocArr: Vector[] = [];
    /** 台风速度 */
    private _speed: Vector;
    /** 台风移动计时 */
    private _moveTime: number = 0;
    /** 台风移动到目标点需要的时间 */
    private _moveNeedTime: number = 0;

    protected onStart() {
        this._destroyTime = 0;
        this.typhoonWait();
        this.init();
    }

    private async init() {
        let locAnchor = await GameObject.asyncFindGameObjectById(TyphoonLocGUID);

        let children = locAnchor.getChildren();
        children.forEach((go) => {
            this._typhoonLocArr.push(go.worldTransform.position);
        })
    }

    /**
     * 有玩家进入游戏，同步给玩家当前状态
     * @param player 进入游戏的玩家
     */
    protected onPlayerEnterGame(player: mw.Player): void {
        if (this._typhoonIng) {
            this.getClient(player)?.net_typhoonComing(this._time, this._curTyphoonInfo.endTime, this._curTyphoonInfo.cfgID, this._curPos, this._speed);
        } else {
            this.getClient(player)?.net_waitTyphoon(this._time, this._curTyphoonInfo.waitTime);
        }
    }

    /**
     * 获得随机的台风信息
     * @returns 台风信息
     */
    private getRandomInfo(): TyphoonInfo {
        let info = new TyphoonInfo();
        info.waitTime = Math.floor(Math.random() * 40 + 80);
        let cfgs = GameConfig.Typhoon.getAllElement();
        // 这里让台风强度随着层数和玩家的数量有些调整，没有试过多人效果，可能需要调整
        let index = Math.floor(Math.random() * (cfgs.length - 4));
        let fenceLen = ModuleService.getModule(FenceModuleS).getFenceLength();
        if (fenceLen > 20) {
            if (index + 4 < cfgs.length) {
                index += 4;
            } else {
                index = cfgs.length - 1;
            }
        } else if (fenceLen > 50) {
            if (index + 6 < cfgs.length) {
                index += 6;
            } else {
                index = cfgs.length - 1;
            }
        }
        let cfg = cfgs[index];
        info.endTime = Math.floor(Math.random() * (cfg.Time[1] - cfg.Time[0]) + cfg.Time[0]);
        info.cfgID = cfg.ID;
        info.intensity = cfg.Intensity * (0.8 + Player.getAllPlayers().length * 0.1);
        info.intensity = GlobalData.FenceHP * GlobalData.FenceNum / cfg.Intensity;
        return info;
    }

    /**
     * 等待台风状态
     */
    private typhoonWait() {
        this._typhoonIng = false;
        this._curTyphoonInfo = this.getRandomInfo();
        this._time = this._curTyphoonInfo.waitTime;
        this._fail = false;
        this.destroyFloor = 0;
        this.getAllClient().net_waitTyphoon(this._time, this._curTyphoonInfo.waitTime);
    }

    /**
     * 台风来袭状态
     */
    private typhoonComing() {
        this._typhoonIng = true;
        this._time = this._curTyphoonInfo.endTime;
        this._curPos = this._typhoonLocArr[0].clone();
        this._curTargetIndex = 0;
        this.setTarget();
        this.getAllClient().net_typhoonComing(this._time, this._curTyphoonInfo.endTime, this._curTyphoonInfo.cfgID, this._curPos, this._speed);
    }

    /**
     * 设置台风移动目标
     * @param syn 是否同步给客户端
     */
    private setTarget(syn: boolean = false) {
        let index = this._curTargetIndex;
        while (index === this._curTargetIndex) {
            index = Math.floor(Math.random() * (this._typhoonLocArr.length - 1)) + 1;
        }
        this._curTargetIndex = index;
        this._targetPos = this._typhoonLocArr[index];
        this._moveNeedTime = Vector.distance(this._curPos, this._targetPos) / GlobalData.typhoonSpeed;
        this._speed = this._targetPos.clone().subtract(this._curPos).normalize().multiply(GlobalData.typhoonSpeed);

        if (syn) {
            this.getAllClient().net_setTyphoonVec(this._curPos, this._speed);
        }
    }

    /**
     * 台风结算
     * @param win 是否胜利
     */
    public turnEnd(win: boolean) {
        this.getAllClient().net_showRsult(win, this.destroyFloor, this._curTyphoonInfo.cfgID);
    }

    /**
     * 失败
     */
    public fail() {
        this._fail = true;
    }

    /**
     * 计时，计算台风状态切换
     * @param dt 每帧间隔
     */
    protected onUpdate(dt: number): void {
        this._time -= dt;
        if (this._time <= 0) {
            if (this._typhoonIng) {
                this.turnEnd(!this._fail);
                this.typhoonWait();
            } else {
                this.typhoonComing();
            }
        }
        if (this._typhoonIng) {
            this._destroyTime += dt;
            if (this._destroyTime >= this._curTyphoonInfo.intensity) {
                this._destroyTime -= this._curTyphoonInfo.intensity;
                this.destroyFloor++;
                ModuleService.getModule(FenceModuleS).destroyFence();
            }
            this._curPos.add(this._speed.clone().multiply(dt));
            this._moveTime += dt;
            if (this._moveTime >= this._moveNeedTime) {
                this._moveTime = 0;
                this.setTarget(true);
            }
        }
    }
}

class TyphoonInfo {
    /** 多久来 */
    waitTime: number;
    /** 多久走 */
    endTime: number;
    /** 多少秒摧毁一层建筑 */
    intensity: number;
    /** 配置表ID */
    cfgID: number;
}