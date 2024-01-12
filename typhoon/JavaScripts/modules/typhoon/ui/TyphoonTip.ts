import TyphoonTip_generate from "../../../ui-generate/typhoon/TyphoonTip_generate";

export default class TyphoonTip extends TyphoonTip_generate {

    /** 改变UI提示计时 */
    private _time: number = 0;
    /** 当前序号 */
    private _index: number = 0;
    /** 图片资源guid */
    private _imgGuids: string[] = ["174998", "174999", "175000", "175001"]
    private _forceFlag: boolean;
    /** 
     * 构造UI文件成功后，在合适的时机最先初始化一次 
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.layer = mw.UILayerMiddle;
        this.tipImgBg.imageGuid = "174997";
        for (let i = 0; i < this._imgGuids.length; i++) {
            AssetUtil.asyncDownloadAsset(this._imgGuids[i]);
        }
        this._forceFlag = false;
    }

    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    protected onUpdate(dt: number) {
        this._time += dt;
        if (this._time >= 10 / 30) {
            this._time = 0;
            this.changeTip();
        }
    }

    /**
     * 改变显示UI
     */
    private changeTip() {
        this._index++;
        this.tipImgBg.renderTransformAngle = this.tipImgBg.renderTransformAngle == 180 ? 0 : 180;
        this.tipImg.imageGuid = this._imgGuids[this._index % 4];

    }

    public showTip(percent: number) {
        if (this._forceFlag) return;
        if (percent < 0) mw.UIService.hideUI(this);
        else {
            mw.UIService.showUI(this);
            this.tipImgBg.renderOpacity = percent * 0.5;
            this.tipImg.renderOpacity = percent;
        }
    }

    /**
     * 玩家死亡提示
     */
    public playerDeadTip() {
        mw.UIService.showUI(this);
        this._forceFlag = true;
        this.tipImgBg.renderOpacity = 1 * 0.5;
        this.tipImg.renderOpacity = 1;
    }

    /**
     * 设置显示时触发
     */
    protected onShow(...params: any[]) {
        this.canUpdate = true;
    }

    /**
     * 设置不显示时触发
     */
    protected onHide() {
        this.canUpdate = false;
        this._forceFlag = false;
    }

}
