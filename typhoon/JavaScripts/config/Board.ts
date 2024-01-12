import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Mid","Radius","Rules"],["","","",""],[1001,new mw.Vector(505,5600,125),500,0],[1002,new mw.Vector(-2995,4725,100),1500,0],[1003,new mw.Vector(-2995,1700,100),1500,0],[1004,new mw.Vector(-2560,-2900,100),1500,0],[1005,new mw.Vector(-2545,-5920,100),1500,0],[1006,new mw.Vector(1250,-6480,100),2000,0],[1007,new mw.Vector(2190,-5635,100),3000,0],[1008,new mw.Vector(1710,-900,30),2500,0],[1009,new mw.Vector(5730,-745,100),1500,0],[1010,new mw.Vector(3710,3420,100),1500,0],[1011,new mw.Vector(3710,6495,100),1500,0],[1012,new mw.Vector(-3120,-870,100),750,0],[1013,new mw.Vector(540,5270,130),0,1],[1014,new mw.Vector(-5975,1330,1330),0,1],[1015,new mw.Vector(-5650,-2700,1320),0,1],[1016,new mw.Vector(-3580,-6460,650),0,1],[1017,new mw.Vector(-2635,-7300,1630),0,1],[1018,new mw.Vector(2970,-8470,990),0,1],[1019,new mw.Vector(6095,1690,905),0,1],[1020,new mw.Vector(1445,7290,715),0,1]];
export interface IBoardElement extends IElementBase{
 	/**ID*/
	ID:number
	/**中点坐标*/
	Mid:mw.Vector
	/**半径*/
	Radius:number
	/**刷新规则*/
	Rules:number
 } 
export class BoardConfig extends ConfigBase<IBoardElement>{
	constructor(){
		super(EXCELDATA);
	}

}