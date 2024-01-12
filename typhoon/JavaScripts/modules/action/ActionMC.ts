
/*
 * @Author: meta chun.dai@appshahe.com
 * @Date: 2023-07-08 11:05:49
 * @LastEditors: meta meta@appshahe.com
 * @LastEditTime: 2024-01-03 09:59:02
 * @FilePath: \mollywoodschool\JavaScripts\modules\action\ActionMC.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IActionElement } from "../../config/Action";
import ActionMgr from "./ActionMgr";
import ActionMS from "./ActionMS";

export default class ActionMC extends ModuleC<ActionMS, null> {

    protected onStart(): void {

    }

    onEnterScene(sceneType: number): void {
        this.init();
        this.registerEvent();
    }
    private init() {
    }

    /**
     * 注册事件
     */
    private registerEvent() {
        Event.addLocalListener("ActionStop", (gid: string) => {
            this.stopAnimationClient(gid);
        })
    }

    /**
     * 播放动画
    */
    public playAction(ele: number, char: mw.Character = Player.localPlayer.character, cb: () => void = null) {
        ActionMgr.playAction(ele, char, cb);
    }

    public net_playAction(id: number, gid: string) {
        let player = Player.localPlayer.userId === gid
        if (player) {
            ActionMgr.playAction(id);
        } else {
            GameObject.asyncFindGameObjectById(gid).then(o => {
                const ch = o as mw.Character
                ActionMgr.playAction(id, ch);
            })
        }
    }

    /**
     * 停止当前正在播放的动画
     */
    public stopAction(id: number, gid: string) {
        ActionMgr.stopAction(id, gid);
    }

    public net_stopAction(ids: number[], gid: string) {
        ids.forEach(id => {
            ActionMgr.stopAction(id, gid);
        })
    }
    public net_stopPlayAnimationUe(gid: string) {
        let player = Player.localPlayer.userId === gid
        if (player) {
            Player.localPlayer.character["ueCharacter"]["StopAnimMontage"]();
        } else {
            GameObject.asyncFindGameObjectById(gid).then(o => {
                const ch = o as mw.Character
                ch["ueCharacter"]["StopAnimMontage"]()
            })
        }
    }

    public stopAnimationClient(gid: string) {
        this.server.net_stopPlayAnimationUe(gid);
    }

    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}