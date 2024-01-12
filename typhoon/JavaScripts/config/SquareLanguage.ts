import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_Ch","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[100001,"Danmu_Content_1001","Solo","单人","シングルプレイヤー","Ledig"],[100002,"Danmu_Content_1002","Pair","双人","ダブル","Doppelt"],[100003,"Danmu_Content_1003","Items","道具","小道具","Stütze"],[100019,"Danmu_Content_1019","embrace","拥抱","抱擁","Umarmung"],[100020,"Danmu_Content_1020","Princess hugs","公主抱","王女の抱擁","Prinzessin umarmt"],[100021,"Danmu_Content_1021","Back people","背人","バックマン","Zurück"],[100022,"Danmu_Content_1022","Lift","举起","持ち上げる","heben"],[100023,"Danmu_Content_1023","Shoulder to shoulder","肩扛","肩甲骨","Schulter an Schulter"],[100024,"Danmu_Content_1024","Anyone","托人","受託者","Irgendjemand"],[100049,"Danmu_Content_1049","Cancel","我再想想","もう一度考えてみよう","Ich werde noch einmal darüber nachdenken"],[100050,"Danmu_Content_1050","Already using","你已经在这里了","あなたはすでにここにいます","Sie sind schon hier"],[100051,"Danmu_Content_1051","This item is in use","对不起，这里已经有人了","申し訳ありませんが、すでにここに誰かがいる","Sorry, es sind schon Leute hier"],[100052,"Danmu_Content_1052","It's too far...","距离有点远......","少し遠く...","Es ist ein bisschen weit weg..."],[100053,"Danmu_Content_1053","Please leave current player first","请先离开当前玩家","まず、現在のプレイヤーを離れてください","Bitte verlassen Sie zuerst den aktuellen Spieler"],[100054,"Danmu_Content_1054","Leave","脱离","離脱","auskuppeln"],[100055,"Danmu_Content_1055","Playlist","音乐列表","音楽のリスト","Musikliste"],[100056,"Danmu_Content_1056","Lighting","灯光列表","ライトのリスト","Liste der Leuchten"],[100057,"Danmu_Content_1057","Leave","解除","持ち上げる","erleichtern"],[100058,"Danmu_Content_1058","BGM","音乐","音楽","Musikliste"],[100059,"Danmu_Content_1059","Lighting","灯光","ライト","Lampenlicht"],[100060,"Danmu_Content_1060","Unavailable now","当前正在双人动作，无法发起！","現在2人プレイ中で、開始できません!","Derzeit in Zwei-Personen-Aktion, kann nicht initiiert werden!"],[100061,"Danmu_Content_1061","Under Construction (Sorry!)","前方区域正在施工建设中！敬请期待！","前方エリアは建設中です! ご期待ください!","Das Gebiet vor uns ist im Bau! Bleiben Sie dran!"],[100062,"Danmu_Content_1062","Lighting On/Off","灯光开关","ライトスイッチ","Lichtschalter"],[100063,"Danmu_Content_1063","BGM On/Off","音响开关","サウンドスイッチ","Soundschalter"],[100064,"Danmu_Content_1064","Please remove current item!","请卸下当前道具！","現在の小道具を降ろしてください!","Bitte entfernen Sie den aktuellen Artikel!"],[100065,"Danmu_Content_1065","Please leave current location!","请脱离当前交互物！","現在のインタラクションから外してください!","Bitte lösen Sie sich von der aktuellen Interaktion!"],[100066,"Danmu_Content_1066","Twist to the beat!","跟着节奏扭起来！","リズムに合わせてひねりを合わせる!","Twist im Takt!"],[100067,"Danmu_Content_1067","Switch Dances","切换舞蹈","ダンスを切り替えます","Switch-Tänze"],[100068,"Danmu_Content_1068","Please stop current action!","请脱离当前动作！","現在の動きから脱却してください!","Bitte raus aus der aktuellen Aktion!"],[100069,"Danmu_Content_1069","The two sides are too far apart to interact!","双方距离过远，无法交互！","双方は、相互作用するには遠すぎる!","Die beiden Seiten sind zu weit voneinander entfernt, um miteinander zu interagieren!"],[100070,"Danmu_Content_1070","The player is currently in a two-player action!","当前玩家处于双人动作中！","現在のプレイヤーは2人プレイ中!","Der Spieler befindet sich derzeit in einer Zwei-Spieler-Aktion!"],[100071,"Danmu_Content_1071","Successfully launch a successful campaign against the surrounding players and wait for the other party to accept it","向周围玩家发起成功，等待对方接受","周囲のプレイヤーに成功を開始し、相手が受け入れるのを待ちます","Starten Sie erfolgreich eine erfolgreiche Kampagne gegen die umliegenden Spieler und warten Sie, bis die andere Partei sie akzeptiert"],[100072,"Danmu_Content_1072","There are no interactive players in the current range","当前范围内无可交互玩家","現在の範囲内の対話不可能なプレイヤー","Es gibt keine interaktiven Player im aktuellen Sortiment"],[100073,"Danmu_Content_1073","Accept","接受","受け入れる","annehmen"],[100074,"Danmu_Content_1074","Refuse","拒绝","拒否します","verweigern"],[100075,"Danmu_Content_1075","Initiated to you","向您发起了","あなたに開始しました","Initiiert für Sie"],[100076,"Danmu_Content_1076","Action request","动作请求","アクション要求","Aktionsanforderung"],[100077,"Danmu_Content_1077","Hi~","你好","Hi~","Hi~"],[100078,"Danmu_Content_1078","No","不","No","No"],[100079,"Danmu_Content_1079","How the weather like today","今天天气怎么样","今日の天気はどうですか","Wie das Wetter heute ist"],[100080,"Danmu_Content_1080","Hello","你好啊","こんにちは","Hallo"],[100081,"Danmu_Content_1081","follow","跟随","従ってください","folgen"],[100095,"Danmu_Content_1095","Hi~","你好~",null,null],[100096,"Danmu_Content_1096","LOL","哈哈哈",null,null],[100097,"Danmu_Content_1097","Let's play!","一起玩吧",null,null],[100098,"Danmu_Content_1098","Greetings!","很高兴认识你",null,null],[100099,"Danmu_Content_1099","I got to go!","好呀",null,null],[100100,"Danmu_Content_1100","See you later!","下次再见",null,null],[100184,"Danmu_Content_1184","Blacklist Words Detected","文本有违禁词，请重新输入",null,null],[310,"Text_Text_310","Close","关闭",null,null],[587,"Text_Text_587","Reset","还原服装",null,null],[588,"Text_Text_588","Profile","名片",null,null],[589,"Text_Text_589","Action","动作",null,null],[590,"Text_Text_590","Bag","背包",null,null],[591,"Text_Text_591","Schedule","课表",null,null],[592,"Text_Text_592","Back","卡住点我",null,null],[593,"Text_Text_593","Camera","相机",null,null],[947,"Action_01","Clap","鼓掌",null,null],[948,"Action_02","Bow","鞠躬",null,null],[949,"Action_03","Say Hello","打招呼",null,null],[950,"Action_04","Give a Like","点赞",null,null],[951,"Action_05","Blow a Kiss","飞吻",null,null],[952,"Action_06","Sulk","愠怒",null,null],[953,"Action_07","Heart Gesture","比心",null,null],[954,"Action_08","Shake Head","摇头",null,null],[955,"Action_09","Sad","难过",null,null],[956,"Action_10","Sit","盘腿坐",null,null],[957,"Action_11","Lie Down","躺下",null,null],[958,"Action_12","Somersault","翻跟头",null,null],[959,"Action_13","Seal","结印",null,null],[960,"Action_14","Lean Back","向后仰",null,null],[961,"Action_15","Shake the Waist","抖腰",null,null],[962,"Action_16","Lift Up","举高",null,null],[963,"Action_17","Shoulder Carry","抗肩",null,null],[964,"Action_18","Towing","拖行",null,null],[965,"Action_19","Hug","怀抱",null,null],[966,"Action_20","Bridal Carry","公主抱",null,null],[967,"Action_21","Piggyback","肩抱",null,null],[968,"Action_22","80s Moves","怀旧慢舞",null,null],[969,"Action_23","Enthusiasm","热情节拍",null,null],[970,"Action_24","Dance with Passion","激情热舞",null,null],[971,"Action_25","Tenderness","柔情似水",null,null],[972,"Action_26","Enchanting","爱如潮水",null,null],[973,"Action_27","Nobady","Nobady",null,null],[974,"Action_28","Boxing","拳戏",null,null],[985,"Text_Text_686","Name card","名片",null,null],[986,"Text_Text_687","Graphic quality","画质",null,null],[987,"Text_Text_688","Volume","音量",null,null],[990,"Text_Text_691","Reset","重置",null,null],[991,"Text_Text_692","Confirm","确认",null,null],[992,"Text_Text_693","Music","音乐",null,null],[993,"Text_Text_694","Sound effect","音效",null,null],[1444,"Action_29","Shake Head","摇头",null,null],[1445,"Action_30","Zany Face","扮鬼脸",null,null],[1446,"Action_31","Spin","转圈圈",null,null],[1447,"Action_32","Backflip","后空翻",null,null],[1448,"Action_33","Knee Dance","膝盖舞",null,null],[1449,"Action_34","Walk on Hands","倒立行走",null,null],[1450,"Action_35","Shoulder Throw","过肩摔",null,null],[1451,"Action_36","Rely On","依靠",null,null],[1452,"Action_37","Hold Hands","牵手",null,null],[1453,"Action_38","Kneel Down","跪拜",null,null],[1454,"Action_40","Superman Spin","超人旋转式飞行",null,null],[1455,"Action_41","Spin Split","旋转劈叉",null,null],[1456,"Action_42","Dab Gesture","Dab手势",null,null],[1457,"Action_43","Heart Embrace","双人比心",null,null],[1458,"Action_44","Spin","倒立陀螺转",null,null],[1459,"Action_45","Heart Dance","爱心舞",null,null],[1460,"Action_46","Street Dance","街舞",null,null],[1461,"Action_47","Seaweed Dance","海草舞",null,null],[1462,"Action_48","Swan Dance","天鹅舞",null,null],[1463,"Action_49","Heartbeat","怦然心动",null,null],[1464,"Action_50","Date Me","和我交往吧",null,null],[1465,"Action_51","Two Tigers","两只老虎爱跳舞",null,null],[1466,"Action_52","Love to Dance","爱杀宝贝",null,null],[1467,"Action_53","German Suplex","德式背摔",null,null],[1562,"Action_54","Splash","泼水",null,null],[1563,"Action_55","Water Gun","水枪喷射",null,null],[1564,"Action_56","Breaststroke","蛙泳",null,null],[1565,"Action_57","Freestyle","自由泳",null,null],[1566,"Action_58","Struggling","水中挣扎",null,null],[1526,"Set_1","Attributes","个人属性",null,null],[1527,"Set_2","Settings","设置",null,null],[1528,"Set_3","Graphics","画质",null,null],[1529,"Set_4","Edit Profile","修改名片",null,null],[1530,"Set_5","Next Rank:","下一品阶：",null,null],[1531,"Set_6","Successful Advancement","奖励预览",null,null],[1532,"Set_7","HP","生命值",null,null],[1533,"Set_8","Mana","法力值",null,null],[1534,"Set_9","Insufficient Breakthrough Power.","突破力不足",null,null],[1535,"Set_10","You need to be at max level with enough badges to advance to the next rank!","需要学分满级和足够数量的徽章才可以突破进阶哦！",null,null],[1536,"Set_11","Obtained from Magic Class or Self-Study Class","魔法课或自习课获得",null,null],[1537,"Set_12","Obtained by completing Magic Trials","参加魔法试炼通关获得",null,null],[1538,"Set_13","Go to Get","前往获取",null,null],[1539,"Set_14","Congratulations on becoming {0}","恭喜成为{0}",null,null],[1540,"Set_15","Reward Obtained:","获得奖励：",null,null],[1541,"Set_16","Unlock Function:","解锁功能：",null,null],[1613,"Typhoon_Ts_0","Your wood storage is full. Please return home to build a defensive wall.","当前木头已满，请回家建造防御围墙",null,null],[1614,"Typhoon_Ts_1","Get Planks","获得木板",null,null],[1615,"Typhoon_Ts_2","{0} used Dance Magic on you.","{0}对你使用了跳舞魔法",null,null],[1616,"Typhoon_Ts_3","{0} used Water Gun Magic on you.","{0}对你使用了水枪魔法",null,null],[1617,"Typhoon_Ts_4","Please revert from your transformation first.","请先解除变身状态",null,null],[1618,"Typhoon_Ts_5","You can't change outfits while in a transformed state.","变身状态下无法更换服装",null,null],[1619,"Typhoon_Ts_6","This item can only be obtained by participating in events.","该物品需要参与活动才能获得",null,null],[1620,"Typhoon_Ts_7","Not enough Mana.","蓝不够\"",null,null],[1621,"Typhoon_Ts_8","{0} has arrived!! Hold on!!","{0}已经降临！！坚持住！！",null,null],[1622,"Typhoon_Ts_9","You got blown away by {0}...","你被{0}吹飞了......",null,null],[1623,"Typhoon_Ts_10","The shelter has been destroyed by {0} floors.","庇护所被摧毁了{0}层",null,null],[1624,"Typhoon_Ts_11","You survived in {0}.","你们在{0}中幸存了",null,null],[1625,"Typhoon_Ts_12","You couldn't resist {0}, and your home was destroyed.","你没能抵御{0}，你的家园被摧毁了",null,null],[1626,"Typhoon_Ts_13","The next wave of the typhoon is coming in {0} seconds.","下一波台风还有{0}秒来临",null,null],[1627,"Typhoon_Ts_14","Take off Hat","摘下法帽",null,null],[1628,"Typhoon_Ts_15","Equip Hat","装备法帽",null,null],[1629,"Typhoon_Ts_16","There's no next level.","没有下一等级了",null,null],[1630,"Typhoon_Ts_17","{0} time left: {1} seconds.","距离{0}结束还有：{1}秒",null,null],[1631,"Typhoon_Ts_18","The typhoon is coming in {0}, quickly gather wood to build houses to withstand the typhoon.","台风还有{0}到来，快收集木头建造房屋抵御台风吧",null,null],[1632,"Typhoon_Ts_19","<color=#red>The typhoon is arriving in {0}, head to the Shelter quickly!</color>","<color=#red>台风还有{0}来临，快前往庇护所！</color>",null,null],[1633,"Typhoon_Ts_20","{0} floors have been destroyed, {1} floors remaining.","被摧毁了{0}层，当前还有{1}层",null,null],[1634,"Typhoon_Ts_21","{0} floors have been constructed so far.","当前已搭建{0}层",null,null],[1635,"Typhoon_Ts_22","{0} layers of Defense Walls have been successfully constructed.","已成功搭建{0}层防御围墙",null,null],[1827,"typhoon_text_1","Collect Wood","收集木头",null,null],[1828,"typhoon_text_2","Build defenses to withstand the typhoon.","建造防御抵御台风",null,null],[1829,"typhoon_text_3","Do you want to return to Magic Campus?","要回到梦幻魔法校园吗？",null,null],[1830,"typhoon_text_4","Typhoon Level 1","1级台风",null,null],[1831,"typhoon_text_5","Typhoon Level 2","2级台风",null,null],[1832,"typhoon_text_6","Typhoon Level 3","3级台风",null,null],[1833,"typhoon_text_7","Typhoon Level 4","4级台风",null,null],[1834,"typhoon_text_8","Typhoon Level 5","5级台风",null,null],[1835,"typhoon_text_9","Typhoon Level 6","6级台风",null,null],[1836,"typhoon_text_10","Typhoon Level 7","7级台风",null,null],[1837,"typhoon_text_11","Typhoon Level 8","8级台风",null,null],[1838,"typhoon_text_12","Typhoon Level 9","9级台风",null,null],[1839,"typhoon_text_13","Typhoon Level 10","10级台风",null,null],[1840,"typhoon_text_14","Doksuri","“杜苏芮”",null,null],[1841,"typhoon_text_15","Fly","飞行",null,null],[1842,"typhoon_text_16","Creation","造物",null,null],[1843,"typhoon_text_17","Combat","战斗",null,null],[1844,"typhoon_text_18","Equip","装备",null,null],[1845,"typhoon_text_19","Cancel","取消",null,null],[1312,"Study_30","I see.","我知道了",null,null]];
export interface ISquareLanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**undefined*/
	Name:string
	/**英文*/
	Value:string
 } 
