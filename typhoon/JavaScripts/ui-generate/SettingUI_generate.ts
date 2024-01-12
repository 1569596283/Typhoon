﻿

@UIBind('UI/SettingUI.ui')
export default class SettingUI_generate extends UIScript {
    	private mask_Internal: mw.Image
	public get mask(): mw.Image {
		if(!this.mask_Internal&&this.uiWidgetBase) {
			this.mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mask') as mw.Image
		}
		return this.mask_Internal
	}
	private mLabelBtn1_Internal: mw.Button
	public get mLabelBtn1(): mw.Button {
		if(!this.mLabelBtn1_Internal&&this.uiWidgetBase) {
			this.mLabelBtn1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mLabelBtn1') as mw.Button
		}
		return this.mLabelBtn1_Internal
	}
	private mLabelBtn2_Internal: mw.Button
	public get mLabelBtn2(): mw.Button {
		if(!this.mLabelBtn2_Internal&&this.uiWidgetBase) {
			this.mLabelBtn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mLabelBtn2') as mw.Button
		}
		return this.mLabelBtn2_Internal
	}
	private mBtn_Exit_Internal: mw.Button
	public get mBtn_Exit(): mw.Button {
		if(!this.mBtn_Exit_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mBtn_Exit') as mw.Button
		}
		return this.mBtn_Exit_Internal
	}
	private mCanvasUserInfo_Internal: mw.Canvas
	public get mCanvasUserInfo(): mw.Canvas {
		if(!this.mCanvasUserInfo_Internal&&this.uiWidgetBase) {
			this.mCanvasUserInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo') as mw.Canvas
		}
		return this.mCanvasUserInfo_Internal
	}
	private mHeadCanvas_Internal: mw.Canvas
	public get mHeadCanvas(): mw.Canvas {
		if(!this.mHeadCanvas_Internal&&this.uiWidgetBase) {
			this.mHeadCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas') as mw.Canvas
		}
		return this.mHeadCanvas_Internal
	}
	private mHeadImg_Internal: mw.Image
	public get mHeadImg(): mw.Image {
		if(!this.mHeadImg_Internal&&this.uiWidgetBase) {
			this.mHeadImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mHeadImg') as mw.Image
		}
		return this.mHeadImg_Internal
	}
	private mUser_Internal: mw.Image
	public get mUser(): mw.Image {
		if(!this.mUser_Internal&&this.uiWidgetBase) {
			this.mUser_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mUser') as mw.Image
		}
		return this.mUser_Internal
	}
	private mUserName_Internal: mw.TextBlock
	public get mUserName(): mw.TextBlock {
		if(!this.mUserName_Internal&&this.uiWidgetBase) {
			this.mUserName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mUserName') as mw.TextBlock
		}
		return this.mUserName_Internal
	}
	private mTitleName_Internal: mw.TextBlock
	public get mTitleName(): mw.TextBlock {
		if(!this.mTitleName_Internal&&this.uiWidgetBase) {
			this.mTitleName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mTitleName') as mw.TextBlock
		}
		return this.mTitleName_Internal
	}
	private mChangeBtn_Internal: mw.Button
	public get mChangeBtn(): mw.Button {
		if(!this.mChangeBtn_Internal&&this.uiWidgetBase) {
			this.mChangeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mChangeBtn') as mw.Button
		}
		return this.mChangeBtn_Internal
	}
	private mHatBtn_Internal: mw.StaleButton
	public get mHatBtn(): mw.StaleButton {
		if(!this.mHatBtn_Internal&&this.uiWidgetBase) {
			this.mHatBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mHatBtn') as mw.StaleButton
		}
		return this.mHatBtn_Internal
	}
	private mHeadText_Internal: mw.TextBlock
	public get mHeadText(): mw.TextBlock {
		if(!this.mHeadText_Internal&&this.uiWidgetBase) {
			this.mHeadText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mHeadText') as mw.TextBlock
		}
		return this.mHeadText_Internal
	}
	private headicon_Internal: mw.Image
	public get headicon(): mw.Image {
		if(!this.headicon_Internal&&this.uiWidgetBase) {
			this.headicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/headicon') as mw.Image
		}
		return this.headicon_Internal
	}
	private mAttribute_Internal: mw.Canvas
	public get mAttribute(): mw.Canvas {
		if(!this.mAttribute_Internal&&this.uiWidgetBase) {
			this.mAttribute_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute') as mw.Canvas
		}
		return this.mAttribute_Internal
	}
	private mAddLevel_Internal: mw.Canvas
	public get mAddLevel(): mw.Canvas {
		if(!this.mAddLevel_Internal&&this.uiWidgetBase) {
			this.mAddLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel') as mw.Canvas
		}
		return this.mAddLevel_Internal
	}
	private mBadgeTxt_Internal: mw.TextBlock
	public get mBadgeTxt(): mw.TextBlock {
		if(!this.mBadgeTxt_Internal&&this.uiWidgetBase) {
			this.mBadgeTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mBadgeTxt') as mw.TextBlock
		}
		return this.mBadgeTxt_Internal
	}
	private mUp_Internal: mw.Image
	public get mUp(): mw.Image {
		if(!this.mUp_Internal&&this.uiWidgetBase) {
			this.mUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mUp') as mw.Image
		}
		return this.mUp_Internal
	}
	private mAddLevelBtn_Internal: mw.Button
	public get mAddLevelBtn(): mw.Button {
		if(!this.mAddLevelBtn_Internal&&this.uiWidgetBase) {
			this.mAddLevelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mAddLevelBtn') as mw.Button
		}
		return this.mAddLevelBtn_Internal
	}
	private hp_Internal: mw.Image
	public get hp(): mw.Image {
		if(!this.hp_Internal&&this.uiWidgetBase) {
			this.hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/hp') as mw.Image
		}
		return this.hp_Internal
	}
	private mHp_Internal: mw.ProgressBar
	public get mHp(): mw.ProgressBar {
		if(!this.mHp_Internal&&this.uiWidgetBase) {
			this.mHp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mHp') as mw.ProgressBar
		}
		return this.mHp_Internal
	}
	private mHpTxt_Internal: mw.TextBlock
	public get mHpTxt(): mw.TextBlock {
		if(!this.mHpTxt_Internal&&this.uiWidgetBase) {
			this.mHpTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mHpTxt') as mw.TextBlock
		}
		return this.mHpTxt_Internal
	}
	private mp_Internal: mw.Image
	public get mp(): mw.Image {
		if(!this.mp_Internal&&this.uiWidgetBase) {
			this.mp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mp') as mw.Image
		}
		return this.mp_Internal
	}
	private mMp_Internal: mw.ProgressBar
	public get mMp(): mw.ProgressBar {
		if(!this.mMp_Internal&&this.uiWidgetBase) {
			this.mMp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mMp') as mw.ProgressBar
		}
		return this.mMp_Internal
	}
	private mMpTxt_Internal: mw.TextBlock
	public get mMpTxt(): mw.TextBlock {
		if(!this.mMpTxt_Internal&&this.uiWidgetBase) {
			this.mMpTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mMpTxt') as mw.TextBlock
		}
		return this.mMpTxt_Internal
	}
	private exp_Internal: mw.Image
	public get exp(): mw.Image {
		if(!this.exp_Internal&&this.uiWidgetBase) {
			this.exp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/exp') as mw.Image
		}
		return this.exp_Internal
	}
	private mExp_Internal: mw.ProgressBar
	public get mExp(): mw.ProgressBar {
		if(!this.mExp_Internal&&this.uiWidgetBase) {
			this.mExp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mExp') as mw.ProgressBar
		}
		return this.mExp_Internal
	}
	private mExpTxt_Internal: mw.TextBlock
	public get mExpTxt(): mw.TextBlock {
		if(!this.mExpTxt_Internal&&this.uiWidgetBase) {
			this.mExpTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mExpTxt') as mw.TextBlock
		}
		return this.mExpTxt_Internal
	}
	private levelfull_Internal: mw.TextBlock
	public get levelfull(): mw.TextBlock {
		if(!this.levelfull_Internal&&this.uiWidgetBase) {
			this.levelfull_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/levelfull') as mw.TextBlock
		}
		return this.levelfull_Internal
	}
	private mRewardCanvas_Internal: mw.Canvas
	public get mRewardCanvas(): mw.Canvas {
		if(!this.mRewardCanvas_Internal&&this.uiWidgetBase) {
			this.mRewardCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas') as mw.Canvas
		}
		return this.mRewardCanvas_Internal
	}
	private mNextLevel_Internal: mw.TextBlock
	public get mNextLevel(): mw.TextBlock {
		if(!this.mNextLevel_Internal&&this.uiWidgetBase) {
			this.mNextLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas/mNextLevel') as mw.TextBlock
		}
		return this.mNextLevel_Internal
	}
	private mRewardTxt_Internal: mw.TextBlock
	public get mRewardTxt(): mw.TextBlock {
		if(!this.mRewardTxt_Internal&&this.uiWidgetBase) {
			this.mRewardTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas/mRewardTxt') as mw.TextBlock
		}
		return this.mRewardTxt_Internal
	}
	private mRewards_Internal: mw.Canvas
	public get mRewards(): mw.Canvas {
		if(!this.mRewards_Internal&&this.uiWidgetBase) {
			this.mRewards_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas/mRewards') as mw.Canvas
		}
		return this.mRewards_Internal
	}
	private mCanvasSound_Internal: mw.Canvas
	public get mCanvasSound(): mw.Canvas {
		if(!this.mCanvasSound_Internal&&this.uiWidgetBase) {
			this.mCanvasSound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound') as mw.Canvas
		}
		return this.mCanvasSound_Internal
	}
	private mBar_Music_Internal: mw.ProgressBar
	public get mBar_Music(): mw.ProgressBar {
		if(!this.mBar_Music_Internal&&this.uiWidgetBase) {
			this.mBar_Music_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_Music') as mw.ProgressBar
		}
		return this.mBar_Music_Internal
	}
	private mBar_Sound_Internal: mw.ProgressBar
	public get mBar_Sound(): mw.ProgressBar {
		if(!this.mBar_Sound_Internal&&this.uiWidgetBase) {
			this.mBar_Sound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_Sound') as mw.ProgressBar
		}
		return this.mBar_Sound_Internal
	}
	private qualitytext_Internal: mw.Image
	public get qualitytext(): mw.Image {
		if(!this.qualitytext_Internal&&this.uiWidgetBase) {
			this.qualitytext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/qualitytext') as mw.Image
		}
		return this.qualitytext_Internal
	}
	private mBar_GraphicsLev_Internal: mw.ProgressBar
	public get mBar_GraphicsLev(): mw.ProgressBar {
		if(!this.mBar_GraphicsLev_Internal&&this.uiWidgetBase) {
			this.mBar_GraphicsLev_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_GraphicsLev') as mw.ProgressBar
		}
		return this.mBar_GraphicsLev_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        this.mHatBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mHatBtn");
        })
        this.mHatBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mHatBtn");
        })
        this.mHatBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mHatBtn");
        })
        this.mHatBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.mLabelBtn1.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mLabelBtn1");
        })
        this.mLabelBtn1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mLabelBtn1");
        })
        this.mLabelBtn1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mLabelBtn1");
        })
        this.mLabelBtn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mLabelBtn2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mLabelBtn2");
        })
        this.mLabelBtn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mLabelBtn2");
        })
        this.mLabelBtn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mLabelBtn2");
        })
        this.mLabelBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn_Exit.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn_Exit");
        })
        this.mBtn_Exit.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_Exit");
        })
        this.mBtn_Exit.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_Exit");
        })
        this.mBtn_Exit.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mChangeBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mChangeBtn");
        })
        this.mChangeBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mChangeBtn");
        })
        this.mChangeBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mChangeBtn");
        })
        this.mChangeBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mAddLevelBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mAddLevelBtn");
        })
        this.mAddLevelBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mAddLevelBtn");
        })
        this.mAddLevelBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mAddLevelBtn");
        })
        this.mAddLevelBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mHatBtn);
	
        //文本多语言
        this.setLanguage(this.mUserName)
	
        this.setLanguage(this.mTitleName)
	
        this.setLanguage(this.mHeadText)
	
        this.setLanguage(this.mBadgeTxt)
	
        this.setLanguage(this.mHpTxt)
	
        this.setLanguage(this.mMpTxt)
	
        this.setLanguage(this.mExpTxt)
	
        this.setLanguage(this.levelfull)
	
        this.setLanguage(this.mNextLevel)
	
        this.setLanguage(this.mRewardTxt)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mLabelBtn1/TextBlock_2") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mLabelBtn2/TextBlock_3") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/ChangeText") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mAddLevelBtn/TextBlock_8") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock_1") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock_7") as mw.TextBlock);
	

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