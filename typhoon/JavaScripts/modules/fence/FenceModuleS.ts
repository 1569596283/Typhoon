import { GlobalData } from "../../const/GlobalData";
import TyphoonS from "../typhoon/TyphoonS";
import FenceModuleC from "./FenceModuleC";

export default class FenceModuleS extends ModuleS<FenceModuleC, null>{
    /** 存放每一层是哪个预制体 */
    private _fenceArr: number[] = [0];

    /**
     * 客户端请求同步当前围墙信息
     */
    public net_requestSyn() {
        let destroyFence = ModuleService.getModule(TyphoonS).destroyFloor;
        this.getClient(this.currentPlayer).net_init(this._fenceArr, destroyFence);
    }

    /**
     * 获得围墙样式序号
     * @param floor 是第几层的
     * @returns 样式序号
     */
    private getFenceStyleIndex(floor: number): number {
        let index: number = 0;
        // 前四层固定，后面随机，每五层一固定为阳台
        if (floor >= 4) {
            if ((floor + 1) % 5) {
                index = Math.floor(Math.random() * (GlobalData.fencePrefabID.length - 2)) + 2;
            } else {
                index = 1;
            }
        }
        return index;
    }

    /**
     * 层数增加，上限为100层
     * @returns 
     */
    public addFence() {
        if (this._fenceArr.length >= 100) {
            return;
        }
        let floor = this._fenceArr.length;
        let index = this.getFenceStyleIndex(floor);
        this._fenceArr.push(index);
        let destroyFence = ModuleService.getModule(TyphoonS).destroyFloor;
        this.getAllClient().net_changeFence(this._fenceArr, destroyFence);
    }

    /**
     * 摧毁建筑
     */
    public destroyFence() {
        if (this._fenceArr.length === 1) {
            ModuleService.getModule(TyphoonS).fail();
        } else if (this._fenceArr.length < 1) {
            ModuleService.getModule(TyphoonS).fail();
            return;
        }
        this._fenceArr.pop();
        let destroyFence = ModuleService.getModule(TyphoonS).destroyFloor;
        this.getAllClient().net_destroyFence(this._fenceArr, destroyFence);
    }

    /**
     * 增加围墙
     */
    public net_requestAddFence() {
        this.addFence();
    }

    /**
     * 获得挡墙围墙高度
     */
    public getFenceLength(){
        return this._fenceArr.length;
    }
}