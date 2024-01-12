﻿

@UIBind('UI/InteractUtil.ui')
export default class InteractUtil_generate extends UIScript {
    	private mPosX_Internal: mw.InputBox
	public get mPosX(): mw.InputBox {
		if(!this.mPosX_Internal&&this.uiWidgetBase) {
			this.mPosX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPosX') as mw.InputBox
		}
		return this.mPosX_Internal
	}
	private mPosY_Internal: mw.InputBox
	public get mPosY(): mw.InputBox {
		if(!this.mPosY_Internal&&this.uiWidgetBase) {
			this.mPosY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPosY') as mw.InputBox
		}
		return this.mPosY_Internal
	}
	private mPosZ_Internal: mw.InputBox
	public get mPosZ(): mw.InputBox {
		if(!this.mPosZ_Internal&&this.uiWidgetBase) {
			this.mPosZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPosZ') as mw.InputBox
		}
		return this.mPosZ_Internal
	}
	private mObjPosX_Internal: mw.InputBox
	public get mObjPosX(): mw.InputBox {
		if(!this.mObjPosX_Internal&&this.uiWidgetBase) {
			this.mObjPosX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mObjPosX') as mw.InputBox
		}
		return this.mObjPosX_Internal
	}
	private mObjPosY_Internal: mw.InputBox
	public get mObjPosY(): mw.InputBox {
		if(!this.mObjPosY_Internal&&this.uiWidgetBase) {
			this.mObjPosY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mObjPosY') as mw.InputBox
		}
		return this.mObjPosY_Internal
	}
	private mObjPosZ_Internal: mw.InputBox
	public get mObjPosZ(): mw.InputBox {
		if(!this.mObjPosZ_Internal&&this.uiWidgetBase) {
			this.mObjPosZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mObjPosZ') as mw.InputBox
		}
		return this.mObjPosZ_Internal
	}
	private mRotX_Internal: mw.InputBox
	public get mRotX(): mw.InputBox {
		if(!this.mRotX_Internal&&this.uiWidgetBase) {
			this.mRotX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRotX') as mw.InputBox
		}
		return this.mRotX_Internal
	}
	private mRotY_Internal: mw.InputBox
	public get mRotY(): mw.InputBox {
		if(!this.mRotY_Internal&&this.uiWidgetBase) {
			this.mRotY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRotY') as mw.InputBox
		}
		return this.mRotY_Internal
	}
	private mRotZ_Internal: mw.InputBox
	public get mRotZ(): mw.InputBox {
		if(!this.mRotZ_Internal&&this.uiWidgetBase) {
			this.mRotZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRotZ') as mw.InputBox
		}
		return this.mRotZ_Internal
	}
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mID_Internal: mw.TextBlock
	public get mID(): mw.TextBlock {
		if(!this.mID_Internal&&this.uiWidgetBase) {
			this.mID_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mID') as mw.TextBlock
		}
		return this.mID_Internal
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
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBtn);
	
        //文本多语言
        this.setLanguage(this.mID)
	

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