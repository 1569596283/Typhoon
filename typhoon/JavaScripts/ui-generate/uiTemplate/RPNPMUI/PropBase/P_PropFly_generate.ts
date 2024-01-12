﻿

@UIBind('UI/uiTemplate/RPNPMUI/PropBase/P_PropFly.ui')
export default class P_PropFly_generate extends UIScript {
    	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mBtn2_Internal: mw.StaleButton
	public get mBtn2(): mw.StaleButton {
		if(!this.mBtn2_Internal&&this.uiWidgetBase) {
			this.mBtn2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn2') as mw.StaleButton
		}
		return this.mBtn2_Internal
	}
	private mBtn3_Internal: mw.StaleButton
	public get mBtn3(): mw.StaleButton {
		if(!this.mBtn3_Internal&&this.uiWidgetBase) {
			this.mBtn3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn3') as mw.StaleButton
		}
		return this.mBtn3_Internal
	}
	private forbidden_Internal: mw.Image
	public get forbidden(): mw.Image {
		if(!this.forbidden_Internal&&this.uiWidgetBase) {
			this.forbidden_Internal = this.uiWidgetBase.findChildByPath('Canvas/forbidden') as mw.Image
		}
		return this.forbidden_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        this.mBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        })
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        })
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        })
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn2");
        })
        this.mBtn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn2");
        })
        this.mBtn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn2");
        })
        this.mBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn3.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn3");
        })
        this.mBtn3.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn3");
        })
        this.mBtn3.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn3");
        })
        this.mBtn3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBtn);
	
        this.setLanguage(this.mBtn2);
	
        this.setLanguage(this.mBtn3);
	
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