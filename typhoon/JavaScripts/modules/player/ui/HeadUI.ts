import { GlobalData } from "../../../const/GlobalData";
import GameUtils from "../../../utils/GameUtils";

const tempPos = mw.Vector2.zero;

export default class HeadUI {

    private widget: mw.UIWidget = null;
    private root: mw.UserWidget = null;
    private chatText: mw.TextBlock = null;
    private chatCon: mw.Canvas = null;
    private nameText: mw.TextBlock = null;
    private titleText: mw.TextBlock = null;
    private styleLeft: mw.Image = null;
    private styleCenter: mw.Image = null;
    private styleRight: mw.Image = null;


    public constructor(widget: mw.UIWidget) {
        this.widget = widget;
        this.root = this.widget.getTargetUIWidget();
        this.chatCon = this.root.findChildByPath("Canvas/Chat") as mw.Canvas;
        this.chatText = (this.root.findChildByPath("Canvas/Chat/Text")) as mw.TextBlock;
        this.nameText = (this.root.findChildByPath("Canvas/Name")) as mw.TextBlock;
        this.titleText = (this.root.findChildByPath("Canvas/Title")) as mw.TextBlock;
        this.styleLeft = (this.root.findChildByPath("Canvas/styleCanvas/styleLeft")) as mw.Image;
        this.styleCenter = (this.root.findChildByPath("Canvas/styleCanvas/styleCenter")) as mw.Image;
        this.styleRight = (this.root.findChildByPath("Canvas/styleCanvas/styleRight")) as mw.Image;
    }

    /**
     * 显示聊天
     * @param desc 
     */
    public showChat(desc: string): void {
        let length = GameUtils.getNameLen(desc);
        let num = Math.ceil(length / 15);
        this.chatCon.size = (new mw.Vector2(350, 40 + num * 50));
        this.chatCon.visibility = (mw.SlateVisibility.Visible);
        this.chatText.text = (desc);
        this.widget.refresh();
    }

    /**隐藏聊天 */
    public hideChat(): void {
        if (!this.chatCon)
            return;
        this.chatCon.visibility = (mw.SlateVisibility.Hidden);
        this.widget.refresh();
    }
    /**
     * 设置称号
     * @param content 称号名称 
     */
    public setTitle(content: string): void {
        if (content == "" || content == null || content == undefined) {
            this.titleText.text = "0/" + GlobalData.FenceNum;
        } else {
            this.titleText.text = (content);
        }
        this.styleLeft.visibility = mw.SlateVisibility.Collapsed
        this.styleCenter.visibility = mw.SlateVisibility.Collapsed
        this.styleRight.visibility = mw.SlateVisibility.Collapsed
        this.titleText.outlineSize = 0;
        this.titleText.shadowOffset = mw.Vector2.zero;
    }

    public setName(name: string): void {
        this.nameText.text = name
        this.chatCon.visibility = (mw.SlateVisibility.Hidden);
        this.widget.refresh();
    }

    public setNameVisible(visible: boolean): void {
        this.nameText.visibility = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden;
        this.chatCon.visibility = (mw.SlateVisibility.Hidden);
    }

    public destory(): void {
        this.widget.destroy()
    }

}
