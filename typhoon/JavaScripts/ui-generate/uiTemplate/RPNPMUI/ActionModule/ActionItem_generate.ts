﻿

@UIBind('UI/uiTemplate/RPNPMUI/ActionModule/ActionItem.ui')
export default class ActionItem_generate extends UIScript {
    	private mBg_Internal: mw.Image
	public get mBg(): mw.Image {
		if(!this.mBg_Internal&&this.uiWidgetBase) {
			this.mBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBg') as mw.Image
		}
		return this.mBg_Internal
	}
	private iconImg_Internal: mw.Image
	public get iconImg(): mw.Image {
		if(!this.iconImg_Internal&&this.uiWidgetBase) {
			this.iconImg_Internal = this.uiWidgetBase.findChildByPath('Canvas/iconImg') as mw.Image
		}
		return this.iconImg_Internal
	}
	private btn_Internal: mw.StaleButton
	public get btn(): mw.StaleButton {
		if(!this.btn_Internal&&this.uiWidgetBase) {
			this.btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/btn') as mw.StaleButton
		}
		return this.btn_Internal
	}
	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('Canvas/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private mCanvasStar_Internal: mw.Canvas
	public get mCanvasStar(): mw.Canvas {
		if(!this.mCanvasStar_Internal&&this.uiWidgetBase) {
			this.mCanvasStar_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasStar') as mw.Canvas
		}
		return this.mCanvasStar_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }

    protected initButtons() {
        //按钮添加点击
        this.btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn");
        })
        this.btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn");
        })
        this.btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn");
        })
        this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.btn);
	
        //文本多语言
        this.setLanguage(this.name)
	

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