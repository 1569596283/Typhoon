import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { ModifiedCameraSystem, CameraModifid, } from '../../Modified027Editor/ModifiedCamera';
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../config/GameConfig";
import { EventsName, HudGameUIState, PlayerStateType } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { ResManager } from "../../ResManager";
import GMHUD_generate from "../../ui-generate/uiTemplate/GM/GMHUD_generate";
import { SettingUI } from "../../ui/SettingUI";
import GameUtils from "../../utils/GameUtils";
import GMBasePanelUI from "../gm/GMBasePanelUI";
import Game_HUDUI from "./ui/Game_HUDUI";
import FenceModuleC from "../fence/FenceModuleC";
import { ActionModuleC } from '../player/modules/ActionModule';
import PlayerManager from '../player/managers/PlayerManager';
import { GameModuleS } from './GameModuleS';

//客户端
export class GameModuleC extends ModuleC<GameModuleS, null> {
	/** 主界面 */
	public hudPanel: Game_HUDUI;
	/** 当前播放的背景音乐ID */
	public curBgmID: number = 13;

	private btnExitInteractiveCallback: () => void;
	private moveExitInteractiveCallback: () => void;
	private jumpExitInteractiveCallback: () => void;

	onStart() {
		this.hudPanel = UIManager.getUI(Game_HUDUI, true);

		this.hudPanel.mJump_btn.onPressed.add(() => {
			ModuleService.getModule(ActionModuleC).cleanStance();
			this.localPlayer.character.jump();
			if (this.jumpExitInteractiveCallback != null) {
				this.jumpExitInteractiveCallback();
				this.jumpExitInteractiveCallback = null;
			}
		});
		//玩家属性UI
		this.hudPanel.mIdCard_btn.onClicked.add(() => {
			UIManager.show(SettingUI);
		});

		/**点击退出交互物按钮 */
		this.hudPanel.mExitInteractive_btn.onClicked.add(() => {
			if (this.btnExitInteractiveCallback != null) {
				this.btnExitInteractiveCallback();
				this.btnExitInteractiveCallback = null;
			}
		});
		/**摇杆移动事件 */
		this.hudPanel.mVirtualJoystick.onInputDir.add((vec: mw.Vector2) => {
			if (this.moveExitInteractiveCallback != null) {
				this.moveExitInteractiveCallback();
				this.moveExitInteractiveCallback = null;
			}
		});

		Event.addLocalListener(EventsName.PlayerReset, this.resetState)
	}

	//进入场景
	onEnterScene(sceneType: number): void {
		let char = Player.localPlayer && Player.localPlayer.character
		if (!char) {
			console.error('onEnterScene error char is null')
			return
		}
		GlobalData.globalRot = char.worldTransform.rotation.clone()
		GlobalData.globalRot = char.worldTransform.rotation.clone()
		if (GlobalData.isOpenGM) {
			this.addGM();
			new GMBasePanelUI().show();
			InputUtil.onKeyDown(mw.Keys.G, () => { UIManager.show(GMHUD_generate) })
		}

		let lastTime = 0
		this.hudPanel.mPulloff_btn.onClicked.add(() => {
			let nt = TimeUtil.elapsedTime();
			if (nt - lastTime < 3)
				return;
			lastTime = nt;
			this.resetState();
			setTimeout(() => {
				let pos = GlobalData.globalPos.clone();
				pos.x += (Math.random() * 100 - 50);
				pos.y += (Math.random() * 100 - 50);
				this.localPlayer.character.worldTransform.position = pos
				this.localPlayer.character.worldTransform.rotation = GlobalData.globalRot
				UIManager.setUIstate(null, HudGameUIState.Show)
			}, 500);
		});

		//3Dui多语言
		this.uiLanguage();
		this.loginChoose();
		UIManager.show(Game_HUDUI);
	}

