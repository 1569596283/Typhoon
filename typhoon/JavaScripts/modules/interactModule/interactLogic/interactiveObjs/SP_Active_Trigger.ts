import { PlayerManagerExtesion, } from '../../../../Modified027Editor/ModifiedPlayer';
/** 
 * @Author       : meta
 * @LastEditors  : meta
 * @Date         : 2023-05-18 13:17
 * @LastEditTime : 2023-08-04 15:07:00
 * @description  : 
 */
import { InteractModuleServer } from "../../InteractModuleServer";
import InteractObject, { InteractiveHelper, InteractLogic_C, InteractLogic_S } from "../InteractObject";

/**触发模式 */
enum TriggerMode {
	/**共有模式*/
	Public = "0",//共有模式，第一个人进入触发器激活，最后一个人离开触发器关闭
	/**独立模式*/
	Private = "1"//独立模式：每个人进出触发器，单独计算激活和关闭
}
//交互物触发器-碰触交互
@Component
export default class Active_Trigger extends InteractObject {
	@mw.Property({ replicated: true, displayName: "工作模式", selectOptions: { "公共": TriggerMode.Public, "独立": TriggerMode.Private }, group: "属性" })
	public mode: TriggerMode = TriggerMode.Private;
	@mw.Property({ replicated: true, displayName: "退出按钮", group: "属性" })
	public needExitBtn: boolean = false;

	onStart() {
		this.init(Trigger_S, Trigger_C);
	}
}
//客户端
class Trigger_C extends InteractLogic_C<Active_Trigger> {
	onStart(): void {

	}
	public onPlayerAction(playerId: number, active: boolean, param: any): void {

	}
}
//服务端
class Trigger_S extends InteractLogic_S<Active_Trigger> {
	private playerList: Array<number> = [];
	onStart(): void {
		let trigger = null;
		if (this.gameObject instanceof mw.Trigger) {
			trigger = this.gameObject as mw.Trigger;
		}
		trigger.onEnter.add((go: mw.GameObject) => {
			if ((PlayerManagerExtesion.isCharacter(go))) {
				this.addPlayer(go.player);
			}
		});
		trigger.onLeave.add((go: mw.GameObject) => {
			if ((PlayerManagerExtesion.isCharacter(go))) {
				let player = go.player;
				if (player == null) return;
				this.removePlayer(player);
			}
		});
		Player.onPlayerLeave.add((player: mw.Player) => {
			try {
				this.removePlayer(player);
			}
			catch (e) {

			}
		});
	}

	private addPlayer(player: mw.Player) {
		if (this.playerList.includes(player.playerId) || InteractiveHelper.playInteractionEnable(player)) return;
		this.playerList.push(player.playerId);
		if (this.info.mode == TriggerMode.Private) {
			ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, true)
		} else if (this.playerList.length >= 1) {
			ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, true)
		}
	}

	private removePlayer(player: mw.Player) {
		let index = this.playerList.indexOf(player.playerId);
		if (index == -1) return;
		this.playerList.splice(index, 1);
		if (this.info.mode == TriggerMode.Private) {
			ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, false)
		} else if (this.playerList.length == 0) {
			ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, false)
		}
	}

	onPlayerAction(playerId: number, active: boolean, param: any): void {

	}
}

