import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Time","Intensity","Guid","Scale"],["","Language","","","",""],[1001,"typhoon_text_4",[30,120],1.1,"85163",new mw.Vector(10,10,10)],[1002,"typhoon_text_5",[30,120],1.2,"85159",new mw.Vector(11,11,11)],[1003,"typhoon_text_6",[30,120],1.3,"85160",new mw.Vector(12,12,12)],[1004,"typhoon_text_7",[30,120],1.4,"85160",new mw.Vector(13,13,13)],[1005,"typhoon_text_8",[30,120],1.5,"89599",new mw.Vector(14,14,14)],[1006,"typhoon_text_9",[30,120],1.6,"89599",new mw.Vector(15,15,15)],[1007,"typhoon_text_10",[30,120],1.7,"89600",new mw.Vector(16,16,16)],[1008,"typhoon_text_11",[30,120],1.8,"89600",new mw.Vector(17,17,17)],[1009,"typhoon_text_12",[30,120],1.9,"14331",new mw.Vector(18,18,18)],[1010,"typhoon_text_13",[30,120],2,"14331",new mw.Vector(19,19,19)],[1011,"typhoon_text_14",[30,120],2.2,"85157",new mw.Vector(20,20,20)]];
export interface ITyphoonElement extends IElementBase{
 	/**ID*/
	ID:number
	/**台风名称*/
	Name:string
	/**持续时间*/
	Time:Array<number>
	/**强度（几秒摧毁一层）*/
	Intensity:number
	/**台风特效GUID*/
	Guid:string
	/**缩放*/
	Scale:mw.Vector
 } 
export class TyphoonConfig extends ConfigBase<ITyphoonElement>{
	constructor(){
		super(EXCELDATA);
	}

}