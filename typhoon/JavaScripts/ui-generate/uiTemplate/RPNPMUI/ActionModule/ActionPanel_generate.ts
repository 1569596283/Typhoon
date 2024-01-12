﻿

@UIBind('UI/uiTemplate/RPNPMUI/ActionModule/ActionPanel.ui')
export default class ActionPanel_generate extends UIScript {
    	private mCon_Internal: mw.Canvas
	public get mCon(): mw.Canvas {
		if(!this.mCon_Internal&&this.uiWidgetBase) {
			this.mCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon') as mw.Canvas
		}
		return this.mCon_Internal
	}
	private mTypeBar1_Internal: mw.StaleButton
	public get mTypeBar1(): mw.StaleButton {
		if(!this.mTypeBar1_Internal&&this.uiWidgetBase) {
			this.mTypeBar1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mTypeBar1') as mw.StaleButton
		}
		return this.mTypeBar1_Internal
	}
	private mTypeBar2_Internal: mw.StaleButton
	public get mTypeBar2(): mw.StaleButton {
		if(!this.mTypeBar2_Internal&&this.uiWidgetBase) {
			this.mTypeBar2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mTypeBar2') as mw.StaleButton
		}
		return this.mTypeBar2_Internal
	}
	private mListCon_Internal: mw.Canvas
	public get mListCon(): mw.Canvas {
		if(!this.mListCon_Internal&&this.uiWidgetBase) {
			this.mListCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mListCon') as mw.Canvas
		}
		return this.mListCon_Internal
	}
	private mScr_Internal: mw.ScrollBox
	public get mScr(): mw.ScrollBox {
		if(!this.mScr_Internal&&this.uiWidgetBase) {
			this.mScr_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mListCon/mScr') as mw.ScrollBox
		}
		return this.mScr_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mListCon/mScr/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mCloseBtn_Internal: mw.StaleButton
	public get mCloseBtn(): mw.StaleButton {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mCloseBtn') as mw.StaleButton
		}
		return this.mCloseBtn_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        this.mTypeBar1.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTypeBar1");
        })
        this.mTypeBar1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTypeBar1");
        })
        this.mTypeBar1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTypeBar1");
        })
        this.mTypeBar1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mTypeBar2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTypeBar2");
        })
        this.mTypeBar2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTypeBar2");
        })
        this.mTypeBar2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTypeBar2");
        })
        this.mTypeBar2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mCloseBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
        })
        this.mCloseBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mCloseBtn");
        })
        this.mCloseBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mCloseBtn");
        })
        this.mCloseBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mTypeBar1);
	
        this.setLanguage(this.mTypeBar2);
	
        this.setLanguage(this.mCloseBtn);
	
        //文本多语言

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