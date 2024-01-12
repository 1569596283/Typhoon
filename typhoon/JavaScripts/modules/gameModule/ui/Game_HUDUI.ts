
import { GameConfig } from "../../../config/GameConfig";
import { BuffType, EventsName, HudGameUIState } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { MyAction } from "../../../ExtensionType";
import Emoji_Generate from "../../../ui-generate/uiTemplate/Chat/Emoji_generate";
import Word_Generate from "../../../ui-generate/uiTemplate/Chat/Word_generate";
import Game_HUD_generate from "../../../ui-generate/uiTemplate/gameModule/Game_HUD_generate";
import { GridLayout } from "../../../ui/commonUI/GridLayout";
import { ActionModuleC } from "../../player/modules/ActionModule";
import PlayerModuleClient from "../../player/PlayerModuleClient";
import { GameModuleC } from "../GameModuleC";

export default class Game_HUDUI extends Game_HUD_generate {
	/** 加速剩余时间 */
	private _speedTime: number = 0;
	/** 跳跃增加剩余时间 */
	private _jumpTime: number = 0;

	/**---------------------------聊天和表情------------------------------------*/
	private _firstClickFlag: boolean = true;		// 判断玩家是否第一次点击快捷聊天按钮
	private layout_emoji: GridLayout<Emoji_Generate>;	// 存放聊天表情的滚动框
	private layout_word: GridLayout<Word_Generate>;	// 存放聊天文字的滚动框

	protected onAwake() {
		super.onAwake();
		this.layer = mw.UILayerBottom;
	}

	protected onStart() {
		this.canUpdate = true;
		this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;
		this.emojiBtn.onClicked.add(() => {
			this.canvas_emoji.visibility = this.canvas_emoji.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
			this.canvas_word.visibility = mw.SlateVisibility.Collapsed;

			if (this._firstClickFlag) {// 标准的初始化流程，勿改函数顺序
				this.initScrollBox();
				this.addLayoutNodes();
				this.addEmojiBtnEvents();
				this.addWordBtnEvents();
				this.layout_emoji.invalidate();
				this.layout_word.invalidate();
				this._firstClickFlag = false;
			}
		});

		this.wordBtn.onClicked.add(() => {
			this.canvas_word.visibility = this.canvas_word.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
			this.canvas_emoji.visibility = mw.SlateVisibility.Collapsed;

			if (this._firstClickFlag) {
				this.initScrollBox();
				this.addLayoutNodes();
				this.addEmojiBtnEvents();
				this.addWordBtnEvents();
				this.layout_emoji.invalidate();
				this.layout_word.invalidate();
				this._firstClickFlag = false;
			}
		});

		this.mAction_btn.onClicked.add(() => {
			ModuleService.getModule(ActionModuleC).openActionPanle()
		})

		Event.addLocalListener(EventsName.GET_BUFF, (type: BuffType) => {
			switch (type) {
				case BuffType.Speed:
					this._speedTime = GlobalData.buffDuration;
					break;
				case BuffType.Jump:
					this._jumpTime = GlobalData.buffDuration;
					break;
				default:
					break;
			}
		})
	}

	/**初始化滚动条 */
	private initScrollBox() {
		let config = GameConfig.GlobalConfig.getElement(1);

		this.layout_emoji = new GridLayout(this.scrollBox_emoji, true);
		this.layout_emoji.spacingX = config.ExpressionDistance;// 读表
		this.layout_emoji.spacingY = config.ExpressionDistance;// 读表
		this.layout_word = new GridLayout(this.scrollBox_word, true);
		if (this.scrollBox_word.orientation == mw.Orientation.OrientVertical)
			this.layout_word.spacingY = config.WordDistance;// 读表，纵向间距
		else
			this.layout_word.spacingX = config.WordDistance;// 读表，横向间距
	}

