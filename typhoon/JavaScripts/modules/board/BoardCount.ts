import { GlobalData } from "../../const/GlobalData";
import BoardWorldUI from "./UI/BoardWorldUI";


@Component
export default class BoardCount extends mw.Script {
    @mw.Property({ replicated: true, onChanged: "onTextNowProgressChanged" })
    public textNowProgress: string = "0/" + GlobalData.FenceNum;

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.initClient();
        }
    }

    private onTextNowProgressChanged() {
        if (!this._worldUI) {
            return;
        }
        this._worldUI.setNowProgress(this.textNowProgress);
    }

    //#region 服务端

    //#endregion


    //#region 客户端

    private _worldUI: BoardWorldUI;

    private async initClient() {
        let ui = await mw.UIWidget.findGameObjectById("1D63BBBD") as mw.UIWidget;
        this._worldUI = UIManager.create(BoardWorldUI);
        ui.setTargetUIWidget(this._worldUI.uiObject as mw.UserWidget);
    }

    //#endregion
}