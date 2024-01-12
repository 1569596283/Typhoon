import BuffMgr from "../buff/BuffMgr";
import { GameModuleC } from "./GameModuleC";

//服务端
export class GameModuleS extends ModuleS<GameModuleC, null>  {
    /** 玩家名称映射 */
    private playerNickNameMap: Map<number, string>;

    onStart() {
        this.playerNickNameMap = new Map<number, string>();
    }

    /**
     * 玩家离开，清理玩家昵称
     * @param player 
     */
    onPlayerLeft(player: mw.Player): void {
        let pid = player?.playerId
        if (this.playerNickNameMap.has(pid)) {
            this.playerNickNameMap.delete(pid);
        }
        BuffMgr.instance.playerLeave(pid);
    }

    /**
     * 玩家进入游戏，同步玩家昵称
     * @param nickName 玩家昵称
     * @returns 
     */
    public net_PlayerLogin(nickName: string) {
        if (this.playerNickNameMap.has(this.currentPlayerId)) {
            return
        }
        this.playerNickNameMap.set(this.currentPlayerId, nickName)
    }

    /**
     * 玩家使用表情
     * @param guid 表情资源GUID
     */
    public net_playEmojiS(guid: string) {
        this.getAllClient().net_PlayEmojiC(guid, this.currentPlayerId);
    }

    public getAllPlayerNickName() {
        return this.playerNickNameMap;
    }
}