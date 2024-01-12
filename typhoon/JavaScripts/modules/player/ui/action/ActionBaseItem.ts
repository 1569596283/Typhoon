import { ISquareActionConfigElement } from "../../../../config/SquareActionConfig";
import ActionItem_Generate from "../../../../ui-generate/uiTemplate/RPNPMUI/ActionModule/ActionItem_generate";
import { ActionLuanguage } from "../../modules/ActionModule";

export class ActionBaseItem extends ActionItem_Generate {
    public active: mw.Action1<ISquareActionConfigElement> = new mw.Action1<ISquareActionConfigElement>();
    private info: ISquareActionConfigElement = null;


    protected  onStart(): void {
        this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.btn.onClicked.add(() => {
            this.active.call(this.info);
        });
    }

    public setData(info: ISquareActionConfigElement): void {
        this.info = info;
        this.name.text = info.name
        this.iconImg.imageGuid = info.icon;
        this.mBg.imageGuid = ActionLuanguage.isOverseas ? "86714" : "86723";
        this.visible = true
        for (let i = 0; i < 5; i++) {
            let star = this.mCanvasStar.getChildAt(i) as mw.Image;
            star.visibility = info.quality > i ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
    }

    /**
     * 设置坐标
     * @param v
     */
    public setPostion(v: mw.Vector2): void {
        this.uiObject.position = v;
    }
}