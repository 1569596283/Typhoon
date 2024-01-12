﻿

@UIBind('UI/typhoon/TyphoonTip.ui')
export default class TyphoonTip_generate extends UIScript {
    	private tipImgBg_Internal: mw.Image
	public get tipImgBg(): mw.Image {
		if(!this.tipImgBg_Internal&&this.uiWidgetBase) {
			this.tipImgBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipImgBg') as mw.Image
		}
		return this.tipImgBg_Internal
	}
	private tipImg_Internal: mw.Image
	public get tipImg(): mw.Image {
		if(!this.tipImg_Internal&&this.uiWidgetBase) {
			this.tipImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipImg') as mw.Image
		}
		return this.tipImg_Internal
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