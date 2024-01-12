import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","des","Name","times","stanceGuid","animationGuid","animationRate","stanceSlot","animationSlot","sound","priority"],["","","Language","","","","","","","",""],[1,"推车上半身",null,0,144189,0,1,1,0,0,10],[2,"单手看书上半身",null,0,144199,0,1,1,0,0,10],[3,"举起上半身",null,0,122440,0,1,1,0,0,10],[4,"翻书动画",null,0,0,98755,1,0,1,0,10],[5,"持枪跑动画",null,0,0,101342,1,0,1,0,10],[6,"举牌子动画",null,0,0,98742,1,0,1,0,10],[7,"坐下全身动画",null,0,0,170905,1,0,3,0,10],[8,"给上半身动画",null,0,0,35385,1,0,1,0,10],[9,"拿上半身动画",null,0,0,120392,1,0,1,0,10],[10,"敲键盘动画",null,0,0,98740,1,0,1,0,10],[11,"躺下动画",null,0,0,35427,1,0,3,0,10],[12,"手抓吃东西",null,0,0,14780,1,0,1,0,10],[13,"双手拿东西",null,0,0,35384,1,0,1,0,10],[14,"接电话",null,0,0,35387,1,0,1,0,10],[15,"拿书讲课",null,0,0,84518,1,0,1,0,10],[16,"送花",null,0,0,98754,1,0,1,0,10],[17,"坐下看书",null,0,0,29734,1,0,3,0,10],[18,"投篮",null,0,0,35436,1,0,1,0,10],[19,"单手投掷",null,0,0,146188,1,0,1,0,10],[20,"投降",null,0,0,135139,1,0,1,0,10],[21,"单手打蝶",null,0,0,123712,1,0,1,0,10],[22,"单手提物动画姿态",null,0,0,144198,1,0,1,0,10],[23,"持枪瞄准",null,0,0,4167,1,0,1,0,10],[24,"持枪双手",null,0,0,98607,1,0,1,0,10],[25,"狙击瞄准",null,0,0,99961,1,0,1,169140,10],[26,"单手持枪",null,0,0,98611,1,0,1,0,10],[27,"托拿",null,0,0,99143,1,0,1,0,10],[28,"打针",null,0,0,157329,1,0,1,0,10],[29,"胸前拿",null,0,0,35432,1,0,1,0,10],[30,"双手递",null,1,0,124527,1,0,1,0,10],[31,"喝水动画",null,0,0,8356,1,0,1,0,10],[32,"双手托举",null,0,0,20257,1,0,1,0,10],[33,"投篮姿态",null,0,145932,0,1,1,0,0,10],[34,"斜拿动画",null,0,0,35386,1,0,1,0,10],[35,"递给动画",null,0,0,35410,1,0,1,0,10],[36,"浇水向下动画",null,0,0,35406,1,0,1,0,10],[37,"手枪射击",null,0,0,80589,1,0,1,0,10],[38,"手枪换弹",null,0,0,14018,1,0,1,0,10],[39,"挥舞棋子",null,0,0,98610,1,0,1,0,10],[40,"打扫",null,0,0,86092,1,0,1,0,10],[41,"梳头",null,0,0,29746,1,0,1,0,10],[42,"帮别人梳头",null,0,0,35391,1,0,1,0,10],[43,"胜利举杯",null,0,0,123713,1,0,1,0,10],[44,"吃汉堡",null,0,0,8357,1,0,1,0,10],[45,"劈柴",null,0,0,20270,1,0,1,0,10],[46,"斜劈",null,0,0,20243,1,0,1,0,10],[47,"背手",null,0,0,14583,1,0,1,0,10],[48,"吉他待机",null,0,0,35415,1,0,1,0,10],[49,"吉他1‘’",null,0,0,35412,1,0,1,169121,10],[50,"举哑铃",null,0,0,145172,1,0,1,0,10],[51,"魔杖施法",null,0,0,85024,1,0,3,0,10],[52,"魔杖跳舞",null,0,0,122809,1,0,3,0,10],[53,"魔杖芭蕾",null,0,0,29733,1,0,3,0,10],[54,"举着火把",null,0,0,98606,1,0,1,0,10],[55,"右横劈",null,0,0,20243,1,0,3,0,10],[56,"左横劈",null,0,0,20249,1,0,3,0,10],[57,"战斗精灵",null,0,0,29718,1,0,3,0,10],[58,"荡秋千",null,0,0,122449,1,0,1,0,10],[59,"拖行李箱姿态",null,0,144191,0,1,1,0,0,10],[60,"双手托拿",null,0,0,35434,1,0,1,0,10],[61,"扫把",null,0,0,98741,1,0,1,0,10],[62,"待机",null,1,0,33579,1,0,1,0,10],[63,"抱小孩",null,0,0,35442,1,0,1,0,10],[64,"骑鲸鱼",null,0,0,169638,1,0,3,0,10],[65,"举牌子动画",null,0,0,174562,1,0,1,0,10],[66,"冲锋枪射击",null,0,0,99647,1,0,1,0,10],[67,"亲亲","Text_Action_Name_1",0,0,14771,1,0,3,0,20],[68,"指指点点","Text_Action_Name_2",0,0,14528,1,0,3,0,20],[69,"赞同","Text_Action_Name_3",0,0,14759,1,0,3,0,20],[70,"摇头","Text_Action_Name_4",0,0,14504,1,0,3,0,20],[71,"大笑","Text_Action_Name_5",0,0,14673,1,0,3,0,20],[72,"哭","Text_Action_Name_6",0,0,14633,1,0,3,0,20],[73,"拍照","Text_Action_Name_7",0,0,14761,1,0,3,0,20],[74,"拍照2","Text_Action_Name_8",0,0,15189,1,0,3,0,20],[75,"鼓掌","Text_Action_Name_9",0,0,29758,1,0,3,0,20],[76,"打哈欠","Text_Action_Name_10",0,0,157421,1,0,3,0,20],[77,"欢呼","Text_Action_Name_11",0,0,148733,1,0,3,0,20],[78,"敬礼","Text_Action_Name_12",0,0,14748,1,0,3,0,20],[79,"困惑","Text_Action_Name_13",0,0,15061,1,0,3,0,20],[80,"惊喜","Text_Action_Name_14",0,0,15071,1,0,3,0,20],[81,"举手","Text_Action_Name_15",0,0,135139,1,0,3,0,20],[82,"逮捕","Text_Action_Name_16",0,0,14534,1,0,3,0,20],[83,"受伤","Text_Action_Name_17",0,0,52999,1,0,3,0,20],[84,"坐下","Text_Action_Name_18",0,0,14565,1,0,3,0,20],[85,"坐下2","Text_Action_Name_19",0,0,14587,1,0,3,0,20],[86,"躺","Text_Action_Name_20",0,0,15155,1,0,3,0,20],[87,"潜行","Text_Action_Name_21",0,0,52975,1,0,3,0,20],[88,"跳跃","Text_Action_Name_22",0,0,123720,1,0,3,0,20],[89,"后空翻","Text_Action_Name_23",0,0,14602,1,0,3,0,20],[90,"开心","Text_Action_Name_24",0,0,123633,1,0,3,0,20],[91,"痛苦","Text_Action_Name_25",0,0,120393,1,0,3,0,20],[92,"爬行","Text_Action_Name_26",0,0,14558,1,0,3,0,20],[93,"健身操","Text_Action_Name_27",0,0,121811,1,0,3,0,20],[94,"咆哮","Text_Action_Name_28",0,0,14553,1,0,3,0,20],[95,"无聊","Text_Action_Name_29",0,0,86094,1,0,3,0,20],[96,"悲伤","Text_Action_Name_30",0,0,14649,1,0,3,0,20],[97,"平衡","Text_Action_Name_31",0,0,135159,1,0,3,0,20],[98,"舞蹈1","Text_Action_Name_32",0,0,126867,1,0,3,0,20],[99,"舞蹈2","Text_Action_Name_33",0,0,137324,1,0,3,0,20],[100,"舞蹈3","Text_Action_Name_34",0,0,137325,1,0,3,0,20],[101,"舞蹈4","Text_Action_Name_35",0,0,129504,1,0,3,0,20],[102,"舞蹈5","Text_Action_Name_36",0,0,129503,1,0,3,0,20],[103,"仰面朝天","Text_Action_Name_37",0,0,14595,1,0,3,0,20],[104,"趴下","Text_Action_Name_38",0,0,14757,1,0,3,0,20],[105,"狗张望","Text_Action_Name_39",0,0,150776,1,0,3,0,20],[106,"狗站立","Text_Action_Name_40",0,0,150778,1,0,3,0,20],[107,"小狗待机","Text_Action_Name_41",0,0,170891,1,0,3,0,20],[108,"猫站立","Text_Action_Name_42",0,0,150777,1,0,3,0,20],[109,"猫抻懒腰","Text_Action_Name_43",0,0,150780,1,0,3,0,20],[110,"猫舔爪","Text_Action_Name_44",0,0,150784,1,0,3,0,20],[111,"猫攻击","Text_Action_Name_45",0,0,150785,1,0,3,0,20],[112,"猫挠痒","Text_Action_Name_46",0,0,150786,1,0,3,0,20],[113,"猫张望","Text_Action_Name_47",0,0,150788,1,0,3,0,20],[114,"猫点头","Text_Action_Name_48",0,0,159866,1,0,3,0,20],[115,"猫连跳","Text_Action_Name_49",0,0,159865,1,0,3,0,20],[116,"猫蹭地板","Text_Action_Name_50",0,0,159868,1,0,3,0,20],[117,"猫睡觉","Text_Action_Name_51",0,0,159869,1,0,3,0,20],[118,"猫打滚","Text_Action_Name_52",0,0,159956,1,0,3,0,20],[119,"猫痒痒","Text_Action_Name_53",0,0,159995,1,0,3,0,20],[120,"猫坐","Text_Action_Name_54",0,0,160133,1,0,3,0,20],[121,"猫坐2","Text_Action_Name_55",0,0,160528,1,0,3,0,20],[122,"猫犯困1","Text_Action_Name_56",0,0,160135,1,0,3,0,20],[123,"猫犯困2","Text_Action_Name_57",0,0,160134,1,0,3,0,20],[124,"男兽奔跑",null,0,0,150774,1,0,3,0,40],[125,"男兽疾跑",null,0,0,150774,1,0,3,0,40],[126,"男兽待机",null,0,0,150778,1,0,3,0,0],[127,"男兽行走",null,0,0,150775,1,0,3,0,40],[128,"男兽跳跃",null,1,0,150781,1,0,3,0,40],[129,"女兽奔跑",null,0,0,150782,1,0,3,0,40],[130,"女兽疾跑",null,0,0,150782,1,0,3,0,40],[131,"女兽待机",null,0,0,150777,1,0,3,0,0],[132,"女兽行走",null,0,0,150783,1,0,3,0,40],[133,"女兽跳跃",null,1,0,150787,1,0,3,0,40],[200,"滑板",null,0,151060,0,1,3,0,0,30],[201,"自行车停止",null,0,174560,0,1,1,0,0,30],[202,"自行车走",null,0,174560,174563,1,1,2,0,30],[203,"乘骑",null,0,175596,0,1,3,0,0,30],[204,"汽车司机",null,0,14015,0,1,3,0,0,30],[205,"汽车乘客",null,0,122230,0,1,3,0,0,30],[206,"开摩托",null,0,0,35414,1,0,3,0,30],[207,"放松姿态",null,0,122233,0,1,3,0,0,30],[208,"小孩坐",null,0,122444,0,1,2,0,0,30],[300,"小弟攻击姿态",null,0,0,117391,1,0,3,0,20],[301,"小弟挥拳1",null,1,0,117400,1.5,0,3,0,30],[302,"小弟挥拳2",null,1,0,117395,1.5,0,3,0,30],[303,"小弟挥拳3",null,1,0,108373,1.5,0,3,0,30],[304,"受伤",null,1,0,47775,1,0,3,0,30],[305,"组长攻击姿态",null,1,0,29716,1,0,3,0,30],[306,"组长挥刀1",null,1,0,29744,1.5,0,3,0,30],[307,"组长挥刀2",null,1,0,29723,1.5,0,3,0,30],[308,"组长挥刀3",null,1,0,29744,1.5,0,3,0,30],[309,"boss死亡",null,1,0,52998,1,0,3,0,30],[310,"boss受伤",null,1,0,14507,1,0,3,0,30],[311,"玩家攻击1",null,1,0,20266,1.5,0,3,0,30],[312,"玩家攻击2",null,1,0,20278,1.5,0,3,0,30],[313,"玩家攻击3",null,1,0,20267,1.5,0,3,0,30],[314,"左边上车",null,1,0,145870,1,0,3,0,30],[315,"右边上车",null,1,0,145871,1,0,3,0,30],[316,"左边关车",null,1,0,145873,1,0,3,0,30],[317,"左边关车",null,1,0,145875,1,0,3,0,30],[318,"下车关车门",null,1,0,135372,1,0,3,0,30]];
export interface IActionElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**备注(红色为动作面板动作，无色为道具表动作，橙色为行走动画，右方黄色为以前道具表propAction特有)*/
	des:string
	/**名字*/
	Name:string
	/**播放次数
0：循环播放*/
	times:number
	/**姿态*/
	stanceGuid:number
	/**动画*/
	animationGuid:number
	/**动画播放速率*/
	animationRate:number
	/**1.上半身2下半身3全身*/
	stanceSlot:number
	/**1.上半身2下半身3全身*/
	animationSlot:number
	/**音效*/
	sound:number
	/**优先级*/
	priority:number
 } 
export class ActionConfig extends ConfigBase<IActionElement>{
	constructor(){
		super(EXCELDATA);
	}

}