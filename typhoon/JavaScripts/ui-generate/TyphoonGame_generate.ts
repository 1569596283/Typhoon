﻿

@UIBind('UI/TyphoonGame.ui')
export default class TyphoonGame_generate extends UIScript {
    	private canvasTip_Internal: mw.Canvas
	public get canvasTip(): mw.Canvas {
		if(!this.canvasTip_Internal&&this.uiWidgetBase) {
			this.canvasTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip') as mw.Canvas
		}
		return this.canvasTip_Internal
	}
	private textTyphoonTime_Internal: mw.TextBlock
	public get textTyphoonTime(): mw.TextBlock {
		if(!this.textTyphoonTime_Internal&&this.uiWidgetBase) {
			this.textTyphoonTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip/textTyphoonTime') as mw.TextBlock
		}
		return this.textTyphoonTime_Internal
	}
	private textFloor_Internal: mw.TextBlock
	public get textFloor(): mw.TextBlock {
		if(!this.textFloor_Internal&&this.uiWidgetBase) {
			this.textFloor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip/textFloor') as mw.TextBlock
		}
		return this.textFloor_Internal
	}
	private imageTips_Internal: mw.Image
	public get imageTips(): mw.Image {
		if(!this.imageTips_Internal&&this.uiWidgetBase) {
			this.imageTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip/imageTips') as mw.Image
		}
		return this.imageTips_Internal
	}
	private canvasDistance_Internal: mw.Canvas
	public get canvasDistance(): mw.Canvas {
		if(!this.canvasDistance_Internal&&this.uiWidgetBase) {
			this.canvasDistance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasDistance') as mw.Canvas
		}
		return this.canvasDistance_Internal
	}
	private imageDistance_Internal: mw.Image
	public get imageDistance(): mw.Image {
		if(!this.imageDistance_Internal&&this.uiWidgetBase) {
			this.imageDistance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasDistance/imageDistance') as mw.Image
		}
		return this.imageDistance_Internal
	}
	private textDistance_Internal: mw.TextBlock
	public get textDistance(): mw.TextBlock {
		if(!this.textDistance_Internal&&this.uiWidgetBase) {
			this.textDistance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasDistance/textDistance') as mw.TextBlock
		}
		return this.textDistance_Internal
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
        this.setLanguage(this.textTyphoonTime)
	
        this.setLanguage(this.textFloor)
	
        this.setLanguage(this.textDistance)
	

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