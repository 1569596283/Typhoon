import { GlobalData } from "../../const/GlobalData";
import GameUtils from "../../utils/GameUtils";
import BoardMoculeS from "./BoardMoculeS";


export default class BoardModuleC extends ModuleC<BoardMoculeS, null> {

    /** 放木板的触发器 */
    private _handTrigger: mw.Trigger;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        this.init();
    }

    private async init() {
        this._handTrigger = await GameObject.asyncFindGameObjectById(GlobalData.HAND_BOARD) as mw.Trigger;

        this._handTrigger.onEnter.add(this.reqUnloadBoard.bind(this));
    }

    /**
     * 请求卸载木板
     * @param go 进入触发器的物体
     */
    private reqUnloadBoard(go: mw.GameObject) {
        if (!GameUtils.isPlayerCharacter(go) || GlobalData.boardCount <= 0) {
            return;
        }
        this.server.net_unloadBoard(this.localPlayerId);
    }
}