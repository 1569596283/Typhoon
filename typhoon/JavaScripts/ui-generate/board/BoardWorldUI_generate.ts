﻿

@UIBind('UI/board/BoardWorldUI.ui')
export default class BoardWorldUI_generate extends UIScript {
    	private canvasNow_Internal: mw.Canvas
	public get canvasNow(): mw.Canvas {
		if(!this.canvasNow_Internal&&this.uiWidgetBase) {
			this.canvasNow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasNow') as mw.Canvas
		}
		return this.canvasNow_Internal
	}
	private textNowProgress_Internal: mw.TextBlock
	public get textNowProgress(): mw.TextBlock {
		if(!this.textNowProgress_Internal&&this.uiWidgetBase) {
			this.textNowProgress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasNow/textNowProgress') as mw.TextBlock
		}
		return this.textNowProgress_Internal
	}
	private imageBoard_Internal: mw.Image
	public get imageBoard(): mw.Image {
		if(!this.imageBoard_Internal&&this.uiWidgetBase) {
			this.imageBoard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasNow/imageBoard') as mw.Image
		}
		return this.imageBoard_Internal
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
        this.setLanguage(this.textNowProgress)
	

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