	/**向滚动条中添加结点 */
	private addLayoutNodes() {
		try {
			let length = GameConfig.ChatExpression.getAllElement().length;
			for (let i = 0; i < length; i++) {
				this.layout_emoji.addNode(Emoji_Generate);
			}

			let length_word = GameConfig.ChatWord.getAllElement().length;
			for (let i = 0; i < length_word; i++) {
				this.layout_word.addNode(Word_Generate);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	/** 为每个表情按钮添加监听事件 */
	private addEmojiBtnEvents() {
		let eNodes = this.layout_emoji.nodes;
		let config = GameConfig.ChatExpression.getAllElement();
		eNodes.forEach(element => {
			let btn = element.mBtn_expression;
			let index = eNodes.indexOf(element);// index如果拿到外面会溢出
			btn.touchMethod = mw.ButtonTouchMethod.PreciseTap
			btn.normalImageGuid = (config[index].ExpressionIcon);
			btn.onClicked.add(() => {
				this.canvas_emoji.visibility = (1);
				if (config[index].ExpressionVfx) {
					ModuleService.getModule(GameModuleC).playEmoji(config[index].ExpressionVfx)
				}
			});
		});
	}

	/**为每个文字按钮添加监听事件 */
	private addWordBtnEvents() {
		let config = GameConfig.ChatWord.getAllElement();
		let index = 0;
		this.layout_word.nodes.forEach(node => {
			let string = GameConfig.SquareLanguage.getElement(config[index].WordID).Value;
			node.mBtn_word.text = (string);
			node.mBtn_word.touchMethod = mw.ButtonTouchMethod.PreciseTap
			node.mBtn_word.onClicked.add(() => {
				this.canvas_word.visibility = (1);
				ModuleService.getModule(PlayerModuleClient).chatBack(string);
			});
			index++;
		});
	}

	/**
	 * 设置UI状态
	 * @param state 
	 */
	public setUIState(state: HudGameUIState) {
		switch (state) {
			case HudGameUIState.Show:
				this.mBottomCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				this.mTopEventCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				this.mRightDownCon.visibility = mw.SlateVisibility.SelfHitTestInvisible
				this.mVirtualJoystick.visibility = mw.SlateVisibility.Visible
				this.visible = true
				break;
			case HudGameUIState.HideAll:
				this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mRightDownCon.visibility = mw.SlateVisibility.Collapsed
				this.mVirtualJoystick.visibility = mw.SlateVisibility.Collapsed
				break;
			default:
				break;
		}
	}

	protected onShow(name: string) {
		this.resetJoyStick();
	}

	protected onHide(): void {
	}

	/**
	 * 显示退出互动按钮
	 * @param isShow 是否显示
	 */
	public showExitInteractiveBtn(isShow: boolean) {
		if (isShow) {
			this.mExitInteractive_btn.visibility = mw.SlateVisibility.Visible;
			this.mJump_btn.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;
			this.mJump_btn.visibility = mw.SlateVisibility.Visible;
		}
	}

	/**
	 * 刷新动作按钮
	 * @param name 动作按钮显示文字
	 * @param guid 动作按钮图片guid
	 */
	public refreshActionBtn(name: string, guid: string) {
		this.mAction_btn.normalImageGuid = guid;
		this.textBtn.text = name;
	}

	public resetJoyStick() {
		this.mVirtualJoystick?.resetJoyStick();
	}

	/**
	 * buff剩余时间计时。
	 * @param dt 
	 */
	protected onUpdate(dt: number): void {

		if (this._jumpTime > 0) {
			this._jumpTime -= dt;
			this.mJump.currentValue = this._jumpTime / GlobalData.buffDuration;
		} else {
			this.mJump.currentValue = 0;
		}

		if (this._speedTime > 0) {
			this._speedTime -= dt;
			this.mSpeed.currentValue = this._speedTime / GlobalData.buffDuration;
		} else {
			this.mSpeed.currentValue = 0;
		}
	}
}
