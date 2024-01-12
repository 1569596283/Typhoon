﻿

@UIBind('UI/typhoon/TyphoonResult.ui')
export default class TyphoonResult_generate extends UIScript {
    	private canvasWin_Internal: mw.Canvas
	public get canvasWin(): mw.Canvas {
		if(!this.canvasWin_Internal&&this.uiWidgetBase) {
			this.canvasWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin') as mw.Canvas
		}
		return this.canvasWin_Internal
	}
	private textFloor_Internal: mw.TextBlock
	public get textFloor(): mw.TextBlock {
		if(!this.textFloor_Internal&&this.uiWidgetBase) {
			this.textFloor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/textFloor') as mw.TextBlock
		}
		return this.textFloor_Internal
	}
	private textTyphoon_Internal: mw.TextBlock
	public get textTyphoon(): mw.TextBlock {
		if(!this.textTyphoon_Internal&&this.uiWidgetBase) {
			this.textTyphoon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/textTyphoon') as mw.TextBlock
		}
		return this.textTyphoon_Internal
	}
	private textNext_Internal: mw.TextBlock
	public get textNext(): mw.TextBlock {
		if(!this.textNext_Internal&&this.uiWidgetBase) {
			this.textNext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/textNext') as mw.TextBlock
		}
		return this.textNext_Internal
	}
	private buttonWin_Internal: mw.Button
	public get buttonWin(): mw.Button {
		if(!this.buttonWin_Internal&&this.uiWidgetBase) {
			this.buttonWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/buttonWin') as mw.Button
		}
		return this.buttonWin_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.buttonWin.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "buttonWin");
        })
        this.buttonWin.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "buttonWin");
        })
        this.buttonWin.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "buttonWin");
        })
        this.buttonWin.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.textFloor)
	
        this.setLanguage(this.textTyphoon)
	
        this.setLanguage(this.textNext)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasWin/buttonWin/TextBlock") as mw.TextBlock);
	

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