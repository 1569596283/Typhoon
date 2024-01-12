﻿

@UIBind('UI/uiTemplate/common/Tips.ui')
export default class Tips_generate extends UIScript {
    	private mCell1_Internal: mw.Canvas
	public get mCell1(): mw.Canvas {
		if(!this.mCell1_Internal&&this.uiWidgetBase) {
			this.mCell1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell1') as mw.Canvas
		}
		return this.mCell1_Internal
	}
	private mCell2_Internal: mw.Canvas
	public get mCell2(): mw.Canvas {
		if(!this.mCell2_Internal&&this.uiWidgetBase) {
			this.mCell2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell2') as mw.Canvas
		}
		return this.mCell2_Internal
	}
	private mCell3_Internal: mw.Canvas
	public get mCell3(): mw.Canvas {
		if(!this.mCell3_Internal&&this.uiWidgetBase) {
			this.mCell3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell3') as mw.Canvas
		}
		return this.mCell3_Internal
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
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell1/Content_txt") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell2/Content_txt") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell3/Content_txt") as mw.TextBlock);
	

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