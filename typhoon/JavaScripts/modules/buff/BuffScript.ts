import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { BuffType, EventsName } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import GameUtils from "../../utils/GameUtils";
import BuffMgr from "./BuffMgr";

@Component
export default class BuffScript extends Script {
    /** buff生成的位置 */
    @mw.Property({ replicated: true, onChanged: "onLocChanged" })
    private location: Vector = Vector.zero;
    /** buff类型 */
    @mw.Property({ replicated: true, onChanged: "onTypeChanged" })
    public type: BuffType = BuffType.None;
    /** buff位置刷新计时 */
    private refreshTime: number = 0;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this.initTrigger();
        }
    }

    /**
     * buff类型改变，设置buff类型是属性同步时调用，创建buff模型
     * @returns 
     */
    onTypeChanged() {
        if (this._model || this.type === BuffType.None) {
            return;
        }
        this.initModel();
    }

    /**
     * 位置改变，设置位置是属性同步时调用，设置buff模型位置
     * @returns 
     */
    onLocChanged() {
        if (!this._model || !this._triggerC) {
            return;
        }
        this._model.asyncReady().then(() => {
            this._model.worldTransform.position = this.location;
        });
        this._triggerC.asyncReady().then(() => {
            this._triggerC.worldTransform.position = this.location;
        });
    }

    //#region 服务端
    private _triggerS: mw.Trigger;
    /**
     * 服务端触发器初始化
     */
    private async initTrigger() {
        this._triggerS = await GameObject.asyncSpawn("Trigger");
        this._triggerS.enabled = (true);
        this._triggerS.worldTransform.scale = GlobalData.triggerScale;

        // 要用属性同步，所以只能用bind(this)
        this._triggerS.onEnter.add(this.getBoardS.bind(this));
    }

    /**
     * 服务端获得buff
     * @param go 碰到buff触发器的物体
     */
    private getBoardS(go: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(go)) || !go.player) {
            return;
        }
        let playerID = go.player.playerId;

        this.setLocation(GlobalData.recyclePos);
        BuffMgr.instance.addBuff(playerID, this.type, GlobalData.buffDuration)
        this.refreshTime = 20;
    }

    /**
     * 设置buff位置
     * @param loc buff的位置
     */
    public setLocation(loc: Vector) {
        this._triggerS.asyncReady().then(() => {
            this._triggerS.worldTransform.position = loc;
            this.location = loc;
            this.refreshTime = Math.random() * 20;
            this.useUpdate = true;
        });
    }

    onUpdate(dt: number) {
        this.refreshTime += dt;
        if (this.refreshTime >= GlobalData.buffRefreshTime) {
            let loc = BuffMgr.instance.getRandomLoc();
            this.setLocation(loc);
        }
    }

    //#endregion

    //#region 客户端
    /** buff模型 */
    private _model: mw.GameObject;
    /** 客户端触发器 */
    private _triggerC: mw.Trigger;
    /** 创建客户端模型 */
    private async initModel() {
        let guid = "";
        switch (this.type) {
            case BuffType.Speed:
                guid = "7F28C3A04EEDDC68DF55DB970A91E1AD";
                break;
            case BuffType.Jump:
                guid = "1CF1FD6F44EA98C5CC0FB88E7C713E4F";
                break;
        }
        this._model = await GameObject.asyncSpawn(guid);
        this._triggerC = await GameObject.asyncSpawn("Trigger");
        this._model.worldTransform.scale = new Vector(1, 1, 1);
        this._model.worldTransform.position = this.location;

        this._triggerC.worldTransform.scale = GlobalData.triggerScale;
        this._triggerC.worldTransform.position = this.location;
        this._triggerC.enabled = (true);
        this._triggerC.onEnter.add(this.getBuffC);
    }

    /**
     * 获得buff，主要是同步到主UI显示
     * @param go 进入触发器的物体
     * @returns 
     */
    private getBuffC = (go: mw.GameObject) => {
        if (!GameUtils.isPlayerCharacter(go)) {
            return;
        }
        Event.dispatchToLocal(EventsName.GET_BUFF, this.type);
        // Tips.show(GameConfig.SquareLanguage.Typhoon_Ts_1.Value);
    }
    //#endregion

}