import { GameConfig } from "./config/GameConfig";
import { GlobalData } from "./const/GlobalData";
import BoardMoculeS from "./modules/board/BoardMoculeS";
import BoardModuleC from "./modules/board/BoardModuleC";
import BuffMgr from "./modules/buff/BuffMgr";
import FenceModuleC from "./modules/fence/FenceModuleC";
import FenceModuleS from "./modules/fence/FenceModuleS";
import { GameModuleC } from "./modules/gameModule/GameModuleC";
import { GameModuleS } from "./modules/gameModule/GameModuleS";
import { InteractModuleClient } from "./modules/interactModule/InteractModuleClient";
import { InteractModuleServer } from "./modules/interactModule/InteractModuleServer";
import { ActionModuleC, ActionModuleS } from "./modules/player/modules/ActionModule";
import PlayerModuleClient from "./modules/player/PlayerModuleClient";
import PlayerModuleServer from "./modules/player/PlayerModuleServer";
import TyphoonC from "./modules/typhoon/TyphoonC";
import TyphoonS from "./modules/typhoon/TyphoonS";
import GameUtils from "./utils/GameUtils";


@Component
class GameStart extends mw.Script {
	@mw.Property()
	private isOnline: boolean = false;
	@mw.Property({ displayName: "是否打开GM" })
	private isOpenGM = false;

	@mw.Property({ displayName: "多语言", selectOptions: { default: "-1", en: "0", zh: "1" } })
	private language: string = "-1";
	onStart(): void {
		super.onStart();
		let sd = SystemUtil.isPIE ? true : !this.isOnline;
		DataStorage.setTemporaryStorage(sd);
		GameUtils.systemLanguageIndex = Number(this.language);
		// if (GameUtils.systemLanguageIndex == -1) {
		// 	GameUtils.systemLanguageIndex = this.getSystemLanguageIndex();
		// }
		if (SystemUtil.isClient()) {
			//初始化表格语言
			GameConfig.initLanguage(GameUtils.systemLanguageIndex, key => {
				if (!key) return;
				let ele = GameConfig.SquareLanguage.getElement(key);
				if (ele == null) return "unknow_" + key;
				return ele.Value;
			});
			//覆盖多语言获取日志，多语言调试开启日志
			// GameConfig.SquareLanguage["getElement"] = function (id: number | string) {
			// 	let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
			// 	if (ele == null) {
			// 		//console.error(this.constructor.name + "配置表中找不到元素 id:" + id);
			// 	}
			// 	return ele;
			// }
			mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
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
			});
		}

		GlobalData.isOpenGM = this.isOpenGM;
		GlobalData.globalPos = this.gameObject.worldTransform.position;
		this.useUpdate = true;
		this.onRegisterModule();
		UIManager.addUILayerMap(mw.UILayerTop, 500000)
	}
	onUpdate(dt: number): void {
		super.onUpdate(dt);
		TweenUtil.TWEEN.update();
		BuffMgr.instance.onUpdate(dt);
	}
	//当注册模块
	async onRegisterModule() {
		// //注册模块
		ModuleService.registerModule(GameModuleS, GameModuleC, null); //负责大厅的一些UI点击
		ModuleService.registerModule(PlayerModuleServer, PlayerModuleClient, null);
		ModuleService.registerModule(ActionModuleS, ActionModuleC, null);
		ModuleService.registerModule(InteractModuleServer, InteractModuleClient, null);
		ModuleService.registerModule(BoardMoculeS, BoardModuleC, null);
		ModuleService.registerModule(FenceModuleS, FenceModuleC, null);
		ModuleService.registerModule(TyphoonS, TyphoonC, null);
	}
}
export default GameStart;
