import { EventsName } from "../../const/GameEnum";
import InteractObject, { InteractiveHelper } from "./interactLogic/InteractObject";
import InteractMgr from "./InteractMgr";
import { InteractModuleClient } from "./InteractModuleClient";

/**
 * @Author       : meta
 * @Date         : 2023-01-16 15:54:55
 * @LastEditors  : meta
 * @LastEditTime : 2023-07-27 18:38:42
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\InteractModuleServer.ts
 * @Description  : 
 */
export class InteractModuleServer extends ModuleS<InteractModuleClient, null>  {
    onStart(): void {
        Player.onPlayerLeave.add((player: mw.Player) => {
            try {
                this.unActiveInteract(player.playerId)
            } catch (e) {

            }
        });
        Event.addClientListener(EventsName.CancelActive, (player) => {
            this.unActiveInteract(player.playerId)
        })
    }

    public net_EnterScene() {
        InteractMgr.instance.initInteract()
    }

    private unActiveInteract(playerID: number) {
        if (Player.getPlayer(playerID)) {
            this.getClient(playerID).net_UnActiveInteract()
            InteractiveHelper.onPlayInteract(playerID, false);
            let interacts = InteractMgr.instance.findInteract(playerID)
            if (interacts.length > 0) {
                for (const interact of interacts) {
                    interact.logic.onPlayerAction(playerID, false)
                    if (interact.own) {
                        interact.ownerPlayerIds[0] = 0
                    } else {
                        interact.ownerPlayerIds[interact.ownerPlayerIds.indexOf(playerID)] = 0
                    }
                }
            }
        }
    }

    public net_ActiveHandle(guid: string, flag: boolean, playerId?: number) {
        const interact = InteractMgr.instance.getInteract(guid)
        if (!interact) return
        if (flag) {
            if (interact.own && interact.ownerPlayerIds[0] != 0) {
                return ;
            }
            this.playerAction(interact, playerId, true)
        } else {
            this.playerAction(interact, playerId, false)
        }
    }

    public playerAction(interact: InteractObject, playerId: number, active: boolean, param?: any) {
        if (!interact) return
        if (active) {
            if (interact.own) {
                InteractiveHelper.onPlayInteract(playerId, true);
                interact.ownerPlayerIds[0] = playerId
            } else {
                if (interact.ownerPlayerIds.includes(0)) {
                    interact.ownerPlayerIds[interact.ownerPlayerIds.indexOf(0)] = playerId
                } else {
                    interact.ownerPlayerIds.push(playerId)
                }
            }
        } else {
            if (interact.own) {
                InteractiveHelper.onPlayInteract(playerId, false);
                interact.ownerPlayerIds[0] = 0
            } else {
                interact.ownerPlayerIds[interact.ownerPlayerIds.indexOf(playerId)] = 0
            }
        }
        interact.logic.onPlayerAction(playerId, active, param)
        if (interact.nextInteractGuid != "" && !interact.blockInteractNext) {
            this.playerAction(InteractMgr.instance.getInteract(interact.nextInteractGuid), playerId, active, param)
        }
    }

}