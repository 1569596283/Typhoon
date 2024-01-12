declare namespace UI {
    const UILayerTips = 8;
    const UILayerPause = 9
}
declare module "puerts";
declare var global;
declare let UIManager: {
    get gameRootUI()
    get canvas(): mw.Canvas
    create<T extends mw.UIScript>(PanelClass: { new(): T; }): T
    getUI<T extends mw.UIScript>(PanelClass: { new(): T; }, bNeedNew?: boolean): T
    show<T extends mw.UIScript>(PanelClass: { new(): T; }, ...params: any[]): T
    showUI(panel: mw.UIScript, layer?: number, ...params: any[]): mw.UIScript
    hide<T extends mw.UIScript>(PanelClass: { new(): T; }): T
    hideUI(panel: mw.UIScript): boolean
    setUIstate(panel: mw.UIScript, state: number)
    getUIstate(): number
    addUILayerMap(layer: number, startZOrder: number): void;
};
declare function getEn(go: mw.GameObject, configId: number): void;
/**
 * 输出Log
 * @param content 内容
 */
declare function oTrace(...content: any[]): void;
/**
 * 输出Warning
 * @param content 内容
 */
declare function oTraceWarning(...content: any[]): void;
/**
 * 输出Error
 * @param content 内容
 */
declare function oTraceError(...content: any[]): void;
