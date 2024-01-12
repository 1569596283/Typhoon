/** 
 * @Author       : meta
 * @Date         : 2023-04-03 14:24:28
 * @LastEditors  : meta
 * @LastEditTime : 2023-08-06 16:50:37
 * @FilePath     : \mollywoodschool\JavaScripts\const\GlobalData.ts
 * @Description  : 
 */
export type Class<T> = { new(...args): T; };

export function MyBoolean(bool: any): boolean {
    if (typeof bool === "boolean") {
        return bool
    }
    if (typeof bool === "string") {
        if (["1", "true", "True"].includes(bool.toString())) {
            return true
        } else {
            return false
        }
    }
    if (typeof bool === "number") {
        if (bool == 0) return false
        else return true
    }
    return false
}
export class GlobalData {
    /**出生点位置 */
    public static globalPos: mw.Vector = null;
    /**出生点旋转 */
    public static globalRot: mw.Rotation = null;
    /**是否打开GM */
    public static isOpenGM: boolean = false;
    /**交互物父节点 */
    public static interactorParent: string = "1ABEAA53";
    /** 道具触发器缩放 */
    public static triggerScale: Vector = new Vector(0.8, 0.8, 1);
    /** 回收物品位置 */
    public static recyclePos: Vector = new Vector(0, 0, -10000);
    /** 当前身上的木板数量 */
    public static boardCount: number = 0;
    /** 最大可携带木板数量 */
    public static maxBoardCount: number = 8;
    /** 围墙预制体ID数组 */
    public static fencePrefabID: string[] = ["AA1F00C24A2E4717E98872AB96ACB9D1", "958B33514EC510B5BC4CA281DBB6D02A", "597DE0B748C1D7F65C03C7A1C6895D1E", "BFA4E28547372BCBF917B49A756587D6", "CAADF934427EC75EE60D18A4922E07A6", "CABE0BEF4B7B40A5AA5723A300011537", "468280C643C20AB3A44AECAFA9E8786E", "C7C7D81044E42F49285D60B4B99313BA", "6109D6C04ED602BAB9410BA7BC7847B3", "9AAF7071432FC737B6758299707C9746"];
    /** 交木头触发器 */
    public static HAND_BOARD: string = "1DA355CF";
    /** 台风移动速度 */
    public static typhoonSpeed: number = 700;
    /** 台风半径（使用时会用这个值乘台风表中的缩放） */
    public static typhoonRadius: number = 350;
    /** 每块木头的血量 */
    public static FenceHP = 5;
    /** 多少块木头搭一层 */
    public static FenceNum = 5;
    /** 场景里生成木头总数 */
    public static FenceTotal = 50;
    /** 多久重新设置位置 */
    public static boardRefreshTime: number = 135;
    /** 是否自动跳回主包 */
    public static autoJumpBack: boolean = false;
    /** buff刷新时间 */
    public static buffRefreshTime: number = 50;
    /** buff持续时间 */
    public static buffDuration: number = 30;
}