	/**
	 * 3Dui的多语言
	 */
	private uiLanguage() {
		let allUI = GameConfig.Global.getElement(1).Value4; //所有3dui
		allUI && allUI.forEach(async item => {
			let top = (await ResManager.instance.findGameObjectByGuid(item)) as mw.UIWidget;
			if (!top) {
				console.log("guan log uiLanguage top:" + top + ",item:" + item);
				return;
			}
			let uiRoot = top.getTargetUIWidget().rootContent;
			for (let i = 0; i < uiRoot.getChildrenCount(); i++) {
				let item = uiRoot.getChildAt(i);
				if (!(item instanceof mw.TextBlock)) {
					continue;
				}
				let ui = item as mw.TextBlock;
				let key: string = ui.text;
				if (key) {
					let data = GameUtils.getLanguage(key);
					if (data) {
						ui.text = data.info;
						if (data.size > 0) {
							ui.fontSize = data.size;
						}
					}
				}
			}
		});
	}

	/**
	 * 重置玩家状态，退出当前交互物
	 */
	public resetState = () => {
		if (this.btnExitInteractiveCallback != null) {
			this.btnExitInteractiveCallback();
			this.btnExitInteractiveCallback = null;
		}
		ModuleService.getModule(ActionModuleC).off();
		PlayerManager.instance.setPlayerState(PlayerStateType.None, true)
		this.localPlayer.character.movementDirection = mw.MovementDirection.ViewDirection
		this.localPlayer.character.movementEnabled = true
		this.localPlayer.character.jumpEnabled = true
	}

	private addGM() {
		AddGMCommand("隐藏GM_UI", (player: mw.Player, value: string) => {
			UIManager.hide(GMHUD_generate)
		})
		AddGMCommand("增加层数", (player: mw.Player, value: string) => {
			ModuleService.getModule(FenceModuleC).requestAddFence();
		});
	}

	/**
	 * 监听退出交互物的操作
	 * @param type 类型 1-按钮退出 2-行走和跳跃退出 3-跳跃退出
	 * @param Callback 退出的回调
	 */
	public addExitInteractiveListener(type: number, Callback: () => void) {
		if (type == 1) {
			this.hudPanel.showExitInteractiveBtn(true);
			this.btnExitInteractiveCallback = Callback;
			this.moveExitInteractiveCallback = null;
			this.jumpExitInteractiveCallback = null;
		} else if (type == 2) {
			this.hudPanel.showExitInteractiveBtn(false);
			this.moveExitInteractiveCallback = Callback;
			this.jumpExitInteractiveCallback = Callback;
			this.btnExitInteractiveCallback = null;
		} else if (type == 3) {
			this.hudPanel.showExitInteractiveBtn(false);
			this.jumpExitInteractiveCallback = Callback;
			this.moveExitInteractiveCallback = null;
			this.btnExitInteractiveCallback = null;
		}
	}

	public removeExitInteractiveListener() {
		this.btnExitInteractiveCallback = null;
		this.moveExitInteractiveCallback = null;
		this.jumpExitInteractiveCallback = null;
		this.hudPanel.showExitInteractiveBtn(false);
	}
	public quitInterval() {
		if (this.btnExitInteractiveCallback != null) {
			this.btnExitInteractiveCallback();
			this.btnExitInteractiveCallback = null;
		}
	}

	/**
	 * 登录设置身份牌
	 * @param occupation
	 * @returns
	 */
	private loginChoose() {
		let nickName = mw.AccountService.getNickName();
		this.server.net_PlayerLogin(!nickName ? this.localPlayer.character.displayName : nickName);
	}

	/**播放背景音乐
	 * @param ing 是否在台风来临时间
	 */
	public playBGM(ing: boolean) {
		let ID = ing ? 37 : 13;
		let cfg = GameConfig.Music.getElement(ID);
		SoundService.playBGM(cfg.MusicGUID, cfg.Music);
		this.curBgmID = ID;
	}

	public net_PlayEmojiC(guid: string, pid: number) {
		let player = Player.getPlayer(pid);
		let config = GameConfig.GlobalConfig.getElement(1);
		let scale = config.ExpressionScale;
		let offset = config.ExpressionHeight;
		GeneralManager.rpcPlayEffectOnPlayer(guid, player, 23, 1, new mw.Vector(0, 0, offset), mw.Rotation.zero, scale);
	}

	public playEmoji(guid: string) {
		this.server.net_playEmojiS(guid)
	}
}
