import { HudGameUIState } from "./const/GameEnum";
import Game_HUDUI from "./modules/gameModule/ui/Game_HUDUI";
import { single } from "./utils/GameUtils";


@single()
export class MyUIManager {
    public static readonly instance: MyUIManager = null;

    constructor() {

    }

    private _gameRootUI: Game_HUDUI = null
    private _uis: mw.UIScript[] = []
    private _uizOrders: number[] = []
    private _isCloseAllUI: boolean = false
    public get gameRootUI() {
        if (!this._gameRootUI) this._gameRootUI = mw.UIService.getUI(Game_HUDUI)
        return this._gameRootUI
    }

    public get canvas(): mw.Canvas {
        return mw.UIService.canvas
    }

    public create<T extends mw.UIScript>(PanelClass: { new(): T; }): T {
        return mw.UIService.create(PanelClass)
    }

    public getUI<T extends mw.UIScript>(PanelClass: { new(): T; }, bNeedNew?: boolean): T {
        return mw.UIService.getUI(PanelClass, bNeedNew)
    }

    public show<T extends mw.UIScript>(PanelClass: { new(): T; }, ...params: any[]): T {
        let panel = mw.UIService.show(PanelClass, ...params)
        if (this._isCloseAllUI && panel.layer == mw.UILayerTop) {
            panel.rootCanvas.visibility = mw.SlateVisibility.Collapsed
            this._uizOrders.push(panel.uiObject.zOrder)
            this._uis.push(panel)
        }
        return panel
    }

    public showUI(panel: mw.UIScript, layer?: number, ...params: any[]): mw.UIScript {
        if (this._isCloseAllUI && (panel.layer == mw.UILayerTop || layer == mw.UILayerTop)) {
            panel.rootCanvas.visibility = mw.SlateVisibility.Collapsed
            this._uizOrders.push(panel.uiObject.zOrder)
            this._uis.push(panel)
        }
        return mw.UIService.showUI(panel, layer, ...params)
    }

    public hide<T extends mw.UIScript>(PanelClass: { new(): T; }): T {
        return mw.UIService.hide(PanelClass)
    }

    public hideUI(panel: mw.UIScript): boolean {
        return mw.UIService.hideUI(panel)
    }

    public hideAllUI(panel: mw.UIScript) {
        if (this._isCloseAllUI) return
        this._isCloseAllUI = true
        mw.UIService.instance["createPanelMap"].forEach((ui) => {
            for (let i = 0; i < ui.length; i++) {
                if (ui[i].visible && ui[i].uiObject.parent
                    && ui[i].uiObject.parent.equal(this.canvas)
                    && ui[i].uiObject.name != "HUD" && ui[i].uiObject.name != "Guide") {
                    this._uizOrders.push(ui[i].uiObject.zOrder)
                    this._uis.push(ui[i])
                    ui[i].rootCanvas.visibility = mw.SlateVisibility.Collapsed
                }
            }
        })
        if (panel) panel.rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
    }

    public showAllUI(panel: mw.UIScript) {
        if (!this._isCloseAllUI) return
        this._isCloseAllUI = false
        for (let i = 0; i < this._uis.length; i++) {
            this._uis[i].rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this._uis[i].uiObject.zOrder = this._uizOrders[i]
        }
        this._uis.length = 0
        this._uizOrders.length = 0
        if (panel && panel.visible) panel.visible = false
    }

    private _state: HudGameUIState
    public setUIstate(panel: mw.UIScript, state: HudGameUIState) {
        if (this._state == state) return
        this._state = state
        switch (state) {
            case HudGameUIState.Show:
                this.showAllUI(panel)
                break;
            default:
                this.hideAllUI(panel)
                break;
        }
        this.gameRootUI.setUIState(state);
    }

    public getUIstate(): HudGameUIState {
        return this._state
    }

    public addUILayerMap(layer: number, startZOrder: number): void {
        mw.UIService["addUILayerMap"](layer, startZOrder)
    }
}