export class SquareLanguageConfig extends ConfigBase<ISquareLanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**单人*/
	get Danmu_Content_1001():ISquareLanguageElement{return this.getElement(100001)};
	/**双人*/
	get Danmu_Content_1002():ISquareLanguageElement{return this.getElement(100002)};
	/**道具*/
	get Danmu_Content_1003():ISquareLanguageElement{return this.getElement(100003)};
	/**拥抱*/
	get Danmu_Content_1019():ISquareLanguageElement{return this.getElement(100019)};
	/**公主抱*/
	get Danmu_Content_1020():ISquareLanguageElement{return this.getElement(100020)};
	/**背人*/
	get Danmu_Content_1021():ISquareLanguageElement{return this.getElement(100021)};
	/**举起*/
	get Danmu_Content_1022():ISquareLanguageElement{return this.getElement(100022)};
	/**肩扛*/
	get Danmu_Content_1023():ISquareLanguageElement{return this.getElement(100023)};
	/**托人*/
	get Danmu_Content_1024():ISquareLanguageElement{return this.getElement(100024)};
	/**我再想想*/
	get Danmu_Content_1049():ISquareLanguageElement{return this.getElement(100049)};
	/**你已经在这里了*/
	get Danmu_Content_1050():ISquareLanguageElement{return this.getElement(100050)};
	/**对不起，这里已经有人了*/
	get Danmu_Content_1051():ISquareLanguageElement{return this.getElement(100051)};
	/**距离有点远......*/
	get Danmu_Content_1052():ISquareLanguageElement{return this.getElement(100052)};
	/**请先离开当前玩家*/
	get Danmu_Content_1053():ISquareLanguageElement{return this.getElement(100053)};
	/**脱离*/
	get Danmu_Content_1054():ISquareLanguageElement{return this.getElement(100054)};
	/**音乐列表*/
	get Danmu_Content_1055():ISquareLanguageElement{return this.getElement(100055)};
	/**灯光列表*/
	get Danmu_Content_1056():ISquareLanguageElement{return this.getElement(100056)};
	/**解除*/
	get Danmu_Content_1057():ISquareLanguageElement{return this.getElement(100057)};
	/**音乐*/
	get Danmu_Content_1058():ISquareLanguageElement{return this.getElement(100058)};
	/**灯光*/
	get Danmu_Content_1059():ISquareLanguageElement{return this.getElement(100059)};
	/**当前正在双人动作，无法发起！*/
	get Danmu_Content_1060():ISquareLanguageElement{return this.getElement(100060)};
	/**前方区域正在施工建设中！敬请期待！*/
	get Danmu_Content_1061():ISquareLanguageElement{return this.getElement(100061)};
	/**灯光开关*/
	get Danmu_Content_1062():ISquareLanguageElement{return this.getElement(100062)};
	/**音响开关*/
	get Danmu_Content_1063():ISquareLanguageElement{return this.getElement(100063)};
	/**请卸下当前道具！*/
	get Danmu_Content_1064():ISquareLanguageElement{return this.getElement(100064)};
	/**请脱离当前交互物！*/
	get Danmu_Content_1065():ISquareLanguageElement{return this.getElement(100065)};
	/**跟着节奏扭起来！*/
	get Danmu_Content_1066():ISquareLanguageElement{return this.getElement(100066)};
	/**切换舞蹈*/
	get Danmu_Content_1067():ISquareLanguageElement{return this.getElement(100067)};
	/**请脱离当前动作！*/
	get Danmu_Content_1068():ISquareLanguageElement{return this.getElement(100068)};
	/**双方距离过远，无法交互！*/
	get Danmu_Content_1069():ISquareLanguageElement{return this.getElement(100069)};
	/**当前玩家处于双人动作中！*/
	get Danmu_Content_1070():ISquareLanguageElement{return this.getElement(100070)};
	/**向周围玩家发起成功，等待对方接受*/
	get Danmu_Content_1071():ISquareLanguageElement{return this.getElement(100071)};
	/**当前范围内无可交互玩家*/
	get Danmu_Content_1072():ISquareLanguageElement{return this.getElement(100072)};
	/**接受*/
	get Danmu_Content_1073():ISquareLanguageElement{return this.getElement(100073)};
	/**拒绝*/
	get Danmu_Content_1074():ISquareLanguageElement{return this.getElement(100074)};
	/**向您发起了*/
	get Danmu_Content_1075():ISquareLanguageElement{return this.getElement(100075)};
	/**动作请求*/
	get Danmu_Content_1076():ISquareLanguageElement{return this.getElement(100076)};
	/**你好*/
	get Danmu_Content_1077():ISquareLanguageElement{return this.getElement(100077)};
	/**不*/
	get Danmu_Content_1078():ISquareLanguageElement{return this.getElement(100078)};
	/**今天天气怎么样*/
	get Danmu_Content_1079():ISquareLanguageElement{return this.getElement(100079)};
	/**你好啊*/
	get Danmu_Content_1080():ISquareLanguageElement{return this.getElement(100080)};
	/**跟随*/
	get Danmu_Content_1081():ISquareLanguageElement{return this.getElement(100081)};
	/**你好~*/
	get Danmu_Content_1095():ISquareLanguageElement{return this.getElement(100095)};
	/**哈哈哈*/
	get Danmu_Content_1096():ISquareLanguageElement{return this.getElement(100096)};
	/**一起玩吧*/
	get Danmu_Content_1097():ISquareLanguageElement{return this.getElement(100097)};
	/**很高兴认识你*/
	get Danmu_Content_1098():ISquareLanguageElement{return this.getElement(100098)};
	/**好呀*/
	get Danmu_Content_1099():ISquareLanguageElement{return this.getElement(100099)};
	/**下次再见*/
	get Danmu_Content_1100():ISquareLanguageElement{return this.getElement(100100)};
	/**文本有违禁词，请重新输入*/
	get Danmu_Content_1184():ISquareLanguageElement{return this.getElement(100184)};
	/**关闭*/
	get Text_Text_310():ISquareLanguageElement{return this.getElement(310)};
	/**还原服装*/
	get Text_Text_587():ISquareLanguageElement{return this.getElement(587)};
	/**名片*/
	get Text_Text_588():ISquareLanguageElement{return this.getElement(588)};
	/**动作*/
	get Text_Text_589():ISquareLanguageElement{return this.getElement(589)};
	/**背包*/
	get Text_Text_590():ISquareLanguageElement{return this.getElement(590)};
	/**课表*/
	get Text_Text_591():ISquareLanguageElement{return this.getElement(591)};
	/**卡住点我*/
	get Text_Text_592():ISquareLanguageElement{return this.getElement(592)};
	/**相机*/
	get Text_Text_593():ISquareLanguageElement{return this.getElement(593)};
	/**鼓掌*/
	get Action_01():ISquareLanguageElement{return this.getElement(947)};
	/**鞠躬*/
	get Action_02():ISquareLanguageElement{return this.getElement(948)};
	/**打招呼*/
	get Action_03():ISquareLanguageElement{return this.getElement(949)};
	/**点赞*/
	get Action_04():ISquareLanguageElement{return this.getElement(950)};
	/**飞吻*/
	get Action_05():ISquareLanguageElement{return this.getElement(951)};
	/**愠怒*/
	get Action_06():ISquareLanguageElement{return this.getElement(952)};
	/**比心*/
	get Action_07():ISquareLanguageElement{return this.getElement(953)};
	/**摇头*/
	get Action_08():ISquareLanguageElement{return this.getElement(954)};
	/**难过*/
	get Action_09():ISquareLanguageElement{return this.getElement(955)};
	/**盘腿坐*/
	get Action_10():ISquareLanguageElement{return this.getElement(956)};
	/**躺下*/
	get Action_11():ISquareLanguageElement{return this.getElement(957)};
	/**翻跟头*/
	get Action_12():ISquareLanguageElement{return this.getElement(958)};
	/**结印*/
	get Action_13():ISquareLanguageElement{return this.getElement(959)};
	/**向后仰*/
	get Action_14():ISquareLanguageElement{return this.getElement(960)};
	/**抖腰*/
	get Action_15():ISquareLanguageElement{return this.getElement(961)};
	/**举高*/
	get Action_16():ISquareLanguageElement{return this.getElement(962)};
	/**抗肩*/
	get Action_17():ISquareLanguageElement{return this.getElement(963)};
	/**拖行*/
	get Action_18():ISquareLanguageElement{return this.getElement(964)};
	/**怀抱*/
	get Action_19():ISquareLanguageElement{return this.getElement(965)};
	/**公主抱*/
	get Action_20():ISquareLanguageElement{return this.getElement(966)};
	/**肩抱*/
	get Action_21():ISquareLanguageElement{return this.getElement(967)};
	/**怀旧慢舞*/
	get Action_22():ISquareLanguageElement{return this.getElement(968)};
	/**热情节拍*/
	get Action_23():ISquareLanguageElement{return this.getElement(969)};
	/**激情热舞*/
	get Action_24():ISquareLanguageElement{return this.getElement(970)};
	/**柔情似水*/
	get Action_25():ISquareLanguageElement{return this.getElement(971)};
	/**爱如潮水*/
	get Action_26():ISquareLanguageElement{return this.getElement(972)};
	/**Nobady*/
	get Action_27():ISquareLanguageElement{return this.getElement(973)};
	/**拳戏*/
	get Action_28():ISquareLanguageElement{return this.getElement(974)};
	/**名片*/
	get Text_Text_686():ISquareLanguageElement{return this.getElement(985)};
	/**画质*/
	get Text_Text_687():ISquareLanguageElement{return this.getElement(986)};
	/**音量*/
	get Text_Text_688():ISquareLanguageElement{return this.getElement(987)};
	/**重置*/
	get Text_Text_691():ISquareLanguageElement{return this.getElement(990)};
	/**确认*/
	get Text_Text_692():ISquareLanguageElement{return this.getElement(991)};
	/**音乐*/
	get Text_Text_693():ISquareLanguageElement{return this.getElement(992)};
	/**音效*/
	get Text_Text_694():ISquareLanguageElement{return this.getElement(993)};
	/**摇头*/
	get Action_29():ISquareLanguageElement{return this.getElement(1444)};
	/**扮鬼脸*/
	get Action_30():ISquareLanguageElement{return this.getElement(1445)};
	/**转圈圈*/
	get Action_31():ISquareLanguageElement{return this.getElement(1446)};
	/**后空翻*/
	get Action_32():ISquareLanguageElement{return this.getElement(1447)};
	/**膝盖舞*/
	get Action_33():ISquareLanguageElement{return this.getElement(1448)};
	/**倒立行走*/
	get Action_34():ISquareLanguageElement{return this.getElement(1449)};
	/**过肩摔*/
	get Action_35():ISquareLanguageElement{return this.getElement(1450)};
	/**依靠*/
	get Action_36():ISquareLanguageElement{return this.getElement(1451)};
	/**牵手*/
	get Action_37():ISquareLanguageElement{return this.getElement(1452)};
	/**跪拜*/
	get Action_38():ISquareLanguageElement{return this.getElement(1453)};
	/**超人旋转式飞行*/
	get Action_40():ISquareLanguageElement{return this.getElement(1454)};
	/**旋转劈叉*/
	get Action_41():ISquareLanguageElement{return this.getElement(1455)};
	/**Dab手势*/
	get Action_42():ISquareLanguageElement{return this.getElement(1456)};
	/**双人比心*/
	get Action_43():ISquareLanguageElement{return this.getElement(1457)};
	/**倒立陀螺转*/
	get Action_44():ISquareLanguageElement{return this.getElement(1458)};
	/**爱心舞*/
	get Action_45():ISquareLanguageElement{return this.getElement(1459)};
	/**街舞*/
	get Action_46():ISquareLanguageElement{return this.getElement(1460)};
	/**海草舞*/
	get Action_47():ISquareLanguageElement{return this.getElement(1461)};
	/**天鹅舞*/
	get Action_48():ISquareLanguageElement{return this.getElement(1462)};
	/**怦然心动*/
	get Action_49():ISquareLanguageElement{return this.getElement(1463)};
	/**和我交往吧*/
	get Action_50():ISquareLanguageElement{return this.getElement(1464)};
	/**两只老虎爱跳舞*/
	get Action_51():ISquareLanguageElement{return this.getElement(1465)};
	/**爱杀宝贝*/
	get Action_52():ISquareLanguageElement{return this.getElement(1466)};
	/**德式背摔*/
	get Action_53():ISquareLanguageElement{return this.getElement(1467)};
	/**泼水*/
	get Action_54():ISquareLanguageElement{return this.getElement(1562)};
	/**水枪喷射*/
	get Action_55():ISquareLanguageElement{return this.getElement(1563)};
	/**蛙泳*/
	get Action_56():ISquareLanguageElement{return this.getElement(1564)};
	/**自由泳*/
	get Action_57():ISquareLanguageElement{return this.getElement(1565)};
	/**水中挣扎*/
	get Action_58():ISquareLanguageElement{return this.getElement(1566)};
	/**个人属性*/
	get Set_1():ISquareLanguageElement{return this.getElement(1526)};
	/**设置*/
	get Set_2():ISquareLanguageElement{return this.getElement(1527)};
	/**画质*/
	get Set_3():ISquareLanguageElement{return this.getElement(1528)};
	/**修改名片*/
	get Set_4():ISquareLanguageElement{return this.getElement(1529)};
	/**下一品阶：*/
	get Set_5():ISquareLanguageElement{return this.getElement(1530)};
	/**奖励预览*/
	get Set_6():ISquareLanguageElement{return this.getElement(1531)};
	/**生命值*/
	get Set_7():ISquareLanguageElement{return this.getElement(1532)};
	/**法力值*/
	get Set_8():ISquareLanguageElement{return this.getElement(1533)};
	/**突破力不足*/
	get Set_9():ISquareLanguageElement{return this.getElement(1534)};
	/**需要学分满级和足够数量的徽章才可以突破进阶哦！*/
	get Set_10():ISquareLanguageElement{return this.getElement(1535)};
	/**魔法课或自习课获得*/
	get Set_11():ISquareLanguageElement{return this.getElement(1536)};
	/**参加魔法试炼通关获得*/
	get Set_12():ISquareLanguageElement{return this.getElement(1537)};
	/**前往获取*/
	get Set_13():ISquareLanguageElement{return this.getElement(1538)};
	/**恭喜成为{0}*/
	get Set_14():ISquareLanguageElement{return this.getElement(1539)};
	/**获得奖励：*/
	get Set_15():ISquareLanguageElement{return this.getElement(1540)};
	/**解锁功能：*/
	get Set_16():ISquareLanguageElement{return this.getElement(1541)};
	/**当前木头已满，请回家建造防御围墙*/
	get Typhoon_Ts_0():ISquareLanguageElement{return this.getElement(1613)};
	/**获得木板*/
	get Typhoon_Ts_1():ISquareLanguageElement{return this.getElement(1614)};
	/**{0}对你使用了跳舞魔法*/
	get Typhoon_Ts_2():ISquareLanguageElement{return this.getElement(1615)};
	/**{0}对你使用了水枪魔法*/
	get Typhoon_Ts_3():ISquareLanguageElement{return this.getElement(1616)};
	/**请先解除变身状态*/
	get Typhoon_Ts_4():ISquareLanguageElement{return this.getElement(1617)};
	/**变身状态下无法更换服装*/
	get Typhoon_Ts_5():ISquareLanguageElement{return this.getElement(1618)};
	/**该物品需要参与活动才能获得*/
	get Typhoon_Ts_6():ISquareLanguageElement{return this.getElement(1619)};
	/**蓝不够"*/
	get Typhoon_Ts_7():ISquareLanguageElement{return this.getElement(1620)};
	/**{0}已经降临！！坚持住！！*/
	get Typhoon_Ts_8():ISquareLanguageElement{return this.getElement(1621)};
	/**你被{0}吹飞了......*/
	get Typhoon_Ts_9():ISquareLanguageElement{return this.getElement(1622)};
	/**庇护所被摧毁了{0}层*/
	get Typhoon_Ts_10():ISquareLanguageElement{return this.getElement(1623)};
	/**你们在{0}中幸存了*/
	get Typhoon_Ts_11():ISquareLanguageElement{return this.getElement(1624)};
	/**你没能抵御{0}，你的家园被摧毁了*/
	get Typhoon_Ts_12():ISquareLanguageElement{return this.getElement(1625)};
	/**下一波台风还有{0}秒来临*/
	get Typhoon_Ts_13():ISquareLanguageElement{return this.getElement(1626)};
	/**摘下法帽*/
	get Typhoon_Ts_14():ISquareLanguageElement{return this.getElement(1627)};
	/**装备法帽*/
	get Typhoon_Ts_15():ISquareLanguageElement{return this.getElement(1628)};
	/**没有下一等级了*/
	get Typhoon_Ts_16():ISquareLanguageElement{return this.getElement(1629)};
	/**距离{0}结束还有：{1}秒*/
	get Typhoon_Ts_17():ISquareLanguageElement{return this.getElement(1630)};
	/**台风还有{0}到来，快收集木头建造房屋抵御台风吧*/
	get Typhoon_Ts_18():ISquareLanguageElement{return this.getElement(1631)};
	/**<color=#red>台风还有{0}来临，快前往庇护所！</color>*/
	get Typhoon_Ts_19():ISquareLanguageElement{return this.getElement(1632)};
	/**被摧毁了{0}层，当前还有{1}层*/
	get Typhoon_Ts_20():ISquareLanguageElement{return this.getElement(1633)};
	/**当前已搭建{0}层*/
	get Typhoon_Ts_21():ISquareLanguageElement{return this.getElement(1634)};
	/**已成功搭建{0}层防御围墙*/
	get Typhoon_Ts_22():ISquareLanguageElement{return this.getElement(1635)};
	/**收集木头*/
	get typhoon_text_1():ISquareLanguageElement{return this.getElement(1827)};
	/**建造防御抵御台风*/
	get typhoon_text_2():ISquareLanguageElement{return this.getElement(1828)};
	/**要回到梦幻魔法校园吗？*/
	get typhoon_text_3():ISquareLanguageElement{return this.getElement(1829)};
	/**1级台风*/
	get typhoon_text_4():ISquareLanguageElement{return this.getElement(1830)};
	/**2级台风*/
	get typhoon_text_5():ISquareLanguageElement{return this.getElement(1831)};
	/**3级台风*/
	get typhoon_text_6():ISquareLanguageElement{return this.getElement(1832)};
	/**4级台风*/
	get typhoon_text_7():ISquareLanguageElement{return this.getElement(1833)};
	/**5级台风*/
	get typhoon_text_8():ISquareLanguageElement{return this.getElement(1834)};
	/**6级台风*/
	get typhoon_text_9():ISquareLanguageElement{return this.getElement(1835)};
	/**7级台风*/
	get typhoon_text_10():ISquareLanguageElement{return this.getElement(1836)};
	/**8级台风*/
	get typhoon_text_11():ISquareLanguageElement{return this.getElement(1837)};
	/**9级台风*/
	get typhoon_text_12():ISquareLanguageElement{return this.getElement(1838)};
	/**10级台风*/
	get typhoon_text_13():ISquareLanguageElement{return this.getElement(1839)};
	/**“杜苏芮”*/
	get typhoon_text_14():ISquareLanguageElement{return this.getElement(1840)};
	/**飞行*/
	get typhoon_text_15():ISquareLanguageElement{return this.getElement(1841)};
	/**造物*/
	get typhoon_text_16():ISquareLanguageElement{return this.getElement(1842)};
	/**战斗*/
	get typhoon_text_17():ISquareLanguageElement{return this.getElement(1843)};
	/**装备*/
	get typhoon_text_18():ISquareLanguageElement{return this.getElement(1844)};
	/**取消*/
	get typhoon_text_19():ISquareLanguageElement{return this.getElement(1845)};
	/**我知道了*/
	get Study_30():ISquareLanguageElement{return this.getElement(1312)};

}