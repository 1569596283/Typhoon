import { PlayerManagerExtesion, } from '../../../../Modified027Editor/ModifiedPlayer';
﻿import GameUtils from "../../../../utils/GameUtils";
import InteractObject, { InteractLogic_C, InteractLogic_S } from "../InteractObject";


//交互物
@Component
export default class PlayAni extends InteractObject {
	@mw.Property({ replicated: true, displayName: "动作ID", group: "属性" })
	public animation: string = "";
	@mw.Property({ replicated: true, displayName: "动作速度,默认1", group: "属性" })
	public time: number = 1;
	@mw.Property({ replicated: true, displayName: "循环次数", group: "属性" })
	public loopNum: number = 0;
	@mw.Property({ replicated: true, displayName: "看向方向", group: "属性" })
	public lookAtOff: mw.Vector = mw.Vector.zero;
	@mw.Property({ replicated: true, displayName: "位置偏移", group: "属性" })
	public locationOff: mw.Vector = mw.Vector.zero;
	@mw.Property({ replicated: true, displayName: "可移动跳跃", group: "属性" })
	public moveJumpEnable: boolean = false;

	onStart() {
		this.init(Animation_S, Animation_C);
	}
}
//客户端
class Animation_C extends InteractLogic_C<PlayAni> {
	private _moveToPos: mw.Vector;
	private _curAnim: mw.Animation

	onStart(): void {
		GameUtils.downAsset(this.info.animation)
	}

	public onPlayerAction(playerId: number, active: boolean, param: any): void {
		this._moveToPos = this.gameObject.worldTransform.clone().transformPosition(this.info.locationOff);
		const character = Player.localPlayer.character
		if (active) {
			this._moveToPos.z = character.worldTransform.position.z += this.info.locationOff.z
			if (this.info.locationOff.x != 0 || this.info.locationOff.y != 0 || this.info.locationOff.z != 0)
				character.worldTransform.position = this._moveToPos
			if (this.info.lookAtOff.x == 0 && this.info.lookAtOff.y == 0 && this.info.lookAtOff.z == 0)
				character.lookAt(mw.Vector.add(this.gameObject.worldTransform.position, this.gameObject.worldTransform.getForwardVector()));
			else
				character.lookAt(mw.Vector.add(this.gameObject.worldTransform.position, this.info.lookAtOff));
			this._curAnim = PlayerManagerExtesion.loadAnimationExtesion(character, this.info.animation, true)
			this._curAnim.loop = this.info.loopNum
			this._curAnim.speed = this.info.time
			TimeUtil.delaySecond(0.5).then(() => {
				if (this._curAnim) this._curAnim.play()
			})
			character.movementEnabled = character.jumpEnabled = this.info.moveJumpEnable;
			if (this.gameObject.parent && this.gameObject.parent.name == '宿舍样式8') {
				Event.dispatchToLocal("CloseOpenDoorUI")
			}
		} else {
			this._curAnim.stop()
			this._curAnim = null
			character.movementEnabled = character.jumpEnabled = true;
		}
	}
}
//服务端
class Animation_S extends InteractLogic_S<PlayAni> {
	onStart(): void {

	}
	onPlayerAction(playerId: number, active: boolean): void {

	}
}