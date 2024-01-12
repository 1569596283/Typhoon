﻿

@UIBind('UI/uiTemplate/GM/GMHUD.ui')
export default class GMHUD_generate extends UIScript {
    	private argText_Internal: mw.InputBox
	public get argText(): mw.InputBox {
		if(!this.argText_Internal&&this.uiWidgetBase) {
			this.argText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/argText') as mw.InputBox
		}
		return this.argText_Internal
	}
	private groupButton_Internal: mw.StaleButton
	public get groupButton(): mw.StaleButton {
		if(!this.groupButton_Internal&&this.uiWidgetBase) {
			this.groupButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/groupButton') as mw.StaleButton
		}
		return this.groupButton_Internal
	}
	private cmdButton_Internal: mw.StaleButton
	public get cmdButton(): mw.StaleButton {
		if(!this.cmdButton_Internal&&this.uiWidgetBase) {
			this.cmdButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cmdButton') as mw.StaleButton
		}
		return this.cmdButton_Internal
	}
	private okButton_Internal: mw.Button
	public get okButton(): mw.Button {
		if(!this.okButton_Internal&&this.uiWidgetBase) {
			this.okButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/okButton') as mw.Button
		}
		return this.okButton_Internal
	}
	private dropList_Internal: mw.ScrollBox
	public get dropList(): mw.ScrollBox {
		if(!this.dropList_Internal&&this.uiWidgetBase) {
			this.dropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList') as mw.ScrollBox
		}
		return this.dropList_Internal
	}
	private cmdPanel_Internal: mw.Canvas
	public get cmdPanel(): mw.Canvas {
		if(!this.cmdPanel_Internal&&this.uiWidgetBase) {
			this.cmdPanel_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList/cmdPanel') as mw.Canvas
		}
		return this.cmdPanel_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        this.groupButton.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "groupButton");
        })
        this.groupButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "groupButton");
        })
        this.groupButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "groupButton");
        })
        this.groupButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.cmdButton.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "cmdButton");
        })
        this.cmdButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "cmdButton");
        })
        this.cmdButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "cmdButton");
        })
        this.cmdButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.okButton.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "okButton");
        })
        this.okButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "okButton");
        })
        this.okButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "okButton");
        })
        this.okButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.groupButton);
	
        this.setLanguage(this.cmdButton);
	
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/okButton/TextBlock") as mw.TextBlock);
	

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