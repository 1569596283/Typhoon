import PlayerManager from "./managers/PlayerManager";
import { ActionModuleS } from "./modules/ActionModule";
import PlayerInfo from "./PlayerInfo";
import PlayerModuleClient from "./PlayerModuleClient";


export default class PlayerModuleServer extends ModuleS<PlayerModuleClient, null> {

    public getDataByPlayer(player: mw.Player | number) {
        return this.getPlayerData(player)
    }

    public async net_OnEnterScene(playerName: string) {
        const player = this.currentPlayer
        const playerID = player.playerId

        if (playerID && !PlayerManager.playerInfoMap.has(playerID)) {
            const script = await mw.Script.spawnScript(PlayerInfo, true) as PlayerInfo
            script.init(player)
            script.myName = playerName
        }
    }

    public net_Chat(content: string) {
        if (this.currentPlayer) {
            PlayerManager.instance.chat(content, this.currentPlayer)
        }
    }


    //#region 人物动作姿态模块

    public net_LeaveInteract(player: mw.Player, id: number) {
        ModuleService.getModule(ActionModuleS)?.net_LeaveInteract(player, id)
    }

    //#endregion
}