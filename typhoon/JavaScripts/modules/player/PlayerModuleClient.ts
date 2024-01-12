import { HudGameUIState } from "../../const/GameEnum";
import { getMyPlayerID } from "../../ExtensionType";
import { InputManager } from "../../InputManager";
import GameUtils from "../../utils/GameUtils";
import PlayerManager from "./managers/PlayerManager";
import PlayerInfo from "./PlayerInfo";
import PlayerModuleServer from "./PlayerModuleServer";


export default class PlayerModuleClient extends ModuleC<PlayerModuleServer, null> {
    public myInfo: PlayerInfo = null

    protected onStart(): void {
        Player.onPlayerLeave.add((player: mw.Player) => {
            try {
                if (player) PlayerManager.instance.deletePlayer(player.playerId)
            } catch (error) {
                console.error("PlyaerModule玩家离开游戏时出现错误", error)
            }
        })
        Event.addLocalListener("initMySelf", this.initMyInfo)
    }

    public getDataByPlayer(playerID?: number) {
        return this.data
    }

    protected onEnterScene(sceneType: number): void {
        RoomService.registerMGSChatMessageEvent(this.chatBack);
        InputManager.instance.onTouch.add(this.onTouchThis, this);
        this.init(sceneType)
    }

    private async init(sceneType: number) {
        await Player.asyncGetLocalPlayer();
        if (!this.localPlayer) {
            console.error("玩家初始化可能失败了")
            return;
        }
        this.server.net_OnEnterScene(AccountService.getNickName() || "233Name");
    }

    public initMyInfo = (info: PlayerInfo) => {
        console.error("初始化自己的信息 + " + getMyPlayerID())
        this.myInfo = info
        /**UI监听 */
    }

    public chatBack = (content: string): void => {
        this.server.net_Chat(content)
    }

    private _isLook = false
    /**
     * 点击角色显示233名片
     * @param hitResArr
     */
    private onTouchThis(hitResArr: Array<mw.HitResult>) {
        if (UIManager.getUIstate() != HudGameUIState.Show) return;
        for (let hit of hitResArr) {
            if (!this._isLook) {
                return;
            }
            if (GameUtils.isPlayerCharacter(hit.gameObject)) {
                continue;
            }
            let character = hit.gameObject as mw.Character;
            if (!character || !character.player) {
                continue;
            }
            let openId = character.player.userId;
            // console.info("233playerID===   openId  " + openId + "    =====<");
            mw.RoomService.showUserProfile(null, openId);
            this._isLook = false;
            setTimeout(() => {
                this._isLook = true;
            }, 1000);
            return;
        }
    }

    protected onUpdate(dt: number): void {
        PlayerManager.instance.update(dt)
    }
}