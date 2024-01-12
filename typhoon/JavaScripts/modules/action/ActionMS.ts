
import ActionMC from "./ActionMC";

export default class ActionMS extends ModuleS<ActionMC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    net_stopPlayAnimationUe(gid: string) {
        this.getAllClient().net_stopPlayAnimationUe(gid);
    }

    public stopAction(ids: number[], gid: string) {
        this.getAllClient().net_stopAction(ids, gid)
    }

    public playAction(id: number, gid: string) {
        this.getAllClient().net_playAction(id, gid)
    }

}