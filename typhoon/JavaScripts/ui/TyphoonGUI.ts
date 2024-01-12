import { GameConfig } from "../config/GameConfig";
import { EventsName } from "../const/GameEnum";
import { GlobalData } from "../const/GlobalData";
import TyphoonC from "../modules/typhoon/TyphoonC";
import TyphoonGame_generate from "../ui-generate/TyphoonGame_generate";
import GameUtils from "../utils/GameUtils";
import Tips from "./commonUI/Tips";

export default class TyphoonGUI extends TyphoonGame_generate {
    /** 玩家角色 */
    private _character: mw.Character;
    /** 触发器坐标 */
    private _triLoc: Vector = Vector.zero;
    /** 屏幕大小 */
    private _windowSize: Vector2 = new Vector2(100, 100);
    /** 画布大小 */
    private _canvasSize: Vector2 = new Vector2(100, 100);
    /** 闪烁时间 */
    private _blinkTime: number = 0;
    /** 一秒倒计时 */
    private _oneSecond: number = 0;
    /** 闪烁间隔 */
    private _blinkInterval: number = 0.5;

    protected onStart() {
        Event.addLocalListener(EventsName.SetTime, this.setTime);
        this.init();
    }

    private async init() {

        let tri = await GameObject.asyncFindGameObjectById(GlobalData.HAND_BOARD)
        this._triLoc = tri.worldTransform.position.clone();
        this._character = (await Player.asyncGetLocalPlayer()).character;
        setInterval(() => {
            this.setDistance();
        }, 30)
        this._windowSize = WindowUtil.getViewportSize().clone();
        this._canvasSize = this.canvasDistance.size.clone();

        this.imageTips.visibility = mw.SlateVisibility.Collapsed;
    }

    protected onShow(...params: any[]): void {
        this._blinkTime = 3;
        this.canUpdate = true;
    }

    /**
     * 设置时间
     * @param time 剩余时间
     * @param ing 是否台风来袭
     * @param name 台风名称
     */
    public setTime = (time: number, ing: boolean = false, name?: string) => {
        let str: string;
        let timeStr = GameUtils.getTimeStringMS(time);
        if (ing) {
            str = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_17.Value, name, timeStr);
        } else {
            if (time > 30) {
                str = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_18.Value, timeStr);
            } else {
                str = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_19.Value, timeStr);
                if (time <= 10 && (time - this._blinkTime > 1)) {
                    this._blinkTime = time;
                    SoundService.playSound("154784", 1, 1);
                }
            }
        }
        this.textTyphoonTime.text = str;
    }

    /**
     * 设置当前层数信息
     * @param floor 当前层数
     * @param destroyFence 被销毁层数
     */
    public setFloor(floor: number, destroyFence: number) {
        if (destroyFence) {
            this.textFloor.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_20.Value, destroyFence, floor);
        } else {
            this.textFloor.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_21.Value, floor);
            Tips.show(StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_22.Value, floor));
        }
    }

    /**
     * 设置距离触发器的距离
     * @returns 
     */
    private setDistance() {
        if (!this._character) {
            return;
        }
        let loc = this._character.worldTransform.position.clone();
        let pos = InputUtil.projectWorldPositionToWidgetPosition(this._triLoc, false).screenPosition;
        if (pos.x > this._windowSize.x) {
            pos.x = this._windowSize.x;
        } else if (pos.x < 0) {
            pos.x = 0;
        }
        if (pos.y > this._windowSize.y) {
            pos.y = this._windowSize.y;
        } else if (pos.y < 0) {
            pos.y = 0;
        }
        pos.x -= this._canvasSize.x / 2;
        pos.y -= this._canvasSize.y / 2;
        let distance = Vector.distance(this._triLoc, loc);
        this.textDistance.text = Math.floor(distance / 100) + "m";
        this.canvasDistance.position = pos;
    }

    /**
     * 更新时间及距离
     * @param dt 帧间隔
     * @returns 
     */
    protected onUpdate(dt: number): void {
        if (this._blinkTime == 0) {
            return;
        }

        this._oneSecond += dt;
        if (this._oneSecond >= this._blinkInterval) {
            this._oneSecond = 0;
            this._blinkTime -= this._blinkInterval;
            if (this._blinkTime <= 0) {
                this.textTyphoonTime.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.imageTips.visibility = mw.SlateVisibility.Collapsed;
                this._blinkInterval = 0.6;
                this._blinkTime = 0;
            } else {
                if (this.textTyphoonTime.visible) {
                    this.textTyphoonTime.visibility = mw.SlateVisibility.Collapsed;
                    if (!ModuleService.getModule(TyphoonC).inSafety()) {
                        this.imageTips.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    }
                    this._blinkInterval = 0.4;
                } else {
                    this.textTyphoonTime.visibility = mw.SlateVisibility.SelfHitTestInvisible;;
                    this._blinkInterval = 0.6;
                    this.imageTips.visibility = mw.SlateVisibility.Collapsed;
                }
            }
        }
    }
}