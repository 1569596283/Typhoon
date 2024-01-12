﻿

@UIBind('UI/uiTemplate/gameModule/Game_HUD.ui')
export default class Game_HUD_generate extends UIScript {
    	private mVirtualJoystick_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystick(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystick_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystick_Internal = this.uiWidgetBase.findChildByPath('Canvas/JoyStick/mVirtualJoystick') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystick_Internal
	}
	private mRightDownCon_Internal: mw.Canvas
	public get mRightDownCon(): mw.Canvas {
		if(!this.mRightDownCon_Internal&&this.uiWidgetBase) {
			this.mRightDownCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon') as mw.Canvas
		}
		return this.mRightDownCon_Internal
	}
	private mJump_btn_Internal: mw.StaleButton
	public get mJump_btn(): mw.StaleButton {
		if(!this.mJump_btn_Internal&&this.uiWidgetBase) {
			this.mJump_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mJump_btn') as mw.StaleButton
		}
		return this.mJump_btn_Internal
	}
	private mExitInteractive_btn_Internal: mw.StaleButton
	public get mExitInteractive_btn(): mw.StaleButton {
		if(!this.mExitInteractive_btn_Internal&&this.uiWidgetBase) {
			this.mExitInteractive_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mExitInteractive_btn') as mw.StaleButton
		}
		return this.mExitInteractive_btn_Internal
	}
	private mBottomCanvas_Internal: mw.Canvas
	public get mBottomCanvas(): mw.Canvas {
		if(!this.mBottomCanvas_Internal&&this.uiWidgetBase) {
			this.mBottomCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas') as mw.Canvas
		}
		return this.mBottomCanvas_Internal
	}
	private canvas_emoji_Internal: mw.Canvas
	public get canvas_emoji(): mw.Canvas {
		if(!this.canvas_emoji_Internal&&this.uiWidgetBase) {
			this.canvas_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_emoji') as mw.Canvas
		}
		return this.canvas_emoji_Internal
	}
	private scrollBox_emoji_Internal: mw.ScrollBox
	public get scrollBox_emoji(): mw.ScrollBox {
		if(!this.scrollBox_emoji_Internal&&this.uiWidgetBase) {
			this.scrollBox_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_emoji/scrollBox_emoji') as mw.ScrollBox
		}
		return this.scrollBox_emoji_Internal
	}
	private canvas_word_Internal: mw.Canvas
	public get canvas_word(): mw.Canvas {
		if(!this.canvas_word_Internal&&this.uiWidgetBase) {
			this.canvas_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_word') as mw.Canvas
		}
		return this.canvas_word_Internal
	}
	private scrollBox_word_Internal: mw.ScrollBox
	public get scrollBox_word(): mw.ScrollBox {
		if(!this.scrollBox_word_Internal&&this.uiWidgetBase) {
			this.scrollBox_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_word/scrollBox_word') as mw.ScrollBox
		}
		return this.scrollBox_word_Internal
	}
	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}
	private emojiBtn_Internal: mw.StaleButton
	public get emojiBtn(): mw.StaleButton {
		if(!this.emojiBtn_Internal&&this.uiWidgetBase) {
			this.emojiBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn/emojiBtn') as mw.StaleButton
		}
		return this.emojiBtn_Internal
	}
	private wordBtn_Internal: mw.StaleButton
	public get wordBtn(): mw.StaleButton {
		if(!this.wordBtn_Internal&&this.uiWidgetBase) {
			this.wordBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn/wordBtn') as mw.StaleButton
		}
		return this.wordBtn_Internal
	}
	private mAttribute_Internal: mw.Canvas
	public get mAttribute(): mw.Canvas {
		if(!this.mAttribute_Internal&&this.uiWidgetBase) {
			this.mAttribute_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute') as mw.Canvas
		}
		return this.mAttribute_Internal
	}
	private mHpBase_Internal: mw.ProgressBar
	public get mHpBase(): mw.ProgressBar {
		if(!this.mHpBase_Internal&&this.uiWidgetBase) {
			this.mHpBase_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mHpBase') as mw.ProgressBar
		}
		return this.mHpBase_Internal
	}
	private mSpeed_Internal: mw.ProgressBar
	public get mSpeed(): mw.ProgressBar {
		if(!this.mSpeed_Internal&&this.uiWidgetBase) {
			this.mSpeed_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mSpeed') as mw.ProgressBar
		}
		return this.mSpeed_Internal
	}
	private mMpBase_Internal: mw.ProgressBar
	public get mMpBase(): mw.ProgressBar {
		if(!this.mMpBase_Internal&&this.uiWidgetBase) {
			this.mMpBase_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mMpBase') as mw.ProgressBar
		}
		return this.mMpBase_Internal
	}
	private mJump_Internal: mw.ProgressBar
	public get mJump(): mw.ProgressBar {
		if(!this.mJump_Internal&&this.uiWidgetBase) {
			this.mJump_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mJump') as mw.ProgressBar
		}
		return this.mJump_Internal
	}
	private mTopEventCanvas_Internal: mw.Canvas
	public get mTopEventCanvas(): mw.Canvas {
		if(!this.mTopEventCanvas_Internal&&this.uiWidgetBase) {
			this.mTopEventCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas') as mw.Canvas
		}
		return this.mTopEventCanvas_Internal
	}
	private mCanvasAction_Internal: mw.Canvas
	public get mCanvasAction(): mw.Canvas {
		if(!this.mCanvasAction_Internal&&this.uiWidgetBase) {
			this.mCanvasAction_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction') as mw.Canvas
		}
		return this.mCanvasAction_Internal
	}
	private mAction_btn_Internal: mw.Button
	public get mAction_btn(): mw.Button {
		if(!this.mAction_btn_Internal&&this.uiWidgetBase) {
			this.mAction_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction/mAction_btn') as mw.Button
		}
		return this.mAction_btn_Internal
	}
	private textBtn_Internal: mw.TextBlock
	public get textBtn(): mw.TextBlock {
		if(!this.textBtn_Internal&&this.uiWidgetBase) {
			this.textBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction/mAction_btn/textBtn') as mw.TextBlock
		}
		return this.textBtn_Internal
	}
	private mResetCanvas_Internal: mw.Canvas
	public get mResetCanvas(): mw.Canvas {
		if(!this.mResetCanvas_Internal&&this.uiWidgetBase) {
			this.mResetCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mResetCanvas') as mw.Canvas
		}
		return this.mResetCanvas_Internal
	}
	private mPulloff_btn_Internal: mw.Button
	public get mPulloff_btn(): mw.Button {
		if(!this.mPulloff_btn_Internal&&this.uiWidgetBase) {
			this.mPulloff_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mResetCanvas/mPulloff_btn') as mw.Button
		}
		return this.mPulloff_btn_Internal
	}
	private mPlayerInfo_Internal: mw.Canvas
	public get mPlayerInfo(): mw.Canvas {
		if(!this.mPlayerInfo_Internal&&this.uiWidgetBase) {
			this.mPlayerInfo_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo') as mw.Canvas
		}
		return this.mPlayerInfo_Internal
	}
	private mIdCard_Internal: mw.Image
	public get mIdCard(): mw.Image {
		if(!this.mIdCard_Internal&&this.uiWidgetBase) {
			this.mIdCard_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo/mIdCard') as mw.Image
		}
		return this.mIdCard_Internal
	}
	private mIdCard_btn_Internal: mw.Button
	public get mIdCard_btn(): mw.Button {
		if(!this.mIdCard_btn_Internal&&this.uiWidgetBase) {
			this.mIdCard_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo/mIdCard_btn') as mw.Button
		}
		return this.mIdCard_btn_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        this.mJump_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mJump_btn");
        })
        this.mJump_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mJump_btn");
        })
        this.mJump_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mJump_btn");
        })
        this.mJump_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mExitInteractive_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mExitInteractive_btn");
        })
        this.mExitInteractive_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mExitInteractive_btn");
        })
        this.mExitInteractive_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mExitInteractive_btn");
        })
        this.mExitInteractive_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.emojiBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "emojiBtn");
        })
        this.emojiBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "emojiBtn");
        })
        this.emojiBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "emojiBtn");
        })
        this.emojiBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.wordBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "wordBtn");
        })
        this.wordBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "wordBtn");
        })
        this.wordBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "wordBtn");
        })
        this.wordBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.mAction_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mAction_btn");
        })
        this.mAction_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mAction_btn");
        })
        this.mAction_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mAction_btn");
        })
        this.mAction_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mPulloff_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mPulloff_btn");
        })
        this.mPulloff_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mPulloff_btn");
        })
        this.mPulloff_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mPulloff_btn");
        })
        this.mPulloff_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mIdCard_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mIdCard_btn");
        })
        this.mIdCard_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mIdCard_btn");
        })
        this.mIdCard_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mIdCard_btn");
        })
        this.mIdCard_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mJump_btn);
	
        this.setLanguage(this.mExitInteractive_btn);
	
        this.setLanguage(this.emojiBtn);
	
        this.setLanguage(this.wordBtn);
	
        //文本多语言
        this.setLanguage(this.textBtn)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mResetCanvas/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mPlayerInfo/TextBlock_1") as mw.TextBlock);
	

    }

    private setLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

    /**
    * 设置显示时触发
    */
    public show(...params: unknown[]) {
        UIService.showUI(this, this.layer, ...params)
    }

    /**
    * 设置不显示时触发
    */
    public hide() {
        UIService.hideUI(this)
    }

    protected onStart(): void{};
    protected onShow(...params: any[]): void {};
    protected onHide():void{};
    protected onUpdate(dt: number): void {}
    protected onPause(): void {}
    protected onResume(): void {}
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent: mw.Canvas){
        parent.addChild(this.uiObject)
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size)
    }
}