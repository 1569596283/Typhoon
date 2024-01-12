import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { GlobalData } from "../../const/GlobalData";
import TyphoonGUI from "../../ui/TyphoonGUI";
import TyphoonC from "../typhoon/TyphoonC";
import FenceModuleS from "./FenceModuleS";


/** 围墙锚点GUID */
const FENCE_ANCHOR_GUID = "0E263FE2";
/** 围墙高度 */
const FENCE_HEIGHT: number = 160;

export default class FenceModuleC extends ModuleC<FenceModuleS, null> {

    /** 围墙锚点坐标 */
    private _fenceAnchorPos: Vector = Vector.zero;
    /** 围墙样式数组 */
    private _fenceIndexArr: number[] = [];
    /** 目标围墙样式数组 */
    private _targetFenceIndexArr: number[] = [];
    /** 围墙数组 */
    private _fenceArr: mw.GameObject[] = [];
    /** 缓存围墙数组 */
    private _cacheFenceMap: Map<number, mw.GameObject[]> = new Map();
    /** 台风游戏UI */
    private _typhoonGUI: TyphoonGUI;
    /** 摧毁楼层数 */
    private _destroyFloor: number = 0;
    /** 是否围墙正在变化 */
    private _changing: boolean = false;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        this._typhoonGUI = UIManager.show(TyphoonGUI);

        this.init();
    }
    /**
     * 初始化，找到围墙的锚点
     */
    private async init() {
        let fence = await GameObject.asyncFindGameObjectById(FENCE_ANCHOR_GUID);
        fence && (this._fenceAnchorPos = fence.worldTransform.position);

        this.server.net_requestSyn();
    }

    /**
     * 初始化
     * @param arr 围墙样式数组
     * @param destroyFence 销毁楼层数
     */
    public net_init(arr: number[], destroyFence: number) {
        this._targetFenceIndexArr = arr;
        this.changeFence();
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, destroyFence);
    }

    /**
     * 获取围墙
     * @param index this.fenceIndexArr的下标
     * @returns 
     */
    private async getFence(index: number): Promise<mw.GameObject> {
        let fence: mw.GameObject;
        let style = this._fenceIndexArr[index];
        if (this._cacheFenceMap.has(style)) {
            fence = this._cacheFenceMap.get(style).pop();
        }
        if (!fence) {
            fence = await this.createFence(style);
        }
        await fence.asyncReady();
        fence.worldTransform.position = this.getLocation(index);
        fence.setVisibility(PropertyStatus.Off, true);
        fence.setCollision(PropertyStatus.Off, true);
        return fence;
    }

    /**
     * 创建围墙
     * @param style 围墙的样式
     * @returns 围墙物体
     */
    private async createFence(style: number): Promise<mw.GameObject> {
        let guid = GlobalData.fencePrefabID[style];
        let fence = await SpawnManager.asyncSpawn({ guid: guid })
        return fence;
    }

    /**
     * 获得围墙需要在的位置
     * @param index 围墙是第几层的
     * @returns 坐标
     */
    private getLocation(index: number): Vector {
        let loc = this._fenceAnchorPos.clone();
        loc.z += index * FENCE_HEIGHT;
        loc.z += Math.floor(index / 5) * FENCE_HEIGHT;
        return loc;
    }

    /**
     * 围墙层数改变
     * @param arr 增加后的围墙层数
     * @param destroyFence 销毁了几层
     */
    public net_changeFence(arr: number[], destroyFence: number) {
        this._targetFenceIndexArr = arr;
        this.changeFence();
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, destroyFence);
        ModuleService.getModule(TyphoonC).changeGlassScale(this._fenceIndexArr.length);
    }

    /**
     * 显示围墙
     * @param fence 围墙物体
     */
    private showFence(fence: mw.GameObject) {
        fence.setVisibility(PropertyStatus.On, false);
        fence.setCollision(PropertyStatus.On, false);
        let children = fence.getChildren();
        let time = 3 / children.length;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            TimeUtil.delaySecond(i * time).then(() => {
                child.setVisibility(PropertyStatus.FromParent, true);
                child.setCollision(PropertyStatus.FromParent, true);
            });
        }
    }

    /**
     * 销毁围墙
     * @param arr 目标围墙样式数组
     * @param destroyFence 销毁了几层
     */
    public net_destroyFence(arr: number[], destroyFence: number) {
        this._targetFenceIndexArr = arr;
        this.changeFence();
        this._destroyFloor = destroyFence;
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, this._destroyFloor);
        ModuleService.getModule(TyphoonC).changeGlassScale(this._fenceIndexArr.length);
    }

    /**
     * 刷新围墙
     */
    public refreshFence() {
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, 0);
    }

    /**
     * 回收围墙
     * @returns 
     */
    private destroyFence() {
        if (this._fenceIndexArr.length !== this._fenceArr.length) {
            console.error("出错了！！！！销毁的时候两个数组长度不同", this._fenceIndexArr.length, this._fenceArr.length);
            return;
        }
        let fence = this._fenceArr.pop();
        let style = this._fenceIndexArr.pop();
        if (!fence) {
            console.log("要隐藏但是没有fence");
            return;
        }
        fence.setVisibility(PropertyStatus.Off, true);
        fence.setCollision(PropertyStatus.Off, true);

        let arr = [];
        if (this._cacheFenceMap.has(style)) {
            arr = this._cacheFenceMap.get(style);
        }
        arr.push(fence);
        this._cacheFenceMap.set(style, arr);
    }

    /**
     * 围墙改变，创建不够的，回收多余的
     * @returns 
     */
    private async changeFence() {
        let targetLen = this._targetFenceIndexArr.length;
        let curLen = this._fenceIndexArr.length;
        if (this._changing || targetLen === curLen) {
            return;
        }
        this._changing = true;
        if (targetLen > curLen) {
            this._fenceIndexArr.push(this._targetFenceIndexArr[curLen]);
            let fence = await this.getFence(curLen);
            this.showFence(fence);
            this._fenceArr.push(fence);
        } else if (targetLen < curLen) {
            this.destroyFence();
        }
        this._changing = false;
        this.changeFence();
    }

    /**
     * 获取当前围墙层数
     * @returns 当前围墙层数
     */
    public getCurFence() {
        return this._targetFenceIndexArr.length;
    }

    /**
     * 增加围墙，GM命令
     */
    public requestAddFence() {
        this.server.net_requestAddFence();
    }
}