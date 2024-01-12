﻿

@UIBind('UI/uiTemplate/Chat/HeadUI.ui')
export default class HeadUI_generate extends UIScript {
    	private styleCanvas_Internal: mw.Canvas
	public get styleCanvas(): mw.Canvas {
		if(!this.styleCanvas_Internal&&this.uiWidgetBase) {
			this.styleCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas') as mw.Canvas
		}
		return this.styleCanvas_Internal
	}
	private back_Internal: mw.Image
	public get back(): mw.Image {
		if(!this.back_Internal&&this.uiWidgetBase) {
			this.back_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/back') as mw.Image
		}
		return this.back_Internal
	}
	private styleLeft_Internal: mw.Image
	public get styleLeft(): mw.Image {
		if(!this.styleLeft_Internal&&this.uiWidgetBase) {
			this.styleLeft_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/styleLeft') as mw.Image
		}
		return this.styleLeft_Internal
	}
	private styleCenter_Internal: mw.Image
	public get styleCenter(): mw.Image {
		if(!this.styleCenter_Internal&&this.uiWidgetBase) {
			this.styleCenter_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/styleCenter') as mw.Image
		}
		return this.styleCenter_Internal
	}
	private styleRight_Internal: mw.Image
	public get styleRight(): mw.Image {
		if(!this.styleRight_Internal&&this.uiWidgetBase) {
			this.styleRight_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/styleRight') as mw.Image
		}
		return this.styleRight_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/Title") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/Name") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/Chat/Text") as mw.TextBlock);
	

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