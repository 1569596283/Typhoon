import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","type","name","quality","icon","icon_Ch","icon_J","icon_D","actionId","singleType","doubleType","angle","v","r","sendStance","accectStance","sendAni","accectAni","time","visual1","visual2","circulate"],["","","Language","","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage","","","","","","","","","","","","","",""],[1,1,"Action_01",2,"34419","34419","86255","86255","14641",0,0,0,null,null,null,null,null,null,1,null,null,false],[2,1,"Action_02",2,"35629","35629","86252","86252","15057",0,0,0,null,null,null,null,null,null,1,null,null,false],[3,1,"Action_03",2,"35628","35628","86270","86270","14617",0,0,0,null,null,null,null,null,null,1,null,null,false],[4,1,"Action_04",2,"35630","35630","86269","86269","14759",0,0,0,null,null,null,null,null,null,1,null,null,false],[5,1,"Action_05",2,"34431","34431","86254","86254","14771",0,0,0,null,null,null,null,null,null,1,null,null,false],[6,1,"Action_06",2,"35632","35632","86259","86259","14766",0,0,0,null,null,null,null,null,null,1,null,null,false],[7,1,"Action_07",2,"34426","34426","86263","86263","15078",0,0,0,null,null,null,null,null,null,1,null,null,false],[8,1,"Action_08",2,"34417","34417","86256","86256","14504",0,0,0,null,null,null,null,null,null,1,null,null,false],[9,1,"Action_09",2,"34430","34430","86264","86264","14655",0,0,0,null,null,null,null,null,null,1,null,null,false],[10,1,"Action_10",2,"34421","34421","86253","86253","14023",1,0,0,null,null,null,null,null,null,0,null,null,false],[11,1,"Action_11",2,"34428","34428","86266","86266","4174",1,0,0,null,null,null,null,null,null,0,null,null,false],[12,1,"Action_12",2,"34427","34427","86262","86262","14602",0,0,0,null,null,null,null,null,null,1,null,null,false],[13,1,"Action_13",3,"34423","34423","86272","86272","14571",0,0,0,null,null,null,null,null,null,1,null,null,false],[14,1,"Action_14",2,"34424","34424","86257","86257","14511",0,0,0,null,null,null,null,null,null,1,null,null,false],[15,1,"Action_15",2,"34425","34425","86261","86261","14497",0,0,0,null,null,null,null,null,null,1,null,null,false],[16,2,"Action_16",4,"98699","98699","98715","98715",null,0,3,0,new mw.Vector(-22,-2,110),new mw.Vector(0,0,0),"103085","4174",null,null,0,null,null,false],[17,2,"Action_17",5,"98700","98700","98712","98712",null,0,3,0,new mw.Vector(-6,-2,-75),new mw.Vector(0,0,0),"101653","101652",null,null,0,null,null,false],[18,2,"Action_18",3,"98701","98701","98675","98675",null,0,3,0,new mw.Vector(-148,-2,-86),new mw.Vector(0,23,0),"101651","101650",null,null,0,null,null,false],[19,2,"Action_19",2,"34420","34420","86267","86267",null,0,1,0,new mw.Vector(30,0,0),new mw.Vector(0,0,180),null,null,"14703","14765",0,null,null,false],[20,2,"Action_20",2,"34435","34435","86271","86271",null,0,2,0,new mw.Vector(-20,0,-50),new mw.Vector(0,0,0),"35464","38174",null,null,0,null,new mw.Vector(0,0,50),false],[21,2,"Action_21",2,"98708","98708","98707","98707",null,0,2,0,new mw.Vector(-40,0,-35),new mw.Vector(0,0,0),"35463","38173",null,null,0,null,new mw.Vector(0,0,100),false],[22,1,"Action_22",2,"98674","98674","98681","98681","88448",0,0,0,null,null,null,null,null,null,1,null,null,true],[23,1,"Action_23",2,"98714","98714","98697","98697","88544",0,0,0,null,null,null,null,null,null,1,null,null,true],[24,1,"Action_24",2,"98673","98673","98711","98711","88450",0,0,0,null,null,null,null,null,null,1,null,null,true],[25,1,"Action_25",2,"98682","98682","98698","98698","88449",0,0,0,null,null,null,null,null,null,1,null,null,true],[26,1,"Action_26",2,"98672","98672","98684","98684","88541",0,0,0,null,null,null,null,null,null,1,null,null,true],[27,1,"Action_27",2,"98713","98713","98685","98685","88543",0,0,0,null,null,null,null,null,null,1,null,null,true],[28,1,"Action_28",2,"108519","108519","108523","108523","108414",0,0,0,null,null,null,null,null,null,1,null,null,true],[35,1,"Action_30",2,"168271","168271","168271","168271","14744",0,0,0,null,null,null,null,null,null,1,null,null,true],[36,1,"Action_31",3,"174703","174703","174703","174703","14695",0,0,0,null,null,null,null,null,null,1,null,null,true],[37,1,"Action_32",3,"120634","120634","120634","120634","14602",0,0,0,null,null,null,null,null,null,1,null,null,true],[38,1,"Action_33",4,"128699","128699","128699","128699","14699",0,0,0,null,null,null,null,null,null,1,null,null,true],[39,1,"Action_34",4,"146460","146460","146460","146460","14511",0,0,0,null,null,null,null,null,null,1,null,null,true],[40,2,"Action_35",5,"120677","120677","120677","120677",null,0,3,0,new mw.Vector(-20,-70,-65),new mw.Vector(0,0,0),null,null,"135368","135370",1,null,null,true],[41,2,"Action_36",5,"120678","120678","120678","120678",null,0,1,90,new mw.Vector(0,0,0),new mw.Vector(0,0,0),null,null,"148713","148714",1,null,null,true],[42,2,"Action_37",2,"174704","174704","174704","174704",null,0,1,-90,new mw.Vector(43,0,0),new mw.Vector(0,0,0),null,null,"148568","148569",1,null,null,true],[43,1,"Action_38",2,"174702","174702","174702","174702","148567",0,0,0,null,null,null,null,null,null,1,null,null,true],[45,1,"Action_40",3,"174703","174703","174703","174703","14732",0,0,0,null,null,null,null,null,null,1,null,null,true],[46,1,"Action_41",4,"120641","120641","120641","120641","14712",0,0,0,null,null,null,null,null,null,1,null,null,true],[47,1,"Action_42",4,"146463","146463","146463","146463","148565",0,0,0,null,null,null,null,null,null,1,null,null,true],[48,2,"Action_43",5,"146815","146815","146815","146815",null,0,1,-90,new mw.Vector(90,0,0),new mw.Vector(0,0,0),null,null,"123712","123726",1,null,null,true],[49,1,"Action_44",5,"174703","174703","174703","174703","14741",0,0,0,null,null,null,null,null,null,1,null,null,true],[50,1,"Action_45",2,"128719","128719","128719","128719","29725",0,0,0,null,null,null,null,null,null,1,null,null,true],[51,1,"Action_46",2,"128719","128719","128719","128719","126579",0,0,0,null,null,null,null,null,null,1,null,null,true],[52,1,"Action_47",3,"128719","128719","128719","128719","125813",0,0,0,null,null,null,null,null,null,1,null,null,true],[53,1,"Action_48",3,"128719","128719","128719","128719","126581",0,0,0,null,null,null,null,null,null,1,null,null,true],[54,1,"Action_49",4,"128719","128719","128719","128719","129504",0,0,0,null,null,null,null,null,null,1,null,null,true],[55,1,"Action_50",4,"128719","128719","128719","128719","126867",0,0,0,null,null,null,null,null,null,1,null,null,true],[56,1,"Action_51",5,"128719","128719","128719","128719","129503",0,0,0,null,null,null,null,null,null,1,null,null,true],[57,1,"Action_52",5,"128719","128719","128719","128719","135159",0,0,0,null,null,null,null,null,null,1,null,null,true],[58,2,"Action_53",5,"120677","120677","120677","120677",null,0,3,0,new mw.Vector(-22,-2,110),new mw.Vector(0,0,0),null,null,"151231","151230",1,null,null,true],[59,1,"Action_54",5,"174710","174710","174710","174710","122747",0,1,0,null,null,null,null,null,null,1,null,null,false,"泼水"],[60,1,"Action_55",1,"174710","174710","174710","174710","169109",0,0,0,null,null,null,null,null,null,2,null,null,false,"水球眩晕"],[61,1,"Action_56",5,"158418","158418","158418","158418","35421",0,1,0,null,null,null,null,null,null,1,null,null,true,"蛙泳"],[62,1,"Action_57",5,"181400","181400","181400","181400","33568",0,1,0,null,null,null,null,null,null,1,null,null,true,"自由泳"],[63,1,"Action_58",5,"158394","158394","158394","158394","178369",0,1,0,null,null,null,null,null,null,1,null,null,false,"水中挣扎"]];
export interface ISquareActionConfigElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**1.单人动作 2.双人动作 类型*/
	type:number
	/**名称*/
	name:string
	/**1.普通2.稀有3.史诗4.传说*/
	quality:number
	/**英文图标*/
	icon:string
	/**单人动作 动作id*/
	actionId:string
	/**0.动画 1.姿态 单人动作是否为姿态*/
	singleType:number
	/**1.普通 2.交互 3.强制动作 双人动作类型*/
	doubleType:number
	/**双人普通动作接受者相较于发起者前方向角度（正前方就是0，右边是90度...）*/
	angle:number
	/**普通动作相对于发起者正前方的距离，取配置Z坐标。 交互动作相对于发起者的脸部的偏移。 接收者位置偏移*/
	v:mw.Vector
	/**接收者旋转偏移*/
	r:mw.Vector
	/**发起者姿态*/
	sendStance:string
	/**接收者姿态*/
	accectStance:string
	/**发起者动画*/
	sendAni:string
	/**接受者动画*/
	accectAni:string
	/**动作播放时长*/
	time:number
	/**发起者视角偏移*/
	visual1:mw.Vector
	/**接受者视角偏移*/
	visual2:mw.Vector
	/**是否循环*/
	circulate:boolean
 } 
export class SquareActionConfigConfig extends ConfigBase<ISquareActionConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}