import { PlayerStateType } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { getMyPlayerID } from "../../../ExtensionType";
import GameUtils, { single } from "../../../utils/GameUtils";
import PlayerInfo from "../PlayerInfo";

enum PlayerInfoEvent {
    net_StateChange = "net_StateChange",
    net_TitleChange = "net_TitleChange",
    net_PlayerChat = "net_PlayerChat",
    net_AddPlayerBuff = "net_AddPlayerBuff",
    net_RemovePlayerBuff = "net_RemovePlayerBuff",
}
@single()
export default class PlayerManager {
    public static instance: PlayerManager = null
    public static playerInfoMap: Map<number, PlayerInfo> = new Map()

    constructor() {
        this.eventInit()
        Event.addLocalListener("Player_Init", (playerID: number, info: PlayerInfo) => {
            PlayerManager.playerInfoMap.set(playerID, info)
        })
    }

    private eventInit() {
        if (SystemUtil.isServer()) {
            Event.addClientListener(PlayerInfoEvent.net_StateChange, (player: mw.Player, stateType: PlayerStateType, bool: boolean, playerID: number) => {
                this.setPlayerState(stateType, bool, playerID)
            })
            Event.addClientListener(PlayerInfoEvent.net_TitleChange, (player: mw.Player, title: string) => {
                this.changeTitle(title, player)
            })
        } else {
            Event.addServerListener(PlayerInfoEvent.net_PlayerChat, (chat: string, playerID: number) => {
                this.chat(chat, playerID)
            })
        }
    }

    public deletePlayer(playerID: number) {
        if (PlayerManager.playerInfoMap.has(playerID)) {
            PlayerManager.playerInfoMap.get(playerID).destroy()
            PlayerManager.playerInfoMap.delete(playerID)
        }
    }

    public setPlayerState(stateType: PlayerStateType, bool: boolean, player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_StateChange, stateType, bool, playerID)
            }
            info.setState(stateType, bool)
        }
    }

    public playerIsFree(player?: mw.Player | number): boolean {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (info.myState == PlayerStateType.None) return true
        }
        return false
    }

    public changeTitle(title: string, player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_TitleChange, title)
            } else {
                info.myTitle = title
            }
        }
    }

    public chat(str: string, player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (SystemUtil.isClient()) {
                info.showChat(str)
            } else {
                for (const i of PlayerManager.getNearPlayer(info.character, 3000)) {
                    Event.dispatchToClient(i.player, PlayerInfoEvent.net_PlayerChat, str, playerID)
                }
            }
        }
    }

    //#endregion

    private hasPlayer(player: mw.Player | number): number {
        if (!player) player = getMyPlayerID()
        const playerID = typeof player === "number" ? player : player.playerId
        if (playerID && PlayerManager.playerInfoMap.has(playerID)) {
            return playerID
        }
        return 0
    }

    /**
     * @description: 获得范围内的所有玩家
     * @param {Core} core
     * @param {number} range
     * @param {boolean} containSelf 是否包含自己
     * @return {*}
     */
    public static getNearPlayer(core: mw.GameObject, range: number, containSelf: boolean = true): PlayerInfo[] {
        let infos: PlayerInfo[] = []
        for (const [index, info] of PlayerManager.playerInfoMap) {
            if (info.character) {
                if (info.character.gameObjectId == core.gameObjectId) {
                    if (containSelf) infos.push(info)
                    continue;
                }
                const loc = info.character.worldTransform.position
                if (GameUtils.inDistance(core.worldTransform.position, loc, range)) {
                    infos.push(info)
                }
            }
        }
        return infos
    }

    /**
     * @description: 获取范围内最近的玩家
     * @param {Core} core
     * @param {number} range
     * @return {*}
     */
    public static getNearestPlayer(core: mw.GameObject, range: number): PlayerInfo {
        let result = null
        let max = range * range
        for (const [index, info] of PlayerManager.playerInfoMap) {
            if (info.character) {
                if (info.character.gameObjectId == core.gameObjectId) {
                    continue;
                }
                const loc = info.character.worldTransform.position
                let distance = Vector.squaredDistance(core.worldTransform.position, loc)
                if (distance < max) {
                    max = distance
                    result = info
                }
            }
        }
        return result
    }

    /**
     * @description: 判断玩家是否在范围内
     * @param {Gameplay} player 
     * @param {number} range
     * @param {Core} pos
     * @return {*}
     */
    public static playerInRange(player: mw.Player | number, range: number, pos: mw.Vector) {
        const playerID = typeof player === "number" ? player : 0
        if (playerID && PlayerManager.playerInfoMap.has(playerID)) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (info.character) {
                return GameUtils.inDistance(info.character.worldTransform.position, pos, range)
            }
        }
        return false
    }

    public update(dt: number) {

    }
}
PlayerManager.instance