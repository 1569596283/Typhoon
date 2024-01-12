'use strict';

//配置的基类
class ConfigBase {
    constructor(excelData) {
        this.ELEMENTARR = [];
        this.ELEMENTMAP = new Map();
        this.KEYMAP = new Map();
        let headerLine = 2; //表头的行数
        this.ELEMENTARR = new Array(excelData.length - headerLine);
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            this.ELEMENTARR[i] = {};
        }
        let column = excelData[0].length; //列数
        for (let j = 0; j < column; j++) { //遍历各列
            let name = excelData[0][j];
            let tags = excelData[1][j].split('|');
            if (tags.includes(ConfigBase.TAG_CHILDLANGUAGE))
                continue;
            let jOffect = 0; //列偏移量
            if (tags.includes(ConfigBase.TAG_MAINLANGUAGE)) {
                let index = j + ConfigBase.languageIndex;
                let targetTags = excelData[1][index].split('|');
                if (index < column && targetTags.includes(ConfigBase.TAG_CHILDLANGUAGE)) {
                    jOffect = ConfigBase.languageIndex;
                }
            }
            let hasTag_Key = tags.includes(ConfigBase.TAG_KEY);
            let hasTag_Language = tags.includes(ConfigBase.TAG_LANGUAGE);
            for (let i = 0; i < this.ELEMENTARR.length; i++) {
                let ele = this.ELEMENTARR[i];
                let value = excelData[i + headerLine][j + jOffect];
                if (j == 0) { //ID
                    this.ELEMENTMAP.set(value, ele);
                }
                else {
                    if (hasTag_Key) {
                        this.KEYMAP.set(value, excelData[i + headerLine][0]);
                    }
                    if (hasTag_Language) {
                        if (ConfigBase.getLanguage != null) {
                            value = ConfigBase.getLanguage(value);
                        }
                        else {
                            value = "unknow";
                        }
                    }
                }
                ele[name] = value;
            }
        }
    }
    //设置获取语言的方法
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.languageIndex = languageIndex;
        ConfigBase.getLanguage = getLanguageFun;
        if (ConfigBase.languageIndex < 0) {
            ConfigBase.languageIndex = ConfigBase.getSystemLanguageIndex();
        }
    }
    //获取系统语言索引
    static getSystemLanguageIndex() {
        let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }
    /**
    * 根据id获取一个元素
    * @param id id|key
    * @returns Element
    */
    getElement(id) {
        let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
        if (ele == null) {
            console.warn(this.constructor.name + "配置表中找不到元素 id:" + id);
        }
        return ele;
    }
    /**
    * 根据字段名和字段值查找一个元素
    * @param fieldName 字段名
    * @param fieldValue 字段值
    * @returns 第一个找到的Element
    */
    findElement(fieldName, fieldValue) {
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                return this.ELEMENTARR[i];
            }
        }
    }
    /**
    * 根据字段名和字段值查找一组元素
    * @param fieldName 字段名
    * @param fieldValue 字段值
    * @returns 所有符合要求的Element
    */
    findElements(fieldName, fieldValue) {
        let arr = [];
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                arr.push(this.ELEMENTARR[i]);
            }
        }
        return arr;
    }
    /**获取所有元素*/
    getAllElement() {
        return this.ELEMENTARR;
    }
}
ConfigBase.TAG_KEY = 'Key'; //读取键(除了ID之外的别名，带key的字段必须是string类型)
ConfigBase.TAG_LANGUAGE = 'Language'; //关联语言表的id或key(如果有这个tag，导表工具要把数据生成为string类型，因为会自动进行值的转换)
ConfigBase.TAG_MAINLANGUAGE = 'MainLanguage'; //主语言tag
ConfigBase.TAG_CHILDLANGUAGE = 'ChildLanguage'; //子语言tag
ConfigBase.languageIndex = 0;

const EXCELDATA$a = [["ID", "des", "Name", "times", "stanceGuid", "animationGuid", "animationRate", "stanceSlot", "animationSlot", "sound", "priority"], ["", "", "Language", "", "", "", "", "", "", "", ""], [1, "推车上半身", null, 0, 144189, 0, 1, 1, 0, 0, 10], [2, "单手看书上半身", null, 0, 144199, 0, 1, 1, 0, 0, 10], [3, "举起上半身", null, 0, 122440, 0, 1, 1, 0, 0, 10], [4, "翻书动画", null, 0, 0, 98755, 1, 0, 1, 0, 10], [5, "持枪跑动画", null, 0, 0, 101342, 1, 0, 1, 0, 10], [6, "举牌子动画", null, 0, 0, 98742, 1, 0, 1, 0, 10], [7, "坐下全身动画", null, 0, 0, 170905, 1, 0, 3, 0, 10], [8, "给上半身动画", null, 0, 0, 35385, 1, 0, 1, 0, 10], [9, "拿上半身动画", null, 0, 0, 120392, 1, 0, 1, 0, 10], [10, "敲键盘动画", null, 0, 0, 98740, 1, 0, 1, 0, 10], [11, "躺下动画", null, 0, 0, 35427, 1, 0, 3, 0, 10], [12, "手抓吃东西", null, 0, 0, 14780, 1, 0, 1, 0, 10], [13, "双手拿东西", null, 0, 0, 35384, 1, 0, 1, 0, 10], [14, "接电话", null, 0, 0, 35387, 1, 0, 1, 0, 10], [15, "拿书讲课", null, 0, 0, 84518, 1, 0, 1, 0, 10], [16, "送花", null, 0, 0, 98754, 1, 0, 1, 0, 10], [17, "坐下看书", null, 0, 0, 29734, 1, 0, 3, 0, 10], [18, "投篮", null, 0, 0, 35436, 1, 0, 1, 0, 10], [19, "单手投掷", null, 0, 0, 146188, 1, 0, 1, 0, 10], [20, "投降", null, 0, 0, 135139, 1, 0, 1, 0, 10], [21, "单手打蝶", null, 0, 0, 123712, 1, 0, 1, 0, 10], [22, "单手提物动画姿态", null, 0, 0, 144198, 1, 0, 1, 0, 10], [23, "持枪瞄准", null, 0, 0, 4167, 1, 0, 1, 0, 10], [24, "持枪双手", null, 0, 0, 98607, 1, 0, 1, 0, 10], [25, "狙击瞄准", null, 0, 0, 99961, 1, 0, 1, 169140, 10], [26, "单手持枪", null, 0, 0, 98611, 1, 0, 1, 0, 10], [27, "托拿", null, 0, 0, 99143, 1, 0, 1, 0, 10], [28, "打针", null, 0, 0, 157329, 1, 0, 1, 0, 10], [29, "胸前拿", null, 0, 0, 35432, 1, 0, 1, 0, 10], [30, "双手递", null, 1, 0, 124527, 1, 0, 1, 0, 10], [31, "喝水动画", null, 0, 0, 8356, 1, 0, 1, 0, 10], [32, "双手托举", null, 0, 0, 20257, 1, 0, 1, 0, 10], [33, "投篮姿态", null, 0, 145932, 0, 1, 1, 0, 0, 10], [34, "斜拿动画", null, 0, 0, 35386, 1, 0, 1, 0, 10], [35, "递给动画", null, 0, 0, 35410, 1, 0, 1, 0, 10], [36, "浇水向下动画", null, 0, 0, 35406, 1, 0, 1, 0, 10], [37, "手枪射击", null, 0, 0, 80589, 1, 0, 1, 0, 10], [38, "手枪换弹", null, 0, 0, 14018, 1, 0, 1, 0, 10], [39, "挥舞棋子", null, 0, 0, 98610, 1, 0, 1, 0, 10], [40, "打扫", null, 0, 0, 86092, 1, 0, 1, 0, 10], [41, "梳头", null, 0, 0, 29746, 1, 0, 1, 0, 10], [42, "帮别人梳头", null, 0, 0, 35391, 1, 0, 1, 0, 10], [43, "胜利举杯", null, 0, 0, 123713, 1, 0, 1, 0, 10], [44, "吃汉堡", null, 0, 0, 8357, 1, 0, 1, 0, 10], [45, "劈柴", null, 0, 0, 20270, 1, 0, 1, 0, 10], [46, "斜劈", null, 0, 0, 20243, 1, 0, 1, 0, 10], [47, "背手", null, 0, 0, 14583, 1, 0, 1, 0, 10], [48, "吉他待机", null, 0, 0, 35415, 1, 0, 1, 0, 10], [49, "吉他1‘’", null, 0, 0, 35412, 1, 0, 1, 169121, 10], [50, "举哑铃", null, 0, 0, 145172, 1, 0, 1, 0, 10], [51, "魔杖施法", null, 0, 0, 85024, 1, 0, 3, 0, 10], [52, "魔杖跳舞", null, 0, 0, 122809, 1, 0, 3, 0, 10], [53, "魔杖芭蕾", null, 0, 0, 29733, 1, 0, 3, 0, 10], [54, "举着火把", null, 0, 0, 98606, 1, 0, 1, 0, 10], [55, "右横劈", null, 0, 0, 20243, 1, 0, 3, 0, 10], [56, "左横劈", null, 0, 0, 20249, 1, 0, 3, 0, 10], [57, "战斗精灵", null, 0, 0, 29718, 1, 0, 3, 0, 10], [58, "荡秋千", null, 0, 0, 122449, 1, 0, 1, 0, 10], [59, "拖行李箱姿态", null, 0, 144191, 0, 1, 1, 0, 0, 10], [60, "双手托拿", null, 0, 0, 35434, 1, 0, 1, 0, 10], [61, "扫把", null, 0, 0, 98741, 1, 0, 1, 0, 10], [62, "待机", null, 1, 0, 33579, 1, 0, 1, 0, 10], [63, "抱小孩", null, 0, 0, 35442, 1, 0, 1, 0, 10], [64, "骑鲸鱼", null, 0, 0, 169638, 1, 0, 3, 0, 10], [65, "举牌子动画", null, 0, 0, 174562, 1, 0, 1, 0, 10], [66, "冲锋枪射击", null, 0, 0, 99647, 1, 0, 1, 0, 10], [67, "亲亲", "Text_Action_Name_1", 0, 0, 14771, 1, 0, 3, 0, 20], [68, "指指点点", "Text_Action_Name_2", 0, 0, 14528, 1, 0, 3, 0, 20], [69, "赞同", "Text_Action_Name_3", 0, 0, 14759, 1, 0, 3, 0, 20], [70, "摇头", "Text_Action_Name_4", 0, 0, 14504, 1, 0, 3, 0, 20], [71, "大笑", "Text_Action_Name_5", 0, 0, 14673, 1, 0, 3, 0, 20], [72, "哭", "Text_Action_Name_6", 0, 0, 14633, 1, 0, 3, 0, 20], [73, "拍照", "Text_Action_Name_7", 0, 0, 14761, 1, 0, 3, 0, 20], [74, "拍照2", "Text_Action_Name_8", 0, 0, 15189, 1, 0, 3, 0, 20], [75, "鼓掌", "Text_Action_Name_9", 0, 0, 29758, 1, 0, 3, 0, 20], [76, "打哈欠", "Text_Action_Name_10", 0, 0, 157421, 1, 0, 3, 0, 20], [77, "欢呼", "Text_Action_Name_11", 0, 0, 148733, 1, 0, 3, 0, 20], [78, "敬礼", "Text_Action_Name_12", 0, 0, 14748, 1, 0, 3, 0, 20], [79, "困惑", "Text_Action_Name_13", 0, 0, 15061, 1, 0, 3, 0, 20], [80, "惊喜", "Text_Action_Name_14", 0, 0, 15071, 1, 0, 3, 0, 20], [81, "举手", "Text_Action_Name_15", 0, 0, 135139, 1, 0, 3, 0, 20], [82, "逮捕", "Text_Action_Name_16", 0, 0, 14534, 1, 0, 3, 0, 20], [83, "受伤", "Text_Action_Name_17", 0, 0, 52999, 1, 0, 3, 0, 20], [84, "坐下", "Text_Action_Name_18", 0, 0, 14565, 1, 0, 3, 0, 20], [85, "坐下2", "Text_Action_Name_19", 0, 0, 14587, 1, 0, 3, 0, 20], [86, "躺", "Text_Action_Name_20", 0, 0, 15155, 1, 0, 3, 0, 20], [87, "潜行", "Text_Action_Name_21", 0, 0, 52975, 1, 0, 3, 0, 20], [88, "跳跃", "Text_Action_Name_22", 0, 0, 123720, 1, 0, 3, 0, 20], [89, "后空翻", "Text_Action_Name_23", 0, 0, 14602, 1, 0, 3, 0, 20], [90, "开心", "Text_Action_Name_24", 0, 0, 123633, 1, 0, 3, 0, 20], [91, "痛苦", "Text_Action_Name_25", 0, 0, 120393, 1, 0, 3, 0, 20], [92, "爬行", "Text_Action_Name_26", 0, 0, 14558, 1, 0, 3, 0, 20], [93, "健身操", "Text_Action_Name_27", 0, 0, 121811, 1, 0, 3, 0, 20], [94, "咆哮", "Text_Action_Name_28", 0, 0, 14553, 1, 0, 3, 0, 20], [95, "无聊", "Text_Action_Name_29", 0, 0, 86094, 1, 0, 3, 0, 20], [96, "悲伤", "Text_Action_Name_30", 0, 0, 14649, 1, 0, 3, 0, 20], [97, "平衡", "Text_Action_Name_31", 0, 0, 135159, 1, 0, 3, 0, 20], [98, "舞蹈1", "Text_Action_Name_32", 0, 0, 126867, 1, 0, 3, 0, 20], [99, "舞蹈2", "Text_Action_Name_33", 0, 0, 137324, 1, 0, 3, 0, 20], [100, "舞蹈3", "Text_Action_Name_34", 0, 0, 137325, 1, 0, 3, 0, 20], [101, "舞蹈4", "Text_Action_Name_35", 0, 0, 129504, 1, 0, 3, 0, 20], [102, "舞蹈5", "Text_Action_Name_36", 0, 0, 129503, 1, 0, 3, 0, 20], [103, "仰面朝天", "Text_Action_Name_37", 0, 0, 14595, 1, 0, 3, 0, 20], [104, "趴下", "Text_Action_Name_38", 0, 0, 14757, 1, 0, 3, 0, 20], [105, "狗张望", "Text_Action_Name_39", 0, 0, 150776, 1, 0, 3, 0, 20], [106, "狗站立", "Text_Action_Name_40", 0, 0, 150778, 1, 0, 3, 0, 20], [107, "小狗待机", "Text_Action_Name_41", 0, 0, 170891, 1, 0, 3, 0, 20], [108, "猫站立", "Text_Action_Name_42", 0, 0, 150777, 1, 0, 3, 0, 20], [109, "猫抻懒腰", "Text_Action_Name_43", 0, 0, 150780, 1, 0, 3, 0, 20], [110, "猫舔爪", "Text_Action_Name_44", 0, 0, 150784, 1, 0, 3, 0, 20], [111, "猫攻击", "Text_Action_Name_45", 0, 0, 150785, 1, 0, 3, 0, 20], [112, "猫挠痒", "Text_Action_Name_46", 0, 0, 150786, 1, 0, 3, 0, 20], [113, "猫张望", "Text_Action_Name_47", 0, 0, 150788, 1, 0, 3, 0, 20], [114, "猫点头", "Text_Action_Name_48", 0, 0, 159866, 1, 0, 3, 0, 20], [115, "猫连跳", "Text_Action_Name_49", 0, 0, 159865, 1, 0, 3, 0, 20], [116, "猫蹭地板", "Text_Action_Name_50", 0, 0, 159868, 1, 0, 3, 0, 20], [117, "猫睡觉", "Text_Action_Name_51", 0, 0, 159869, 1, 0, 3, 0, 20], [118, "猫打滚", "Text_Action_Name_52", 0, 0, 159956, 1, 0, 3, 0, 20], [119, "猫痒痒", "Text_Action_Name_53", 0, 0, 159995, 1, 0, 3, 0, 20], [120, "猫坐", "Text_Action_Name_54", 0, 0, 160133, 1, 0, 3, 0, 20], [121, "猫坐2", "Text_Action_Name_55", 0, 0, 160528, 1, 0, 3, 0, 20], [122, "猫犯困1", "Text_Action_Name_56", 0, 0, 160135, 1, 0, 3, 0, 20], [123, "猫犯困2", "Text_Action_Name_57", 0, 0, 160134, 1, 0, 3, 0, 20], [124, "男兽奔跑", null, 0, 0, 150774, 1, 0, 3, 0, 40], [125, "男兽疾跑", null, 0, 0, 150774, 1, 0, 3, 0, 40], [126, "男兽待机", null, 0, 0, 150778, 1, 0, 3, 0, 0], [127, "男兽行走", null, 0, 0, 150775, 1, 0, 3, 0, 40], [128, "男兽跳跃", null, 1, 0, 150781, 1, 0, 3, 0, 40], [129, "女兽奔跑", null, 0, 0, 150782, 1, 0, 3, 0, 40], [130, "女兽疾跑", null, 0, 0, 150782, 1, 0, 3, 0, 40], [131, "女兽待机", null, 0, 0, 150777, 1, 0, 3, 0, 0], [132, "女兽行走", null, 0, 0, 150783, 1, 0, 3, 0, 40], [133, "女兽跳跃", null, 1, 0, 150787, 1, 0, 3, 0, 40], [200, "滑板", null, 0, 151060, 0, 1, 3, 0, 0, 30], [201, "自行车停止", null, 0, 174560, 0, 1, 1, 0, 0, 30], [202, "自行车走", null, 0, 174560, 174563, 1, 1, 2, 0, 30], [203, "乘骑", null, 0, 175596, 0, 1, 3, 0, 0, 30], [204, "汽车司机", null, 0, 14015, 0, 1, 3, 0, 0, 30], [205, "汽车乘客", null, 0, 122230, 0, 1, 3, 0, 0, 30], [206, "开摩托", null, 0, 0, 35414, 1, 0, 3, 0, 30], [207, "放松姿态", null, 0, 122233, 0, 1, 3, 0, 0, 30], [208, "小孩坐", null, 0, 122444, 0, 1, 2, 0, 0, 30], [300, "小弟攻击姿态", null, 0, 0, 117391, 1, 0, 3, 0, 20], [301, "小弟挥拳1", null, 1, 0, 117400, 1.5, 0, 3, 0, 30], [302, "小弟挥拳2", null, 1, 0, 117395, 1.5, 0, 3, 0, 30], [303, "小弟挥拳3", null, 1, 0, 108373, 1.5, 0, 3, 0, 30], [304, "受伤", null, 1, 0, 47775, 1, 0, 3, 0, 30], [305, "组长攻击姿态", null, 1, 0, 29716, 1, 0, 3, 0, 30], [306, "组长挥刀1", null, 1, 0, 29744, 1.5, 0, 3, 0, 30], [307, "组长挥刀2", null, 1, 0, 29723, 1.5, 0, 3, 0, 30], [308, "组长挥刀3", null, 1, 0, 29744, 1.5, 0, 3, 0, 30], [309, "boss死亡", null, 1, 0, 52998, 1, 0, 3, 0, 30], [310, "boss受伤", null, 1, 0, 14507, 1, 0, 3, 0, 30], [311, "玩家攻击1", null, 1, 0, 20266, 1.5, 0, 3, 0, 30], [312, "玩家攻击2", null, 1, 0, 20278, 1.5, 0, 3, 0, 30], [313, "玩家攻击3", null, 1, 0, 20267, 1.5, 0, 3, 0, 30], [314, "左边上车", null, 1, 0, 145870, 1, 0, 3, 0, 30], [315, "右边上车", null, 1, 0, 145871, 1, 0, 3, 0, 30], [316, "左边关车", null, 1, 0, 145873, 1, 0, 3, 0, 30], [317, "左边关车", null, 1, 0, 145875, 1, 0, 3, 0, 30], [318, "下车关车门", null, 1, 0, 135372, 1, 0, 3, 0, 30]];
class ActionConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$a);
    }
}

const EXCELDATA$9 = [["ID", "Mid", "Radius", "Rules"], ["", "", "", ""], [1001, new mw.Vector(505, 5600, 125), 500, 0], [1002, new mw.Vector(-2995, 4725, 100), 1500, 0], [1003, new mw.Vector(-2995, 1700, 100), 1500, 0], [1004, new mw.Vector(-2560, -2900, 100), 1500, 0], [1005, new mw.Vector(-2545, -5920, 100), 1500, 0], [1006, new mw.Vector(1250, -6480, 100), 2000, 0], [1007, new mw.Vector(2190, -5635, 100), 3000, 0], [1008, new mw.Vector(1710, -900, 30), 2500, 0], [1009, new mw.Vector(5730, -745, 100), 1500, 0], [1010, new mw.Vector(3710, 3420, 100), 1500, 0], [1011, new mw.Vector(3710, 6495, 100), 1500, 0], [1012, new mw.Vector(-3120, -870, 100), 750, 0], [1013, new mw.Vector(540, 5270, 130), 0, 1], [1014, new mw.Vector(-5975, 1330, 1330), 0, 1], [1015, new mw.Vector(-5650, -2700, 1320), 0, 1], [1016, new mw.Vector(-3580, -6460, 650), 0, 1], [1017, new mw.Vector(-2635, -7300, 1630), 0, 1], [1018, new mw.Vector(2970, -8470, 990), 0, 1], [1019, new mw.Vector(6095, 1690, 905), 0, 1], [1020, new mw.Vector(1445, 7290, 715), 0, 1]];
class BoardConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$9);
    }
}

const EXCELDATA$8 = [["ID", "ExpressionIcon", "ExpressionVfx"], ["", "", ""], [1, "112164", "151051"], [2, "112165", "151047"], [3, "112166", "151052"], [4, "112167", "151054"], [5, "112168", "151055"], [6, "112169", "151049"], [7, "112170", "151056"], [8, "112171", "151050"], [9, "112172", "151048"], [10, "112173", "151058"], [11, "112174", "151059"], [12, "112175", "151057"], [13, "112176", "151053"]];
class ChatExpressionConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$8);
    }
}

const EXCELDATA$7 = [["ID", "WordID"], ["", ""], [1, 100095], [2, 100096], [3, 100097], [4, 100098], [5, 100099], [6, 100100]];
class ChatWordConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$7);
    }
}

const EXCELDATA$6 = [["ID", "actionDistance", "actionTime", "WordDistance", "ExpressionDistance", "ExpressionScale", "ExpressionHeight", "ExpressionTime", "CameraScalingProportion", "CameraScalingRange"], ["", "", "", "", "", "", "", "", "", ""], [1, 150, 5, 10, 20, new mw.Vector(2, 2, 2), 200, 5, 100, [300, 2000]]];
class GlobalConfigConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$6);
    }
}

const EXCELDATA$5 = [["ID", "Describe", "Value", "Value2", "Value3", "Value4", "Judge", "Value5", "Text"], ["", "", "", "", "", "", "", "", "Language"], [1, "所有3dui的对象id", 0, null, null, ["1B5CCFF3"], null, null, null]];
class GlobalConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$5);
    }
}

const EXCELDATA$4 = [["ID", "IsServer", "Name", "Scripts", "Tips", "Params1", "Params2", "Params3", "Params4"], ["", "", "", "", "", "", "", "", ""], [1, true, "1", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [2, true, "2", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [3, true, "3", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [4, true, "4", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [5, true, "5", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [6, true, "6", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "126331", "0", "1"], null, null], [7, true, "7", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [8, true, "8", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "4175", "0", "1"], null, null], [9, true, "9", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "14023", "0", "1"], null, null], [10, true, "10", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "14023", "0", "1"], null, null], [11, true, "11", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "14023", "0", "1"], null, null], [12, true, "12", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "14023", "0", "1"], null, null], [13, true, "13", ["Active_UI", "Interactive"], "小屋交互物", ["0", "1", "1", "150", "110111", "34423", "0/0/0", "1", "0"], ["0", "0", "14023", "0", "1"], null, null]];
class InteractConfigConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$4);
    }
}

const EXCELDATA$3 = [["ID", "MusicGUID", "IsBGM", "Music", "loopNum", "MusicRange"], ["", "", "", "", "", ""], [1, "117511", 0, 1, 0, null, "按钮点击正确的音效"], [2, "29187", 0, 1, 0, null, "按钮点击错误的音效"], [3, "13937", 1, 1, 0, null, "游戏的BGM（废弃）"], [4, "29189", 1, 1, 0, null, "记忆图片小游戏开始答题的提示音."], [5, "118362", 1, 1, 0, null, "足球课的BGM"], [6, "118364", 0, 1, 0, null, "篮球课的BGM"], [7, "119008", 0, 1, 0, null, "篮球击中蓝框的音效"], [8, "120837", 1, 1, 0, null, "数学课的BGM"], [9, "120838", 1, 1, 0, null, "舞蹈课的BGM"], [10, "119008", 0, 1, 0, null, "记忆图片成功的音效"], [11, "117511", 0, 1, 0, null, "展示图片按钮的音效"], [12, "120840", 1, 0.65, 0, null, "音乐课BGM"], [13, "95914", 1, 1, 0, null, "BGM"], [14, "124718", 0, 1, 0, null, "成绩单出现的音效"], [15, "119008", 0, 1, 0, null, "足球射入球门并且得分的音效"], [16, "124714", 0, 1, 0, null, "足球射球的音效"], [17, "120849", 0, 1, 0, null, "足球滑铲的音效"], [18, "117201", 0, 1, 0, null, "鼓音乐"], [19, "117190", 0, 1, 0, null, "鼓音乐"], [20, "59399", 0, 1, 0, null, "唱歌"], [21, "118711", 0, 1, 0, null, "唱歌"], [22, "118697", 0, 1, 0, null, "唱歌"], [23, "124713", 0, 1, 0, null, "换装音效"], [24, "121544", 0, 1, 0, null, "舞蹈音效"], [25, "121542", 0, 1, 0, null, "舞蹈音效"], [26, "117601", 0, 1, 0, null, "音乐课（贝斯）"], [27, "130727", 0, 1, 0, null, "音乐课（萨克斯）"], [28, "130722", 0, 1, 0, null, "音乐课（吹笛子）"], [29, "117192", 0, 1, 0, null, "音乐课（打鼓）"], [30, "14929", 0, 1, 0, null, "音乐课（吉他）"], [31, "47415", 0, 1, 0, null, "通用点击音"], [32, "29189", 0, 1, 0, null, "道具通用获取音"], [33, "29289", 0, 1, 0, null, "检查点到达音"], [34, "135482", 0, 1, 0, null, "赛跑庆祝音效"], [35, "145880", 0, 1, 0, null, "赛跑准备音效"], [36, "146099", 1, 1, 0, null, "派对交互BGM"], [37, "197017", 1, 1, 0, null, "台风降临时的bgm"], [38, "38193", 0, 1, 0, null, "夜晚捡到货币的音效"], [39, "106087", 0, 0.6, 0, null, "踩到数学课怪物触发器00ADF7FE"], [40, "124976", 0, 0.5, 0, null, "踩到计算机课怪物触发器779749A3/踩到图书馆怪物触发器"], [41, "135447", 0, 0.5, 0, null, "踩到舞蹈课怪物触发器DF8047A3"], [42, "126340", 0, 0.4, 0, null, "踩到美术课怪物触发器55B0FF4C"], [43, "106093", 0, 0.5, 0, null, "踩到语言课怪物触发器FEBF7887"], [44, "147341", 1, 0.8, 0, null, "派对交互BGM"], [45, "146100", 1, 1, 0, null, "派对交互BGM"], [46, "146107", 1, 1, 0, null, "派对交互BGM"], [47, "131079", 1, 0.7, 0, null, "飞行课BGM"], [48, "119008", 0, 1, 0, null, "造物正确音效"], [49, "132972", 1, 0.7, 0, null, "造物课BGM"], [50, "120400", 1, 0.3, 0, null, "跳高区域BGM"], [51, "39348", 0, 1, 0, null, "跳高区里程碑ui弹出音效"], [52, "120844", 0, 1, 0, null, "跳高区顶部音效1"], [53, "132952", 0, 1, 0, null, "跳高区顶部音效2"], [54, "12354", 0, 1, 0, [0, 3000], "击中音效"], [55, "103342", 0, 0.7, 0, [0, 4000], "怪物自身受击音效1"], [56, "114002", 0, 1, 0, [0, 3000], "怪物死亡音效"], [57, "121709", 0, 1, 0, [0, 3000], "风刃命中音效"], [58, "12384", 0, 1, 0, [0, 3000], "风球爆炸音效"], [59, "162452", 0, 1, 0, [0, 3000], "鲨鱼雷系击中音效"], [60, "162447", 0, 1, 0, [0, 5000], "鲨鱼火系击中音效"], [61, "162451", 0, 1, 0, [0, 5000], "鲨鱼风系击中音效"], [62, "133480", 0, 1, 0, null, "占卜牌占卜界面bgm"], [63, "124724", 0, 1, 0, null, "占卜牌出现并转圈音效"], [64, "13827", 0, 1, 0, null, "占卜牌点击音效"], [65, "137573", 0, 1, 0, null, "占卜牌旋转放大到屏幕中间的音效"], [66, "119032", 0, 1, 0, null, "占卜牌在屏幕中间站定的音效"], [67, "95728", 0, 1, 0, null, "占卜牌面弹窗出现音效"], [68, "27465", 0, 1, 0, null, "占卜弹窗音效"], [69, "131830", 0, 3, 0, [0, 2000], "胜利音效"], [70, "135448", 0, 1, 0, [0, 600], "酷猫叫"], [71, "164430", 0, 0.3, 0, null, "召唤"], [72, "164431", 0, 0.3, 0, null, "退出召唤"], [73, "164429", 0, 0.3, 0, null, "猫叫"], [74, "165877", 1, 1, 0, null, "自习课BGM"], [75, "165657", 0, 1, 0, [0, 600], "狗狗叫"], [76, "146104", 0, 1, 0, [0, 2000], "音乐魔杖音效"], [77, "146107", 0, 1, 0, [0, 2000], "音乐魔杖音效"], [78, "146108", 0, 1, 0, [0, 2000], "音乐魔杖音效"], [79, "146109", 0, 1, 0, [0, 2000], "音乐魔杖音效"], [80, "146099", 0, 1, 0, [0, 2000], "音乐魔杖音效"], [81, "146100", 0, 1, 0, [0, 2000], "音乐魔杖音效"], [82, "26122", 0, 10, 1, [0, 2000], "载具爆炸音效"], [83, "12522", 0, 1, 0, [0, 10000], "载具行驶时的音效"], [84, "148586", 0, 1, 1, [0, 10000], "开门声音"], [85, "148585", 0, 1, 1, [0, 10000], "关门声音"], [86, "12344", 0, 10, 1, [0, 10000], "载具撞击"], [87, "124723", 0, 1, 1, null, "庆祝音效1"], [88, "137567", 0, 1, 1, null, "庆祝音效2"]];
class MusicConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$3);
    }
}

const EXCELDATA$2 = [["ID", "type", "name", "quality", "icon", "icon_Ch", "icon_J", "icon_D", "actionId", "singleType", "doubleType", "angle", "v", "r", "sendStance", "accectStance", "sendAni", "accectAni", "time", "visual1", "visual2", "circulate"], ["", "", "Language", "", "MainLanguage", "ChildLanguage", "ChildLanguage", "ChildLanguage", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], [1, 1, "Action_01", 2, "34419", "34419", "86255", "86255", "14641", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [2, 1, "Action_02", 2, "35629", "35629", "86252", "86252", "15057", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [3, 1, "Action_03", 2, "35628", "35628", "86270", "86270", "14617", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [4, 1, "Action_04", 2, "35630", "35630", "86269", "86269", "14759", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [5, 1, "Action_05", 2, "34431", "34431", "86254", "86254", "14771", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [6, 1, "Action_06", 2, "35632", "35632", "86259", "86259", "14766", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [7, 1, "Action_07", 2, "34426", "34426", "86263", "86263", "15078", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [8, 1, "Action_08", 2, "34417", "34417", "86256", "86256", "14504", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [9, 1, "Action_09", 2, "34430", "34430", "86264", "86264", "14655", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [10, 1, "Action_10", 2, "34421", "34421", "86253", "86253", "14023", 1, 0, 0, null, null, null, null, null, null, 0, null, null, false], [11, 1, "Action_11", 2, "34428", "34428", "86266", "86266", "4174", 1, 0, 0, null, null, null, null, null, null, 0, null, null, false], [12, 1, "Action_12", 2, "34427", "34427", "86262", "86262", "14602", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [13, 1, "Action_13", 3, "34423", "34423", "86272", "86272", "14571", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [14, 1, "Action_14", 2, "34424", "34424", "86257", "86257", "14511", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [15, 1, "Action_15", 2, "34425", "34425", "86261", "86261", "14497", 0, 0, 0, null, null, null, null, null, null, 1, null, null, false], [16, 2, "Action_16", 4, "98699", "98699", "98715", "98715", null, 0, 3, 0, new mw.Vector(-22, -2, 110), new mw.Vector(0, 0, 0), "103085", "4174", null, null, 0, null, null, false], [17, 2, "Action_17", 5, "98700", "98700", "98712", "98712", null, 0, 3, 0, new mw.Vector(-6, -2, -75), new mw.Vector(0, 0, 0), "101653", "101652", null, null, 0, null, null, false], [18, 2, "Action_18", 3, "98701", "98701", "98675", "98675", null, 0, 3, 0, new mw.Vector(-148, -2, -86), new mw.Vector(0, 23, 0), "101651", "101650", null, null, 0, null, null, false], [19, 2, "Action_19", 2, "34420", "34420", "86267", "86267", null, 0, 1, 0, new mw.Vector(30, 0, 0), new mw.Vector(0, 0, 180), null, null, "14703", "14765", 0, null, null, false], [20, 2, "Action_20", 2, "34435", "34435", "86271", "86271", null, 0, 2, 0, new mw.Vector(-20, 0, -50), new mw.Vector(0, 0, 0), "35464", "38174", null, null, 0, null, new mw.Vector(0, 0, 50), false], [21, 2, "Action_21", 2, "98708", "98708", "98707", "98707", null, 0, 2, 0, new mw.Vector(-40, 0, -35), new mw.Vector(0, 0, 0), "35463", "38173", null, null, 0, null, new mw.Vector(0, 0, 100), false], [22, 1, "Action_22", 2, "98674", "98674", "98681", "98681", "88448", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [23, 1, "Action_23", 2, "98714", "98714", "98697", "98697", "88544", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [24, 1, "Action_24", 2, "98673", "98673", "98711", "98711", "88450", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [25, 1, "Action_25", 2, "98682", "98682", "98698", "98698", "88449", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [26, 1, "Action_26", 2, "98672", "98672", "98684", "98684", "88541", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [27, 1, "Action_27", 2, "98713", "98713", "98685", "98685", "88543", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [28, 1, "Action_28", 2, "108519", "108519", "108523", "108523", "108414", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [35, 1, "Action_30", 2, "168271", "168271", "168271", "168271", "14744", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [36, 1, "Action_31", 3, "174703", "174703", "174703", "174703", "14695", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [37, 1, "Action_32", 3, "120634", "120634", "120634", "120634", "14602", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [38, 1, "Action_33", 4, "128699", "128699", "128699", "128699", "14699", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [39, 1, "Action_34", 4, "146460", "146460", "146460", "146460", "14511", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [40, 2, "Action_35", 5, "120677", "120677", "120677", "120677", null, 0, 3, 0, new mw.Vector(-20, -70, -65), new mw.Vector(0, 0, 0), null, null, "135368", "135370", 1, null, null, true], [41, 2, "Action_36", 5, "120678", "120678", "120678", "120678", null, 0, 1, 90, new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), null, null, "148713", "148714", 1, null, null, true], [42, 2, "Action_37", 2, "174704", "174704", "174704", "174704", null, 0, 1, -90, new mw.Vector(43, 0, 0), new mw.Vector(0, 0, 0), null, null, "148568", "148569", 1, null, null, true], [43, 1, "Action_38", 2, "174702", "174702", "174702", "174702", "148567", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [45, 1, "Action_40", 3, "174703", "174703", "174703", "174703", "14732", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [46, 1, "Action_41", 4, "120641", "120641", "120641", "120641", "14712", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [47, 1, "Action_42", 4, "146463", "146463", "146463", "146463", "148565", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [48, 2, "Action_43", 5, "146815", "146815", "146815", "146815", null, 0, 1, -90, new mw.Vector(90, 0, 0), new mw.Vector(0, 0, 0), null, null, "123712", "123726", 1, null, null, true], [49, 1, "Action_44", 5, "174703", "174703", "174703", "174703", "14741", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [50, 1, "Action_45", 2, "128719", "128719", "128719", "128719", "29725", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [51, 1, "Action_46", 2, "128719", "128719", "128719", "128719", "126579", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [52, 1, "Action_47", 3, "128719", "128719", "128719", "128719", "125813", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [53, 1, "Action_48", 3, "128719", "128719", "128719", "128719", "126581", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [54, 1, "Action_49", 4, "128719", "128719", "128719", "128719", "129504", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [55, 1, "Action_50", 4, "128719", "128719", "128719", "128719", "126867", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [56, 1, "Action_51", 5, "128719", "128719", "128719", "128719", "129503", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [57, 1, "Action_52", 5, "128719", "128719", "128719", "128719", "135159", 0, 0, 0, null, null, null, null, null, null, 1, null, null, true], [58, 2, "Action_53", 5, "120677", "120677", "120677", "120677", null, 0, 3, 0, new mw.Vector(-22, -2, 110), new mw.Vector(0, 0, 0), null, null, "151231", "151230", 1, null, null, true], [59, 1, "Action_54", 5, "174710", "174710", "174710", "174710", "122747", 0, 1, 0, null, null, null, null, null, null, 1, null, null, false, "泼水"], [60, 1, "Action_55", 1, "174710", "174710", "174710", "174710", "169109", 0, 0, 0, null, null, null, null, null, null, 2, null, null, false, "水球眩晕"], [61, 1, "Action_56", 5, "158418", "158418", "158418", "158418", "35421", 0, 1, 0, null, null, null, null, null, null, 1, null, null, true, "蛙泳"], [62, 1, "Action_57", 5, "181400", "181400", "181400", "181400", "33568", 0, 1, 0, null, null, null, null, null, null, 1, null, null, true, "自由泳"], [63, 1, "Action_58", 5, "158394", "158394", "158394", "158394", "178369", 0, 1, 0, null, null, null, null, null, null, 1, null, null, false, "水中挣扎"]];
class SquareActionConfigConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$2);
    }
}

const EXCELDATA$1 = [["ID", "Name", "Value", "Value_Ch", "Value_J", "Value_D"], ["", "Key|ReadByName", "MainLanguage", "ChildLanguage", "ChildLanguage", "ChildLanguage"], [100001, "Danmu_Content_1001", "Solo", "单人", "シングルプレイヤー", "Ledig"], [100002, "Danmu_Content_1002", "Pair", "双人", "ダブル", "Doppelt"], [100003, "Danmu_Content_1003", "Items", "道具", "小道具", "Stütze"], [100019, "Danmu_Content_1019", "embrace", "拥抱", "抱擁", "Umarmung"], [100020, "Danmu_Content_1020", "Princess hugs", "公主抱", "王女の抱擁", "Prinzessin umarmt"], [100021, "Danmu_Content_1021", "Back people", "背人", "バックマン", "Zurück"], [100022, "Danmu_Content_1022", "Lift", "举起", "持ち上げる", "heben"], [100023, "Danmu_Content_1023", "Shoulder to shoulder", "肩扛", "肩甲骨", "Schulter an Schulter"], [100024, "Danmu_Content_1024", "Anyone", "托人", "受託者", "Irgendjemand"], [100049, "Danmu_Content_1049", "Cancel", "我再想想", "もう一度考えてみよう", "Ich werde noch einmal darüber nachdenken"], [100050, "Danmu_Content_1050", "Already using", "你已经在这里了", "あなたはすでにここにいます", "Sie sind schon hier"], [100051, "Danmu_Content_1051", "This item is in use", "对不起，这里已经有人了", "申し訳ありませんが、すでにここに誰かがいる", "Sorry, es sind schon Leute hier"], [100052, "Danmu_Content_1052", "It's too far...", "距离有点远......", "少し遠く...", "Es ist ein bisschen weit weg..."], [100053, "Danmu_Content_1053", "Please leave current player first", "请先离开当前玩家", "まず、現在のプレイヤーを離れてください", "Bitte verlassen Sie zuerst den aktuellen Spieler"], [100054, "Danmu_Content_1054", "Leave", "脱离", "離脱", "auskuppeln"], [100055, "Danmu_Content_1055", "Playlist", "音乐列表", "音楽のリスト", "Musikliste"], [100056, "Danmu_Content_1056", "Lighting", "灯光列表", "ライトのリスト", "Liste der Leuchten"], [100057, "Danmu_Content_1057", "Leave", "解除", "持ち上げる", "erleichtern"], [100058, "Danmu_Content_1058", "BGM", "音乐", "音楽", "Musikliste"], [100059, "Danmu_Content_1059", "Lighting", "灯光", "ライト", "Lampenlicht"], [100060, "Danmu_Content_1060", "Unavailable now", "当前正在双人动作，无法发起！", "現在2人プレイ中で、開始できません!", "Derzeit in Zwei-Personen-Aktion, kann nicht initiiert werden!"], [100061, "Danmu_Content_1061", "Under Construction (Sorry!)", "前方区域正在施工建设中！敬请期待！", "前方エリアは建設中です! ご期待ください!", "Das Gebiet vor uns ist im Bau! Bleiben Sie dran!"], [100062, "Danmu_Content_1062", "Lighting On/Off", "灯光开关", "ライトスイッチ", "Lichtschalter"], [100063, "Danmu_Content_1063", "BGM On/Off", "音响开关", "サウンドスイッチ", "Soundschalter"], [100064, "Danmu_Content_1064", "Please remove current item!", "请卸下当前道具！", "現在の小道具を降ろしてください!", "Bitte entfernen Sie den aktuellen Artikel!"], [100065, "Danmu_Content_1065", "Please leave current location!", "请脱离当前交互物！", "現在のインタラクションから外してください!", "Bitte lösen Sie sich von der aktuellen Interaktion!"], [100066, "Danmu_Content_1066", "Twist to the beat!", "跟着节奏扭起来！", "リズムに合わせてひねりを合わせる!", "Twist im Takt!"], [100067, "Danmu_Content_1067", "Switch Dances", "切换舞蹈", "ダンスを切り替えます", "Switch-Tänze"], [100068, "Danmu_Content_1068", "Please stop current action!", "请脱离当前动作！", "現在の動きから脱却してください!", "Bitte raus aus der aktuellen Aktion!"], [100069, "Danmu_Content_1069", "The two sides are too far apart to interact!", "双方距离过远，无法交互！", "双方は、相互作用するには遠すぎる!", "Die beiden Seiten sind zu weit voneinander entfernt, um miteinander zu interagieren!"], [100070, "Danmu_Content_1070", "The player is currently in a two-player action!", "当前玩家处于双人动作中！", "現在のプレイヤーは2人プレイ中!", "Der Spieler befindet sich derzeit in einer Zwei-Spieler-Aktion!"], [100071, "Danmu_Content_1071", "Successfully launch a successful campaign against the surrounding players and wait for the other party to accept it", "向周围玩家发起成功，等待对方接受", "周囲のプレイヤーに成功を開始し、相手が受け入れるのを待ちます", "Starten Sie erfolgreich eine erfolgreiche Kampagne gegen die umliegenden Spieler und warten Sie, bis die andere Partei sie akzeptiert"], [100072, "Danmu_Content_1072", "There are no interactive players in the current range", "当前范围内无可交互玩家", "現在の範囲内の対話不可能なプレイヤー", "Es gibt keine interaktiven Player im aktuellen Sortiment"], [100073, "Danmu_Content_1073", "Accept", "接受", "受け入れる", "annehmen"], [100074, "Danmu_Content_1074", "Refuse", "拒绝", "拒否します", "verweigern"], [100075, "Danmu_Content_1075", "Initiated to you", "向您发起了", "あなたに開始しました", "Initiiert für Sie"], [100076, "Danmu_Content_1076", "Action request", "动作请求", "アクション要求", "Aktionsanforderung"], [100077, "Danmu_Content_1077", "Hi~", "你好", "Hi~", "Hi~"], [100078, "Danmu_Content_1078", "No", "不", "No", "No"], [100079, "Danmu_Content_1079", "How the weather like today", "今天天气怎么样", "今日の天気はどうですか", "Wie das Wetter heute ist"], [100080, "Danmu_Content_1080", "Hello", "你好啊", "こんにちは", "Hallo"], [100081, "Danmu_Content_1081", "follow", "跟随", "従ってください", "folgen"], [100095, "Danmu_Content_1095", "Hi~", "你好~", null, null], [100096, "Danmu_Content_1096", "LOL", "哈哈哈", null, null], [100097, "Danmu_Content_1097", "Let's play!", "一起玩吧", null, null], [100098, "Danmu_Content_1098", "Greetings!", "很高兴认识你", null, null], [100099, "Danmu_Content_1099", "I got to go!", "好呀", null, null], [100100, "Danmu_Content_1100", "See you later!", "下次再见", null, null], [100184, "Danmu_Content_1184", "Blacklist Words Detected", "文本有违禁词，请重新输入", null, null], [310, "Text_Text_310", "Close", "关闭", null, null], [587, "Text_Text_587", "Reset", "还原服装", null, null], [588, "Text_Text_588", "Profile", "名片", null, null], [589, "Text_Text_589", "Action", "动作", null, null], [590, "Text_Text_590", "Bag", "背包", null, null], [591, "Text_Text_591", "Schedule", "课表", null, null], [592, "Text_Text_592", "Back", "卡住点我", null, null], [593, "Text_Text_593", "Camera", "相机", null, null], [947, "Action_01", "Clap", "鼓掌", null, null], [948, "Action_02", "Bow", "鞠躬", null, null], [949, "Action_03", "Say Hello", "打招呼", null, null], [950, "Action_04", "Give a Like", "点赞", null, null], [951, "Action_05", "Blow a Kiss", "飞吻", null, null], [952, "Action_06", "Sulk", "愠怒", null, null], [953, "Action_07", "Heart Gesture", "比心", null, null], [954, "Action_08", "Shake Head", "摇头", null, null], [955, "Action_09", "Sad", "难过", null, null], [956, "Action_10", "Sit", "盘腿坐", null, null], [957, "Action_11", "Lie Down", "躺下", null, null], [958, "Action_12", "Somersault", "翻跟头", null, null], [959, "Action_13", "Seal", "结印", null, null], [960, "Action_14", "Lean Back", "向后仰", null, null], [961, "Action_15", "Shake the Waist", "抖腰", null, null], [962, "Action_16", "Lift Up", "举高", null, null], [963, "Action_17", "Shoulder Carry", "抗肩", null, null], [964, "Action_18", "Towing", "拖行", null, null], [965, "Action_19", "Hug", "怀抱", null, null], [966, "Action_20", "Bridal Carry", "公主抱", null, null], [967, "Action_21", "Piggyback", "肩抱", null, null], [968, "Action_22", "80s Moves", "怀旧慢舞", null, null], [969, "Action_23", "Enthusiasm", "热情节拍", null, null], [970, "Action_24", "Dance with Passion", "激情热舞", null, null], [971, "Action_25", "Tenderness", "柔情似水", null, null], [972, "Action_26", "Enchanting", "爱如潮水", null, null], [973, "Action_27", "Nobady", "Nobady", null, null], [974, "Action_28", "Boxing", "拳戏", null, null], [985, "Text_Text_686", "Name card", "名片", null, null], [986, "Text_Text_687", "Graphic quality", "画质", null, null], [987, "Text_Text_688", "Volume", "音量", null, null], [990, "Text_Text_691", "Reset", "重置", null, null], [991, "Text_Text_692", "Confirm", "确认", null, null], [992, "Text_Text_693", "Music", "音乐", null, null], [993, "Text_Text_694", "Sound effect", "音效", null, null], [1444, "Action_29", "Shake Head", "摇头", null, null], [1445, "Action_30", "Zany Face", "扮鬼脸", null, null], [1446, "Action_31", "Spin", "转圈圈", null, null], [1447, "Action_32", "Backflip", "后空翻", null, null], [1448, "Action_33", "Knee Dance", "膝盖舞", null, null], [1449, "Action_34", "Walk on Hands", "倒立行走", null, null], [1450, "Action_35", "Shoulder Throw", "过肩摔", null, null], [1451, "Action_36", "Rely On", "依靠", null, null], [1452, "Action_37", "Hold Hands", "牵手", null, null], [1453, "Action_38", "Kneel Down", "跪拜", null, null], [1454, "Action_40", "Superman Spin", "超人旋转式飞行", null, null], [1455, "Action_41", "Spin Split", "旋转劈叉", null, null], [1456, "Action_42", "Dab Gesture", "Dab手势", null, null], [1457, "Action_43", "Heart Embrace", "双人比心", null, null], [1458, "Action_44", "Spin", "倒立陀螺转", null, null], [1459, "Action_45", "Heart Dance", "爱心舞", null, null], [1460, "Action_46", "Street Dance", "街舞", null, null], [1461, "Action_47", "Seaweed Dance", "海草舞", null, null], [1462, "Action_48", "Swan Dance", "天鹅舞", null, null], [1463, "Action_49", "Heartbeat", "怦然心动", null, null], [1464, "Action_50", "Date Me", "和我交往吧", null, null], [1465, "Action_51", "Two Tigers", "两只老虎爱跳舞", null, null], [1466, "Action_52", "Love to Dance", "爱杀宝贝", null, null], [1467, "Action_53", "German Suplex", "德式背摔", null, null], [1562, "Action_54", "Splash", "泼水", null, null], [1563, "Action_55", "Water Gun", "水枪喷射", null, null], [1564, "Action_56", "Breaststroke", "蛙泳", null, null], [1565, "Action_57", "Freestyle", "自由泳", null, null], [1566, "Action_58", "Struggling", "水中挣扎", null, null], [1526, "Set_1", "Attributes", "个人属性", null, null], [1527, "Set_2", "Settings", "设置", null, null], [1528, "Set_3", "Graphics", "画质", null, null], [1529, "Set_4", "Edit Profile", "修改名片", null, null], [1530, "Set_5", "Next Rank:", "下一品阶：", null, null], [1531, "Set_6", "Successful Advancement", "奖励预览", null, null], [1532, "Set_7", "HP", "生命值", null, null], [1533, "Set_8", "Mana", "法力值", null, null], [1534, "Set_9", "Insufficient Breakthrough Power.", "突破力不足", null, null], [1535, "Set_10", "You need to be at max level with enough badges to advance to the next rank!", "需要学分满级和足够数量的徽章才可以突破进阶哦！", null, null], [1536, "Set_11", "Obtained from Magic Class or Self-Study Class", "魔法课或自习课获得", null, null], [1537, "Set_12", "Obtained by completing Magic Trials", "参加魔法试炼通关获得", null, null], [1538, "Set_13", "Go to Get", "前往获取", null, null], [1539, "Set_14", "Congratulations on becoming {0}", "恭喜成为{0}", null, null], [1540, "Set_15", "Reward Obtained:", "获得奖励：", null, null], [1541, "Set_16", "Unlock Function:", "解锁功能：", null, null], [1613, "Typhoon_Ts_0", "Your wood storage is full. Please return home to build a defensive wall.", "当前木头已满，请回家建造防御围墙", null, null], [1614, "Typhoon_Ts_1", "Get Planks", "获得木板", null, null], [1615, "Typhoon_Ts_2", "{0} used Dance Magic on you.", "{0}对你使用了跳舞魔法", null, null], [1616, "Typhoon_Ts_3", "{0} used Water Gun Magic on you.", "{0}对你使用了水枪魔法", null, null], [1617, "Typhoon_Ts_4", "Please revert from your transformation first.", "请先解除变身状态", null, null], [1618, "Typhoon_Ts_5", "You can't change outfits while in a transformed state.", "变身状态下无法更换服装", null, null], [1619, "Typhoon_Ts_6", "This item can only be obtained by participating in events.", "该物品需要参与活动才能获得", null, null], [1620, "Typhoon_Ts_7", "Not enough Mana.", "蓝不够\"", null, null], [1621, "Typhoon_Ts_8", "{0} has arrived!! Hold on!!", "{0}已经降临！！坚持住！！", null, null], [1622, "Typhoon_Ts_9", "You got blown away by {0}...", "你被{0}吹飞了......", null, null], [1623, "Typhoon_Ts_10", "The shelter has been destroyed by {0} floors.", "庇护所被摧毁了{0}层", null, null], [1624, "Typhoon_Ts_11", "You survived in {0}.", "你们在{0}中幸存了", null, null], [1625, "Typhoon_Ts_12", "You couldn't resist {0}, and your home was destroyed.", "你没能抵御{0}，你的家园被摧毁了", null, null], [1626, "Typhoon_Ts_13", "The next wave of the typhoon is coming in {0} seconds.", "下一波台风还有{0}秒来临", null, null], [1627, "Typhoon_Ts_14", "Take off Hat", "摘下法帽", null, null], [1628, "Typhoon_Ts_15", "Equip Hat", "装备法帽", null, null], [1629, "Typhoon_Ts_16", "There's no next level.", "没有下一等级了", null, null], [1630, "Typhoon_Ts_17", "{0} time left: {1} seconds.", "距离{0}结束还有：{1}秒", null, null], [1631, "Typhoon_Ts_18", "The typhoon is coming in {0}, quickly gather wood to build houses to withstand the typhoon.", "台风还有{0}到来，快收集木头建造房屋抵御台风吧", null, null], [1632, "Typhoon_Ts_19", "<color=#red>The typhoon is arriving in {0}, head to the Shelter quickly!</color>", "<color=#red>台风还有{0}来临，快前往庇护所！</color>", null, null], [1633, "Typhoon_Ts_20", "{0} floors have been destroyed, {1} floors remaining.", "被摧毁了{0}层，当前还有{1}层", null, null], [1634, "Typhoon_Ts_21", "{0} floors have been constructed so far.", "当前已搭建{0}层", null, null], [1635, "Typhoon_Ts_22", "{0} layers of Defense Walls have been successfully constructed.", "已成功搭建{0}层防御围墙", null, null], [1827, "typhoon_text_1", "Collect Wood", "收集木头", null, null], [1828, "typhoon_text_2", "Build defenses to withstand the typhoon.", "建造防御抵御台风", null, null], [1829, "typhoon_text_3", "Do you want to return to Magic Campus?", "要回到梦幻魔法校园吗？", null, null], [1830, "typhoon_text_4", "Typhoon Level 1", "1级台风", null, null], [1831, "typhoon_text_5", "Typhoon Level 2", "2级台风", null, null], [1832, "typhoon_text_6", "Typhoon Level 3", "3级台风", null, null], [1833, "typhoon_text_7", "Typhoon Level 4", "4级台风", null, null], [1834, "typhoon_text_8", "Typhoon Level 5", "5级台风", null, null], [1835, "typhoon_text_9", "Typhoon Level 6", "6级台风", null, null], [1836, "typhoon_text_10", "Typhoon Level 7", "7级台风", null, null], [1837, "typhoon_text_11", "Typhoon Level 8", "8级台风", null, null], [1838, "typhoon_text_12", "Typhoon Level 9", "9级台风", null, null], [1839, "typhoon_text_13", "Typhoon Level 10", "10级台风", null, null], [1840, "typhoon_text_14", "Doksuri", "“杜苏芮”", null, null], [1841, "typhoon_text_15", "Fly", "飞行", null, null], [1842, "typhoon_text_16", "Creation", "造物", null, null], [1843, "typhoon_text_17", "Combat", "战斗", null, null], [1844, "typhoon_text_18", "Equip", "装备", null, null], [1845, "typhoon_text_19", "Cancel", "取消", null, null], [1312, "Study_30", "I see.", "我知道了", null, null]];
class SquareLanguageConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$1);
    }
    /**单人*/
    get Danmu_Content_1001() { return this.getElement(100001); }
    ;
    /**双人*/
    get Danmu_Content_1002() { return this.getElement(100002); }
    ;
    /**道具*/
    get Danmu_Content_1003() { return this.getElement(100003); }
    ;
    /**拥抱*/
    get Danmu_Content_1019() { return this.getElement(100019); }
    ;
    /**公主抱*/
    get Danmu_Content_1020() { return this.getElement(100020); }
    ;
    /**背人*/
    get Danmu_Content_1021() { return this.getElement(100021); }
    ;
    /**举起*/
    get Danmu_Content_1022() { return this.getElement(100022); }
    ;
    /**肩扛*/
    get Danmu_Content_1023() { return this.getElement(100023); }
    ;
    /**托人*/
    get Danmu_Content_1024() { return this.getElement(100024); }
    ;
    /**我再想想*/
    get Danmu_Content_1049() { return this.getElement(100049); }
    ;
    /**你已经在这里了*/
    get Danmu_Content_1050() { return this.getElement(100050); }
    ;
    /**对不起，这里已经有人了*/
    get Danmu_Content_1051() { return this.getElement(100051); }
    ;
    /**距离有点远......*/
    get Danmu_Content_1052() { return this.getElement(100052); }
    ;
    /**请先离开当前玩家*/
    get Danmu_Content_1053() { return this.getElement(100053); }
    ;
    /**脱离*/
    get Danmu_Content_1054() { return this.getElement(100054); }
    ;
    /**音乐列表*/
    get Danmu_Content_1055() { return this.getElement(100055); }
    ;
    /**灯光列表*/
    get Danmu_Content_1056() { return this.getElement(100056); }
    ;
    /**解除*/
    get Danmu_Content_1057() { return this.getElement(100057); }
    ;
    /**音乐*/
    get Danmu_Content_1058() { return this.getElement(100058); }
    ;
    /**灯光*/
    get Danmu_Content_1059() { return this.getElement(100059); }
    ;
    /**当前正在双人动作，无法发起！*/
    get Danmu_Content_1060() { return this.getElement(100060); }
    ;
    /**前方区域正在施工建设中！敬请期待！*/
    get Danmu_Content_1061() { return this.getElement(100061); }
    ;
    /**灯光开关*/
    get Danmu_Content_1062() { return this.getElement(100062); }
    ;
    /**音响开关*/
    get Danmu_Content_1063() { return this.getElement(100063); }
    ;
    /**请卸下当前道具！*/
    get Danmu_Content_1064() { return this.getElement(100064); }
    ;
    /**请脱离当前交互物！*/
    get Danmu_Content_1065() { return this.getElement(100065); }
    ;
    /**跟着节奏扭起来！*/
    get Danmu_Content_1066() { return this.getElement(100066); }
    ;
    /**切换舞蹈*/
    get Danmu_Content_1067() { return this.getElement(100067); }
    ;
    /**请脱离当前动作！*/
    get Danmu_Content_1068() { return this.getElement(100068); }
    ;
    /**双方距离过远，无法交互！*/
    get Danmu_Content_1069() { return this.getElement(100069); }
    ;
    /**当前玩家处于双人动作中！*/
    get Danmu_Content_1070() { return this.getElement(100070); }
    ;
    /**向周围玩家发起成功，等待对方接受*/
    get Danmu_Content_1071() { return this.getElement(100071); }
    ;
    /**当前范围内无可交互玩家*/
    get Danmu_Content_1072() { return this.getElement(100072); }
    ;
    /**接受*/
    get Danmu_Content_1073() { return this.getElement(100073); }
    ;
    /**拒绝*/
    get Danmu_Content_1074() { return this.getElement(100074); }
    ;
    /**向您发起了*/
    get Danmu_Content_1075() { return this.getElement(100075); }
    ;
    /**动作请求*/
    get Danmu_Content_1076() { return this.getElement(100076); }
    ;
    /**你好*/
    get Danmu_Content_1077() { return this.getElement(100077); }
    ;
    /**不*/
    get Danmu_Content_1078() { return this.getElement(100078); }
    ;
    /**今天天气怎么样*/
    get Danmu_Content_1079() { return this.getElement(100079); }
    ;
    /**你好啊*/
    get Danmu_Content_1080() { return this.getElement(100080); }
    ;
    /**跟随*/
    get Danmu_Content_1081() { return this.getElement(100081); }
    ;
    /**你好~*/
    get Danmu_Content_1095() { return this.getElement(100095); }
    ;
    /**哈哈哈*/
    get Danmu_Content_1096() { return this.getElement(100096); }
    ;
    /**一起玩吧*/
    get Danmu_Content_1097() { return this.getElement(100097); }
    ;
    /**很高兴认识你*/
    get Danmu_Content_1098() { return this.getElement(100098); }
    ;
    /**好呀*/
    get Danmu_Content_1099() { return this.getElement(100099); }
    ;
    /**下次再见*/
    get Danmu_Content_1100() { return this.getElement(100100); }
    ;
    /**文本有违禁词，请重新输入*/
    get Danmu_Content_1184() { return this.getElement(100184); }
    ;
    /**关闭*/
    get Text_Text_310() { return this.getElement(310); }
    ;
    /**还原服装*/
    get Text_Text_587() { return this.getElement(587); }
    ;
    /**名片*/
    get Text_Text_588() { return this.getElement(588); }
    ;
    /**动作*/
    get Text_Text_589() { return this.getElement(589); }
    ;
    /**背包*/
    get Text_Text_590() { return this.getElement(590); }
    ;
    /**课表*/
    get Text_Text_591() { return this.getElement(591); }
    ;
    /**卡住点我*/
    get Text_Text_592() { return this.getElement(592); }
    ;
    /**相机*/
    get Text_Text_593() { return this.getElement(593); }
    ;
    /**鼓掌*/
    get Action_01() { return this.getElement(947); }
    ;
    /**鞠躬*/
    get Action_02() { return this.getElement(948); }
    ;
    /**打招呼*/
    get Action_03() { return this.getElement(949); }
    ;
    /**点赞*/
    get Action_04() { return this.getElement(950); }
    ;
    /**飞吻*/
    get Action_05() { return this.getElement(951); }
    ;
    /**愠怒*/
    get Action_06() { return this.getElement(952); }
    ;
    /**比心*/
    get Action_07() { return this.getElement(953); }
    ;
    /**摇头*/
    get Action_08() { return this.getElement(954); }
    ;
    /**难过*/
    get Action_09() { return this.getElement(955); }
    ;
    /**盘腿坐*/
    get Action_10() { return this.getElement(956); }
    ;
    /**躺下*/
    get Action_11() { return this.getElement(957); }
    ;
    /**翻跟头*/
    get Action_12() { return this.getElement(958); }
    ;
    /**结印*/
    get Action_13() { return this.getElement(959); }
    ;
    /**向后仰*/
    get Action_14() { return this.getElement(960); }
    ;
    /**抖腰*/
    get Action_15() { return this.getElement(961); }
    ;
    /**举高*/
    get Action_16() { return this.getElement(962); }
    ;
    /**抗肩*/
    get Action_17() { return this.getElement(963); }
    ;
    /**拖行*/
    get Action_18() { return this.getElement(964); }
    ;
    /**怀抱*/
    get Action_19() { return this.getElement(965); }
    ;
    /**公主抱*/
    get Action_20() { return this.getElement(966); }
    ;
    /**肩抱*/
    get Action_21() { return this.getElement(967); }
    ;
    /**怀旧慢舞*/
    get Action_22() { return this.getElement(968); }
    ;
    /**热情节拍*/
    get Action_23() { return this.getElement(969); }
    ;
    /**激情热舞*/
    get Action_24() { return this.getElement(970); }
    ;
    /**柔情似水*/
    get Action_25() { return this.getElement(971); }
    ;
    /**爱如潮水*/
    get Action_26() { return this.getElement(972); }
    ;
    /**Nobady*/
    get Action_27() { return this.getElement(973); }
    ;
    /**拳戏*/
    get Action_28() { return this.getElement(974); }
    ;
    /**名片*/
    get Text_Text_686() { return this.getElement(985); }
    ;
    /**画质*/
    get Text_Text_687() { return this.getElement(986); }
    ;
    /**音量*/
    get Text_Text_688() { return this.getElement(987); }
    ;
    /**重置*/
    get Text_Text_691() { return this.getElement(990); }
    ;
    /**确认*/
    get Text_Text_692() { return this.getElement(991); }
    ;
    /**音乐*/
    get Text_Text_693() { return this.getElement(992); }
    ;
    /**音效*/
    get Text_Text_694() { return this.getElement(993); }
    ;
    /**摇头*/
    get Action_29() { return this.getElement(1444); }
    ;
    /**扮鬼脸*/
    get Action_30() { return this.getElement(1445); }
    ;
    /**转圈圈*/
    get Action_31() { return this.getElement(1446); }
    ;
    /**后空翻*/
    get Action_32() { return this.getElement(1447); }
    ;
    /**膝盖舞*/
    get Action_33() { return this.getElement(1448); }
    ;
    /**倒立行走*/
    get Action_34() { return this.getElement(1449); }
    ;
    /**过肩摔*/
    get Action_35() { return this.getElement(1450); }
    ;
    /**依靠*/
    get Action_36() { return this.getElement(1451); }
    ;
    /**牵手*/
    get Action_37() { return this.getElement(1452); }
    ;
    /**跪拜*/
    get Action_38() { return this.getElement(1453); }
    ;
    /**超人旋转式飞行*/
    get Action_40() { return this.getElement(1454); }
    ;
    /**旋转劈叉*/
    get Action_41() { return this.getElement(1455); }
    ;
    /**Dab手势*/
    get Action_42() { return this.getElement(1456); }
    ;
    /**双人比心*/
    get Action_43() { return this.getElement(1457); }
    ;
    /**倒立陀螺转*/
    get Action_44() { return this.getElement(1458); }
    ;
    /**爱心舞*/
    get Action_45() { return this.getElement(1459); }
    ;
    /**街舞*/
    get Action_46() { return this.getElement(1460); }
    ;
    /**海草舞*/
    get Action_47() { return this.getElement(1461); }
    ;
    /**天鹅舞*/
    get Action_48() { return this.getElement(1462); }
    ;
    /**怦然心动*/
    get Action_49() { return this.getElement(1463); }
    ;
    /**和我交往吧*/
    get Action_50() { return this.getElement(1464); }
    ;
    /**两只老虎爱跳舞*/
    get Action_51() { return this.getElement(1465); }
    ;
    /**爱杀宝贝*/
    get Action_52() { return this.getElement(1466); }
    ;
    /**德式背摔*/
    get Action_53() { return this.getElement(1467); }
    ;
    /**泼水*/
    get Action_54() { return this.getElement(1562); }
    ;
    /**水枪喷射*/
    get Action_55() { return this.getElement(1563); }
    ;
    /**蛙泳*/
    get Action_56() { return this.getElement(1564); }
    ;
    /**自由泳*/
    get Action_57() { return this.getElement(1565); }
    ;
    /**水中挣扎*/
    get Action_58() { return this.getElement(1566); }
    ;
    /**个人属性*/
    get Set_1() { return this.getElement(1526); }
    ;
    /**设置*/
    get Set_2() { return this.getElement(1527); }
    ;
    /**画质*/
    get Set_3() { return this.getElement(1528); }
    ;
    /**修改名片*/
    get Set_4() { return this.getElement(1529); }
    ;
    /**下一品阶：*/
    get Set_5() { return this.getElement(1530); }
    ;
    /**奖励预览*/
    get Set_6() { return this.getElement(1531); }
    ;
    /**生命值*/
    get Set_7() { return this.getElement(1532); }
    ;
    /**法力值*/
    get Set_8() { return this.getElement(1533); }
    ;
    /**突破力不足*/
    get Set_9() { return this.getElement(1534); }
    ;
    /**需要学分满级和足够数量的徽章才可以突破进阶哦！*/
    get Set_10() { return this.getElement(1535); }
    ;
    /**魔法课或自习课获得*/
    get Set_11() { return this.getElement(1536); }
    ;
    /**参加魔法试炼通关获得*/
    get Set_12() { return this.getElement(1537); }
    ;
    /**前往获取*/
    get Set_13() { return this.getElement(1538); }
    ;
    /**恭喜成为{0}*/
    get Set_14() { return this.getElement(1539); }
    ;
    /**获得奖励：*/
    get Set_15() { return this.getElement(1540); }
    ;
    /**解锁功能：*/
    get Set_16() { return this.getElement(1541); }
    ;
    /**当前木头已满，请回家建造防御围墙*/
    get Typhoon_Ts_0() { return this.getElement(1613); }
    ;
    /**获得木板*/
    get Typhoon_Ts_1() { return this.getElement(1614); }
    ;
    /**{0}对你使用了跳舞魔法*/
    get Typhoon_Ts_2() { return this.getElement(1615); }
    ;
    /**{0}对你使用了水枪魔法*/
    get Typhoon_Ts_3() { return this.getElement(1616); }
    ;
    /**请先解除变身状态*/
    get Typhoon_Ts_4() { return this.getElement(1617); }
    ;
    /**变身状态下无法更换服装*/
    get Typhoon_Ts_5() { return this.getElement(1618); }
    ;
    /**该物品需要参与活动才能获得*/
    get Typhoon_Ts_6() { return this.getElement(1619); }
    ;
    /**蓝不够"*/
    get Typhoon_Ts_7() { return this.getElement(1620); }
    ;
    /**{0}已经降临！！坚持住！！*/
    get Typhoon_Ts_8() { return this.getElement(1621); }
    ;
    /**你被{0}吹飞了......*/
    get Typhoon_Ts_9() { return this.getElement(1622); }
    ;
    /**庇护所被摧毁了{0}层*/
    get Typhoon_Ts_10() { return this.getElement(1623); }
    ;
    /**你们在{0}中幸存了*/
    get Typhoon_Ts_11() { return this.getElement(1624); }
    ;
    /**你没能抵御{0}，你的家园被摧毁了*/
    get Typhoon_Ts_12() { return this.getElement(1625); }
    ;
    /**下一波台风还有{0}秒来临*/
    get Typhoon_Ts_13() { return this.getElement(1626); }
    ;
    /**摘下法帽*/
    get Typhoon_Ts_14() { return this.getElement(1627); }
    ;
    /**装备法帽*/
    get Typhoon_Ts_15() { return this.getElement(1628); }
    ;
    /**没有下一等级了*/
    get Typhoon_Ts_16() { return this.getElement(1629); }
    ;
    /**距离{0}结束还有：{1}秒*/
    get Typhoon_Ts_17() { return this.getElement(1630); }
    ;
    /**台风还有{0}到来，快收集木头建造房屋抵御台风吧*/
    get Typhoon_Ts_18() { return this.getElement(1631); }
    ;
    /**<color=#red>台风还有{0}来临，快前往庇护所！</color>*/
    get Typhoon_Ts_19() { return this.getElement(1632); }
    ;
    /**被摧毁了{0}层，当前还有{1}层*/
    get Typhoon_Ts_20() { return this.getElement(1633); }
    ;
    /**当前已搭建{0}层*/
    get Typhoon_Ts_21() { return this.getElement(1634); }
    ;
    /**已成功搭建{0}层防御围墙*/
    get Typhoon_Ts_22() { return this.getElement(1635); }
    ;
    /**收集木头*/
    get typhoon_text_1() { return this.getElement(1827); }
    ;
    /**建造防御抵御台风*/
    get typhoon_text_2() { return this.getElement(1828); }
    ;
    /**要回到梦幻魔法校园吗？*/
    get typhoon_text_3() { return this.getElement(1829); }
    ;
    /**1级台风*/
    get typhoon_text_4() { return this.getElement(1830); }
    ;
    /**2级台风*/
    get typhoon_text_5() { return this.getElement(1831); }
    ;
    /**3级台风*/
    get typhoon_text_6() { return this.getElement(1832); }
    ;
    /**4级台风*/
    get typhoon_text_7() { return this.getElement(1833); }
    ;
    /**5级台风*/
    get typhoon_text_8() { return this.getElement(1834); }
    ;
    /**6级台风*/
    get typhoon_text_9() { return this.getElement(1835); }
    ;
    /**7级台风*/
    get typhoon_text_10() { return this.getElement(1836); }
    ;
    /**8级台风*/
    get typhoon_text_11() { return this.getElement(1837); }
    ;
    /**9级台风*/
    get typhoon_text_12() { return this.getElement(1838); }
    ;
    /**10级台风*/
    get typhoon_text_13() { return this.getElement(1839); }
    ;
    /**“杜苏芮”*/
    get typhoon_text_14() { return this.getElement(1840); }
    ;
    /**飞行*/
    get typhoon_text_15() { return this.getElement(1841); }
    ;
    /**造物*/
    get typhoon_text_16() { return this.getElement(1842); }
    ;
    /**战斗*/
    get typhoon_text_17() { return this.getElement(1843); }
    ;
    /**装备*/
    get typhoon_text_18() { return this.getElement(1844); }
    ;
    /**取消*/
    get typhoon_text_19() { return this.getElement(1845); }
    ;
    /**我知道了*/
    get Study_30() { return this.getElement(1312); }
    ;
}

const EXCELDATA = [["ID", "Name", "Time", "Intensity", "Guid", "Scale"], ["", "Language", "", "", "", ""], [1001, "typhoon_text_4", [30, 120], 1.1, "85163", new mw.Vector(10, 10, 10)], [1002, "typhoon_text_5", [30, 120], 1.2, "85159", new mw.Vector(11, 11, 11)], [1003, "typhoon_text_6", [30, 120], 1.3, "85160", new mw.Vector(12, 12, 12)], [1004, "typhoon_text_7", [30, 120], 1.4, "85160", new mw.Vector(13, 13, 13)], [1005, "typhoon_text_8", [30, 120], 1.5, "89599", new mw.Vector(14, 14, 14)], [1006, "typhoon_text_9", [30, 120], 1.6, "89599", new mw.Vector(15, 15, 15)], [1007, "typhoon_text_10", [30, 120], 1.7, "89600", new mw.Vector(16, 16, 16)], [1008, "typhoon_text_11", [30, 120], 1.8, "89600", new mw.Vector(17, 17, 17)], [1009, "typhoon_text_12", [30, 120], 1.9, "14331", new mw.Vector(18, 18, 18)], [1010, "typhoon_text_13", [30, 120], 2, "14331", new mw.Vector(19, 19, 19)], [1011, "typhoon_text_14", [30, 120], 2.2, "85157", new mw.Vector(20, 20, 20)]];
class TyphoonConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA);
    }
}

class GameConfig {
    /**
    * 多语言设置
    * @param languageIndex 语言索引(-1为系统默认语言)
    * @param getLanguageFun 根据key获取语言内容的方法
    */
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.initLanguage(languageIndex, getLanguageFun);
        this.configMap.clear();
    }
    static getConfig(ConfigClass) {
        if (!this.configMap.has(ConfigClass.name)) {
            this.configMap.set(ConfigClass.name, new ConfigClass());
        }
        return this.configMap.get(ConfigClass.name);
    }
    static get Action() { return this.getConfig(ActionConfig); }
    ;
    static get Board() { return this.getConfig(BoardConfig); }
    ;
    static get ChatExpression() { return this.getConfig(ChatExpressionConfig); }
    ;
    static get ChatWord() { return this.getConfig(ChatWordConfig); }
    ;
    static get GlobalConfig() { return this.getConfig(GlobalConfigConfig); }
    ;
    static get Global() { return this.getConfig(GlobalConfig); }
    ;
    static get InteractConfig() { return this.getConfig(InteractConfigConfig); }
    ;
    static get Music() { return this.getConfig(MusicConfig); }
    ;
    static get SquareActionConfig() { return this.getConfig(SquareActionConfigConfig); }
    ;
    static get SquareLanguage() { return this.getConfig(SquareLanguageConfig); }
    ;
    static get Typhoon() { return this.getConfig(TyphoonConfig); }
    ;
}
GameConfig.configMap = new Map();

// 轴类型
var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
    Axis[Axis["Z"] = 2] = "Z";
})(Axis || (Axis = {}));
var EventsName;
(function (EventsName) {
    /** 获得木板 */
    EventsName["GET_BOARD"] = "GET_BOARD";
    /** 取消交互 */
    EventsName["CancelActive"] = "CancelActive";
    /** 设置时间 */
    EventsName["SetTime"] = "SetTime";
    /** 玩家状态 */
    EventsName["PLAYER_STATE"] = "PLAYER_STATE";
    /** 获得buff */
    EventsName["GET_BUFF"] = "GET_BUFF";
    /** 玩家位置重置 */
    EventsName["PlayerReset"] = "PlayerReset";
})(EventsName || (EventsName = {}));
/**
 * 角色状态
 */
var PlayerStateType;
(function (PlayerStateType) {
    /**正常 */
    PlayerStateType[PlayerStateType["None"] = 1] = "None";
    /**和交互物交互 */
    PlayerStateType[PlayerStateType["Interaction"] = 2] = "Interaction";
    /**双人动作 */
    PlayerStateType[PlayerStateType["DoublePeopleAction"] = 3] = "DoublePeopleAction";
    /**正在使用技能 */
    PlayerStateType[PlayerStateType["isUsingSkill"] = 4] = "isUsingSkill";
    /**繁忙中 */
    PlayerStateType[PlayerStateType["Busy"] = 5] = "Busy";
    /**死亡状态 */
    PlayerStateType[PlayerStateType["Dead"] = 6] = "Dead";
})(PlayerStateType || (PlayerStateType = {}));
var HudGameUIState;
(function (HudGameUIState) {
    /** 显示 */
    HudGameUIState[HudGameUIState["Show"] = 0] = "Show";
    /** 隐藏所有UI */
    HudGameUIState[HudGameUIState["HideAll"] = 1] = "HideAll";
})(HudGameUIState || (HudGameUIState = {}));
var TrrigerType;
(function (TrrigerType) {
    TrrigerType["None"] = "0";
    TrrigerType["Distance"] = "1";
    TrrigerType["BoxTrigger"] = "2";
    TrrigerType["SphereTrigger"] = "3";
})(TrrigerType || (TrrigerType = {}));
/** buff类型 */
var BuffType;
(function (BuffType) {
    /** 无 */
    BuffType[BuffType["None"] = 0] = "None";
    /** 加速 */
    BuffType[BuffType["Speed"] = 1] = "Speed";
    /** 跳跃 */
    BuffType[BuffType["Jump"] = 2] = "Jump";
})(BuffType || (BuffType = {}));

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Axis () { return Axis; },
    get BuffType () { return BuffType; },
    get EventsName () { return EventsName; },
    get HudGameUIState () { return HudGameUIState; },
    get PlayerStateType () { return PlayerStateType; },
    get TrrigerType () { return TrrigerType; }
});

function MyBoolean(bool) {
    if (typeof bool === "boolean") {
        return bool;
    }
    if (typeof bool === "string") {
        if (["1", "true", "True"].includes(bool.toString())) {
            return true;
        }
        else {
            return false;
        }
    }
    if (typeof bool === "number") {
        if (bool == 0)
            return false;
        else
            return true;
    }
    return false;
}
class GlobalData {
}
/**出生点位置 */
GlobalData.globalPos = null;
/**出生点旋转 */
GlobalData.globalRot = null;
/**是否打开GM */
GlobalData.isOpenGM = false;
/**交互物父节点 */
GlobalData.interactorParent = "1ABEAA53";
/** 道具触发器缩放 */
GlobalData.triggerScale = new Vector(0.8, 0.8, 1);
/** 回收物品位置 */
GlobalData.recyclePos = new Vector(0, 0, -10000);
/** 当前身上的木板数量 */
GlobalData.boardCount = 0;
/** 最大可携带木板数量 */
GlobalData.maxBoardCount = 8;
/** 围墙预制体ID数组 */
GlobalData.fencePrefabID = ["AA1F00C24A2E4717E98872AB96ACB9D1", "958B33514EC510B5BC4CA281DBB6D02A", "597DE0B748C1D7F65C03C7A1C6895D1E", "BFA4E28547372BCBF917B49A756587D6", "CAADF934427EC75EE60D18A4922E07A6", "CABE0BEF4B7B40A5AA5723A300011537", "468280C643C20AB3A44AECAFA9E8786E", "C7C7D81044E42F49285D60B4B99313BA", "6109D6C04ED602BAB9410BA7BC7847B3", "9AAF7071432FC737B6758299707C9746"];
/** 交木头触发器 */
GlobalData.HAND_BOARD = "1DA355CF";
/** 台风移动速度 */
GlobalData.typhoonSpeed = 700;
/** 台风半径（使用时会用这个值乘台风表中的缩放） */
GlobalData.typhoonRadius = 350;
/** 每块木头的血量 */
GlobalData.FenceHP = 5;
/** 多少块木头搭一层 */
GlobalData.FenceNum = 5;
/** 场景里生成木头总数 */
GlobalData.FenceTotal = 50;
/** 多久重新设置位置 */
GlobalData.boardRefreshTime = 135;
/** 是否自动跳回主包 */
GlobalData.autoJumpBack = false;
/** buff刷新时间 */
GlobalData.buffRefreshTime = 50;
/** buff持续时间 */
GlobalData.buffDuration = 30;

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GlobalData: GlobalData,
    MyBoolean: MyBoolean
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

let Emoji_generate = class Emoji_generate extends UIScript {
    get mBtn_expression() {
        if (!this.mBtn_expression_Internal && this.uiWidgetBase) {
            this.mBtn_expression_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_expression');
        }
        return this.mBtn_expression_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn_expression.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn_expression");
        });
        this.mBtn_expression.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_expression");
        });
        this.mBtn_expression.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_expression");
        });
        this.mBtn_expression.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn_expression);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
Emoji_generate = __decorate([
    UIBind('UI/uiTemplate/Chat/Emoji.ui')
], Emoji_generate);
var Emoji_Generate = Emoji_generate;

var foreign93 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Emoji_Generate
});

let Word_generate = class Word_generate extends UIScript {
    get mBtn_word() {
        if (!this.mBtn_word_Internal && this.uiWidgetBase) {
            this.mBtn_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_word');
        }
        return this.mBtn_word_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn_word.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn_word");
        });
        this.mBtn_word.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_word");
        });
        this.mBtn_word.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_word");
        });
        this.mBtn_word.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn_word);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
Word_generate = __decorate([
    UIBind('UI/uiTemplate/Chat/Word.ui')
], Word_generate);
var Word_Generate = Word_generate;

var foreign95 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Word_Generate
});

let Game_HUD_generate = class Game_HUD_generate extends UIScript {
    get mVirtualJoystick() {
        if (!this.mVirtualJoystick_Internal && this.uiWidgetBase) {
            this.mVirtualJoystick_Internal = this.uiWidgetBase.findChildByPath('Canvas/JoyStick/mVirtualJoystick');
        }
        return this.mVirtualJoystick_Internal;
    }
    get mRightDownCon() {
        if (!this.mRightDownCon_Internal && this.uiWidgetBase) {
            this.mRightDownCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon');
        }
        return this.mRightDownCon_Internal;
    }
    get mJump_btn() {
        if (!this.mJump_btn_Internal && this.uiWidgetBase) {
            this.mJump_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mJump_btn');
        }
        return this.mJump_btn_Internal;
    }
    get mExitInteractive_btn() {
        if (!this.mExitInteractive_btn_Internal && this.uiWidgetBase) {
            this.mExitInteractive_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mExitInteractive_btn');
        }
        return this.mExitInteractive_btn_Internal;
    }
    get mBottomCanvas() {
        if (!this.mBottomCanvas_Internal && this.uiWidgetBase) {
            this.mBottomCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas');
        }
        return this.mBottomCanvas_Internal;
    }
    get canvas_emoji() {
        if (!this.canvas_emoji_Internal && this.uiWidgetBase) {
            this.canvas_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_emoji');
        }
        return this.canvas_emoji_Internal;
    }
    get scrollBox_emoji() {
        if (!this.scrollBox_emoji_Internal && this.uiWidgetBase) {
            this.scrollBox_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_emoji/scrollBox_emoji');
        }
        return this.scrollBox_emoji_Internal;
    }
    get canvas_word() {
        if (!this.canvas_word_Internal && this.uiWidgetBase) {
            this.canvas_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_word');
        }
        return this.canvas_word_Internal;
    }
    get scrollBox_word() {
        if (!this.scrollBox_word_Internal && this.uiWidgetBase) {
            this.scrollBox_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_word/scrollBox_word');
        }
        return this.scrollBox_word_Internal;
    }
    get canvas_btn() {
        if (!this.canvas_btn_Internal && this.uiWidgetBase) {
            this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn');
        }
        return this.canvas_btn_Internal;
    }
    get emojiBtn() {
        if (!this.emojiBtn_Internal && this.uiWidgetBase) {
            this.emojiBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn/emojiBtn');
        }
        return this.emojiBtn_Internal;
    }
    get wordBtn() {
        if (!this.wordBtn_Internal && this.uiWidgetBase) {
            this.wordBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn/wordBtn');
        }
        return this.wordBtn_Internal;
    }
    get mAttribute() {
        if (!this.mAttribute_Internal && this.uiWidgetBase) {
            this.mAttribute_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute');
        }
        return this.mAttribute_Internal;
    }
    get mHpBase() {
        if (!this.mHpBase_Internal && this.uiWidgetBase) {
            this.mHpBase_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mHpBase');
        }
        return this.mHpBase_Internal;
    }
    get mSpeed() {
        if (!this.mSpeed_Internal && this.uiWidgetBase) {
            this.mSpeed_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mSpeed');
        }
        return this.mSpeed_Internal;
    }
    get mMpBase() {
        if (!this.mMpBase_Internal && this.uiWidgetBase) {
            this.mMpBase_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mMpBase');
        }
        return this.mMpBase_Internal;
    }
    get mJump() {
        if (!this.mJump_Internal && this.uiWidgetBase) {
            this.mJump_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/mAttribute/mJump');
        }
        return this.mJump_Internal;
    }
    get mTopEventCanvas() {
        if (!this.mTopEventCanvas_Internal && this.uiWidgetBase) {
            this.mTopEventCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas');
        }
        return this.mTopEventCanvas_Internal;
    }
    get mCanvasAction() {
        if (!this.mCanvasAction_Internal && this.uiWidgetBase) {
            this.mCanvasAction_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction');
        }
        return this.mCanvasAction_Internal;
    }
    get mAction_btn() {
        if (!this.mAction_btn_Internal && this.uiWidgetBase) {
            this.mAction_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction/mAction_btn');
        }
        return this.mAction_btn_Internal;
    }
    get textBtn() {
        if (!this.textBtn_Internal && this.uiWidgetBase) {
            this.textBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction/mAction_btn/textBtn');
        }
        return this.textBtn_Internal;
    }
    get mResetCanvas() {
        if (!this.mResetCanvas_Internal && this.uiWidgetBase) {
            this.mResetCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mResetCanvas');
        }
        return this.mResetCanvas_Internal;
    }
    get mPulloff_btn() {
        if (!this.mPulloff_btn_Internal && this.uiWidgetBase) {
            this.mPulloff_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mResetCanvas/mPulloff_btn');
        }
        return this.mPulloff_btn_Internal;
    }
    get mPlayerInfo() {
        if (!this.mPlayerInfo_Internal && this.uiWidgetBase) {
            this.mPlayerInfo_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo');
        }
        return this.mPlayerInfo_Internal;
    }
    get mIdCard() {
        if (!this.mIdCard_Internal && this.uiWidgetBase) {
            this.mIdCard_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo/mIdCard');
        }
        return this.mIdCard_Internal;
    }
    get mIdCard_btn() {
        if (!this.mIdCard_btn_Internal && this.uiWidgetBase) {
            this.mIdCard_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo/mIdCard_btn');
        }
        return this.mIdCard_btn_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mJump_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mJump_btn");
        });
        this.mJump_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mJump_btn");
        });
        this.mJump_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mJump_btn");
        });
        this.mJump_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mExitInteractive_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mExitInteractive_btn");
        });
        this.mExitInteractive_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mExitInteractive_btn");
        });
        this.mExitInteractive_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mExitInteractive_btn");
        });
        this.mExitInteractive_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.emojiBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "emojiBtn");
        });
        this.emojiBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "emojiBtn");
        });
        this.emojiBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "emojiBtn");
        });
        this.emojiBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.wordBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "wordBtn");
        });
        this.wordBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "wordBtn");
        });
        this.wordBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "wordBtn");
        });
        this.wordBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        this.mAction_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mAction_btn");
        });
        this.mAction_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mAction_btn");
        });
        this.mAction_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mAction_btn");
        });
        this.mAction_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mPulloff_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mPulloff_btn");
        });
        this.mPulloff_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mPulloff_btn");
        });
        this.mPulloff_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mPulloff_btn");
        });
        this.mPulloff_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mIdCard_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mIdCard_btn");
        });
        this.mIdCard_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mIdCard_btn");
        });
        this.mIdCard_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mIdCard_btn");
        });
        this.mIdCard_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mJump_btn);
        this.setLanguage(this.mExitInteractive_btn);
        this.setLanguage(this.emojiBtn);
        this.setLanguage(this.wordBtn);
        //文本多语言
        this.setLanguage(this.textBtn);
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mResetCanvas/TextBlock"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mPlayerInfo/TextBlock_1"));
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
Game_HUD_generate = __decorate([
    UIBind('UI/uiTemplate/gameModule/Game_HUD.ui')
], Game_HUD_generate);
var Game_HUD_generate$1 = Game_HUD_generate;

var foreign97 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Game_HUD_generate$1
});

class GridLayout {
    /**初始化GridLayout */
    constructor(_root, _isAutoWrap = true) {
        this._root = _root;
        this._isAutoWrap = _isAutoWrap;
        /**子节点 */
        this.nodes = [];
        /**偏移 */
        this.left = 0;
        this.top = 0;
        /** X间隔 */
        this.spacingX = 0;
        /** Y间隔 */
        this.spacingY = 0;
        const size = this._root.size;
        this._growDir = this._root.orientation;
        if (_isAutoWrap) {
            this._growDir = 1 - this._growDir;
        }
        this._growSize = this._growDir == mw.Orientation.OrientHorizontal ? size.x : size.y;
    }
    /**
     * 添加节点
     * @param node 节点
     */
    addNode(uiClass, ...params) {
        let length = this.nodes.length;
        for (var i = 0; i < length; i++) {
            if (!this.nodes[i].visible) {
                // this.nodes[i].show(...params);
                this.nodes[i].visible = true;
                //return this.nodes[i];
            }
        }
        // 这里出现了问题，node原本是T类型的，在修改018API后，node变成了UIBehavior类型
        // let node = uiClass.creat();
        let node = UIManager.create(uiClass);
        // node.show(...params);
        this._root.addChild(node.uiObject);
        node.uiObject.autoSizeEnable = true;
        this.nodes.push(node);
        node.visible = true;
        return node;
    }
    /**
     * 移除单个节点
     */
    removeNode(node) {
        const index = this.nodes.indexOf(node);
        if (index >= 0) {
            node.visible = false;
            this.nodes.push(...this.nodes.splice(index, 1));
        }
        this.invalidate();
    }
    /**
     * 移除所有节点
     */
    removeAllNode() {
        let length = this.nodes.length;
        for (var i = 0; i < length; i++) {
            this.nodes[i].visible = false;
            UIManager.hideUI(this.nodes[i]);
        }
    }
    /**
     * 更新布局
     */
    invalidate() {
        let startX = this.left;
        let startY = this.top;
        this.nodes.forEach(element => {
            // if (!element.visible) {
            // 	element.uiObject.position = mw.Vector2.zero;
            // 	return;
            // }
            let slot = element.uiObject;
            let slotSize = element.rootCanvas.size;
            if (this._growDir == mw.Orientation.OrientHorizontal) {
                if (this._isAutoWrap && startX + slotSize.x > this._growSize) {
                    startY += this.spacingY + slotSize.y;
                    startX = this.left;
                }
                slot.position = (new mw.Vector2(startX, startY));
                startX += slotSize.x + this.spacingX;
            }
            else {
                if (this._isAutoWrap && startY + slotSize.y >= this._growSize) {
                    startX += this.spacingX + slotSize.x;
                    startY = this.top;
                }
                slot.position = (new mw.Vector2(startX, startY));
                startY += slotSize.y + this.spacingY;
            }
        });
    }
}

var foreign81 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GridLayout: GridLayout
});

class GeneralManager {
    vscodeChange() {
        let animation;
        animation.speed = 1; // 先通过vscodeF2替换为 rate 再替换为 speed
        let obj;
        obj.gameObjectId; // 先通过vscodeF2替换为 guid 再替换为 gameObjectId
        let camera;
        camera.worldTransform; // 先通过vscodeF2替换为 transform 再替换为 worldTransform
        let model;
        model.onTouch; // 先通过vscodeF2替换为 onEnter 再替换为 onTouch
        model.onTouchEnd; // 先通过vscodeF2替换为 onLeave 再替换为 onTouchEnd 
        let effect;
        effect.maskcolor; // 先通过vscodeF2替换为 color 再替换为 maskcolor
        effect.onFinish; // 先通过vscodeF2替换为 onFinished 再替换为 onFinish
        effect.timeLength; // 先通过vscodeF2替换为 particleLength 再替换为 timeLength
        let sound;
        sound.timePosition; // 先通过vscodeF2替换为 currentProgress 再替换为 timePosition
        sound.timeLength; // 先通过vscodeF2替换为 duration 再替换为 timeLength
        sound.timeLength; // 先通过vscodeF2替换为 timelength 再替换为 timeLength
        sound.isLoop; // 先通过vscodeF2替换为 loop 再替换为 isLoop
        let transform;
        transform.position; // 先通过vscodeF2替换为 location 再替换为 position
        class module extends ModuleC {
            get localPlayer() {
                return null;
            }
            get localPlayerId() {
                return null;
            }
        }
    }
    /**异步获取自定义数据 */
    static async asyncRpcGetData(key) {
        let value = await DataStorage.asyncGetData(key);
        return value.data;
    }
    /**在一个角色的挂点上播放特效 */
    static rpcPlayEffectOnPlayer(source, target, slotType, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target instanceof mw.Player ? target.character : target, {
            slotType: slotType,
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    /**在一个GameObject上播放特效 */
    static rpcPlayEffectOnGameObject(source, target, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target, {
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    /**在指定位置播放特效 */
    static rpcPlayEffectAtLocation(source, location, loopCount, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playAtPosition(source, location, {
            loopCount: loopCount,
            duration: duration,
            rotation: rotation,
            scale: scale,
        });
    }
    /**播放广告 */
    static modifyShowAd(adsType, callback) {
        AdsService.showAd(adsType, isSuccess => {
            if (isSuccess) {
                callback(AdsState.Success);
                callback(AdsState.Close);
                callback(AdsState.Reward);
            }
            else {
                callback(AdsState.Fail);
            }
        });
    }
    /**
     * 激活交互
     */
    static modiftEnterInteractiveState(inter, characterObj) {
        if (!(characterObj instanceof mw.Character)) {
            return Promise.resolve(false);
        }
        let reult = inter.enter(characterObj);
        if (!reult)
            return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            let resultFun = () => {
                inter.onEnter.remove(resultFun);
                resolve(true);
            };
            inter.onEnter.add(resultFun);
        });
    }
    /**
     * 退出交互
     */
    static modifyExitInteractiveState(inter, Location, stance) {
        let result = inter.leave(Location, null, stance);
        return Promise.resolve(result);
    }
    /**描边 */
    static modifyaddOutlineEffect(obj, OutlineColor, OutlineWidth, OutlineDepthOffset, OutlineClampValue, considerCameraPosition, outlineSilhouetteOnly) {
        if (obj instanceof mw.Model) {
            obj.setOutline(true, OutlineColor, OutlineWidth);
        }
    }
    /**取消描边 */
    static modifyRemoveOutlineEffect(obj) {
        if (obj instanceof mw.Model) {
            obj.setOutline(false);
        }
    }
    /**矩形范围检测 */
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(width / 2, height / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    /**废弃的矩形范围检测 */
    static modifyboxOverlapInLevel(StartLocation, EndLocation, Width, Height, debug, IgnoreObjectsGuid, IgnoreByKind, Source) {
        let halfSize = new Vector(Width / 2, Height / 2);
        let orientation = Vector.subtract(EndLocation, StartLocation).toRotation();
        let results = QueryUtil.boxTrace(StartLocation, EndLocation, halfSize, orientation, true, debug, IgnoreObjectsGuid, IgnoreByKind, Source);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    static modifyGetShootDir(chara, startPos, shootRange) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, true, [], false, false, chara);
            dir = end.subtract(start);
            if (hits.length > 0) {
                dir = hits[0].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }
    static modifyProjectWorldLocationToWidgetPosition(player, worldLocation, outScreenPosition, isPlayerViewportRelative) {
        let result = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, isPlayerViewportRelative);
        outScreenPosition.x = result.screenPosition.x;
        outScreenPosition.y = result.screenPosition.y;
        return result.result;
    }
    static setMaterialColor(model, Index, InColor) {
        let materialList = model.getMaterialInstance();
        materialList[Index].getAllVectorParameterName().forEach((v, i) => {
            materialList[Index].setVectorParameterValue(v, InColor);
        });
    }
    static getMaterialColor(model, Index) {
        let materialList = model.getMaterialInstance();
        if (!(materialList.length > 0)) {
            return;
        }
        let nameList = materialList[Index].getAllVectorParameterName();
        return nameList.length > 0 ? materialList[Index].getVectorParameterValue(nameList[0]) : new LinearColor(1, 1, 1, 1);
    }
}

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeneralManager: GeneralManager
});

class SpawnManager {
    static replicateGuid(guid) {
        let res = guid;
        if (this.replicateDic.has(guid)) {
            res = this.replicateDic.get(guid);
        }
        else if (this.deleteDic.has(guid)) {
            console.error("使用已经删除的id", guid);
        }
        return res;
    }
    static modifyPoolSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.spawn(assetId);
        }
        return GameObjPool.spawn(assetId, type);
    }
    static modifyPoolAsyncSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.asyncSpawn(assetId);
        }
        return GameObjPool.asyncSpawn(assetId, type);
    }
    static wornSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.spawn(info);
    }
    static wornAsyncSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.asyncSpawn(info);
    }
    static spawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.spawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
    static asyncSpawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.asyncSpawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
}
SpawnManager.replicateDic = new Map([
    ["104", "Sound"],
    ["109", "SpawnLocation"],
    ["113", "Trigger"],
    ["116", "Interactor"],
    ["117", "BlockingVolume"],
    ["4301", "PointLight"],
    ["4306", "Effect"],
    ["20191", "PhysicsThruster"],
    ["20193", "NavigationVolume"],
    ["21151", "PostProcess"],
    ["108547", "ObjectLauncher"],
    ["119918", "IntegratedMover"],
    ["12683", "SwimmingVolume"],
    ["16037", "UIWidget"],
    ["16038", "WheeledVehicle4W"],
    ["20504", "PhysicsFulcrum"],
    ["20194", "NavModifierVolume"],
    ["20638", "HotWeapon"],
    ["25782", "Anchor"],
    ["67455", "PhysicsImpulse"],
    ["NPC", "Character"],
    ["31969", "Character"],
    ["124744", "Character"],
    ["28449", "Character"],
    ["BlockingArea", "BlockingVolume"],
    ["RelativeEffect", "Effect"],
    ["Thruster", "PhysicsThruster"],
    ["NavMeshVolume", "NavigationVolume"],
    ["PostProcessAdvance", "PostProcess"],
    ["ProjectileLauncher", "ObjectLauncher"],
    ["PhysicsSports", "IntegratedMover"],
]);
SpawnManager.deleteDic = new Map([
    ["110", true],
    ["8444", true],
    ["14090", true],
    ["14971", true],
    ["2695", true],
    ["30829", true],
    ["31479", true],
    ["14197", true],
]);

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SpawnManager: SpawnManager
});

class PlayerManagerExtesion {
    static init() {
        ModuleService.registerModule(RpcExtesionS, RpcExtesionC, null);
    }
    /**是否是npc */
    static isNpc(obj) {
        if ((obj instanceof Character) && obj.player == null) {
            return true;
        }
        return false;
    }
    /**是否是玩家 */
    static isCharacter(obj) {
        if ((obj instanceof Character) && obj.player != null) {
            return true;
        }
        return false;
    }
    static isUseRpc(isSync) {
        if (SystemUtil.isServer()) {
            return false;
        }
        else {
            return isSync;
        }
    }
    //#region Stance姿态相关
    /**
     * 停止姿态
     * @param char character
     * @param sync 是否同步
     */
    static stopStanceExtesion(char, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            char.currentSubStance?.stop();
            return;
        }
        let mtStance = new RpcStance("", char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(char.gameObjectId, mtStance);
    }
    /**改变基础姿态 */
    static changeBaseStanceExtesion(char, assetId) {
        if (!this.isUseRpc(true)) {
            char.currentSubStance?.stop();
            let basicStance = char.loadStance(assetId);
            basicStance.play();
        }
        else {
            let module = ModuleService.getModule(RpcExtesionC);
            module.playBasicStance(char.gameObjectId, assetId);
        }
    }
    /**
     * 改变姿态
     * @param char Character
     * @param assetId 姿态资源id
     */
    static changeStanceExtesion(char, assetId) {
        let sync = true;
        if (!this.isUseRpc(sync)) {
            char.loadSubStance(assetId).play();
            return;
        }
        let mtStance = new RpcStance(assetId, char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(char.gameObjectId, mtStance);
    }
    /**
     * 加载姿态
     * @param char Character
     * @param assetId 姿态资源id
     * @param sync 是否同步
     * @returns 返回姿态
     */
    static loadStanceExtesion(char, assetId, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadSubStance(assetId);
        }
        sync = sync == undefined ? true : sync;
        const stance = new RpcStance(assetId, char);
        return stance;
    }
    //#endregion Stance姿态相关end
    //#region  Animation动画相关
    static rpcPlayAnimation(owner, assetId, loop = 1, speed = 1) {
        let ani = this.loadAnimationExtesion(owner, assetId);
        ani.loop = loop;
        ani.speed = speed;
        ani.play();
        return ani;
    }
    static rpcStopAnimation(owner, assetId) {
        if (!this.isUseRpc(true)) {
            if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
                owner.currentAnimation.stop();
            return;
        }
        if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
            owner.currentAnimation.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(owner.gameObjectId, assetId);
    }
    /**
     * 播放动画
     * @param owner Character
     * @param assetId 动画资源id
     * @param speed 播放速率
     * @param loop 循环次数
     * @returns 返回动画
     */
    static playAnimationLocally(owner, assetId, speed, loop) {
        if (owner === undefined || owner === null)
            return;
        let anim = owner.loadAnimation(assetId);
        anim.loop = loop;
        anim.speed = speed;
        anim.play();
        return anim;
    }
    /**
     * 加载动画
     * @param char Character
     * @param assetid 动画资源id
     * @param sync 是否同步
     * @returns 返回动画
     */
    static loadAnimationExtesion(char, assetid, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadAnimation(assetid);
        }
        const anim = new RpcAnimation(char, assetid);
        return anim;
    }
}
class RpcExtesionC extends ModuleC {
    constructor() {
        super(...arguments);
        this.syncAnimation = null;
    }
    net_playerJoin(playerId) {
        if (this.localPlayerId == playerId)
            return;
        let char = this.localPlayer.character;
        let curAnimation = char.currentAnimation;
        if (!curAnimation)
            return;
        let ani = this.syncAnimation;
        if (ani && curAnimation.assetId == ani.assetId && ani.isPlaying) {
            this.server.net_playAnimationSync(char.gameObjectId, ani.assetId, ani.speed, ani.loop, ani.slot, playerId);
        }
    }
    //#region sync Animation
    playAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = myAnimation;
        }
        this.server.net_playAnimationSync(charGuid, myAnimation.assetId, myAnimation.speed, myAnimation.loop, myAnimation.slot);
    }
    pauseAnimationSync(charGuid, myAnimation) {
        this.server.net_pauseAnimationSync(charGuid, myAnimation.assetId);
    }
    resumeAnimationSync(charGuid, myAnimation) {
        this.server.net_resumeAnimationSync(charGuid, myAnimation.assetId);
    }
    stopAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = null;
        }
        let assetId = typeof myAnimation == "string" ? myAnimation : myAnimation.assetId;
        this.server.net_stopAnimationSync(charGuid, assetId);
    }
    //#endregion sync Animation
    //#region sync Stance
    playBasicStance(charGuid, basicStance) {
        this.server.net_playBasicStance(charGuid, basicStance);
    }
    playStanceSync(charGuid, myStance) {
        this.server.net_playStanceSync(charGuid, myStance.assetId, myStance.blendMode);
    }
    stopStanceSync(charGuid, stance) {
        this.server.net_stopStanceSync(charGuid, stance.assetId);
    }
    net_playAnimation(charGuid, assetId, rate, loop, slot) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.resumeAnimation(charGuid, assetId);
    }
    net_stopAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.stopAnimation(charGuid, assetId);
    }
}
class RpcExtesionS extends ModuleS {
    //#region sync Animation
    async net_playBasicStance(charGuid, basicStance) {
        let char = await GameObject.asyncFindGameObjectById(charGuid);
        char.loadStance(basicStance).play();
    }
    net_playAnimationSync(charGuid, assetId, rate, loop, slot, playerId = 0) {
        if (playerId != 0) {
            this.getClient(playerId).net_playAnimation(charGuid, assetId, rate, loop, slot);
            return;
        }
        this.getAllClient().net_playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimationSync(charGuid, assetId) {
        this.getAllClient().net_pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimationSync(charGuid, assetId) {
        this.getAllClient().net_resumeAnimation(charGuid, assetId);
    }
    net_stopAnimationSync(charGuid, assetId) {
        this.getAllClient().net_stopAnimation(charGuid, assetId);
    }
    //#endregion sync Animation
    //#region sync Stance
    playStanceSync(charGuid, mystance) {
        RpcStance.playStance(charGuid, mystance.assetId, mystance.blendMode);
    }
    net_stopStanceSync(charGuid, assetId) {
        RpcStance.stopStance(charGuid, assetId);
    }
    stopStanceSync(charGuid, stance) {
        RpcStance.stopStance(charGuid, stance.assetId);
    }
    net_playStanceSync(charGuid, assetid, blendMode) {
        RpcStance.playStance(charGuid, assetid, blendMode);
    }
    //#endregion sync Stance
    onPlayerEnterGame(player) {
        this.getAllClient().net_playerJoin(player.playerId);
    }
}
class RpcAnimation {
    constructor(char, assetId) {
        this.ani = null;
        this.assetId = null;
        this.owner = null;
        this._loop = 1;
        this._speed = 1;
        this._slot = mw.AnimSlot.Default;
        this.owner = char;
        this.assetId = assetId;
        this.ani = char.loadAnimation(assetId);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        this.ani.loop = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.ani.speed = value;
    }
    get slot() {
        return this._slot;
    }
    set slot(value) {
        this._slot = value;
        this.ani.slot = value;
    }
    get length() {
        return this.ani.length;
    }
    get isPlaying() {
        return this.ani.isPlaying;
    }
    get onFinish() {
        return this.ani.onFinish;
    }
    play() {
        this.ani?.play();
        let module = ModuleService.getModule(RpcExtesionC);
        module.playAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    pause() {
        this.ani?.pause();
        let module = ModuleService.getModule(RpcExtesionC);
        module.pauseAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    resume() {
        this.ani?.resume();
        let module = ModuleService.getModule(RpcExtesionC);
        module.resumeAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        this.ani?.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    static playAnimation(guid, assetid, speed, loop, slot) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.loadAnimation(assetid);
        anim.loop = loop;
        anim.speed = speed;
        anim.slot = slot;
        anim.play();
        return anim;
    }
    static pauseAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.pause();
    }
    static resumeAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.resume();
    }
    static stopAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.stop();
    }
}
class RpcStance {
    constructor(assetId, owner) {
        this.assetId = null;
        this.owner = null;
        this.blendMode = null;
        this.assetId = assetId;
        this.owner = owner;
    }
    play() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    static playStance(charGuid, assetId, blendMode) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        if (assetId == "") {
            char.currentSubStance?.stop();
            return;
        }
        let stance = char.loadSubStance(assetId);
        if (blendMode != null)
            stance.blendMode = blendMode;
        stance.play();
    }
    static stopStance(charGuid, assetId) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        let currentStance = char.currentSubStance;
        if (currentStance && (currentStance.assetId == assetId || assetId == "")) {
            currentStance.stop();
        }
    }
}
PlayerManagerExtesion.init();

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerManagerExtesion: PlayerManagerExtesion
});

let Tips_generate = class Tips_generate extends UIScript {
    get mCell1() {
        if (!this.mCell1_Internal && this.uiWidgetBase) {
            this.mCell1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell1');
        }
        return this.mCell1_Internal;
    }
    get mCell2() {
        if (!this.mCell2_Internal && this.uiWidgetBase) {
            this.mCell2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell2');
        }
        return this.mCell2_Internal;
    }
    get mCell3() {
        if (!this.mCell3_Internal && this.uiWidgetBase) {
            this.mCell3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCell3');
        }
        return this.mCell3_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell1/Content_txt"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell2/Content_txt"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCell3/Content_txt"));
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
Tips_generate = __decorate([
    UIBind('UI/uiTemplate/common/Tips.ui')
], Tips_generate);
var Tips_Generate = Tips_generate;

var foreign96 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Tips_Generate
});

/**
 * 系统提示
 * 一个顶一个向上跳动，然后消失，最多三条
 */
class Tips extends Tips_Generate {
    constructor() {
        super(...arguments);
        this.freeCellArr = []; //当前空闲的条目
        this.activeCellArr = []; //当前激活的条目
        this.overCellArr = []; //已经完成的条目
    }
    static get instance() {
        if (this._instance == null) {
            this._instance = UIManager.create(Tips);
        }
        return this._instance;
    }
    onAwake() {
        super.onAwake();
        this.layer = mw.UILayerTop;
        Event.addServerListener("Event_ShowTips", (content) => {
            Tips.show(content);
        });
    }
    onShow(...params) {
        this.canUpdate = true;
    }
    onStart() {
        this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];
        for (let i = 0; i < this.freeCellArr.length; i++) {
            this.freeCellArr[i].visibility = mw.SlateVisibility.Collapsed;
        }
    }
    /**
     * 在客户端显示
     * @param player 玩家
     * @param content 内容
     */
    static showToClient(player, content) {
        Event.dispatchToClient(player, "Event_ShowTips", content);
    }
    /**
     * 显示系统提示 (Client Only)
     * @param content 提示内容
     */
    static show(content, player) {
        if (SystemUtil.isServer()) {
            if (player == null) {
                console.log("Tips:show:No player set!");
            }
            else {
                this.showToClient(player, content);
            }
        }
        else {
            UIManager.showUI(this.instance);
            this.instance.rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.instance.canUpdate = true;
            this.instance.showMsg(content);
        }
    }
    showMsg(content) {
        let cell = null;
        if (this.freeCellArr.length > 0) {
            cell = this.freeCellArr.shift();
        }
        else {
            cell = this.activeCellArr.shift();
        }
        let text = cell.findChildByPath('Content_txt');
        text.text = content;
        cell["state"] = 0;
        cell["stopTime"] = 0;
        this.activeCellArr.push(cell);
    }
    onUpdate(dt) {
        if (this.activeCellArr.length == 0)
            return;
        let pos = null;
        for (let i = 0; i < this.activeCellArr.length; i++) {
            let cell = this.activeCellArr[i];
            switch (cell["state"]) {
                case 0:
                    cell.visibility = (mw.SlateVisibility.Visible);
                    pos = cell.position;
                    pos.y = Tips.Y_START;
                    cell.position = pos;
                    cell["state"]++;
                    break;
                case 1:
                    pos = cell.position;
                    pos.y -= Tips.MOVE_SPEED * dt;
                    if (i == 0) {
                        if (pos.y <= Tips.Y_OVER) {
                            pos.y = Tips.Y_OVER;
                            cell["state"]++;
                        }
                    }
                    else {
                        let lastCellPos = this.activeCellArr[i - 1].position;
                        if (pos.y <= lastCellPos.y + 60) {
                            pos.y = lastCellPos.y + 60;
                            cell["stopTime"] += dt;
                            if (cell["stopTime"] >= Tips.KEEP_TIME) {
                                cell["state"] += 2;
                            }
                        }
                    }
                    cell.position = pos;
                    break;
                case 2:
                    cell["stopTime"] += dt;
                    if (cell["stopTime"] >= Tips.KEEP_TIME) {
                        cell["state"]++;
                    }
                    break;
                case 3:
                    cell.visibility = mw.SlateVisibility.Collapsed;
                    this.overCellArr.push(cell);
                    break;
            }
        }
        while (this.overCellArr.length > 0) {
            let cell = this.overCellArr.shift();
            let index = this.activeCellArr.indexOf(cell);
            this.activeCellArr.splice(index, 1);
            this.freeCellArr.push(cell);
        }
    }
    onDestroy() {
        Tips._instance = null;
    }
}
Tips.Y_START = 400;
Tips.Y_OVER = 250;
Tips.MOVE_SPEED = 300;
Tips.KEEP_TIME = 1;

var foreign82 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Tips
});

class GameUtils {
    static getRandomWeightIndex(weights) {
        let totalWeight = 0;
        for (let w of weights) {
            totalWeight += w;
        }
        let ranNum = Math.random() * totalWeight;
        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
            if (ranNum <= sum) {
                return i;
            }
        }
        return 0;
    }
    static getRandomWerghtIndex2(weights) {
        let totalWeight = 0;
        for (let i = 0; i < weights.length; i++) {
            totalWeight += weights[i][1];
        }
        let ranNum = Math.random() * totalWeight;
        let sum = 0;
        let result = 0;
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i][1];
            if (ranNum <= sum) {
                result = weights[i][0];
                return result;
            }
        }
        return null;
    }
    //画圆找点
    static suan(distance, angle) {
        let x = Math.cos((angle * Math.PI) / 180) * distance;
        let y = Math.sin((angle * Math.PI) / 180) * distance;
        return new mw.Vector(x, y, 0);
    }
    //随机
    static getRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return Min + Math.round(Rand * Range);
    }
    //抛物线
    static paowu(t, obj, _v, dropMinZ) {
        let Gravity = -GameUtils.Gravity;
        let interval = setInterval((time = t) => {
            let x = 0;
            let y = 0;
            x += _v.x * time;
            y += _v.y * time;
            let z = _v.z * time + time * time * 0.5 * GameUtils.Gravity;
            _v.z += Gravity * time;
            obj.worldTransform.position = new mw.Vector(obj.worldTransform.position.x + x, obj.worldTransform.position.y + y, obj.worldTransform.position.z + z);
            if (obj.worldTransform.position.z >= dropMinZ) {
                return;
            }
            obj["CanPick"] = true;
            clearInterval(interval);
        }, t * this.getRandomNum(0.1, 5));
    }
    /**
     * @description: 抛物线2
     * @param {Type} start
     * @param {Type} target
     * @param {Core} obj
     * @param {number} time
     * @param {number} height
     * @param {*} onComplete
     * @return {*}
     */
    static parabola(start, target, obj, time, height = 100, onComplete) {
        let gravity = 8 * height / time / time;
        let vX = (target.x - start.x) / time;
        let vY = (target.y - start.y) / time;
        let vZ = gravity * time / 2;
        new mw.Tween({ time: 0 })
            .to({ time: time }, time * 1000)
            .onUpdate(r => {
            let dZ = 0.5 * -gravity * r.time * r.time;
            const reslut = new mw.Vector(start.x + vX * r.time, start.y + vY * r.time, start.z + vZ * r.time + dZ);
            obj.worldTransform.position = reslut;
        }).start().onComplete(() => {
            if (onComplete)
                onComplete();
        });
    }
    // 插值
    static lerpVector(from, to, ratio) {
        return from.add(mw.Vector.multiply(to.subtract(from), ratio));
    }
    /**
     * 用于秒数转换时 分 秒
     * @param time
     * @returns
     */
    static getTimeStringHMS(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.floor((time % 3600) % 60);
        let hh = (hours < 10 ? "0" + hours : hours).toString();
        let mm = minutes < 10 ? "0" + minutes : minutes.toString();
        let ss = seconds < 10 ? "0" + seconds : seconds.toString();
        let num = (hh + ":" + mm + ":" + ss).split("").join(" ");
        return num;
    }
    /**
     * 用于秒数转换分 秒
     * @param time
     * @returns
     */
    static getTimeStringMS(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        let mm = minutes < 10 ? "0" + minutes : minutes.toString();
        let ss = seconds < 10 ? "0" + seconds : seconds.toString();
        let num = (mm + ":" + ss).split("").join(" ");
        return num;
    }
    /**
     * 用于秒数转换分 秒
     * @param time
     * @returns
     */
    static getTimeStringS(time) {
        let seconds = Math.floor(time % 60);
        let ss = seconds < 10 ? "0" + seconds : seconds.toString();
        let num = (ss).split("").join(" ");
        return num;
    }
    static spawnGameObject(assetId, replicate) {
        let go = SpawnManager.wornSpawn(assetId, replicate);
        if (!go) {
            console.error(`找不到assetId=${assetId}对应的物体！！！`);
        }
        return go;
    }
    static noRepeatFilter(arr, num) {
        let newArr = this.arrCopy(arr);
        let result = [];
        for (let i = 0; i < num; i++) {
            let random = Math.floor(Math.random() * newArr.length);
            result.push(newArr[random]);
            newArr.splice(random, 1);
        }
        return result;
    }
    static numberArrayToVector(arr, defaultV = 0) {
        let vec = new mw.Vector(defaultV);
        if (arr) {
            if (arr.length > 0)
                vec.x = arr[0];
            if (arr.length > 1)
                vec.y = arr[1];
            if (arr.length > 2)
                vec.z = arr[2];
        }
        return vec;
    }
    static numberArrayToRocation(arr, defaultV = 0) {
        let rot = new mw.Rotation();
        if (arr) {
            if (arr.length > 0)
                rot.x = arr[0];
            else
                rot.x = defaultV;
            if (arr.length > 1)
                rot.y = arr[1];
            else
                rot.y = defaultV;
            if (arr.length > 2)
                rot.z = arr[2];
            else
                rot.z = defaultV;
        }
        return rot;
    }
    static clamp(min, max, value) {
        if (min > max)
            return GameUtils.clamp(max, min, value);
        return Math.min(max, Math.max(min, value));
    }
    /**数值插值运算 */
    static numLerp(a, b, lerp) {
        if (lerp < 0)
            lerp = 0;
        if (lerp > 1)
            lerp = 1;
        return a + (b - a) * lerp;
    }
    /**三维变量插值运算 */
    static vectorLerp(v1, v2, lerp) {
        let x = 0;
        let y = 0;
        let z = null;
        x = GameUtils.numLerp(v1.x, v2.x, lerp);
        y = GameUtils.numLerp(v1.y, v2.y, lerp);
        if (v1 instanceof mw.Vector) {
            z = GameUtils.numLerp(v1.z, v2.z, lerp);
        }
        return z == null ? new mw.Vector2(x, y) : new mw.Vector(x, y, z);
    }
    /**
     * 判断玩家是否在移动
     */
    static checkIsMove() {
        let character = Player.localPlayer.character;
        let isJump = character.isJumping;
        if (character.velocity.length != 0 && !isJump && character.movementMode != mw.MovementMode.Fly) {
            return true;
        }
        return false;
    }
    /**
     * 获取随机的小数
     * @param min 最小值
     * @param max 最大值
     * @returns 随机数
     */
    static randomNumber(min, max) {
        switch (arguments.length) {
            case 1:
                return Math.random() * min + 1;
            case 2:
                return Math.random() * (max - min + 1) + min;
            default:
                return 0;
        }
    }
    /**
     * 生成随机的整数
     * @param number 最大值
     * @returns 随机值(0, number]
     */
    static randInt(number) {
        let today = new Date();
        let seed = today.getTime();
        let nseed = (seed * 9301 + 49297) % 233280;
        let rnd = nseed / 233280.0;
        return Math.ceil(rnd * number);
    }
    /**
     * 随机获取指定范围内的整数
     * @param Min 起始值
     * @param Max 最大值
     * @returns 随机整数[min, max]
     */
    static getRandomRangeNum(min, max) {
        let Range = max - min;
        let Rand = Math.random();
        return min + Math.round(Rand * Range);
    }
    /**
     * 随机小数
     * @param min
     * @param max
     * @returns
     */
    static getRandomRangeFloat(min, max) {
        let Range = max - min;
        let Rand = Math.random();
        return min + Rand * Range;
    }
    /**
     * 获取当前坐标附近范围随机坐标
     */
    static randomLoc(loc, dis) {
        let x = loc.x;
        let y = loc.y;
        let z = loc.z;
        let newX = this.randomNumber(x, x + dis);
        let newY = this.randomNumber(y, y + dis);
        let newLoc = new mw.Vector(newX, newY, z);
        return newLoc;
    }
    static randomPos(pos, dis = 100) {
        pos.x = this.randomNumber(pos.x - dis, pos.x + dis);
        pos.y = this.randomNumber(pos.y - dis, pos.y + dis);
        return pos;
    }
    /**字符串格式化  "StringFormat("{0}给了我{1}","小明","苹果") */
    static stringFormat(...args) {
        if (args.length == 0)
            return null;
        var str = args[0];
        for (var i = 1; i < args.length; i++) {
            var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            str = str.replace(re, args[i]);
        }
        return str;
    }
    /**概率数组 */
    static randomProb(probs) {
        let t_curValue = 0;
        let t_maxValue = 0;
        for (let i = 0; i < probs.length; i++) {
            t_maxValue += probs[i];
        }
        let t_random = mw.MathUtil.randomInt(0, t_maxValue);
        let t_index = -1;
        for (let index = 0; index < probs.length; index++) {
            const t_value = probs[index];
            let t_allValue = t_curValue + t_value;
            if (t_random >= t_curValue && t_random <= t_allValue) {
                t_index = index;
                break;
            }
            t_curValue = t_allValue;
        }
        return t_index;
    }
    // 单位向量转角度
    static vector2Angle(direction) {
        let t_angle = mw.Vector.angle(direction, new mw.Vector(1, 0, 0));
        if (direction.y < 0) {
            t_angle = -t_angle;
        }
        return t_angle;
    }
    /**判断该物体是否是触发器等逻辑对象 */
    static isTrigger(obj) {
        return obj instanceof mw.Trigger || obj instanceof mw.Sound || obj instanceof mw.Effect;
    }
    // 计算两个向量所在平面的法线
    static generateNormal(vec0, vec1) {
        return this.cross(vec0, vec1);
    }
    static cross(vec0, vec1) {
        return mw.Vector.cross(vec0, vec1);
    }
    static rangeInt(min, max) {
        return Math.floor(GameUtils.rangeFloat(min, max));
    }
    static rangeFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    /**圆形区域选取随机点
     * @param point 圆心
     * @param radius 半径
     * @param isPlane 是否仅在水平面随机
     */
    static randomCirclePos(point, radius, isPlane) {
        //随机半径
        var r = Math.random() * radius;
        //随机方向 -180~180
        //如果是平面，仅改变Z轴角度，如果非平面，要随机3个角度
        if (isPlane) {
            //随机一个角度（180~-180）
            var angle = Math.random() * 360 - 180;
            var x = Math.sin(angle);
            var y = Math.cos(angle);
            //选取一个合适的高度
            var pos = new mw.Vector(point.x + x * r, point.y + y * r, point.z);
            return pos;
        }
        else {
            return null;
        }
    }
    /**
     * 返回一个在min和max之间的随机浮点数,线性同余随机数
     */
    static randomRange(min, max) {
        let seed = new Date().getTime();
        max = max || 1;
        min = min || 0;
        seed = (seed * 9301 + 49297) % 233280;
        var rnd = seed / 233280.0;
        return min + Math.round(rnd * (max - min));
    }
    /**是否是玩家 */
    static isPlayerCharacter(go) {
        if (SystemUtil.isServer()) {
            return false;
        }
        if (PlayerManagerExtesion.isCharacter(go)) {
            return go.gameObjectId && go.gameObjectId == getMyCharacterGuid();
        }
        else if (go instanceof mw.Player) {
            return go.playerId && go.playerId == getMyPlayerID();
        }
        return false;
    }
    /**是否是AI */
    static isAICharacter(go) {
        return PlayerManagerExtesion.isNpc(go);
    }
    /**获取名字长度 */
    static getNameLen(name) {
        let num = 0;
        for (let i = 0; i < name.length; i++) {
            let str = name[i];
            if (/[\u4e00-\u9fa5]/.test(str)) {
                num += 1.6; //汉字
            }
            else {
                num++; //其他字符
            }
        }
        return num;
    }
    static getLanguage(id) {
        let textEle = GameConfig.SquareLanguage.getElement(id);
        if (!textEle) {
            // console.error("getLanguage 出错 id:" + id);
            return;
        }
        let lbSize = 0;
        // switch (GameUtils.systemLanguageIndex) {
        //     case 0:
        //         lbSize = textEle.EnglishSize;
        //         break;
        //     case 1:
        //         lbSize = textEle.ChinsesSize;
        //         break;
        //     case 2:
        //         lbSize = textEle.JanpanseSize;
        //         break;
        //     case 3:
        //         lbSize = textEle.GermanSize;
        //         break;
        // }
        return { info: textEle.Value, size: lbSize };
    }
    static getTxt(key) {
        if (!key)
            return 'None';
        let info = GameConfig.SquareLanguage.getElement(key);
        if (!info)
            info = GameConfig.SquareLanguage[key];
        if (info && info.Value != undefined)
            return info.Value;
        return 'None_' + key;
    }
    static uiTween(ui, toLoc, duration, startRender, toRender, startLoc, func, funcArg1) {
        let newPos = mw.Vector2.zero;
        if (startRender) {
            ui.renderOpacity = startRender;
            ui.position = toLoc;
            new Tween({ x: toLoc.x, y: toLoc.y, render: startRender })
                .to({ x: duration.x, y: duration.y, render: toRender }, startLoc * 1000)
                .start()
                .onUpdate(loc => {
                newPos.x = loc.x;
                newPos.y = loc.y;
                ui.position = newPos;
                ui.renderOpacity = loc.render;
            })
                .onComplete(() => {
                if (funcArg1) {
                    func.call(funcArg1);
                    return;
                }
                func?.call();
                console.log("UITween Over");
            });
        }
        else {
            new Tween(ui.position)
                .to({ x: toLoc.x, y: toLoc.y }, duration * 1000)
                .start()
                .onUpdate(loc => {
                newPos.x = loc.x;
                newPos.y = loc.y;
                ui.position = newPos;
            })
                .onComplete(() => {
                if (funcArg1) {
                    func.call(funcArg1);
                    return;
                }
                func?.call();
                console.log("UITween Over");
            });
        }
    }
    static inDistance(a, b, distance) {
        return mw.Vector.squaredDistance(a, b) <= Math.pow(distance, 2);
    }
    /**下载资源 */
    static async downAsset(guid) {
        let arr = guid.split(",");
        for (let key in arr) {
            if (!StringUtil.isEmpty(arr[key]) && !mw.AssetUtil.assetLoaded(arr[key]))
                await mw.AssetUtil.asyncDownloadAsset(arr[key]);
        }
    }
    /**
     * 随机洗牌
     * @param arr
     * @param start 开始的位置
     * @param end 结束的位置
     */
    static shuffleCards(arr, start = 0, end = -1) {
        if (end == -1) {
            end = arr.length - 1;
        }
        let temp = null;
        let randNum = null;
        for (let i = start; i < end; i++) {
            randNum = MathUtil.randomInt(i, arr.length);
            temp = arr[randNum];
            arr[randNum] = arr[i];
            arr[i] = temp;
        }
    }
    static arrCopy(arr) {
        let copyarr = [];
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            copyarr.push(element);
        }
        return copyarr;
    }
    static getUIPostion(ui) {
        let pos = new mw.Vector2(0, 0);
        pos.x = ui.position.x;
        pos.y = ui.position.y;
        let parent = ui.parent;
        while (parent) {
            pos = pos.add(parent.position);
            parent = parent.parent;
        }
        return pos;
    }
    /**
     * 异步使用资源
     * @param assetId 资源id
     * @param fun 加载好资源后调用
     * @param thisArgs {@link fun}的this指向
     * @param args {@link fun}的参数
     * @returns
     */
    static asyncUseAsset(assetId, fun, thisArgs, ...args) {
        return new Promise((resolve) => {
            const a = AssetUtil.assetLoaded(assetId);
            if (a) {
                resolve(fun.call(thisArgs, ...args));
            }
            else {
                AssetUtil.asyncDownloadAsset(assetId).then((s) => {
                    resolve(fun.call(thisArgs, ...args));
                });
            }
        });
    }
    static async getIconByAsset(assetID) {
        let res = null;
        if (assetID && assetID != "") {
            await mw.assetIDChangeIconUrlRequest([assetID]);
            res = mw.getAssetIconDataByAssetID(assetID);
        }
        return res;
    }
    static addTriggerEvent(onlySelf, trigger, callback, isEnter) {
        // oTraceError("addTriggerEvent");
        this.clearTriggerEvent(trigger, isEnter);
        let callbackFunc = (go) => {
            if (SystemUtil.isServer()) {
                onlySelf = false;
            }
            if (go && go.player) {
                if (onlySelf && go.player != Player.localPlayer) {
                    return;
                }
                callback(go.player);
            }
        };
        if (isEnter) {
            trigger["onEnter_func"] = callbackFunc;
            trigger.onEnter.add(callbackFunc);
        }
        else {
            trigger["onLeave_func"] = callbackFunc;
            trigger.onLeave.add(callbackFunc);
        }
    }
    static clearTriggerEvent(trigger, isEnter) {
        if (isEnter) {
            let callbackFunc = trigger["onEnter_func"];
            if (callbackFunc) {
                trigger.onEnter.remove(callbackFunc);
                trigger["onEnter_func"] = null;
            }
        }
        else {
            let callbackFunc = trigger["onLeave_func"];
            if (callbackFunc) {
                trigger.onLeave.remove(callbackFunc);
                trigger["onLeave_func"] = null;
            }
        }
    }
    /**
     * 静态轮询
     * @param interval 间隔时间，毫秒
     * @param call 每帧检测函数
     * @param count 检测最大次数，-1 不限制次数
     * @returns
     */
    static staticloop(call, interval = 100, count = 2400) {
        return new Promise((resolve, reject) => {
            let handler = setInterval(() => {
                if (count > 0) {
                    count--;
                }
                let rst = call();
                if (count == 0 || rst) {
                    clearInterval(handler);
                    resolve(rst);
                }
            }, interval);
        });
    }
    /**播放音效bgm */
    static playSoundOrBgm(id, target = null) {
        let info = GameConfig.Music.getElement(id);
        if (info) {
            if (info.IsBGM == 1) {
                //是bgm
                return SoundService
                    .playBGM(info.MusicGUID, info.Music);
            }
            else {
                if (info.MusicRange && info.MusicRange.length == 2) {
                    //3d音效
                    let param = {
                        innerRadius: info.MusicRange[0],
                        falloffDistance: info.MusicRange[1]
                    };
                    return SoundService
                        .play3DSound(info.MusicGUID, target, info.loopNum, info.Music, param);
                }
                else {
                    //2d音效
                    return SoundService
                        .playSound(info.MusicGUID, info.loopNum, info.Music);
                }
            }
        }
        return null;
    }
}
GameUtils.Gravity = 5000; //重力
//获取系统语言索引
GameUtils.systemLanguageIndex = null;
/**
 * 单例装饰器
 * @param newFun 创建的方法，如果没有则调用new
 * @param args {@link newFun}的参数或构造函数的参数
 * @returns
 */
function single(newFun, ...args) {
    return function (constructor) {
        Object.defineProperty(constructor, "instance", {
            get() {
                if (newFun) {
                    constructor["_instance"] = newFun();
                }
                else {
                    constructor["_instance"] = new constructor();
                }
                Object.defineProperty(constructor, "instance", {
                    get() {
                        return constructor["_instance"];
                    },
                });
                return constructor["_instance"];
            },
        });
    };
}

var foreign108 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameUtils,
    single: single
});

var PlayerManager_1;
var PlayerInfoEvent;
(function (PlayerInfoEvent) {
    PlayerInfoEvent["net_StateChange"] = "net_StateChange";
    PlayerInfoEvent["net_TitleChange"] = "net_TitleChange";
    PlayerInfoEvent["net_PlayerChat"] = "net_PlayerChat";
    PlayerInfoEvent["net_AddPlayerBuff"] = "net_AddPlayerBuff";
    PlayerInfoEvent["net_RemovePlayerBuff"] = "net_RemovePlayerBuff";
})(PlayerInfoEvent || (PlayerInfoEvent = {}));
let PlayerManager = PlayerManager_1 = class PlayerManager {
    constructor() {
        this.eventInit();
        Event.addLocalListener("Player_Init", (playerID, info) => {
            PlayerManager_1.playerInfoMap.set(playerID, info);
        });
    }
    eventInit() {
        if (SystemUtil.isServer()) {
            Event.addClientListener(PlayerInfoEvent.net_StateChange, (player, stateType, bool, playerID) => {
                this.setPlayerState(stateType, bool, playerID);
            });
            Event.addClientListener(PlayerInfoEvent.net_TitleChange, (player, title) => {
                this.changeTitle(title, player);
            });
        }
        else {
            Event.addServerListener(PlayerInfoEvent.net_PlayerChat, (chat, playerID) => {
                this.chat(chat, playerID);
            });
        }
    }
    deletePlayer(playerID) {
        if (PlayerManager_1.playerInfoMap.has(playerID)) {
            PlayerManager_1.playerInfoMap.get(playerID).destroy();
            PlayerManager_1.playerInfoMap.delete(playerID);
        }
    }
    setPlayerState(stateType, bool, player) {
        const playerID = this.hasPlayer(player);
        if (playerID != 0) {
            const info = PlayerManager_1.playerInfoMap.get(playerID);
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_StateChange, stateType, bool, playerID);
            }
            info.setState(stateType, bool);
        }
    }
    playerIsFree(player) {
        const playerID = this.hasPlayer(player);
        if (playerID != 0) {
            const info = PlayerManager_1.playerInfoMap.get(playerID);
            if (info.myState == PlayerStateType.None)
                return true;
        }
        return false;
    }
    changeTitle(title, player) {
        const playerID = this.hasPlayer(player);
        if (playerID != 0) {
            const info = PlayerManager_1.playerInfoMap.get(playerID);
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_TitleChange, title);
            }
            else {
                info.myTitle = title;
            }
        }
    }
    chat(str, player) {
        const playerID = this.hasPlayer(player);
        if (playerID != 0) {
            const info = PlayerManager_1.playerInfoMap.get(playerID);
            if (SystemUtil.isClient()) {
                info.showChat(str);
            }
            else {
                for (const i of PlayerManager_1.getNearPlayer(info.character, 3000)) {
                    Event.dispatchToClient(i.player, PlayerInfoEvent.net_PlayerChat, str, playerID);
                }
            }
        }
    }
    //#endregion
    hasPlayer(player) {
        if (!player)
            player = getMyPlayerID();
        const playerID = typeof player === "number" ? player : player.playerId;
        if (playerID && PlayerManager_1.playerInfoMap.has(playerID)) {
            return playerID;
        }
        return 0;
    }
    /**
     * @description: 获得范围内的所有玩家
     * @param {Core} core
     * @param {number} range
     * @param {boolean} containSelf 是否包含自己
     * @return {*}
     */
    static getNearPlayer(core, range, containSelf = true) {
        let infos = [];
        for (const [index, info] of PlayerManager_1.playerInfoMap) {
            if (info.character) {
                if (info.character.gameObjectId == core.gameObjectId) {
                    if (containSelf)
                        infos.push(info);
                    continue;
                }
                const loc = info.character.worldTransform.position;
                if (GameUtils.inDistance(core.worldTransform.position, loc, range)) {
                    infos.push(info);
                }
            }
        }
        return infos;
    }
    /**
     * @description: 获取范围内最近的玩家
     * @param {Core} core
     * @param {number} range
     * @return {*}
     */
    static getNearestPlayer(core, range) {
        let result = null;
        let max = range * range;
        for (const [index, info] of PlayerManager_1.playerInfoMap) {
            if (info.character) {
                if (info.character.gameObjectId == core.gameObjectId) {
                    continue;
                }
                const loc = info.character.worldTransform.position;
                let distance = Vector.squaredDistance(core.worldTransform.position, loc);
                if (distance < max) {
                    max = distance;
                    result = info;
                }
            }
        }
        return result;
    }
    /**
     * @description: 判断玩家是否在范围内
     * @param {Gameplay} player
     * @param {number} range
     * @param {Core} pos
     * @return {*}
     */
    static playerInRange(player, range, pos) {
        const playerID = typeof player === "number" ? player : 0;
        if (playerID && PlayerManager_1.playerInfoMap.has(playerID)) {
            const info = PlayerManager_1.playerInfoMap.get(playerID);
            if (info.character) {
                return GameUtils.inDistance(info.character.worldTransform.position, pos, range);
            }
        }
        return false;
    }
    update(dt) {
    }
};
PlayerManager.instance = null;
PlayerManager.playerInfoMap = new Map();
PlayerManager = PlayerManager_1 = __decorate([
    single()
], PlayerManager);
var PlayerManager$1 = PlayerManager;
PlayerManager.instance;

var foreign65 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerManager$1
});

let ActionBtn_generate = class ActionBtn_generate extends UIScript {
    get nameText() {
        if (!this.nameText_Internal && this.uiWidgetBase) {
            this.nameText_Internal = this.uiWidgetBase.findChildByPath('Canvas/nameText');
        }
        return this.nameText_Internal;
    }
    get descText() {
        if (!this.descText_Internal && this.uiWidgetBase) {
            this.descText_Internal = this.uiWidgetBase.findChildByPath('Canvas/descText');
        }
        return this.descText_Internal;
    }
    get yesBtn() {
        if (!this.yesBtn_Internal && this.uiWidgetBase) {
            this.yesBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/yesBtn');
        }
        return this.yesBtn_Internal;
    }
    get noBtn() {
        if (!this.noBtn_Internal && this.uiWidgetBase) {
            this.noBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/noBtn');
        }
        return this.noBtn_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.yesBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "yesBtn");
        });
        this.yesBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "yesBtn");
        });
        this.yesBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "yesBtn");
        });
        this.yesBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.noBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "noBtn");
        });
        this.noBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "noBtn");
        });
        this.noBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "noBtn");
        });
        this.noBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.yesBtn);
        this.setLanguage(this.noBtn);
        //文本多语言
        this.setLanguage(this.nameText);
        this.setLanguage(this.descText);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
ActionBtn_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/ActionModule/ActionBtn.ui')
], ActionBtn_generate);
var ActionBtn_Generate = ActionBtn_generate;

var foreign100 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ActionBtn_Generate
});

/**
 * @Author       : metag
 * @Date         : 2023-06-19 10:02:03
 * @LastEditors  : meta
 * @LastEditTime : 2023-08-02 14:28:34
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\ui\action\ActionBaseHud.ts
 * @Description  :
 */
class ActionBaseHud {
    constructor() {
        //当前z值
        this.zIndex = 0;
        //item列表
        this.itemList = [];
        this.cons = new Map();
    }
    /**
     * 获取Item
     * @returns
     */
    getItem() {
        if (this.itemList.length <= 0) {
            this.createItem();
        }
        let item = this.itemList.splice(0, 1)[0];
        return item;
    }
    /**
     * 建造item
     */
    createItem() {
        let data = UIManager.create(ActionBtn);
        data.noBtn.onClicked.add(() => {
            this.removePlayer(data.id);
        });
        UIManager.getUI(Game_HUDUI).rootCanvas.addChild(data.uiObject);
        let size = data.uiObject.size.multiply(0.5);
        let pos = UIManager.canvas.size.multiply(0.5);
        data.uiObject.position = new mw.Vector2(pos.x - size.x, pos.y - size.y - 200);
        this.itemList.push(data);
    }
    /**
     * 添加玩家响应按钮
     * @param id
     */
    addPlayer(id, guid, name) {
        if (this.cons.has(id)) {
            let data = this.cons.get(id);
            data.setData(id, guid, name);
            data.setZIndex(++this.zIndex);
            data.show();
            return;
        }
        let data = this.getItem();
        data.setData(id, guid, name);
        data.setZIndex(++this.zIndex);
        data.show();
        this.cons.set(id, data);
    }
    /**
     * 移除玩家响应按钮
     * @param id
     */
    removePlayer(id) {
        let con = this.cons.get(id);
        if (!con) {
            return;
        }
        con.hide();
        this.itemList.push(con);
        this.cons.delete(id);
    }
}
class ActionBtn extends ActionBtn_Generate {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.time = 0;
        /**接受 */
        this.text1 = "";
        /**拒绝 */
        this.text2 = "";
        /**描述 */
        this.desc = "";
    }
    onStart() {
        this.yesBtn.onClicked.add(() => {
            this.onAccept();
        });
        this.text1 = ActionLuanguage.acceptText;
        this.text2 = ActionLuanguage.refuseText;
        this.yesBtn.text = this.text1;
        this.desc = ActionLuanguage.desc1 + ActionLuanguage.desc2;
        this.yesBtn.normalImageGuid = ActionLuanguage.isOverseas ? "95786" : "95788";
    }
    /**
     * 设置层级
     * @param zIndex
     */
    setZIndex(zIndex) {
        this.uiObject.zOrder = zIndex;
    }
    setData(id, guid, name) {
        this.time = 5;
        this.nameText.text = name;
        this.descText.text = this.desc;
        this.noBtn.text = `${this.text2}(${this.time})S`;
        this.id = id;
    }
    onUpdate(dt) {
        if (this.time > 0) {
            this.time -= dt;
            this.noBtn.text = `${this.text2}(${Math.floor(this.time)})S`;
        }
        else {
            this.hide();
        }
    }
    onAccept() {
        ModuleService.getModule(ActionModuleC).aceeptAction(this.id);
        this.noBtn.onClicked.broadcast();
    }
    show() {
        this.uiObject.visibility = mw.SlateVisibility.Visible;
        this.canUpdate = true;
    }
    hide() {
        this.uiObject.visibility = mw.SlateVisibility.Hidden;
        this.canUpdate = false;
    }
}

var foreign70 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ActionBaseHud: ActionBaseHud,
    ActionBtn: ActionBtn
});

let ActionPanel_generate = class ActionPanel_generate extends UIScript {
    get mCon() {
        if (!this.mCon_Internal && this.uiWidgetBase) {
            this.mCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon');
        }
        return this.mCon_Internal;
    }
    get mTypeBar1() {
        if (!this.mTypeBar1_Internal && this.uiWidgetBase) {
            this.mTypeBar1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mTypeBar1');
        }
        return this.mTypeBar1_Internal;
    }
    get mTypeBar2() {
        if (!this.mTypeBar2_Internal && this.uiWidgetBase) {
            this.mTypeBar2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mTypeBar2');
        }
        return this.mTypeBar2_Internal;
    }
    get mListCon() {
        if (!this.mListCon_Internal && this.uiWidgetBase) {
            this.mListCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mListCon');
        }
        return this.mListCon_Internal;
    }
    get mScr() {
        if (!this.mScr_Internal && this.uiWidgetBase) {
            this.mScr_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mListCon/mScr');
        }
        return this.mScr_Internal;
    }
    get mContent() {
        if (!this.mContent_Internal && this.uiWidgetBase) {
            this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mListCon/mScr/mContent');
        }
        return this.mContent_Internal;
    }
    get mCloseBtn() {
        if (!this.mCloseBtn_Internal && this.uiWidgetBase) {
            this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCon/mCloseBtn');
        }
        return this.mCloseBtn_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mTypeBar1.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mTypeBar1");
        });
        this.mTypeBar1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTypeBar1");
        });
        this.mTypeBar1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTypeBar1");
        });
        this.mTypeBar1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mTypeBar2.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mTypeBar2");
        });
        this.mTypeBar2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTypeBar2");
        });
        this.mTypeBar2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTypeBar2");
        });
        this.mTypeBar2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
        });
        this.mCloseBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mCloseBtn");
        });
        this.mCloseBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mCloseBtn");
        });
        this.mCloseBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mTypeBar1);
        this.setLanguage(this.mTypeBar2);
        this.setLanguage(this.mCloseBtn);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
ActionPanel_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/ActionModule/ActionPanel.ui')
], ActionPanel_generate);
var ActionPanel_generate$1 = ActionPanel_generate;

var foreign102 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ActionPanel_generate$1
});

let ActionItem_generate = class ActionItem_generate extends UIScript {
    get mBg() {
        if (!this.mBg_Internal && this.uiWidgetBase) {
            this.mBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBg');
        }
        return this.mBg_Internal;
    }
    get iconImg() {
        if (!this.iconImg_Internal && this.uiWidgetBase) {
            this.iconImg_Internal = this.uiWidgetBase.findChildByPath('Canvas/iconImg');
        }
        return this.iconImg_Internal;
    }
    get btn() {
        if (!this.btn_Internal && this.uiWidgetBase) {
            this.btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/btn');
        }
        return this.btn_Internal;
    }
    get name() {
        if (!this.name_Internal && this.uiWidgetBase) {
            this.name_Internal = this.uiWidgetBase.findChildByPath('Canvas/name');
        }
        return this.name_Internal;
    }
    get mCanvasStar() {
        if (!this.mCanvasStar_Internal && this.uiWidgetBase) {
            this.mCanvasStar_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasStar');
        }
        return this.mCanvasStar_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btn");
        });
        this.btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn");
        });
        this.btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn");
        });
        this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.btn);
        //文本多语言
        this.setLanguage(this.name);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
ActionItem_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/ActionModule/ActionItem.ui')
], ActionItem_generate);
var ActionItem_Generate = ActionItem_generate;

var foreign101 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ActionItem_Generate
});

class ActionBaseItem extends ActionItem_Generate {
    constructor() {
        super(...arguments);
        this.active = new mw.Action1();
        this.info = null;
    }
    onStart() {
        this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.btn.onClicked.add(() => {
            this.active.call(this.info);
        });
    }
    setData(info) {
        this.info = info;
        this.name.text = info.name;
        this.iconImg.imageGuid = info.icon;
        this.mBg.imageGuid = ActionLuanguage.isOverseas ? "86714" : "86723";
        this.visible = true;
        for (let i = 0; i < 5; i++) {
            let star = this.mCanvasStar.getChildAt(i);
            star.visibility = info.quality > i ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
    }
    /**
     * 设置坐标
     * @param v
     */
    setPostion(v) {
        this.uiObject.position = v;
    }
}

var foreign71 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ActionBaseItem: ActionBaseItem
});

class ActionBaseP extends ActionPanel_generate$1 {
    constructor() {
        super(...arguments);
        //控件
        this.barList = [];
        this.canvas = null;
        //是否打开
        this.isOpen = false;
        //是否关闭
        this.isClose = false;
        //移动速度
        this.moveSpeed = 1800;
        //舞台宽度
        this.stageWide = 0;
        //目标位置
        this.targetPos = 0;
        //item列表
        this.itemList = [];
        //选中类型
        this._typeIndex = 0;
    }
    set typeIndex(index) {
        this._typeIndex = index;
        this.refreshType();
    }
    onStart() {
        this.mCloseBtn.onClicked.add(() => {
            this.isClose = true;
        });
        this.canvas = this.mCon;
        this.stageWide = UIManager.canvas.size.x;
        this.targetPos = this.stageWide - this.canvas.size.x;
        this.barList.push(this.mTypeBar1, this.mTypeBar2);
        this.mTypeBar1.onClicked.add(() => { this.typeIndex = 0; });
        this.mTypeBar2.onClicked.add(() => { this.typeIndex = 1; });
        this.mTypeBar1.text = ActionLuanguage.tab1;
        this.mTypeBar2.text = ActionLuanguage.tab2;
        let oversea = ActionLuanguage.isOverseas ? "89649" : "86265";
        this.mTypeBar1.disableImageGuid = oversea;
        this.mTypeBar2.disableImageGuid = oversea;
    }
    onShow(config) {
        UIManager.setUIstate(this, HudGameUIState.HideAll);
        this._config = config;
        this.mCloseBtn.visibility = mw.SlateVisibility.Hidden;
        this.canvas.position = new mw.Vector2(this.stageWide, 0);
        this.isOpen = true;
        this.canUpdate = true;
        this.typeIndex = 0;
    }
    /**刷新类型 */
    refreshType() {
        for (let i = 0; i < this.barList.length; i++) {
            this.barList[i].enable = (i == this._typeIndex ? false : true);
        }
        this.setList();
    }
    setList() {
        this.hideAll();
        this.mScr.scrollToStart();
        for (let i = 0; i < this._config.length; i++) {
            if (this._config[i].type != this._typeIndex + 1)
                continue;
            const item = this.getItem(i);
            item.setData(this._config[i]);
        }
    }
    /**
     * 获取Item
     * @returns
     */
    getItem(index) {
        let item = this.itemList[index];
        if (!item) {
            item = this.createItem(index);
        }
        return item;
    }
    /**
     * 建造item
     */
    createItem(index) {
        let item = UIManager.create(ActionBaseItem);
        item.active.add((info) => {
            this.onClickItem(info);
        });
        this.mContent.addChild(item.uiObject);
        this.itemList[index] = item;
        return item;
    }
    onClickItem(info) {
        ModuleService.getModule(ActionModuleC).luanchAction(info);
        UIManager.hide(ActionBaseP);
    }
    onUpdate(dt) {
        if (this.isOpen) {
            let x = this.canvas.position.x - (this.moveSpeed * dt);
            if (x <= this.targetPos) {
                this.canvas.position = new mw.Vector2(this.targetPos, 0);
                this.isOpen = false;
                this.mCloseBtn.visibility = (mw.SlateVisibility.Visible);
                return;
            }
            this.canvas.position = new mw.Vector2(x, 0);
        }
        if (this.isClose) {
            let x = this.canvas.position.x + (this.moveSpeed * dt);
            if (x >= this.stageWide) {
                this.canvas.position = new mw.Vector2(this.stageWide, 0);
                this.isClose = false;
                UIManager.hideUI(this);
                return;
            }
            this.canvas.position = new mw.Vector2(x, 0);
        }
    }
    hideAll() {
        this.itemList.forEach(item => {
            item.visible = false;
        });
    }
    onHide() {
        UIManager.setUIstate(this, HudGameUIState.Show);
    }
}

var foreign72 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ActionBaseP: ActionBaseP
});

mw.Vector2.zero;
class HeadUI {
    constructor(widget) {
        this.widget = null;
        this.root = null;
        this.chatText = null;
        this.chatCon = null;
        this.nameText = null;
        this.titleText = null;
        this.styleLeft = null;
        this.styleCenter = null;
        this.styleRight = null;
        this.widget = widget;
        this.root = this.widget.getTargetUIWidget();
        this.chatCon = this.root.findChildByPath("Canvas/Chat");
        this.chatText = (this.root.findChildByPath("Canvas/Chat/Text"));
        this.nameText = (this.root.findChildByPath("Canvas/Name"));
        this.titleText = (this.root.findChildByPath("Canvas/Title"));
        this.styleLeft = (this.root.findChildByPath("Canvas/styleCanvas/styleLeft"));
        this.styleCenter = (this.root.findChildByPath("Canvas/styleCanvas/styleCenter"));
        this.styleRight = (this.root.findChildByPath("Canvas/styleCanvas/styleRight"));
    }
    /**
     * 显示聊天
     * @param desc
     */
    showChat(desc) {
        let length = GameUtils.getNameLen(desc);
        let num = Math.ceil(length / 15);
        this.chatCon.size = (new mw.Vector2(350, 40 + num * 50));
        this.chatCon.visibility = (mw.SlateVisibility.Visible);
        this.chatText.text = (desc);
        this.widget.refresh();
    }
    /**隐藏聊天 */
    hideChat() {
        if (!this.chatCon)
            return;
        this.chatCon.visibility = (mw.SlateVisibility.Hidden);
        this.widget.refresh();
    }
    /**
     * 设置称号
     * @param content 称号名称
     */
    setTitle(content) {
        if (content == "" || content == null || content == undefined) {
            this.titleText.text = "0/" + GlobalData.FenceNum;
        }
        else {
            this.titleText.text = (content);
        }
        this.styleLeft.visibility = mw.SlateVisibility.Collapsed;
        this.styleCenter.visibility = mw.SlateVisibility.Collapsed;
        this.styleRight.visibility = mw.SlateVisibility.Collapsed;
        this.titleText.outlineSize = 0;
        this.titleText.shadowOffset = mw.Vector2.zero;
    }
    setName(name) {
        this.nameText.text = name;
        this.chatCon.visibility = (mw.SlateVisibility.Hidden);
        this.widget.refresh();
    }
    setNameVisible(visible) {
        this.nameText.visibility = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden;
        this.chatCon.visibility = (mw.SlateVisibility.Hidden);
    }
    destory() {
        this.widget.destroy();
    }
}

var foreign73 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HeadUI
});

let PlayerInfo = class PlayerInfo extends mw.Script {
    constructor() {
        super(...arguments);
        this._myState = PlayerStateType.Dead;
        this._stateArr = [PlayerStateType.None];
        this.myName = "";
        this.myTitle = "";
        this._playerID = 0;
        this.player = null;
        this.character = null;
        this.userID = "";
        this.headUI = null;
        this.onStateChange = new Action1();
        this.onAttrChange = new Action();
        this._isInit = false;
        this._isDead = false;
        this._chatTime = 0;
    }
    get myState() {
        return this._myState;
    }
    get playerID() { return this._playerID; }
    stateChange() {
        if (this.onStateChange) {
            this.onStateChange.call(this._myState);
        }
    }
    titleTypeChange() {
        if (this._isInit) {
            this.headUI.setTitle(this.myTitle);
            if (GameUtils.isPlayerCharacter(this.player)) {
                let num = Number(this.myTitle[0]);
                if (num !== undefined) {
                    GlobalData.boardCount = num;
                }
            }
        }
    }
    onStart() {
        this.useUpdate = true;
        this.onStateChange.add((state) => {
            if (SystemUtil.isClient() && this.playerID != getMyPlayerID())
                return;
            if (state == PlayerStateType.Dead) {
                this.onDead();
            }
            Event.dispatchToLocal(EventsName.PLAYER_STATE, state);
        });
    }
    init(player) {
        if (this._isInit)
            return;
        if (player) {
            this.player = player;
            this._playerID = this.player.playerId;
            this.character = this.player.character;
            this.userID = this.player.userId;
            Event.dispatchToLocal("Player_Init", this._playerID, this);
            this._myState = PlayerStateType.None;
            if (SystemUtil.isClient()) {
                if (!mw.AssetUtil.assetLoaded("8355"))
                    mw.AssetUtil.asyncDownloadAsset("8355");
                let widget = this.character.overheadUI;
                widget.setUIbyID("7EE386804E380932BF41959F2B514BC7");
                widget.drawSize = new mw.Vector2(351, 123);
                this.headUI = new HeadUI(widget);
                this.headUI.setName(this.myName);
                this.headUI.setTitle(this.myTitle);
                if (this.playerID == getMyPlayerID())
                    Event.dispatchToLocal("initMySelf", this);
            }
            else {
                this.myTitle = "0/" + GlobalData.FenceNum;
            }
            this._isInit = true;
        }
    }
    setState(stateType, bool) {
        if (bool) {
            if (stateType == PlayerStateType.None) {
                this._stateArr = [PlayerStateType.None];
            }
            else if (!this._stateArr.includes(stateType)) {
                this._stateArr.push(stateType);
            }
        }
        else {
            if (stateType != PlayerStateType.None) {
                if (this._stateArr.includes(stateType)) {
                    this._stateArr.splice(this._stateArr.indexOf(stateType), 1);
                }
            }
        }
        const newState = this._stateArr[this._stateArr.length - 1];
        if (this._myState == newState)
            return;
        this._myState = newState;
        this.onStateChange.call(this._myState);
    }
    showChat(str) {
        if (SystemUtil.isServer())
            return;
        if (this._isInit) {
            this.headUI.showChat(str);
            this._chatTime = 5;
        }
    }
    async onDead() {
        if (this._isDead)
            return;
        if (SystemUtil.isClient()) {
            this.character.movementEnabled = false;
            PlayerManagerExtesion.rpcPlayAnimation(this.character, "8355", 1, 1.17 / 2);
        }
        else {
            this._myState = PlayerStateType.Dead;
        }
        this._isDead = true;
        await TimeUtil.delaySecond(ReTime);
        this.onAwake();
    }
    onAwake() {
        if (SystemUtil.isClient()) {
            Event.dispatchToLocal(EventsName.PlayerReset);
        }
        else {
            this.setState(PlayerStateType.None, true);
        }
        this._isDead = false;
    }
    onUpdate(dt) {
        if (SystemUtil.isClient() && !this._isInit && this._playerID != 0) {
            this.init(Player.getPlayer(this._playerID));
        }
        if (this.myState == PlayerStateType.Dead)
            return;
        if (this._isInit && this._chatTime > 0) {
            this._chatTime -= dt;
            if (this._chatTime <= 0) {
                this.headUI.hideChat();
            }
        }
    }
    onDestroy() {
        if (SystemUtil.isClient())
            this.headUI?.destory();
    }
};
__decorate([
    mw.Property({ replicated: true, onChanged: "stateChange" })
], PlayerInfo.prototype, "_myState", void 0);
__decorate([
    mw.Property({ replicated: true })
], PlayerInfo.prototype, "myName", void 0);
__decorate([
    mw.Property({ replicated: true, onChanged: "titleTypeChange" })
], PlayerInfo.prototype, "myTitle", void 0);
__decorate([
    mw.Property({ replicated: true })
], PlayerInfo.prototype, "_playerID", void 0);
PlayerInfo = __decorate([
    Component
], PlayerInfo);
var PlayerInfo$1 = PlayerInfo;
const ReTime = 5;

var foreign67 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ReTime: ReTime,
    default: PlayerInfo$1
});

class PlayerModuleServer extends ModuleS {
    getDataByPlayer(player) {
        return this.getPlayerData(player);
    }
    async net_OnEnterScene(playerName) {
        const player = this.currentPlayer;
        const playerID = player.playerId;
        if (playerID && !PlayerManager$1.playerInfoMap.has(playerID)) {
            const script = await mw.Script.spawnScript(PlayerInfo$1, true);
            script.init(player);
            script.myName = playerName;
        }
    }
    net_Chat(content) {
        if (this.currentPlayer) {
            PlayerManager$1.instance.chat(content, this.currentPlayer);
        }
    }
    //#region 人物动作姿态模块
    net_LeaveInteract(player, id) {
        ModuleService.getModule(ActionModuleS)?.net_LeaveInteract(player, id);
    }
}

var foreign69 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerModuleServer
});

/**动作类型 */
var ActionType;
(function (ActionType) {
    /**单人动作 */
    ActionType[ActionType["Single"] = 1] = "Single";
    /**双人动作 */
    ActionType[ActionType["Double"] = 2] = "Double";
})(ActionType || (ActionType = {}));
/**双人动作类型 */
var ActionDoubleType;
(function (ActionDoubleType) {
    /**普通动作 */
    ActionDoubleType[ActionDoubleType["Ordinary"] = 1] = "Ordinary";
    /**交互动作 */
    ActionDoubleType[ActionDoubleType["Interactive"] = 2] = "Interactive";
    /**强制动作 */
    ActionDoubleType[ActionDoubleType["Force"] = 3] = "Force";
})(ActionDoubleType || (ActionDoubleType = {}));
class ActionLuanguage {
}
//多语言
ActionLuanguage.isOverseas = !mw.LocaleUtil.getDefaultLocale().toString().toLowerCase().match("zh");
/**接受动作文本 */
ActionLuanguage.acceptText = "";
/**拒绝动作文本 */
ActionLuanguage.refuseText = "";
/**发起描述1 */
ActionLuanguage.desc1 = "";
/**发起描述2 */
ActionLuanguage.desc2 = "";
/**与交互物互斥提示 */
ActionLuanguage.interactiveTips = "";
/**与道具互斥提示 */
ActionLuanguage.itemType = "";
/**重复发起动作提示 */
ActionLuanguage.actionTips = "";
/**动作发起成功提示 */
ActionLuanguage.succes = "";
/**动作发起失败提示 */
ActionLuanguage.fail = "";
/**脱离 */
ActionLuanguage.leave = "";
/**动作按钮文字 */
ActionLuanguage.action = "";
/**脱离按钮图标 */
// public static leaveIcon: string = "";
/**页签1 */
ActionLuanguage.tab1 = "";
/**页签2 */
ActionLuanguage.tab2 = "";
/**距离过远 */
ActionLuanguage.toolong = "";
/**当前玩家处于双人动作中 */
ActionLuanguage.ing = "";
/**请先离开当前玩家 */
ActionLuanguage.pleaseLeave = "";
var ActionEvent;
(function (ActionEvent) {
    //client To Sever//========================================
    ActionEvent["net_LeaveInteract"] = "net_LeaveInteract";
    ActionEvent["net_login"] = "net_login";
    ActionEvent["net_ForeceAction"] = "net_ForeceAction";
    ActionEvent["net_LuanchAction"] = "net_LuanchAction";
    ActionEvent["net_OnActionSuccess"] = "net_OnActionSuccess";
    ActionEvent["dancing_Wand"] = "dancing_Wand";
    ActionEvent["water_Wand"] = "water_Wand";
    //Sever && Client//========================================
    ActionEvent["net_PlayAction"] = "net_PlayAction";
    //Server To Client//========================================
    ActionEvent["net_GetPlayer"] = "net_GetPlayer";
    ActionEvent["net_ShowTips"] = "net_ShowTips";
    ActionEvent["net_SetActionMSG"] = "net_SetActionMSG";
    ActionEvent["net_Interact"] = "net_Interact";
    ActionEvent["net_danceWand"] = "net_danceWand";
    ActionEvent["net_waterWand"] = "net_waterWand";
})(ActionEvent || (ActionEvent = {}));
class ActionModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        /**当前交互 */
        this.curId = 0;
        /**是否为接收者 */
        this.isAccepter = false;
        /**是否单人姿态 */
        this.isSingleStance = false;
        /**默认相机位置 */
        this.camerPos = null;
        /**当前循环动作 */
        this.curloop = "";
        this.actionHUD = new ActionBaseHud();
        this.self = null;
        this.map = new Map();
        /**当前简单双人动作 */
        this.singleA = null;
        this._selfName = "";
    }
    onStart() {
        this.addLinster();
    }
    addLinster() {
        Event.addServerListener(ActionEvent.net_GetPlayer, (id, guid, name) => {
            this.net_GetPlayer(id, guid, name);
        });
        Event.addServerListener(ActionEvent.net_ShowTips, (num) => {
            this.net_ShowTips(num);
        });
        Event.addServerListener(ActionEvent.net_SetActionMSG, (id) => {
            this.net_SetActionMSG(id);
        });
        Event.addServerListener(ActionEvent.net_PlayAction, (aniguid) => {
            this.net_PlayAction(aniguid);
        });
        Event.addServerListener(ActionEvent.net_Interact, (playerId, isAccepter, configId) => {
            this.net_Interact(playerId, isAccepter, configId);
        });
        Event.addServerListener(ActionEvent.net_OnActionSuccess, (succes) => {
            this.net_OnActionSucces(succes);
        });
        Event.addServerListener(ActionEvent.net_danceWand, (actionId, nickName) => {
            let actionConfig = this.map.get(actionId);
            if (actionConfig) {
                Tips.show(StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_2.Value, this.luanchAction(actionConfig)));
            }
        });
    }
    onEnterScene(sceneType) {
        this.initLanguage();
        this.initConfig();
        this.self = Player.localPlayer;
        this.camerPos = Camera.currentCamera.localTransform.position;
        Event.dispatchToServer(ActionEvent.net_login);
        Event.addLocalListener(EventsName.CancelActive, () => {
            this.off();
        });
    }
    initLanguage() {
        ActionLuanguage.acceptText = GameConfig.SquareLanguage.Danmu_Content_1073.Value;
        ActionLuanguage.refuseText = GameConfig.SquareLanguage.Danmu_Content_1074.Value;
        ActionLuanguage.desc1 = GameConfig.SquareLanguage.Danmu_Content_1075.Value;
        ActionLuanguage.desc2 = GameConfig.SquareLanguage.Danmu_Content_1076.Value;
        // ActionLuanguage.acceptGuid = GameConfig.SquareLanguage[95788].Value;
        // ActionLuanguage.itemBg = GameConfig.SquareLanguage.getElement(86723).Value;
        ActionLuanguage.interactiveTips = GameConfig.SquareLanguage.Danmu_Content_1065.Value;
        ActionLuanguage.itemType = GameConfig.SquareLanguage.Danmu_Content_1064.Value;
        ActionLuanguage.actionTips = GameConfig.SquareLanguage.Danmu_Content_1060.Value;
        ActionLuanguage.succes = GameConfig.SquareLanguage.Danmu_Content_1071.Value;
        ActionLuanguage.fail = GameConfig.SquareLanguage.Danmu_Content_1072.Value;
        ActionLuanguage.leave = GameConfig.SquareLanguage.Danmu_Content_1054.Value;
        ActionLuanguage.action = GameConfig.SquareLanguage.Text_Text_589.Value;
        // ActionLuanguage.leaveIcon = GameConfig.SquareLanguage[94427].Value;
        ActionLuanguage.tab1 = GameConfig.SquareLanguage.Danmu_Content_1001.Value;
        ActionLuanguage.tab2 = GameConfig.SquareLanguage.Danmu_Content_1002.Value;
        // ActionLuanguage.tabBg = GameConfig.SquareLanguage.getElement(86265).Value;
        ActionLuanguage.toolong = GameConfig.SquareLanguage.Danmu_Content_1069.Value;
        ActionLuanguage.ing = GameConfig.SquareLanguage.Danmu_Content_1070.Value;
        ActionLuanguage.pleaseLeave = GameConfig.SquareLanguage.Danmu_Content_1053.Value;
    }
    initConfig() {
        let configs = GameConfig.SquareActionConfig.getAllElement();
        for (let config of configs) {
            this.map.set(config.ID, config);
        }
    }
    openActionPanle() {
        if (this.curId <= 0) {
            this.showPanle();
        }
        else {
            Event.dispatchToServer(ActionEvent.net_LeaveInteract, Number(this.curId));
        }
    }
    /**打开动作列表 */
    showPanle() {
        UIManager.show(ActionBaseP, this.getAction());
    }
    getAction() {
        let list = [];
        this.map.forEach((value) => {
            list.push(value);
        });
        list.sort((a, b) => {
            return a.quality - b.quality;
        });
        return list;
    }
    /**离开交互 */
    off() {
        if (this.curId > 0) {
            Event.dispatchToServer(ActionEvent.net_LeaveInteract, Number(this.curId));
        }
    }
    bagAcceptSkip() {
        return true;
    }
    bagLuanchSkip() {
        return true;
    }
    isFree() {
        return PlayerManager$1.instance.playerIsFree(this.localPlayerId);
    }
    net_showTips(str) {
        Tips.show(str);
    }
    getSelfName() {
        if (StringUtil.isEmpty(this._selfName))
            this._selfName = mw.AccountService.getNickName() || "player";
        return this._selfName;
    }
    /**
     * 跳舞魔杖让一个玩家跳舞
     * @param actionId action表ID
     * @param actionPlayer 受到影响的玩家
     */
    dancingWand(actionId, actionPlayer) {
        if (actionPlayer) {
            Event.dispatchToServer(ActionEvent.dancing_Wand, actionId, actionPlayer.playerId, this.getSelfName());
        }
    }
    /**
     * 水枪魔杖让一个玩家被水冲起来
     * @param actionPlayer 受到影响的玩家
     */
    waterWand(actionPlayer) {
        if (actionPlayer) {
            Event.dispatchToServer(ActionEvent.water_Wand, actionPlayer.playerId, this.getSelfName());
        }
    }
    luanchActionOut(configId, playerId) {
        let config = this.map.get(configId);
        this.luanchAction(config, playerId);
    }
    /**
     * 发起动作
     * @param config
     * @returns
     */
    async luanchAction(config, playerId) {
        this.cleanStance();
        //是否繁忙
        if (!this.isFree()) {
            this.net_showTips(ActionLuanguage.interactiveTips);
            return;
        }
        //判断和道具互斥
        if (!this.bagLuanchSkip()) {
            this.net_showTips(ActionLuanguage.itemType);
            return;
        }
        //去除重复发起动作
        if (this.curId > 0) {
            this.net_showTips(ActionLuanguage.actionTips);
            return;
        }
        if (config.type == ActionType.Single) { //单人动作
            await GameUtils.downAsset(config.actionId);
            this.cleanStance();
            if (config.singleType) {
                PlayerManagerExtesion.changeStanceExtesion(this.self.character, config.actionId);
                this.isSingleStance = true;
            }
            else {
                if (config.circulate) {
                    this.curloop = config.actionId;
                }
                PlayerManagerExtesion.rpcPlayAnimation(this.self.character, config.actionId, config.circulate ? 0 : 1, config.time);
            }
            this.setMGS(config.ID);
        }
        else { //双人动作
            if (config.doubleType == ActionDoubleType.Force) { //强制动作
                Event.dispatchToServer(ActionEvent.net_ForeceAction, config.ID, playerId);
            }
            else { //交互动作
                let name = this.getSelfName();
                Event.dispatchToServer(ActionEvent.net_LuanchAction, config.ID, name, playerId);
            }
        }
    }
    cleanStance() {
        if (this.isSingleStance) {
            PlayerManagerExtesion.changeStanceExtesion(this.self.character, "");
            this.isSingleStance = false;
        }
        if (this.curloop) {
            PlayerManagerExtesion.rpcStopAnimation(this.self.character, this.curloop);
            this.curloop = "";
        }
    }
    net_OnActionSucces(succes) {
        let str = succes ? ActionLuanguage.succes : ActionLuanguage.fail;
        this.net_showTips(str);
    }
    net_SetActionMSG(id) {
        this.setMGS(id);
    }
    setMGS(id) {
    }
    /**
     * 收到发起动作的人
     * @param guid
     */
    net_GetPlayer(playerId, guid, name) {
        this.actionHUD.addPlayer(playerId, guid, name);
    }
    /**
     * 接受动作
     * @param id
     * @returns
     */
    aceeptAction(id) {
        if (!this.isFree()) {
            this.net_showTips(ActionLuanguage.interactiveTips);
            return;
        }
        if (this.isSingleStance) {
            PlayerManagerExtesion.changeStanceExtesion(this.self.character, "");
            this.isSingleStance = false;
        }
        //道具互斥判断
        if (!this.bagAcceptSkip()) {
            this.net_showTips(ActionLuanguage.itemType);
            return;
        }
        Event.dispatchToServer(ActionEvent.net_PlayAction, id);
    }
    /**
     * 播放动作
     * @param actionId
     */
    net_PlayAction(actionId) {
        this.self.character.collisionWithOtherCharacterEnabled = false;
        if (this.singleA) {
            this.singleA.stop();
        }
        this.singleA = PlayerManagerExtesion.rpcPlayAnimation(this.self.character, actionId);
        this.singleA.onFinish.add(() => {
            this.singleA = null;
            this.self.character.collisionWithOtherCharacterEnabled = true;
        });
    }
    /**
     * 同步交互状态
     * @param playerId
     */
    net_Interact(playerId, isAccepter, configId) {
        this.curId = playerId;
        this.isAccepter = isAccepter;
        let guid = playerId > 0 ? "192139" : "183754";
        let name = playerId > 0 ? ActionLuanguage.leave : ActionLuanguage.action;
        UIManager.getUI(Game_HUDUI).refreshActionBtn(name, guid);
        if (playerId <= 0) {
            PlayerManagerExtesion.changeStanceExtesion(this.self.character, "");
            Camera.currentCamera.localTransform.position = this.camerPos;
        }
        else {
            let config = this.map.get(configId);
            if (!config) {
                return;
            }
            if (isAccepter && config.visual2) {
                Camera.currentCamera.localTransform.position = config.visual2;
            }
            if (!isAccepter && config.visual1) {
                Camera.currentCamera.localTransform.position = config.visual1;
            }
        }
    }
    /**
     * 显示提示
     * @param str
     */
    net_ShowTips(num) {
        let str = "";
        switch (num) {
            case 0:
                str = ActionLuanguage.fail;
                break;
            case 1:
                str = ActionLuanguage.toolong;
                break;
            case 2:
                str = ActionLuanguage.ing;
                break;
            case 3:
                str = ActionLuanguage.pleaseLeave;
                break;
            default:
                return;
        }
        this.net_showTips(str);
    }
}
class ActionModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        /**发起动作的人 */
        this.actionPlayers = new Map();
        /**交互的人*/
        this.interactPlayers = new Map();
        /**显示交互距离 */
        this.showFlagDis = 400;
        this.map = new Map();
    }
    onStart() {
        //监听玩家离开房间
        this.initConfig();
        this.addLinster();
    }
    onPlayerLeft(player) {
        this.peopleLeft(player?.playerId);
    }
    addLinster() {
        Event.addClientListener(ActionEvent.net_ForeceAction, (player, id, playerId) => {
            this.net_ForeceAction(player, id, playerId);
        });
        Event.addClientListener(ActionEvent.net_LuanchAction, (player, id, name, playerId) => {
            this.net_LuanchAction(player, id, name, playerId);
        });
        Event.addClientListener(ActionEvent.net_LeaveInteract, (player, id) => {
            this.net_LeaveInteract(player, id);
        });
        Event.addClientListener(ActionEvent.net_login, (player) => {
            this.net_login(player);
        });
        Event.addClientListener(ActionEvent.net_PlayAction, (player, actionId) => {
            this.net_PlayAction(player, actionId);
        });
        Event.addClientListener(ActionEvent.dancing_Wand, (player, actionId, actionPlayerId, nickName) => {
            this.dancingPlayer(actionId, actionPlayerId, nickName);
        });
        Event.addClientListener(ActionEvent.water_Wand, (player, actionPlayerId, nickName) => {
            this.waterPlayer(actionPlayerId, nickName);
        });
    }
    initConfig() {
        let configs = GameConfig.SquareActionConfig.getAllElement();
        for (let config of configs) {
            this.map.set(config.ID, config);
        }
    }
    /**
     * 玩家离开
     * @param player
     */
    peopleLeft(playerid) {
        for (let [id, interactData] of this.interactPlayers) {
            if (playerid == interactData.sendPlayerId || playerid == interactData.accectPlayerId) {
                let accectPlayer = Player.getPlayer(interactData.accectPlayerId);
                let sendPlayer = Player.getPlayer(interactData.sendPlayerId);
                if (accectPlayer) {
                    this.leaveCheck(sendPlayer);
                    accectPlayer.character.collisionWithOtherCharacterEnabled = true;
                }
                if (sendPlayer) {
                    this.leaveCheck(accectPlayer);
                }
                interactData.reLoginLeave();
                this.interactPlayers.delete(id);
            }
        }
    }
    /**
    * 发起动作
    * @param guid
    */
    net_LuanchAction(player, guid, name, playerId) {
        let id = player.playerId;
        let succes = false;
        if (playerId) {
            if (this.isCanLuanch(player, playerId)) {
                this.actionPlayers.set(id, guid);
                Event.dispatchToClient(Player.getPlayer(playerId), ActionEvent.net_GetPlayer, id, guid, name);
                succes = true;
            }
        }
        else {
            for (let playeritem of Player.getAllPlayers()) {
                if (!this.isCanLuanch(player, playeritem.playerId)) {
                    continue;
                }
                this.actionPlayers.set(id, guid);
                Event.dispatchToClient(playeritem, ActionEvent.net_GetPlayer, id, guid, name);
                succes = true;
            }
        }
        Event.dispatchToClient(player, ActionEvent.net_OnActionSuccess, succes);
    }
    isCanLuanch(luanchPlayer, playerId) {
        let player = Player.getPlayer(playerId);
        if (!player) {
            return false;
        }
        if (playerId == luanchPlayer.playerId) {
            return false;
        }
        //距离判定
        if (mw.Vector.squaredDistance(player.character.worldTransform.position, luanchPlayer.character.worldTransform.position) > this.showFlagDis * this.showFlagDis) {
            return false;
        }
        //是否为接收者
        if (this.isAccepter(playerId)) {
            return false;
        }
        //是否可完成动作
        if (!this.isCanDo(playerId)) {
            return false;
        }
        return true;
    }
    waterPlayer(playerId, nickName) {
        let player = Player.getPlayer(playerId);
        if (player) {
            Event.dispatchToClient(player, ActionEvent.net_waterWand, nickName);
        }
    }
    dancingPlayer(actionId, playerId, nickName) {
        let player = Player.getPlayer(playerId);
        if (player) {
            Event.dispatchToClient(player, ActionEvent.net_danceWand, actionId, nickName);
        }
    }
    /**
    * 检查是否为接收者
    * @param id
    */
    isAccepter(id) {
        for (let [key, interactData] of this.interactPlayers) {
            if (id == interactData.accectPlayerId) {
                return true;
            }
        }
        return false;
    }
    /**
     * 发起强制动作
     * @param configId
     * @returns
     */
    net_ForeceAction(player, configId, playerId) {
        if (playerId) {
            if (this.isCanForece(player, playerId)) {
                this.beginAction(configId, Player.getPlayer(playerId), player);
                return;
            }
        }
        else {
            for (let item of Player.getAllPlayers()) {
                if (!this.isCanForece(player, item.playerId)) {
                    continue;
                }
                this.beginAction(configId, item, player);
                return;
            }
        }
        Event.dispatchToClient(player, ActionEvent.net_ShowTips, 0);
    }
    isFree(playerId) {
        return PlayerManager$1.instance.playerIsFree(playerId);
    }
    setActionMSG(id, player) {
        Event.dispatchToClient(player, ActionEvent.net_SetActionMSG, id);
    }
    /**
     * 是否可以强制动作
     * @param self
     * @param playerId
     */
    isCanForece(sendPlayer, playerId) {
        let player = Player.getPlayer(playerId);
        if (!player) {
            return false;
        }
        if (playerId == sendPlayer.playerId) {
            return false;
        }
        //距离判定
        if (mw.Vector.squaredDistance(player.character.worldTransform.position, sendPlayer.character.worldTransform.position) > this.showFlagDis * this.showFlagDis) {
            return false;
        }
        //角度判定
        let forwardV = sendPlayer.character.worldTransform.getForwardVector().normalized;
        let v = player.character.worldTransform.position.subtract(sendPlayer.character.worldTransform.position).normalized;
        let angle = Math.acos(forwardV.x * v.x + forwardV.y * v.y + forwardV.z * v.z);
        if (angle > Math.PI / 4) {
            return false;
        }
        //是否繁忙
        if (this.isFree(playerId)) {
            return false;
        }
        //是否为接收者
        if (this.isAccepter(playerId)) {
            return false;
        }
        //是否可完成动作
        if (!this.isCanDo(playerId)) {
            return false;
        }
        return true;
    }
    /**
     * 是否可完成动作
     * @param playerId
     * @returns
     */
    isCanDo(playerId) {
        return true;
    }
    /**
    * 开始动作
    * @param playerId
    */
    net_PlayAction(player, playerId) {
        let accectPlayer = player;
        //距离判断
        let sendPlayer = Player.getPlayer(playerId);
        if (!sendPlayer || !accectPlayer)
            return;
        if (mw.Vector.squaredDistance(sendPlayer.character.worldTransform.position, accectPlayer.character.worldTransform.position) > this.showFlagDis * this.showFlagDis) {
            Event.dispatchToClient(accectPlayer, ActionEvent.net_ShowTips, 1);
            return;
        }
        //判断是否已经响应
        if (!this.actionPlayers.has(playerId)) {
            Event.dispatchToClient(accectPlayer, ActionEvent.net_ShowTips, 2);
            return;
        }
        //是否为接收者
        if (this.isAccepter(accectPlayer.playerId)) {
            Event.dispatchToClient(accectPlayer, ActionEvent.net_ShowTips, 3);
            return;
        }
        let id = this.actionPlayers.get(playerId);
        //移除响应状态
        this.actionPlayers.delete(playerId);
        this.beginAction(id, accectPlayer, sendPlayer);
    }
    /**
     * 开始动作
     * @param id 配置id
     * @param accectPlayer 接收者
     * @param luanchPlayer 发起者
     */
    beginAction(id, accectPlayer, luanchPlayer) {
        let config = this.map.get(id);
        if (!config) {
            return;
        }
        if (config.doubleType == ActionDoubleType.Ordinary) {
            //简单动作
            accectPlayer.character.collisionWithOtherCharacterEnabled = false;
            setTimeout(() => {
                let forwardV = mw.Vector.add(luanchPlayer.character.worldTransform.getForwardVector().normalized.clone().multiply(config.v.length), luanchPlayer.character.worldTransform.position);
                accectPlayer.character.worldTransform.position = mw.Vector.rotateZ(forwardV, luanchPlayer.character.worldTransform.position, config.angle * (Math.PI / 180));
                let r = mw.Rotation.zero;
                mw.Rotation.add(luanchPlayer.character.worldTransform.rotation, new mw.Rotation(config.r), r);
                accectPlayer.character.worldTransform.rotation = r;
            }, 100);
            Event.dispatchToClient(luanchPlayer, ActionEvent.net_PlayAction, config.sendAni);
            Event.dispatchToClient(accectPlayer, ActionEvent.net_PlayAction, config.accectAni);
        }
        else {
            //交互动作
            let interactData = new InteractPlayer();
            this.interactPlayers.set(luanchPlayer.playerId, interactData);
            interactData.start(luanchPlayer, accectPlayer, config);
            interactData.action.add(() => {
                Event.dispatchToClient(luanchPlayer, ActionEvent.net_Interact, luanchPlayer.playerId, false, id);
                Event.dispatchToClient(accectPlayer, ActionEvent.net_Interact, luanchPlayer.playerId, true, id);
            });
        }
        this.setActionMSG(id, accectPlayer);
        this.setActionMSG(id, luanchPlayer);
    }
    /**
     * 离开交互
     * @param id
     * @returns
     */
    net_LeaveInteract(player, id) {
        let interactData = this.interactPlayers.get(id);
        if (!interactData) {
            if (player) {
                Event.dispatchToClient(player, ActionEvent.net_Interact, 0, true, 0);
            }
            return;
        }
        let sendPlayer = Player.getPlayer(interactData.sendPlayerId);
        let accectPlayer = Player.getPlayer(interactData.accectPlayerId);
        accectPlayer.character.collisionWithOtherCharacterEnabled = true;
        interactData.leave();
        this.interactPlayers.delete(id);
        this.leaveCheck(sendPlayer);
        this.leaveCheck(accectPlayer);
    }
    /**
     * 判断离开当前交互的发起者，是否仍为其他交互发起或接收者
     * @param player
     * @returns
     */
    leaveCheck(player) {
        for (let [id, interactData] of this.interactPlayers) {
            if (player.playerId == interactData.sendPlayerId) {
                Event.dispatchToClient(Player.getPlayer(interactData.sendPlayerId), ActionEvent.net_Interact, id, false, interactData.configId);
                //仍为发起者
                return;
            }
            if (player.playerId == interactData.accectPlayerId) {
                Event.dispatchToClient(Player.getPlayer(interactData.accectPlayerId), ActionEvent.net_Interact, id, true, interactData.configId);
                //仍为接收者
                return;
            }
        }
        //完全脱离任何交互动作
        Event.dispatchToClient(player, ActionEvent.net_Interact, 0, false, 0);
    }
    /**玩家登录 */
    net_login(player) {
        let playerId = player.playerId;
        for (let [id, data] of this.interactPlayers) {
            if (data.sendPlayerId == playerId || data.accectPlayerId == playerId) {
                let accectPlayer = Player.getPlayer(data.accectPlayerId);
                let sendPlayer = Player.getPlayer(data.sendPlayerId);
                accectPlayer.character.collisionWithOtherCharacterEnabled = true;
                data.reLoginLeave();
                this.interactPlayers.delete(id);
                this.leaveCheck(sendPlayer);
                this.leaveCheck(accectPlayer);
            }
        }
    }
}
class InteractPlayer {
    constructor() {
        this.sendPlayerId = 0;
        this.accectPlayerId = 0;
        this.interactObj = null;
        this.action = new mw.Action();
        this.configId = 0;
    }
    start(player1, player2, config) {
        this.configId = config.ID;
        if (!this.interactObj) {
            this.interactObj = SpawnManager.spawn({ guid: "Interactor", replicates: true });
        }
        this.sendPlayerId = player1.playerId;
        this.accectPlayerId = player2.playerId;
        player2.character.collisionWithOtherCharacterEnabled = false;
        GeneralManager.modiftEnterInteractiveState(this.interactObj, player2.character).then((suc) => {
            if (!suc) {
                return;
            }
            this.action.call();
            if (config.sendStance && config.accectStance) {
                PlayerManagerExtesion.changeStanceExtesion(player2.character, config.accectStance);
                PlayerManagerExtesion.changeStanceExtesion(player1.character, config.sendStance);
            }
            else if (config.sendAni && config.accectAni) {
                PlayerManagerExtesion.rpcPlayAnimation(player2.character, config.accectAni, 1);
                let ani = PlayerManagerExtesion.loadAnimationExtesion(player1.character, config.sendAni, true);
                ani.play();
                setTimeout(() => {
                    ModuleService.getModule(PlayerModuleServer).net_LeaveInteract(null, player1.playerId);
                }, ani.length * 1000);
                //需要发起者的id
            }
            PlayerManager$1.instance.setPlayerState(PlayerStateType.DoublePeopleAction, true, player1);
            PlayerManager$1.instance.setPlayerState(PlayerStateType.DoublePeopleAction, true, player2);
            this.interactObj.localTransform.position = (config.v);
            this.interactObj.localTransform.rotation = (new mw.Rotation(config.r));
        });
        player1.character.attachToSlot(this.interactObj, mw.HumanoidSlotType.FaceOrnamental);
    }
    leave() {
        let accectPlayer = Player.getPlayer(this.accectPlayerId);
        let sendPlayer = Player.getPlayer(this.sendPlayerId);
        const leaveLoc = accectPlayer.character.worldTransform.getForwardVector().multiply(100);
        leaveLoc.z += 100;
        GeneralManager.modifyExitInteractiveState(this.interactObj, accectPlayer.character.worldTransform.position.add(leaveLoc), "").then(() => {
            PlayerManagerExtesion.changeStanceExtesion(sendPlayer.character, "");
            PlayerManagerExtesion.changeStanceExtesion(accectPlayer.character, "");
            const accectHight = accectPlayer.character.description.advance.bodyFeatures.body.height;
            const sendHight = sendPlayer.character.description.advance.bodyFeatures.body.height;
            accectPlayer.character.description.advance.bodyFeatures.body.height = sendHight;
            setTimeout(() => {
                accectPlayer.character.description.advance.bodyFeatures.body.height = accectHight;
            }, 33);
            PlayerManager$1.instance.setPlayerState(PlayerStateType.DoublePeopleAction, false, accectPlayer);
            PlayerManager$1.instance.setPlayerState(PlayerStateType.DoublePeopleAction, false, sendPlayer);
        });
    }
    reLoginLeave() {
        let accectPlayer = Player.getPlayer(this.accectPlayerId);
        let sendPlayer = Player.getPlayer(this.sendPlayerId);
        if (accectPlayer) {
            const leaveLoc = accectPlayer.character.worldTransform.getForwardVector().multiply(100);
            leaveLoc.z += 100;
            GeneralManager.modifyExitInteractiveState(this.interactObj, accectPlayer.character.worldTransform.position.add(leaveLoc));
            PlayerManagerExtesion.changeStanceExtesion(accectPlayer.character, "");
            accectPlayer.character.capsuleCorrectionEnabled = true;
        }
        if (sendPlayer) {
            PlayerManagerExtesion.changeStanceExtesion(sendPlayer.character, "");
        }
    }
}

var foreign66 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ActionDoubleType () { return ActionDoubleType; },
    ActionLuanguage: ActionLuanguage,
    ActionModuleC: ActionModuleC,
    ActionModuleS: ActionModuleS,
    get ActionType () { return ActionType; },
    InteractPlayer: InteractPlayer
});

class InputManager {
    static get instance() {
        if (InputManager._instance == null) {
            InputManager._instance = new InputManager();
        }
        return InputManager._instance;
    }
    constructor() {
        this.touchTime = 0;
        this.lastTouch = 0;
        this.linePos = new mw.Vector();
        this.init();
    }
    destroy() {
        InputManager._instance = null;
        if (this._onTouch != null) {
            this._onTouch.clear();
            this._onTouch = null;
        }
        if (this.keyDownActionMap != null) {
            this.keyDownActionMap.forEach((action) => {
                action.clear();
            });
            this.keyDownActionMap.clear();
        }
        if (this.touchInput != null) {
            this.touchInput.onTouchBegin.clear();
            this.touchInput = null;
        }
        if (this.keyDownEventListener != null) {
            this.keyDownEventListener.disconnect();
            this.keyDownEventListener = null;
        }
    }
    init() {
        if (mw.SystemUtil.isClient()) {
            this.keyDownActionMap = new Map();
        }
    }
    /**
     * 鼠标点击触发，返回点击的所有结果
     */
    get onTouch() {
        if (this._onTouch == null) {
            this._onTouch = new Action1();
            this.initTouch();
        }
        return this._onTouch;
    }
    // public get onTouchEnd(): Action1<Array<mw.HitResult>> {
    //     if (this._ontouchEnd == null) {
    //         this._ontouchEnd = new Action1();
    //         this.initTouch();
    //     }
    //     return this._ontouchEnd;
    // }
    /**
     * 按下键盘事件(增加了重复监听的判断，还可以移除监听方法)
     * @param key 按键类型
     * @returns 监听的Action方法
     */
    onKeyDown(key) {
        if (mw.SystemUtil.isClient()) {
            if (this.keyDownActionMap == null)
                this.keyDownActionMap = new Map();
            if (!this.keyDownActionMap.has(key)) {
                this.keyDownActionMap.set(key, new Action1());
                this.keyDownEventListener = mw.InputUtil.onKeyDown(key, () => {
                    this.keyDownActionMap.get(key).call(key);
                });
            }
            let action = this.keyDownActionMap.get(key);
            if (action.count > 0) {
                return null;
            }
            return action;
        }
        return null;
    }
    initTouch() {
        if (this.touchInput != null)
            return;
        this.touchInput = new mw.TouchInput();
        //这个逻辑需要currentPlayer
        Player.asyncGetLocalPlayer().then(() => {
            this.touchInput.onTouchBegin.add(this.touchHandler.bind(this));
            this.touchInput.onTouchEnd.add(this.touchEnd.bind(this));
        });
    }
    touchEnd(index, location, touchType) {
        if (this.onTouch.count == 0)
            return;
        location = this.touchInput.getTouchVectorArray()[0]; //手机上传进来的location是个{}所以先这么用
        if (!location)
            return;
        let nt = TimeUtil.elapsedTime();
        let arr = [];
        if (nt - this.touchTime < 0.6 && nt - this.lastTouch > 1) {
            this.lastTouch = nt;
            try {
                let pos = InputUtil.convertScreenLocationToWorldSpace(location.x, location.y);
                mw.Vector.multiply(pos.worldDirection.normalize(), 2000, this.linePos);
                mw.Vector.add(pos.worldPosition, this.linePos, this.linePos);
                arr = QueryUtil.lineTrace(pos.worldPosition, this.linePos, true, false);
                //arr = ScreenUtil.getGameObjectByScreenPosition(location.x, location.y, 2000, true, false);
            }
            catch (e) {
                console.info('getClickGameObjectByScene error');
            }
            //this.log(list);
            // for (let i = 0; list != null && i < list.length; i++) {
            //     if (arr.includes(list[i])) continue;
            //     arr.push(list[i]);
            // }
        }
        this.onTouch.call(arr);
    }
    touchHandler(index, location, state) {
        this.touchTime = TimeUtil.elapsedTime();
        // console.log("TouchHandler:  index=" + index + "  location_x=" + location.x + " location_y=" + location.y);
        // if (this.onTouch.count == 0) return;
        // location = this.touchInput.getTouchVectorArray()[0];//手机上传进来的location是个{}所以先这么用
        // let list: Array<mw.HitResult> = ScreenUtil.getGameObjectByScreenPosition(location.x, location.y, 50000, true, false);
        // //this.log(list);
        // let arr: Array<mw.HitResult> = [];
        // for (let i = 0; list != null && i < list.length; i++) {
        //     if (arr.includes(list[i])) continue;
        //     arr.push(list[i]);
        // }
        // if (list.length > 0) {
        //     this.onTouch.call(arr);
        // }
    }
    log(list) {
        for (let i = 0; list != null && i < list.length; i++) {
        }
    }
    getTouchPos(index) {
        let pos = this.touchInput.getTouchVectorArray()[index];
        return new mw.Vector2(pos.x, pos.y);
    }
}

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InputManager: InputManager
});

class PlayerModuleClient extends ModuleC {
    constructor() {
        super(...arguments);
        this.myInfo = null;
        this.initMyInfo = (info) => {
            console.error("初始化自己的信息 + " + getMyPlayerID());
            this.myInfo = info;
            /**UI监听 */
        };
        this.chatBack = (content) => {
            this.server.net_Chat(content);
        };
        this._isLook = false;
    }
    onStart() {
        Player.onPlayerLeave.add((player) => {
            try {
                if (player)
                    PlayerManager$1.instance.deletePlayer(player.playerId);
            }
            catch (error) {
                console.error("PlyaerModule玩家离开游戏时出现错误", error);
            }
        });
        Event.addLocalListener("initMySelf", this.initMyInfo);
    }
    getDataByPlayer(playerID) {
        return this.data;
    }
    onEnterScene(sceneType) {
        RoomService.registerMGSChatMessageEvent(this.chatBack);
        InputManager.instance.onTouch.add(this.onTouchThis, this);
        this.init(sceneType);
    }
    async init(sceneType) {
        await Player.asyncGetLocalPlayer();
        if (!this.localPlayer) {
            console.error("玩家初始化可能失败了");
            return;
        }
        this.server.net_OnEnterScene(AccountService.getNickName() || "233Name");
    }
    /**
     * 点击角色显示233名片
     * @param hitResArr
     */
    onTouchThis(hitResArr) {
        if (UIManager.getUIstate() != HudGameUIState.Show)
            return;
        for (let hit of hitResArr) {
            if (!this._isLook) {
                return;
            }
            if (GameUtils.isPlayerCharacter(hit.gameObject)) {
                continue;
            }
            let character = hit.gameObject;
            if (!character || !character.player) {
                continue;
            }
            let openId = character.player.userId;
            // console.info("233playerID===   openId  " + openId + "    =====<");
            mw.RoomService.showUserProfile(null, openId);
            this._isLook = false;
            setTimeout(() => {
                this._isLook = true;
            }, 1000);
            return;
        }
    }
    onUpdate(dt) {
        PlayerManager$1.instance.update(dt);
    }
}

var foreign68 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerModuleClient
});

var dist = {};

(function (exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	/*
	 * @Author: zhaolei
	 * @Date: 2022-05-05 09:57:23
	 * @LastEditors: zhaolei
	 * @Description: file content
	 */
	class DropdownItem extends mw.UIScript {
	    list;
	    data;
	}
	class DropdownList {
	    _root;
	    _itemCls;
	    space;
	    /**
	     * 不显示的缓存道具
	     */
	    _cache;
	    /**
	     * 显示的道具
	     */
	    _items;
	    _isDropdown;
	    onSelect = new Action1();
	    constructor(_root, _itemCls, space = 0.5) {
	        this._root = _root;
	        this._itemCls = _itemCls;
	        this.space = space;
	        this._cache = [];
	        this._items = [];
	    }
	    /**
	  * 添加展开按钮事件
	  */
	    toggle() {
	        this._isDropdown = !this._isDropdown;
	        this._invalidateLayout();
	    }
	    /**
	     * 添加展开按钮事件
	     */
	    expand() {
	        this._isDropdown = true;
	        this._invalidateLayout();
	    }
	    /**
	     * 添加展开按钮事件
	     */
	    unExpand() {
	        this._isDropdown = false;
	        this._invalidateLayout();
	    }
	    /**
	     * 添加一个选项
	     * @param node
	     * @param index 索引
	     */
	    addItem(data, index = -1) {
	        let itemUI = this._cache.length > 0 ? this._cache.shift() : UIService.create(this._itemCls);
	        if (!itemUI.list) {
	            itemUI.list = this;
	            itemUI.button.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	            itemUI.button.onClicked.add(() => {
	                this.onSelect.call(itemUI.button.text);
	                this.unExpand();
	            });
	            this._root.cmdPanel.addChild(itemUI.uiObject);
	        }
	        itemUI.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	        itemUI.button.text = data;
	        if (index >= 0) {
	            this._items.splice(index, 0, itemUI);
	        }
	        else {
	            this._items.push(itemUI);
	        }
	        this._root.cmdPanel.size = new mw.Vector2(270, this._items.length * (itemUI.uiObject.size.y + this.space));
	        this._invalidateLayout();
	    }
	    /**
	     * 删除一个选项
	     * @param node
	     */
	    removeItem(node) {
	        const index = this._items.indexOf(node);
	        if (index >= 0) {
	            node.visible = false;
	            this._cache.push(...this._items.splice(index, 1));
	            this._invalidateLayout();
	        }
	    }
	    clear() {
	        for (const item of this._items) {
	            if (!this._cache.includes(item)) {
	                this._cache.push(item);
	            }
	            item.uiObject.visibility = mw.SlateVisibility.Collapsed;
	        }
	        this._items.length = 0;
	        this._invalidateLayout();
	    }
	    /**
	     * 删除一个指定索引
	     * @param index
	     */
	    removeItemAt(index) {
	        const node = this.getItem(index);
	        if (node) {
	            this.removeItem(node);
	        }
	    }
	    /**
	     * 获取一个选项,超出范围则返回空
	     * @param index
	     */
	    getItem(index) {
	        if (index >= 0 && index < this._items.length)
	            return this._items[index];
	        return null;
	    }
	    get size() {
	        return this._items.length;
	    }
	    /**
	     * 重新对齐面板
	     */
	    _invalidateLayout() {
	        if (this._isDropdown) {
	            let offset = 0;
	            this._root.cmdPanel.position = mw.Vector2.zero;
	            this._root.dropList.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	            for (let i = 0; i < this._items.length; i++) {
	                this._items[i].uiObject.position = new mw.Vector2(0, offset);
	                offset += this._items[i].uiObject.size.y + this.space;
	            }
	        }
	        else {
	            this._root.dropList.visibility = mw.SlateVisibility.Collapsed;
	        }
	    }
	}

	/**
	 * @Author       : lei.zhao
	 * @Date         : 2023-03-19 13:31:37
	 * @LastEditors  : lei.zhao
	 * @LastEditTime : 2023-03-19 13:31:37
	 * @FilePath     : \commonmodule_gm\JavaScripts\module\gmModule\GM.ts
	 * @Description  : 修改描述
	 */
	exports.GM = void 0;
	(function (GM) {
	    function start(uiClass) {
	        if (SystemUtil.isClient()) {
	            new uiClass().show();
	        }
	    }
	    GM.start = start;
	})(exports.GM || (exports.GM = {}));

	/*
	 * @Author: zhaolei
	 * @Date: 2022-05-05 09:50:48
	 * @LastEditors: zhaolei
	 * @Description: file content
	 */
	class GMService {
	    static _instance;
	    static get instance() {
	        if (!GMService._instance) {
	            GMService._instance = new GMService();
	        }
	        return GMService._instance;
	    }
	    /**
	     * 初始化UI
	     */
	    createUI(dropDownList) {
	        GMConfig.forEach(cmd => {
	            dropDownList.addItem(cmd);
	        });
	    }
	    /**
	     * 初始化配置
	     */
	    constructor() {
	        if (SystemUtil.isServer()) {
	            Event.addClientListener("GM_CALL", (player, gmIndex, param) => {
	                GMConfig[gmIndex].serverCmd(player, param);
	            });
	        }
	    }
	    /**
	     * 调用命令
	     * @param data
	     */
	    cmd(data, param) {
	        if (data.clientCmd) {
	            data.clientCmd(mw.Player.localPlayer, param);
	        }
	        Event.dispatchToLocal("GM_RUN", data.label);
	        const index = GMConfig.indexOf(data);
	        if (index >= 0 && data.serverCmd) {
	            Event.dispatchToServer("GM_CALL", index, param);
	        }
	    }
	}

	/**
	 * @Author       : lei.zhao
	 * @Date         : 2022-12-19 18:33:40
	 * @LastEditors  : lei.zhao
	 * @LastEditTime : 2023-04-10 15:50:21
	 * @FilePath     : \commonmodule_gm\JavaScripts\module\gmModule\GMConfig.ts
	 * @Description  : 修改描述
	 */
	const GMConfig = [];
	/**
	 * 添加GM命令
	 * @param label 名称
	 * @param cmdClient 客户端命令
	 * @param cmdServer 服务端命令
	 * @param shortKey 快捷键
	 */
	function AddGMCommand(label, cmdClient, cmdServer, group, shortKey) {
	    if (shortKey != null) {
	        label = label + "(" + shortKey + ")";
	    }
	    const data = { label: label, group: group, clientCmd: cmdClient, serverCmd: cmdServer, shortKey: shortKey };
	    if (mw.SystemUtil.isServer()) {
	        GMService.instance;
	    }
	    else {
	        if (shortKey != null) {
	            InputUtil.onKeyDown(shortKey, () => {
	                GMService.instance.cmd(data, exports.GM.getParam ? exports.GM.getParam() : "");
	            });
	        }
	    }
	    GMConfig.push(data);
	}

	/**
	 * @Author       : lei.zhao
	 * @Date         : 2022-12-19 18:33:40
	 * @LastEditors  : lei.zhao
	 * @LastEditTime : 2023-04-10 16:35:51
	 * @FilePath     : \commonmodule_gm\JavaScripts\module\gmModule\GMBasePanel.ts
	 * @Description  : 修改描述
	 */
	//主面板
	class GMBasePanel {
	    dropDownList;
	    isGroup = false;
	    groupText = "分组";
	    cmdText = "命令";
	    _view;
	    constructor(_viewCls, _itemCls) {
	        exports.GM.getParam = () => {
	            return this._view.argText.text;
	        };
	        this._view = UIService.create(_viewCls);
	        this._view.groupButton.onClicked.add(() => {
	            this.dropDownList.clear();
	            this.dropDownList.addItem("分组");
	            const groupList = [];
	            GMConfig.forEach(cmd => {
	                if (cmd.group && !groupList.includes(cmd.group)) {
	                    groupList.push(cmd.group);
	                    this.dropDownList.addItem(cmd.group);
	                }
	            });
	            this.dropDownList.toggle();
	            this.isGroup = true;
	        });
	        this._view.cmdButton.onClicked.add(() => {
	            this.dropDownList.clear();
	            if (this.groupText == "分组") {
	                GMConfig.forEach(cmd => {
	                    this.dropDownList.addItem(cmd.label);
	                });
	            }
	            else {
	                GMConfig.forEach(cmd => {
	                    if (cmd.group == this.groupText) {
	                        this.dropDownList.addItem(cmd.label);
	                    }
	                });
	            }
	            this.dropDownList.toggle();
	            this.isGroup = false;
	        });
	        this._view.okButton.onClicked.add(() => {
	            const cmd = GMConfig.find(i => i.label == this.cmdText);
	            cmd && GMService.instance.cmd(cmd, this._view.argText.text);
	        });
	        this.dropDownList = new DropdownList(this._view, _itemCls, 1);
	        this.dropDownList.onSelect.add(text => {
	            this.isGroup ? (this.groupText = text, this._view.groupButton.text = text) : (this.cmdText = text, this._view.cmdButton.text = text);
	        });
	        Event.addLocalListener("GM_RUN", (label) => {
	            this._view.cmdButton.text = label;
	        });
	        GMService.instance.createUI(this.dropDownList);
	    }
	    show() {
	        UIService.showUI(this._view);
	    }
	}

	exports.AddGMCommand = AddGMCommand;
	exports.DropdownItem = DropdownItem;
	exports.DropdownList = DropdownList;
	exports.GMBasePanel = GMBasePanel;
	exports.GMConfig = GMConfig;
	exports.GMService = GMService;
	
} (dist));

var ResManager_1;
//import { GoNode } from "./GoNode";
let ResManager = ResManager_1 = class ResManager {
    static get instance() {
        if (ResManager_1._instance == null) {
            ResManager_1._instance = new ResManager_1();
        }
        return ResManager_1._instance;
    }
    constructor() {
        this._isInit = false;
    }
    static init() {
        this.instance.init();
    }
    destroy() {
        //ResManager._instance = null;
    }
    /**
     * 初始化，不要私自调用
     */
    init() {
        if (this._isInit)
            return;
        this._isInit = true;
    }
    /**
     * 根据guid查找场景中一个GameObject(异步，双端调用)
     * @param guid guid
     * @param waitTime 等待时间(单位：毫秒)
     * @returns GameObject
     */
    async findGameObjectByGuid(guid, waitTime = 10000) {
        let go = GameObject.findGameObjectById(guid);
        if (go != null)
            return go;
        return new Promise((resolve) => {
            let tickTime = 100;
            let id = setInterval(() => {
                go = GameObject.findGameObjectById(guid);
                waitTime -= tickTime;
                if (go != null || waitTime <= 0) {
                    clearInterval(id);
                    resolve(go);
                }
            }, tickTime);
        });
    }
    /**
     * 根据guid查找场景中一个脚本(异步，双端调用)
     * @param guid guid
     * @param waitTime 等待时间(毫秒)
     * @returns 脚本
     */
    async findScriptByGuid(guid, waitTime = 10000) {
        let sp = mw.ScriptManager.findScript(guid);
        if (sp != null)
            return sp;
        return new Promise((resolve) => {
            let tickTime = 100;
            let id = setInterval(() => {
                sp = mw.ScriptManager.findScript(guid);
                waitTime -= tickTime;
                if (sp != null || waitTime <= 0) {
                    clearInterval(id);
                    resolve(sp);
                }
            }, tickTime);
        });
    }
    /**
     * 从GameObject获取子对象的guid (异步，双端调用)
     * @param targetGo 目标gameObject
     * @param path 节点路径
     * @returns guid
     */
    async getChildGuidFromGo(targetGo, path) {
        if (mw.StringUtil.isEmpty(path))
            return null;
        let targetGuid = this.getGoGuid(targetGo);
        let arr = path.split('/');
        const maxFindTimes = 10;
        let findTimes = maxFindTimes; //找的次数
        let i = -1; //需要先找到GameObject，所以是-1
        let go = null;
        if (targetGo instanceof mw.GameObject) {
            go = targetGo;
            i = 0;
        }
        return new Promise((resolve) => {
            let id = setInterval(() => {
                let findRes = null;
                if (i == -1) {
                    findRes = GameObject.findGameObjectById(targetGuid);
                }
                else if (arr[i] == '..') {
                    findRes = go.parent;
                }
                else {
                    findRes = go.getChildByName(arr[i]);
                }
                if (findRes != null) {
                    go = findRes;
                    i++;
                    findTimes = maxFindTimes;
                }
                else {
                    findTimes--;
                    //console.error("ResManager.getChildGameObjectGuid file!   path=" + path + "   times=" + (maxFindTimes - findTimes));
                }
                if (i >= arr.length || findTimes == 0) {
                    clearInterval(id);
                    resolve(findTimes == 0 ? null : go.gameObjectId);
                }
            }, 300);
        });
    }
    /** 从一个GameObject中获取脚本的guid */
    async getScriptGuidFromGo(targetGo, path) {
        if (mw.StringUtil.isEmpty(path))
            return null;
        let targetGuid = this.getGoGuid(targetGo);
        let arr = path.split('/');
        const maxFindTimes = 10;
        let findTimes = maxFindTimes; //找的次数
        let i = -1; //需要先找到GameObject，所以是-1
        let go = null;
        let sp = null;
        if (targetGo instanceof mw.GameObject) {
            go = targetGo;
            i = 0;
        }
        return new Promise((resolve) => {
            let id = setInterval(() => {
                let findRes = null;
                if (i == arr.length - 1) {
                    if (arr[i].endsWith('.ts'))
                        sp = go.getScriptByName(arr[i]);
                    else
                        sp = go.getScriptByName(`${arr[i]}.ts`);
                }
                else if (i == -1) {
                    findRes = GameObject.findGameObjectById(targetGuid);
                }
                else if (arr[i] == '..') {
                    findRes = go.parent;
                }
                else {
                    findRes = go.getChildByName(arr[i]);
                }
                if (findRes != null) {
                    go = findRes;
                    i++;
                    findTimes = maxFindTimes;
                }
                else {
                    findTimes--;
                    //console.error("ResManager.getChildScriptGuid file!   path=" + path + "   times=" + (maxFindTimes - findTimes));
                }
                if (sp != null || findTimes == 0) {
                    clearInterval(id);
                    resolve(findTimes == 0 ? null : sp.guid);
                }
            }, 100);
        });
    }
    /**
     * 根据路径从GameObject中查找一个子GameObject (异步 双端)
     * @param targetGo 目标GameObject
     * @param path 路径
     * @returns 子GameObject
     */
    async findChildFromGo(targetGo, path) {
        let targetGuid = this.getGoGuid(targetGo);
        let guid = await this.getChildGuidFromGo(targetGuid, path);
        if (guid == null) {
            //console.error("ResManager.findChild: findChild fail!   path=" + path);
            return null;
        }
        return this.findGameObjectByGuid(guid);
    }
    /**
     * 根据路径从GameObject中查找一个脚本 (异步 双端)
     * @param targetGo 目标GameObject
     * @param path 路径
     * @returns 脚本对象
     */
    async findScriptFromGo(targetGo, path) {
        let targetGuid = this.getGoGuid(targetGo);
        let guid = await this.getScriptGuidFromGo(targetGuid, path);
        if (guid == null) {
            //console.error("ResManager.findScript: findScript fail!   path=" + path);
            return null;
        }
        return this.findScriptByGuid(guid);
    }
    /**
     * 从一个gameObject上根据路径找一个脚本（Server & Client）
     * @param go GameObject
     * @param path 脚本路径
     * @returns 脚本对象
     */
    findScriptFromGo_sync(go, path) {
        if (go == null || mw.StringUtil.isEmpty(path))
            return null;
        let arr = path.split('/');
        let sp;
        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                sp = go.getScriptByName(`${arr[i]}.ts`);
                if (sp == null)
                    sp = go.getScriptByName(arr[i]);
                if (sp == null) {
                    //console.error('FindSceneObjScriptError path=' + path + "   -tsFile:" + arr[i]);
                    return null;
                }
            }
            else {
                if (arr[i] == '..') {
                    go = go.parent;
                }
                else {
                    go = go.getChildByName(arr[i]);
                }
                if (go == null) {
                    //console.error('FindSceneObjScriptError path=' + path + "   -node:" + arr[i]);
                    return null;
                }
            }
        }
        return sp;
    }
    getGoGuid(targetGo) {
        if (targetGo instanceof mw.GameObject) {
            return targetGo.gameObjectId;
        }
        return targetGo;
    }
    /**
     * 创建一个资源，没有预加载则自动加载
     * @param guid 资源id
     * @returns 资源对象
     */
    async spawnAsset(guid) {
        if (mw.AssetUtil.assetLoaded(guid))
            return SpawnManager.wornSpawn(guid);
        return new Promise((resolve) => {
            mw.AssetUtil.asyncDownloadAsset(guid).then((success) => {
                if (success) {
                    SpawnManager.wornAsyncSpawn(guid).then((go) => {
                        resolve(go);
                    });
                }
                else {
                    //console.error("ResManager->spawnAsset: Download asset fail! guid=" + guid);
                    resolve(null);
                }
            });
        });
    }
    /**
     * 准备资源
     * @param guids 需要准备资源的guid列表
     * @returns 是否成功
     */
    async getReadyAssets(...guids) {
        let needLoad = [];
        for (let i = 0; i < guids.length; i++) {
            if (!mw.AssetUtil.assetLoaded(guids[i])) {
                needLoad.push(guids[i]);
                mw.AssetUtil.asyncDownloadAsset(guids[i]);
            }
        }
        if (needLoad.length == 0)
            return true;
        return new Promise(async (resolve) => {
            let id = setInterval(() => {
                for (let i = 0; i < needLoad.length;) {
                    if (mw.AssetUtil.assetLoaded(needLoad[i])) {
                        needLoad.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
                if (needLoad.length == 0) {
                    clearInterval(id);
                    resolve(true);
                }
            }, 100);
        });
    }
    playEffectOnPlayer(player, effectID) {
        // let effConfig = GameConfig.Effect.getElement(effectID);
        // let effNum = null;//特效播放方式 ==> 循环/次数
        // let effIsTime: boolean = false;//特效是否到时间停止
        // if (effConfig.EffectTime < 0) {//时间
        //     effNum = 0;
        //     effIsTime = true;
        // } else if (effConfig.EffectTime > 0) {//次数
        //     effNum = effConfig.EffectTime;
        //     effIsTime = false;
        // } else if (effConfig.EffectTime == 0) {//循环
        //     effNum = 0;
        //     effIsTime = false;
        // }
        // if (effNum == null) {
        //     console.error("特效播放次数有问题 effTime = " + effConfig.EffectTime);
        //     return null;
        // }
        // let id = GeneralManager.rpcPlayEffectOnPlayer(
        //     effConfig.EffectID,
        //     player,
        //     effConfig.EffectPoint,
        //     effNum,
        //     effConfig.EffectLocation,
        //     effConfig.EffectRotate.toRotation(),
        //     effConfig.EffectLarge
        // );
        // if (effIsTime) {
        //     setTimeout(() => {
        //         EffectService.stop(effectID);
        //     }, effConfig.EffectTime);
        //     return null;
        // }
        // return id;
    }
    async spawnObjOnCharacter(character, configID) {
        // const modelConfig = GameConfig.Model.getElement(configID);
        // await GameUtils.downAsset(modelConfig.ModelGuid);
        // let modelObj = await GoPool.asyncSpawn(modelConfig.ModelGuid, modelConfig.SourceType);
        // if (modelObj) {
        //     character.attachToSlot(modelObj, modelConfig.ModelPoint);
        //     modelObj.localTransform.position = (modelConfig.ModelLocation);
        //     modelObj.localTransform.rotation = (new mw.Rotation(modelConfig.ModelRotate));
        //     modelObj.localTransform.scale = (modelConfig.ModelLarge);
        //     modelObj.setCollision(mw.PropertyStatus.Off, true);
        //     modelObj.setVisibility(mw.PropertyStatus.On, true)
        //     return modelObj
        // }
        return null;
    }
    destoryObj(obj) {
        obj.parent = null;
        GoPool.despawn(obj);
    }
};
ResManager = ResManager_1 = __decorate([
    Decorator.autoExecute("init")
], ResManager);

var foreign80 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ResManager () { return ResManager; }
});

let GMHUD_generate = class GMHUD_generate extends UIScript {
    get argText() {
        if (!this.argText_Internal && this.uiWidgetBase) {
            this.argText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/argText');
        }
        return this.argText_Internal;
    }
    get groupButton() {
        if (!this.groupButton_Internal && this.uiWidgetBase) {
            this.groupButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/groupButton');
        }
        return this.groupButton_Internal;
    }
    get cmdButton() {
        if (!this.cmdButton_Internal && this.uiWidgetBase) {
            this.cmdButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cmdButton');
        }
        return this.cmdButton_Internal;
    }
    get okButton() {
        if (!this.okButton_Internal && this.uiWidgetBase) {
            this.okButton_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/okButton');
        }
        return this.okButton_Internal;
    }
    get dropList() {
        if (!this.dropList_Internal && this.uiWidgetBase) {
            this.dropList_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList');
        }
        return this.dropList_Internal;
    }
    get cmdPanel() {
        if (!this.cmdPanel_Internal && this.uiWidgetBase) {
            this.cmdPanel_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/dropList/cmdPanel');
        }
        return this.cmdPanel_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.groupButton.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "groupButton");
        });
        this.groupButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "groupButton");
        });
        this.groupButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "groupButton");
        });
        this.groupButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.cmdButton.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "cmdButton");
        });
        this.cmdButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "cmdButton");
        });
        this.cmdButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "cmdButton");
        });
        this.cmdButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        this.okButton.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "okButton");
        });
        this.okButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "okButton");
        });
        this.okButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "okButton");
        });
        this.okButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.groupButton);
        this.setLanguage(this.cmdButton);
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/okButton/TextBlock"));
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
GMHUD_generate = __decorate([
    UIBind('UI/uiTemplate/GM/GMHUD.ui')
], GMHUD_generate);
var GMHUD_generate$1 = GMHUD_generate;

var foreign98 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMHUD_generate$1
});

let SettingUI_generate = class SettingUI_generate extends UIScript {
    get mask() {
        if (!this.mask_Internal && this.uiWidgetBase) {
            this.mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mask');
        }
        return this.mask_Internal;
    }
    get mLabelBtn1() {
        if (!this.mLabelBtn1_Internal && this.uiWidgetBase) {
            this.mLabelBtn1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mLabelBtn1');
        }
        return this.mLabelBtn1_Internal;
    }
    get mLabelBtn2() {
        if (!this.mLabelBtn2_Internal && this.uiWidgetBase) {
            this.mLabelBtn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mLabelBtn2');
        }
        return this.mLabelBtn2_Internal;
    }
    get mBtn_Exit() {
        if (!this.mBtn_Exit_Internal && this.uiWidgetBase) {
            this.mBtn_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mBtn_Exit');
        }
        return this.mBtn_Exit_Internal;
    }
    get mCanvasUserInfo() {
        if (!this.mCanvasUserInfo_Internal && this.uiWidgetBase) {
            this.mCanvasUserInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo');
        }
        return this.mCanvasUserInfo_Internal;
    }
    get mHeadCanvas() {
        if (!this.mHeadCanvas_Internal && this.uiWidgetBase) {
            this.mHeadCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas');
        }
        return this.mHeadCanvas_Internal;
    }
    get mHeadImg() {
        if (!this.mHeadImg_Internal && this.uiWidgetBase) {
            this.mHeadImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mHeadImg');
        }
        return this.mHeadImg_Internal;
    }
    get mUser() {
        if (!this.mUser_Internal && this.uiWidgetBase) {
            this.mUser_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mUser');
        }
        return this.mUser_Internal;
    }
    get mUserName() {
        if (!this.mUserName_Internal && this.uiWidgetBase) {
            this.mUserName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mUserName');
        }
        return this.mUserName_Internal;
    }
    get mTitleName() {
        if (!this.mTitleName_Internal && this.uiWidgetBase) {
            this.mTitleName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mTitleName');
        }
        return this.mTitleName_Internal;
    }
    get mChangeBtn() {
        if (!this.mChangeBtn_Internal && this.uiWidgetBase) {
            this.mChangeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mChangeBtn');
        }
        return this.mChangeBtn_Internal;
    }
    get mHatBtn() {
        if (!this.mHatBtn_Internal && this.uiWidgetBase) {
            this.mHatBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mHatBtn');
        }
        return this.mHatBtn_Internal;
    }
    get mHeadText() {
        if (!this.mHeadText_Internal && this.uiWidgetBase) {
            this.mHeadText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/mHeadText');
        }
        return this.mHeadText_Internal;
    }
    get headicon() {
        if (!this.headicon_Internal && this.uiWidgetBase) {
            this.headicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/headicon');
        }
        return this.headicon_Internal;
    }
    get mAttribute() {
        if (!this.mAttribute_Internal && this.uiWidgetBase) {
            this.mAttribute_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute');
        }
        return this.mAttribute_Internal;
    }
    get mAddLevel() {
        if (!this.mAddLevel_Internal && this.uiWidgetBase) {
            this.mAddLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel');
        }
        return this.mAddLevel_Internal;
    }
    get mBadgeTxt() {
        if (!this.mBadgeTxt_Internal && this.uiWidgetBase) {
            this.mBadgeTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mBadgeTxt');
        }
        return this.mBadgeTxt_Internal;
    }
    get mUp() {
        if (!this.mUp_Internal && this.uiWidgetBase) {
            this.mUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mUp');
        }
        return this.mUp_Internal;
    }
    get mAddLevelBtn() {
        if (!this.mAddLevelBtn_Internal && this.uiWidgetBase) {
            this.mAddLevelBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mAddLevelBtn');
        }
        return this.mAddLevelBtn_Internal;
    }
    get hp() {
        if (!this.hp_Internal && this.uiWidgetBase) {
            this.hp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/hp');
        }
        return this.hp_Internal;
    }
    get mHp() {
        if (!this.mHp_Internal && this.uiWidgetBase) {
            this.mHp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mHp');
        }
        return this.mHp_Internal;
    }
    get mHpTxt() {
        if (!this.mHpTxt_Internal && this.uiWidgetBase) {
            this.mHpTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mHpTxt');
        }
        return this.mHpTxt_Internal;
    }
    get mp() {
        if (!this.mp_Internal && this.uiWidgetBase) {
            this.mp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mp');
        }
        return this.mp_Internal;
    }
    get mMp() {
        if (!this.mMp_Internal && this.uiWidgetBase) {
            this.mMp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mMp');
        }
        return this.mMp_Internal;
    }
    get mMpTxt() {
        if (!this.mMpTxt_Internal && this.uiWidgetBase) {
            this.mMpTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mMpTxt');
        }
        return this.mMpTxt_Internal;
    }
    get exp() {
        if (!this.exp_Internal && this.uiWidgetBase) {
            this.exp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/exp');
        }
        return this.exp_Internal;
    }
    get mExp() {
        if (!this.mExp_Internal && this.uiWidgetBase) {
            this.mExp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mExp');
        }
        return this.mExp_Internal;
    }
    get mExpTxt() {
        if (!this.mExpTxt_Internal && this.uiWidgetBase) {
            this.mExpTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mExpTxt');
        }
        return this.mExpTxt_Internal;
    }
    get levelfull() {
        if (!this.levelfull_Internal && this.uiWidgetBase) {
            this.levelfull_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/levelfull');
        }
        return this.levelfull_Internal;
    }
    get mRewardCanvas() {
        if (!this.mRewardCanvas_Internal && this.uiWidgetBase) {
            this.mRewardCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas');
        }
        return this.mRewardCanvas_Internal;
    }
    get mNextLevel() {
        if (!this.mNextLevel_Internal && this.uiWidgetBase) {
            this.mNextLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas/mNextLevel');
        }
        return this.mNextLevel_Internal;
    }
    get mRewardTxt() {
        if (!this.mRewardTxt_Internal && this.uiWidgetBase) {
            this.mRewardTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas/mRewardTxt');
        }
        return this.mRewardTxt_Internal;
    }
    get mRewards() {
        if (!this.mRewards_Internal && this.uiWidgetBase) {
            this.mRewards_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasUserInfo/mRewardCanvas/mRewards');
        }
        return this.mRewards_Internal;
    }
    get mCanvasSound() {
        if (!this.mCanvasSound_Internal && this.uiWidgetBase) {
            this.mCanvasSound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound');
        }
        return this.mCanvasSound_Internal;
    }
    get mBar_Music() {
        if (!this.mBar_Music_Internal && this.uiWidgetBase) {
            this.mBar_Music_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_Music');
        }
        return this.mBar_Music_Internal;
    }
    get mBar_Sound() {
        if (!this.mBar_Sound_Internal && this.uiWidgetBase) {
            this.mBar_Sound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_Sound');
        }
        return this.mBar_Sound_Internal;
    }
    get qualitytext() {
        if (!this.qualitytext_Internal && this.uiWidgetBase) {
            this.qualitytext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/qualitytext');
        }
        return this.qualitytext_Internal;
    }
    get mBar_GraphicsLev() {
        if (!this.mBar_GraphicsLev_Internal && this.uiWidgetBase) {
            this.mBar_GraphicsLev_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_GraphicsLev');
        }
        return this.mBar_GraphicsLev_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mHatBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mHatBtn");
        });
        this.mHatBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mHatBtn");
        });
        this.mHatBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mHatBtn");
        });
        this.mHatBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        this.mLabelBtn1.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mLabelBtn1");
        });
        this.mLabelBtn1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mLabelBtn1");
        });
        this.mLabelBtn1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mLabelBtn1");
        });
        this.mLabelBtn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mLabelBtn2.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mLabelBtn2");
        });
        this.mLabelBtn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mLabelBtn2");
        });
        this.mLabelBtn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mLabelBtn2");
        });
        this.mLabelBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mBtn_Exit.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn_Exit");
        });
        this.mBtn_Exit.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_Exit");
        });
        this.mBtn_Exit.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_Exit");
        });
        this.mBtn_Exit.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mChangeBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mChangeBtn");
        });
        this.mChangeBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mChangeBtn");
        });
        this.mChangeBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mChangeBtn");
        });
        this.mChangeBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mAddLevelBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddLevelBtn");
        });
        this.mAddLevelBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mAddLevelBtn");
        });
        this.mAddLevelBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mAddLevelBtn");
        });
        this.mAddLevelBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mHatBtn);
        //文本多语言
        this.setLanguage(this.mUserName);
        this.setLanguage(this.mTitleName);
        this.setLanguage(this.mHeadText);
        this.setLanguage(this.mBadgeTxt);
        this.setLanguage(this.mHpTxt);
        this.setLanguage(this.mMpTxt);
        this.setLanguage(this.mExpTxt);
        this.setLanguage(this.levelfull);
        this.setLanguage(this.mNextLevel);
        this.setLanguage(this.mRewardTxt);
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mLabelBtn1/TextBlock_2"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mLabelBtn2/TextBlock_3"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasUserInfo/mHeadCanvas/ChangeText"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasUserInfo/mAttribute/mAddLevel/mAddLevelBtn/TextBlock_8"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock_1"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock_7"));
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
SettingUI_generate = __decorate([
    UIBind('UI/SettingUI.ui')
], SettingUI_generate);
var SettingUI_Generate = SettingUI_generate;

var foreign88 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SettingUI_Generate
});

class SettingUI extends SettingUI_Generate {
    onStart() {
        this.mBtn_Exit.onClicked.add(() => {
            UIManager.hideUI(this);
        });
        Event.addLocalListener("PlayButtonClick", () => {
            this.playSound(31);
        });
        this.soundLogic();
    }
    async wearHat(bool) {
        if (bool) {
            this.mHeadText.text = GameConfig.SquareLanguage.Typhoon_Ts_14.Value;
            this.headicon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        else {
            this.mHeadText.text = GameConfig.SquareLanguage.Typhoon_Ts_15.Value;
            this.headicon.visibility = mw.SlateVisibility.Collapsed;
        }
    }
    /**
     * 音效画质设置界面
     */
    soundLogic() {
        this.mBar_Music.currentValue = SoundService.BGMVolumeScale;
        this.mBar_Music.onSliderValueChanged.add((val) => {
            try {
                SoundService.volumeScale = val;
            }
            catch (error) { }
        });
        this.mBar_Sound.currentValue = SoundService.volumeScale;
        this.mBar_Sound.onSliderValueChanged.add((val) => {
            SoundService.BGMVolumeScale = val;
        });
        let defaultCpu = GraphicsSettings.getDefaultCPULevel();
        this.mBar_GraphicsLev.currentValue = defaultCpu;
        this.mBar_GraphicsLev.sliderButtonReleaseDelegate.add((val) => {
            GraphicsSettings.setGraphicsCPULevel(val);
            GraphicsSettings.setGraphicsGPULevel(val);
        });
    }
    onShow() {
        UIManager.setUIstate(this, HudGameUIState.HideAll);
    }
    onHide() {
        UIManager.setUIstate(this, HudGameUIState.Show);
    }
    async playSound(id) {
        let config = GameConfig.Music.getElement(id);
        if (!AssetUtil.assetLoaded(config.MusicGUID)) {
            await AssetUtil.asyncDownloadAsset(config.MusicGUID);
        }
        return SoundService.playSound(config.MusicGUID, 1, config.Music);
    }
}

var foreign83 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SettingUI: SettingUI
});

let GMItem_generate = class GMItem_generate extends UIScript {
    get button() {
        if (!this.button_Internal && this.uiWidgetBase) {
            this.button_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/button');
        }
        return this.button_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.button.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "button");
        });
        this.button.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "button");
        });
        this.button.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "button");
        });
        this.button.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.button);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
GMItem_generate = __decorate([
    UIBind('UI/uiTemplate/GM/GMItem.ui')
], GMItem_generate);
var GMItem_Generate = GMItem_generate;

var foreign99 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMItem_Generate
});

class GMBasePanelUI extends dist.GMBasePanel {
    constructor() {
        super(GMHUD_generate$1, GMItem_Generate);
    }
}

var foreign37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GMBasePanelUI
});

let DeadUI_generate = class DeadUI_generate extends UIScript {
    get imageBG() {
        if (!this.imageBG_Internal && this.uiWidgetBase) {
            this.imageBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/imageBG');
        }
        return this.imageBG_Internal;
    }
    get text() {
        if (!this.text_Internal && this.uiWidgetBase) {
            this.text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/text');
        }
        return this.text_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.text);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
DeadUI_generate = __decorate([
    UIBind('UI/typhoon/DeadUI.ui')
], DeadUI_generate);
var DeadUI_generate$1 = DeadUI_generate;

var foreign89 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DeadUI_generate$1
});

class DeadUI extends DeadUI_generate$1 {
    onShow(name) {
        if (!name) {
            return;
        }
        this.text.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_9.Value, name);
    }
}

var foreign76 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DeadUI
});

let TyphoonResult_generate = class TyphoonResult_generate extends UIScript {
    get canvasWin() {
        if (!this.canvasWin_Internal && this.uiWidgetBase) {
            this.canvasWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin');
        }
        return this.canvasWin_Internal;
    }
    get textFloor() {
        if (!this.textFloor_Internal && this.uiWidgetBase) {
            this.textFloor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/textFloor');
        }
        return this.textFloor_Internal;
    }
    get textTyphoon() {
        if (!this.textTyphoon_Internal && this.uiWidgetBase) {
            this.textTyphoon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/textTyphoon');
        }
        return this.textTyphoon_Internal;
    }
    get textNext() {
        if (!this.textNext_Internal && this.uiWidgetBase) {
            this.textNext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/textNext');
        }
        return this.textNext_Internal;
    }
    get buttonWin() {
        if (!this.buttonWin_Internal && this.uiWidgetBase) {
            this.buttonWin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasWin/buttonWin');
        }
        return this.buttonWin_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.buttonWin.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "buttonWin");
        });
        this.buttonWin.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "buttonWin");
        });
        this.buttonWin.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "buttonWin");
        });
        this.buttonWin.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.textFloor);
        this.setLanguage(this.textTyphoon);
        this.setLanguage(this.textNext);
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvasWin/buttonWin/TextBlock"));
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
TyphoonResult_generate = __decorate([
    UIBind('UI/typhoon/TyphoonResult.ui')
], TyphoonResult_generate);
var TyphoonResult_generate$1 = TyphoonResult_generate;

var foreign90 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonResult_generate$1
});

class TyphoonResult extends TyphoonResult_generate$1 {
    constructor() {
        super(...arguments);
        /**
         * 设置时间
         * @param time 下次台风到来剩余时间
         */
        this.setTime = (time) => {
            this.textNext.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_13.Value, time);
        };
    }
    onStart() {
        this.buttonWin.onClicked.add(() => {
            UIManager.hide(TyphoonResult);
        });
        Event.addLocalListener(EventsName.SetTime, this.setTime);
    }
    /**
     *
     * @param win 是否胜利
     * @param floor 摧毁了几层
     * @param name 台风名称
     * @param nextTiime 下一场台风还有多久到
     */
    onShow(win, floor, name, nextTiime) {
        if (!win && !floor && !name && !nextTiime) {
            return;
        }
        this.textFloor.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_10.Value, floor);
        if (win) {
            this.textTyphoon.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_11.Value, name);
        }
        else {
            this.textTyphoon.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_12.Value, name);
        }
        this.setTime(nextTiime);
    }
}

var foreign77 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonResult
});

let TyphoonTip_generate = class TyphoonTip_generate extends UIScript {
    get tipImgBg() {
        if (!this.tipImgBg_Internal && this.uiWidgetBase) {
            this.tipImgBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipImgBg');
        }
        return this.tipImgBg_Internal;
    }
    get tipImg() {
        if (!this.tipImg_Internal && this.uiWidgetBase) {
            this.tipImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tipImg');
        }
        return this.tipImg_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
TyphoonTip_generate = __decorate([
    UIBind('UI/typhoon/TyphoonTip.ui')
], TyphoonTip_generate);
var TyphoonTip_generate$1 = TyphoonTip_generate;

var foreign91 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonTip_generate$1
});

class TyphoonTip extends TyphoonTip_generate$1 {
    constructor() {
        super(...arguments);
        /** 改变UI提示计时 */
        this._time = 0;
        /** 当前序号 */
        this._index = 0;
        /** 图片资源guid */
        this._imgGuids = ["174998", "174999", "175000", "175001"];
    }
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
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
    onUpdate(dt) {
        this._time += dt;
        if (this._time >= 10 / 30) {
            this._time = 0;
            this.changeTip();
        }
    }
    /**
     * 改变显示UI
     */
    changeTip() {
        this._index++;
        this.tipImgBg.renderTransformAngle = this.tipImgBg.renderTransformAngle == 180 ? 0 : 180;
        this.tipImg.imageGuid = this._imgGuids[this._index % 4];
    }
    showTip(percent) {
        if (this._forceFlag)
            return;
        if (percent < 0)
            mw.UIService.hideUI(this);
        else {
            mw.UIService.showUI(this);
            this.tipImgBg.renderOpacity = percent * 0.5;
            this.tipImg.renderOpacity = percent;
        }
    }
    /**
     * 玩家死亡提示
     */
    playerDeadTip() {
        mw.UIService.showUI(this);
        this._forceFlag = true;
        this.tipImgBg.renderOpacity = 1 * 0.5;
        this.tipImg.renderOpacity = 1;
    }
    /**
     * 设置显示时触发
     */
    onShow(...params) {
        this.canUpdate = true;
    }
    /**
     * 设置不显示时触发
     */
    onHide() {
        this.canUpdate = false;
        this._forceFlag = false;
    }
}

var foreign78 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonTip
});

//** 台风到来后的安全区域触发器 */
const TYPHOON_TRIGGER_GUID = "2BEDB91C";
/** 台风卷的物体的guid数组 */
const TYPHOON_GO_GUID_ARR = ["49953", "49992", "49996", "34026", "42550"];
/** 玻璃锚点 */
const GLASS_ANCHOR_GUID = "0527DDE3";
class TyphoonC extends ModuleC {
    constructor() {
        super(...arguments);
        /** 剩余时间 */
        this._time = 0;
        /** 总时间 */
        this._allTime = 0;
        /** 是否在台风期间 */
        this._typhoonIng = false;
        /** 台风当前位置 */
        this._typhoonLoc = Vector.zero;
        /** 台风速度 */
        this._speed = Vector.zero;
        /** 台风当前角度 */
        this._typhoonRot = Rotation.zero;
        /** 台风卷起的物体数组 */
        this._typhoonGoArr = [];
        /** 台风上转动的物体，帧数计数 */
        this._typGoTime = 0;
        /** 创建间隔 */
        this._createInterval = 30;
        /** 玩家是否在移动 */
        this._playerMove = false;
        /** 玩家移动速度 */
        this._playerMoveSpeed = Vector.zero;
        /** 临时变量 */
        this._playerTweenTmpLoc = Vector.zero;
        /** 台风半径 */
        this._radius = 0;
        /** 是新加入的玩家，新玩家不会被吹走 */
        this._isNewPlayer = true;
        /** 新进入的玩家的特效 */
        this._newPlayerEffect = null;
    }
    onStart() {
        this.init();
    }
    async init() {
        let player = await Player.asyncGetLocalPlayer();
        this._character = player.character;
        this._typhoonSafetyTrigger = await GameObject.asyncFindGameObjectById(TYPHOON_TRIGGER_GUID);
        this._glass = await GameObject.asyncFindGameObjectById(GLASS_ANCHOR_GUID);
        if (SystemUtil.isPIE) {
            this._createInterval = 60;
        }
        else {
            this._createInterval = 30;
        }
        Fog.enabled = this._typhoonIng;
        AssetUtil.asyncDownloadAsset("113919");
        if (this._isNewPlayer) {
            this._newPlayerEffect = GeneralManager.rpcPlayEffectOnPlayer("113919", player, mw.HumanoidSlotType.Root, 0, new Vector(0, 0, 100), Rotation.zero, new Vector(1.2, 1.2, 1.2));
        }
    }
    /**
     * 等待台风到来
     * @param time 剩余时间
     * @param allTime 总时间
     */
    net_waitTyphoon(time, allTime) {
        this._time = time;
        this._allTime = allTime;
        this._typhoonIng = false;
        Fog.enabled = this._typhoonIng;
        this._playerMove = false;
        this.destroyTyphoon();
        ModuleService.getModule(FenceModuleC).refreshFence();
        ModuleService.getModule(GameModuleC).playBGM(false);
        this._glass.setVisibility(PropertyStatus.Off, true);
        this._curentCfg = null;
        this._isNewPlayer = false;
        if (this._newPlayerEffect) {
            EffectService.stop(this._newPlayerEffect);
            this._newPlayerEffect = null;
        }
    }
    /**
     * 显示结果
     * @param win 是否胜利
     * @param destroyFloor 摧毁楼层数
     * @param ID 台风ID
     */
    net_showRsult(win, destroyFloor, ID) {
        UIManager.hide(DeadUI);
        this._typhoonIng = false;
        this._curentCfg = GameConfig.Typhoon.getElement(ID);
        UIManager.show(TyphoonResult, win, destroyFloor, this._curentCfg.Name, this._time);
        UIManager.hide(TyphoonTip);
        this.resumeState();
    }
    /**
     * 台风到来
     * @param time 当前时间
     * @param allTime 总时间
     * @param ID 台风ID
     * @param curLoc 台风当前坐标
     * @param speed 台风移动速度
     */
    async net_typhoonComing(time, allTime, ID, curLoc, speed) {
        UIManager.hide(TyphoonResult);
        this._time = time;
        this._allTime = allTime;
        this._typhoonIng = true;
        this._curentCfg = GameConfig.Typhoon.getElement(ID);
        Fog.enabled = this._typhoonIng;
        this._typhoonEffect = await SpawnManager.asyncSpawn({ guid: this._curentCfg.Guid });
        if (!this._typhoonAnchor) {
            this._typhoonAnchor = await SpawnManager.asyncSpawn({ guid: "Anchor" });
        }
        this._typhoonEffect.worldTransform.scale = this._curentCfg.Scale;
        this._typhoonEffect.play();
        this._radius = GlobalData.typhoonRadius * this._curentCfg.Scale.x;
        this._typhoonLoc = curLoc;
        this._speed = speed;
        this.setTyphoonLoc();
        UIManager.show(TyphoonTip).showTip(0.1);
        Tips.show(StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_8.Value, this._curentCfg.Name));
        ModuleService.getModule(GameModuleC).playBGM(true);
        this._glass.setVisibility(PropertyStatus.On, true);
    }
    /**
     * 玩家被吹飞
     */
    dead() {
        Event.dispatchToLocal(EventsName.PlayerReset);
        UIManager.show(DeadUI, this._curentCfg.Name);
        if (!this._character) {
            this._character = Player.localPlayer?.character;
        }
        let playerLoc = this._character?.worldTransform.position.clone();
        let effectLoc = this._typhoonEffect?.worldTransform.position.clone();
        let camera = Camera.currentCamera;
        camera.springArm.collisionEnabled = false;
        if (playerLoc && effectLoc) {
            this._character.gravityScale = 0;
            PlayerManagerExtesion.changeStanceExtesion(this._character, "15118");
            this._character.setCollision(PropertyStatus.Off);
            this._tween = new Tween({ lerp: 0 })
                .to({ lerp: 1 }, 5000)
                .onUpdate((T) => {
                let loc = Vector.lerp(playerLoc, this._playerTweenTmpLoc, T.lerp);
                this._character.worldTransform.position = loc;
            })
                .start()
                .onComplete(() => {
                this._tween = null;
                this._character.worldTransform.position = this._playerTweenTmpLoc;
                this._character.parent = this._typhoonAnchor;
                this._curPlayerLoc = new Vector(0, 0, 1500);
                this._playerMove = true;
                this._playerMoveSpeed = this.getGoSpeed();
            });
        }
    }
    /**
     * 设置台风坐标
     * @param curLoc 当前位置
     * @param speed 速度
     */
    net_setTyphoonVec(curLoc, speed) {
        this._typhoonLoc = curLoc;
        this._speed = speed;
    }
    /**
     * 销毁台风
     * @returns
     */
    destroyTyphoon() {
        if (!this._typhoonEffect) {
            return;
        }
        this._typhoonGoArr.forEach((go) => {
            go.go.destroy();
            go = null;
        });
        this._typhoonGoArr = [];
        this._typhoonEffect.forceStop();
        this._typhoonEffect.destroy();
        this._typhoonEffect = null;
    }
    /**
     * 改变台风变化
     * @param dt 每帧间隔
     */
    changeTyphoonTransform(dt) {
        this._typhoonLoc.add(this._speed.clone().multiply(dt));
        this._typhoonGoArr.forEach((typhoonGo) => {
            if (typhoonGo.go) {
                typhoonGo.relativeLoc.add(typhoonGo.speed.clone().multiply(dt));
                typhoonGo.go.localTransform.position = typhoonGo.relativeLoc;
            }
        });
        let addZ = (Math.random() * 30 + 60) * dt;
        this._typhoonRot.z += addZ;
        if (this._playerMove) {
            this._curPlayerLoc.add(this._playerMoveSpeed.clone().multiply(dt));
        }
        if (this._tween) {
            this._playerTweenTmpLoc.set(this._typhoonLoc);
            this._playerTweenTmpLoc.z += 1500;
        }
    }
    /**
     * 设置台风坐标
     */
    setTyphoonLoc() {
        this._typhoonEffect.worldTransform.position = this._typhoonLoc;
        this._typhoonAnchor.worldTransform.position = this._typhoonLoc;
        this._typhoonAnchor.worldTransform.rotation = this._typhoonRot;
        if (this._playerMove) {
            this._character.localTransform.position = this._curPlayerLoc;
        }
    }
    /**
     * 获得台风中物体的速度
     * @param loc 物体相对坐标
     * @param speed 物体当前速度
     * @returns 合适的速度
     */
    getTyphoonGoSpeed(loc, speed) {
        let x = speed.x > 0 ? 1 : -1;
        let y = speed.y > 0 ? 1 : -1;
        let z = speed.z > 0 ? 1 : -1;
        if (loc.x > 160 * this._curentCfg.Scale.x) {
            x = -1;
        }
        else if (loc.x < -80 * this._curentCfg.Scale.x) {
            x = 1;
        }
        if (loc.y > 160 * this._curentCfg.Scale.y) {
            y = -1;
        }
        else if (loc.y < -80 * this._curentCfg.Scale.y) {
            y = 1;
        }
        if (loc.z > 300 * this._curentCfg.Scale.z) {
            z = -1;
        }
        else if (loc.z < 1000) {
            z = 1;
        }
        speed = this.getGoSpeed(x, y, z);
        return speed;
    }
    /** 获取物体速度 */
    getGoSpeed(x = 1, y = 1, z = 1) {
        let speed = Vector.zero;
        speed.x = x * (Math.random() * 10 + 20) * this._curentCfg.Scale.x;
        speed.y = y * (Math.random() * 10 + 30) * this._curentCfg.Scale.y;
        speed.z = z * (Math.random() * 10 + 20) * this._curentCfg.Scale.z;
        return speed;
    }
    /**
     * 创建台风中卷动的物体
     */
    async createTyphoonGo() {
        if (!this._typhoonAnchor) {
            return;
        }
        let go = new TyphoonGo();
        let index = Math.floor(Math.random() * TYPHOON_GO_GUID_ARR.length);
        go.go = await SpawnManager.asyncSpawn({ guid: TYPHOON_GO_GUID_ARR[index] });
        go.go.worldTransform.scale = new Vector(2, 2, 2);
        go.go.parent = this._typhoonAnchor;
        go.relativeLoc = Vector.zero;
        go.relativeLoc.x = Math.random() * 2000;
        go.relativeLoc.y = Math.random() * 2000 - 1000;
        go.relativeLoc.z = 1.2 * go.relativeLoc.x + 1500;
        go.speed = this.getGoSpeed();
        go.go.localTransform.position = go.relativeLoc;
        this._typhoonGoArr.push(go);
    }
    /**
     * 检查玩家坐标，判断玩家是否被台风卷走
     * @returns
     */
    checkPlayerLoc() {
        if (!this._character || !this._typhoonLoc || this._playerMove || this._tween || this._isNewPlayer) {
            return;
        }
        let playerLoc = Vector2.zero;
        let typhoonLoc = Vector2.zero;
        playerLoc.x = this._character.worldTransform.position.x;
        playerLoc.y = this._character.worldTransform.position.y;
        typhoonLoc.x = this._typhoonLoc.x;
        typhoonLoc.y = this._typhoonLoc.y;
        let dis = Vector2.distance(playerLoc, typhoonLoc);
        if (dis <= this._radius) {
            let safety = this.inSafety();
            !safety && this.dead();
        }
    }
    /** 恢复状态 */
    resumeState() {
        if (this._tween) {
            this._tween.stop();
            this._tween = null;
        }
        this._character.gravityScale = 1;
        this._character.setCollision(PropertyStatus.On);
        this._playerMove = false;
        let camera = Camera.currentCamera;
        camera.springArm.collisionEnabled = true;
        PlayerManagerExtesion.changeStanceExtesion(this._character, "");
        this._character.parent = null;
    }
    /**
     * 改变玻璃大小
     * @param num 层数
     */
    changeGlassScale(num) {
        num += Math.floor(num / 5);
        let z = num * 0.84;
        let scale;
        let children = this._glass.getChildren();
        children.forEach((go) => {
            scale = go.worldTransform.scale;
            scale.z = z;
            go.worldTransform.scale = scale;
        });
    }
    /**
     * 按间隔创建台风中的物体，并检测玩家的位置是否会被卷走
     * @param dt 每帧间隔
     */
    onUpdate(dt) {
        this._time -= dt;
        Event.dispatchToLocal(EventsName.SetTime, Math.floor(this._time), this._typhoonIng, this._curentCfg?.Name);
        if (this._typhoonIng && this._typhoonEffect) {
            this.changeTyphoonTransform(dt);
            this.setTyphoonLoc();
            this._typGoTime += 1;
            if (!(this._typGoTime % this._createInterval)) {
                this._typhoonGoArr.forEach((typhoonGo) => {
                    typhoonGo.speed = this.getTyphoonGoSpeed(typhoonGo.relativeLoc, typhoonGo.speed);
                });
                this._playerMove && (this._playerMoveSpeed = this.getTyphoonGoSpeed(this._curPlayerLoc, this._playerMoveSpeed));
                this.checkPlayerLoc();
            }
            if (this._typGoTime >= this._createInterval * this._typhoonGoArr.length) {
                SoundService.BGMVolumeScale = (this._allTime - this._time) / this._allTime * 0.8 + 0.2;
                this._typGoTime = 0;
                this.createTyphoonGo();
            }
        }
    }
    /**
     * 玩家是否在安全区内
     * @returns
     */
    inSafety() {
        if (!this._character) {
            return false;
        }
        if (ModuleService.getModule(FenceModuleC).getCurFence() > 0) {
            return this._typhoonSafetyTrigger.checkInArea(this._character);
        }
        else {
            return false;
        }
    }
}
class TyphoonGo {
}

var foreign74 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonC
});

let TyphoonGame_generate = class TyphoonGame_generate extends UIScript {
    get canvasTip() {
        if (!this.canvasTip_Internal && this.uiWidgetBase) {
            this.canvasTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip');
        }
        return this.canvasTip_Internal;
    }
    get textTyphoonTime() {
        if (!this.textTyphoonTime_Internal && this.uiWidgetBase) {
            this.textTyphoonTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip/textTyphoonTime');
        }
        return this.textTyphoonTime_Internal;
    }
    get textFloor() {
        if (!this.textFloor_Internal && this.uiWidgetBase) {
            this.textFloor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip/textFloor');
        }
        return this.textFloor_Internal;
    }
    get imageTips() {
        if (!this.imageTips_Internal && this.uiWidgetBase) {
            this.imageTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasTip/imageTips');
        }
        return this.imageTips_Internal;
    }
    get canvasDistance() {
        if (!this.canvasDistance_Internal && this.uiWidgetBase) {
            this.canvasDistance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasDistance');
        }
        return this.canvasDistance_Internal;
    }
    get imageDistance() {
        if (!this.imageDistance_Internal && this.uiWidgetBase) {
            this.imageDistance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasDistance/imageDistance');
        }
        return this.imageDistance_Internal;
    }
    get textDistance() {
        if (!this.textDistance_Internal && this.uiWidgetBase) {
            this.textDistance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasDistance/textDistance');
        }
        return this.textDistance_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.textTyphoonTime);
        this.setLanguage(this.textFloor);
        this.setLanguage(this.textDistance);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
TyphoonGame_generate = __decorate([
    UIBind('UI/TyphoonGame.ui')
], TyphoonGame_generate);
var TyphoonGame_generate$1 = TyphoonGame_generate;

var foreign92 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonGame_generate$1
});

class TyphoonGUI extends TyphoonGame_generate$1 {
    constructor() {
        super(...arguments);
        /** 触发器坐标 */
        this._triLoc = Vector.zero;
        /** 屏幕大小 */
        this._windowSize = new Vector2(100, 100);
        /** 画布大小 */
        this._canvasSize = new Vector2(100, 100);
        /** 闪烁时间 */
        this._blinkTime = 0;
        /** 一秒倒计时 */
        this._oneSecond = 0;
        /** 闪烁间隔 */
        this._blinkInterval = 0.5;
        /**
         * 设置时间
         * @param time 剩余时间
         * @param ing 是否台风来袭
         * @param name 台风名称
         */
        this.setTime = (time, ing = false, name) => {
            let str;
            let timeStr = GameUtils.getTimeStringMS(time);
            if (ing) {
                str = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_17.Value, name, timeStr);
            }
            else {
                if (time > 30) {
                    str = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_18.Value, timeStr);
                }
                else {
                    str = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_19.Value, timeStr);
                    if (time <= 10 && (time - this._blinkTime > 1)) {
                        this._blinkTime = time;
                        SoundService.playSound("154784", 1, 1);
                    }
                }
            }
            this.textTyphoonTime.text = str;
        };
    }
    onStart() {
        Event.addLocalListener(EventsName.SetTime, this.setTime);
        this.init();
    }
    async init() {
        let tri = await GameObject.asyncFindGameObjectById(GlobalData.HAND_BOARD);
        this._triLoc = tri.worldTransform.position.clone();
        this._character = (await Player.asyncGetLocalPlayer()).character;
        setInterval(() => {
            this.setDistance();
        }, 30);
        this._windowSize = WindowUtil.getViewportSize().clone();
        this._canvasSize = this.canvasDistance.size.clone();
        this.imageTips.visibility = mw.SlateVisibility.Collapsed;
    }
    onShow(...params) {
        this._blinkTime = 3;
        this.canUpdate = true;
    }
    /**
     * 设置当前层数信息
     * @param floor 当前层数
     * @param destroyFence 被销毁层数
     */
    setFloor(floor, destroyFence) {
        if (destroyFence) {
            this.textFloor.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_20.Value, destroyFence, floor);
        }
        else {
            this.textFloor.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_21.Value, floor);
            Tips.show(StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_22.Value, floor));
        }
    }
    /**
     * 设置距离触发器的距离
     * @returns
     */
    setDistance() {
        if (!this._character) {
            return;
        }
        let loc = this._character.worldTransform.position.clone();
        let pos = InputUtil.projectWorldPositionToWidgetPosition(this._triLoc, false).screenPosition;
        if (pos.x > this._windowSize.x) {
            pos.x = this._windowSize.x;
        }
        else if (pos.x < 0) {
            pos.x = 0;
        }
        if (pos.y > this._windowSize.y) {
            pos.y = this._windowSize.y;
        }
        else if (pos.y < 0) {
            pos.y = 0;
        }
        pos.x -= this._canvasSize.x / 2;
        pos.y -= this._canvasSize.y / 2;
        let distance = Vector.distance(this._triLoc, loc);
        this.textDistance.text = Math.floor(distance / 100) + "m";
        this.canvasDistance.position = pos;
    }
    /**
     * 更新时间及距离
     * @param dt 帧间隔
     * @returns
     */
    onUpdate(dt) {
        if (this._blinkTime == 0) {
            return;
        }
        this._oneSecond += dt;
        if (this._oneSecond >= this._blinkInterval) {
            this._oneSecond = 0;
            this._blinkTime -= this._blinkInterval;
            if (this._blinkTime <= 0) {
                this.textTyphoonTime.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.imageTips.visibility = mw.SlateVisibility.Collapsed;
                this._blinkInterval = 0.6;
                this._blinkTime = 0;
            }
            else {
                if (this.textTyphoonTime.visible) {
                    this.textTyphoonTime.visibility = mw.SlateVisibility.Collapsed;
                    if (!ModuleService.getModule(TyphoonC).inSafety()) {
                        this.imageTips.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    }
                    this._blinkInterval = 0.4;
                }
                else {
                    this.textTyphoonTime.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    this._blinkInterval = 0.6;
                    this.imageTips.visibility = mw.SlateVisibility.Collapsed;
                }
            }
        }
    }
}

var foreign84 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonGUI
});

/** 围墙锚点GUID */
const FENCE_ANCHOR_GUID = "0E263FE2";
/** 围墙高度 */
const FENCE_HEIGHT = 160;
class FenceModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        /** 围墙锚点坐标 */
        this._fenceAnchorPos = Vector.zero;
        /** 围墙样式数组 */
        this._fenceIndexArr = [];
        /** 目标围墙样式数组 */
        this._targetFenceIndexArr = [];
        /** 围墙数组 */
        this._fenceArr = [];
        /** 缓存围墙数组 */
        this._cacheFenceMap = new Map();
        /** 摧毁楼层数 */
        this._destroyFloor = 0;
        /** 是否围墙正在变化 */
        this._changing = false;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this._typhoonGUI = UIManager.show(TyphoonGUI);
        this.init();
    }
    /**
     * 初始化，找到围墙的锚点
     */
    async init() {
        let fence = await GameObject.asyncFindGameObjectById(FENCE_ANCHOR_GUID);
        fence && (this._fenceAnchorPos = fence.worldTransform.position);
        this.server.net_requestSyn();
    }
    /**
     * 初始化
     * @param arr 围墙样式数组
     * @param destroyFence 销毁楼层数
     */
    net_init(arr, destroyFence) {
        this._targetFenceIndexArr = arr;
        this.changeFence();
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, destroyFence);
    }
    /**
     * 获取围墙
     * @param index this.fenceIndexArr的下标
     * @returns
     */
    async getFence(index) {
        let fence;
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
    async createFence(style) {
        let guid = GlobalData.fencePrefabID[style];
        let fence = await SpawnManager.asyncSpawn({ guid: guid });
        return fence;
    }
    /**
     * 获得围墙需要在的位置
     * @param index 围墙是第几层的
     * @returns 坐标
     */
    getLocation(index) {
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
    net_changeFence(arr, destroyFence) {
        this._targetFenceIndexArr = arr;
        this.changeFence();
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, destroyFence);
        ModuleService.getModule(TyphoonC).changeGlassScale(this._fenceIndexArr.length);
    }
    /**
     * 显示围墙
     * @param fence 围墙物体
     */
    showFence(fence) {
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
    net_destroyFence(arr, destroyFence) {
        this._targetFenceIndexArr = arr;
        this.changeFence();
        this._destroyFloor = destroyFence;
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, this._destroyFloor);
        ModuleService.getModule(TyphoonC).changeGlassScale(this._fenceIndexArr.length);
    }
    /**
     * 刷新围墙
     */
    refreshFence() {
        this._typhoonGUI.setFloor(this._targetFenceIndexArr.length, 0);
    }
    /**
     * 回收围墙
     * @returns
     */
    destroyFence() {
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
    async changeFence() {
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
        }
        else if (targetLen < curLen) {
            this.destroyFence();
        }
        this._changing = false;
        this.changeFence();
    }
    /**
     * 获取当前围墙层数
     * @returns 当前围墙层数
     */
    getCurFence() {
        return this._targetFenceIndexArr.length;
    }
    /**
     * 增加围墙，GM命令
     */
    requestAddFence() {
        this.server.net_requestAddFence();
    }
}

var foreign32 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: FenceModuleC
});

//客户端
class GameModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        /** 当前播放的背景音乐ID */
        this.curBgmID = 13;
        /**
         * 重置玩家状态，退出当前交互物
         */
        this.resetState = () => {
            if (this.btnExitInteractiveCallback != null) {
                this.btnExitInteractiveCallback();
                this.btnExitInteractiveCallback = null;
            }
            ModuleService.getModule(ActionModuleC).off();
            PlayerManager$1.instance.setPlayerState(PlayerStateType.None, true);
            this.localPlayer.character.movementDirection = mw.MovementDirection.ViewDirection;
            this.localPlayer.character.movementEnabled = true;
            this.localPlayer.character.jumpEnabled = true;
        };
    }
    onStart() {
        this.hudPanel = UIManager.getUI(Game_HUDUI, true);
        this.hudPanel.mJump_btn.onPressed.add(() => {
            ModuleService.getModule(ActionModuleC).cleanStance();
            this.localPlayer.character.jump();
            if (this.jumpExitInteractiveCallback != null) {
                this.jumpExitInteractiveCallback();
                this.jumpExitInteractiveCallback = null;
            }
        });
        //玩家属性UI
        this.hudPanel.mIdCard_btn.onClicked.add(() => {
            UIManager.show(SettingUI);
        });
        /**点击退出交互物按钮 */
        this.hudPanel.mExitInteractive_btn.onClicked.add(() => {
            if (this.btnExitInteractiveCallback != null) {
                this.btnExitInteractiveCallback();
                this.btnExitInteractiveCallback = null;
            }
        });
        /**摇杆移动事件 */
        this.hudPanel.mVirtualJoystick.onInputDir.add((vec) => {
            if (this.moveExitInteractiveCallback != null) {
                this.moveExitInteractiveCallback();
                this.moveExitInteractiveCallback = null;
            }
        });
        Event.addLocalListener(EventsName.PlayerReset, this.resetState);
    }
    //进入场景
    onEnterScene(sceneType) {
        let char = Player.localPlayer && Player.localPlayer.character;
        if (!char) {
            console.error('onEnterScene error char is null');
            return;
        }
        GlobalData.globalRot = char.worldTransform.rotation.clone();
        GlobalData.globalRot = char.worldTransform.rotation.clone();
        if (GlobalData.isOpenGM) {
            this.addGM();
            new GMBasePanelUI().show();
            InputUtil.onKeyDown(mw.Keys.G, () => { UIManager.show(GMHUD_generate$1); });
        }
        let lastTime = 0;
        this.hudPanel.mPulloff_btn.onClicked.add(() => {
            let nt = TimeUtil.elapsedTime();
            if (nt - lastTime < 3)
                return;
            lastTime = nt;
            this.resetState();
            setTimeout(() => {
                let pos = GlobalData.globalPos.clone();
                pos.x += (Math.random() * 100 - 50);
                pos.y += (Math.random() * 100 - 50);
                this.localPlayer.character.worldTransform.position = pos;
                this.localPlayer.character.worldTransform.rotation = GlobalData.globalRot;
                UIManager.setUIstate(null, HudGameUIState.Show);
            }, 500);
        });
        //3Dui多语言
        this.uiLanguage();
        this.loginChoose();
        UIManager.show(Game_HUDUI);
    }
    /**
     * 3Dui的多语言
     */
    uiLanguage() {
        let allUI = GameConfig.Global.getElement(1).Value4; //所有3dui
        allUI && allUI.forEach(async (item) => {
            let top = (await ResManager.instance.findGameObjectByGuid(item));
            if (!top) {
                console.log("guan log uiLanguage top:" + top + ",item:" + item);
                return;
            }
            let uiRoot = top.getTargetUIWidget().rootContent;
            for (let i = 0; i < uiRoot.getChildrenCount(); i++) {
                let item = uiRoot.getChildAt(i);
                if (!(item instanceof mw.TextBlock)) {
                    continue;
                }
                let ui = item;
                let key = ui.text;
                if (key) {
                    let data = GameUtils.getLanguage(key);
                    if (data) {
                        ui.text = data.info;
                        if (data.size > 0) {
                            ui.fontSize = data.size;
                        }
                    }
                }
            }
        });
    }
    addGM() {
        dist.AddGMCommand("隐藏GM_UI", (player, value) => {
            UIManager.hide(GMHUD_generate$1);
        });
        dist.AddGMCommand("增加层数", (player, value) => {
            ModuleService.getModule(FenceModuleC).requestAddFence();
        });
    }
    /**
     * 监听退出交互物的操作
     * @param type 类型 1-按钮退出 2-行走和跳跃退出 3-跳跃退出
     * @param Callback 退出的回调
     */
    addExitInteractiveListener(type, Callback) {
        if (type == 1) {
            this.hudPanel.showExitInteractiveBtn(true);
            this.btnExitInteractiveCallback = Callback;
            this.moveExitInteractiveCallback = null;
            this.jumpExitInteractiveCallback = null;
        }
        else if (type == 2) {
            this.hudPanel.showExitInteractiveBtn(false);
            this.moveExitInteractiveCallback = Callback;
            this.jumpExitInteractiveCallback = Callback;
            this.btnExitInteractiveCallback = null;
        }
        else if (type == 3) {
            this.hudPanel.showExitInteractiveBtn(false);
            this.jumpExitInteractiveCallback = Callback;
            this.moveExitInteractiveCallback = null;
            this.btnExitInteractiveCallback = null;
        }
    }
    removeExitInteractiveListener() {
        this.btnExitInteractiveCallback = null;
        this.moveExitInteractiveCallback = null;
        this.jumpExitInteractiveCallback = null;
        this.hudPanel.showExitInteractiveBtn(false);
    }
    quitInterval() {
        if (this.btnExitInteractiveCallback != null) {
            this.btnExitInteractiveCallback();
            this.btnExitInteractiveCallback = null;
        }
    }
    /**
     * 登录设置身份牌
     * @param occupation
     * @returns
     */
    loginChoose() {
        let nickName = mw.AccountService.getNickName();
        this.server.net_PlayerLogin(!nickName ? this.localPlayer.character.displayName : nickName);
    }
    /**播放背景音乐
     * @param ing 是否在台风来临时间
     */
    playBGM(ing) {
        let ID = ing ? 37 : 13;
        let cfg = GameConfig.Music.getElement(ID);
        SoundService.playBGM(cfg.MusicGUID, cfg.Music);
        this.curBgmID = ID;
    }
    net_PlayEmojiC(guid, pid) {
        let player = Player.getPlayer(pid);
        let config = GameConfig.GlobalConfig.getElement(1);
        let scale = config.ExpressionScale;
        let offset = config.ExpressionHeight;
        GeneralManager.rpcPlayEffectOnPlayer(guid, player, 23, 1, new mw.Vector(0, 0, offset), mw.Rotation.zero, scale);
    }
    playEmoji(guid) {
        this.server.net_playEmojiS(guid);
    }
}

var foreign34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameModuleC: GameModuleC
});

class Game_HUDUI extends Game_HUD_generate$1 {
    constructor() {
        super(...arguments);
        /** 加速剩余时间 */
        this._speedTime = 0;
        /** 跳跃增加剩余时间 */
        this._jumpTime = 0;
        /**---------------------------聊天和表情------------------------------------*/
        this._firstClickFlag = true; // 判断玩家是否第一次点击快捷聊天按钮
    }
    onAwake() {
        super.onAwake();
        this.layer = mw.UILayerBottom;
    }
    onStart() {
        this.canUpdate = true;
        this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;
        this.emojiBtn.onClicked.add(() => {
            this.canvas_emoji.visibility = this.canvas_emoji.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
            this.canvas_word.visibility = mw.SlateVisibility.Collapsed;
            if (this._firstClickFlag) { // 标准的初始化流程，勿改函数顺序
                this.initScrollBox();
                this.addLayoutNodes();
                this.addEmojiBtnEvents();
                this.addWordBtnEvents();
                this.layout_emoji.invalidate();
                this.layout_word.invalidate();
                this._firstClickFlag = false;
            }
        });
        this.wordBtn.onClicked.add(() => {
            this.canvas_word.visibility = this.canvas_word.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
            this.canvas_emoji.visibility = mw.SlateVisibility.Collapsed;
            if (this._firstClickFlag) {
                this.initScrollBox();
                this.addLayoutNodes();
                this.addEmojiBtnEvents();
                this.addWordBtnEvents();
                this.layout_emoji.invalidate();
                this.layout_word.invalidate();
                this._firstClickFlag = false;
            }
        });
        this.mAction_btn.onClicked.add(() => {
            ModuleService.getModule(ActionModuleC).openActionPanle();
        });
        Event.addLocalListener(EventsName.GET_BUFF, (type) => {
            switch (type) {
                case BuffType.Speed:
                    this._speedTime = GlobalData.buffDuration;
                    break;
                case BuffType.Jump:
                    this._jumpTime = GlobalData.buffDuration;
                    break;
            }
        });
    }
    /**初始化滚动条 */
    initScrollBox() {
        let config = GameConfig.GlobalConfig.getElement(1);
        this.layout_emoji = new GridLayout(this.scrollBox_emoji, true);
        this.layout_emoji.spacingX = config.ExpressionDistance; // 读表
        this.layout_emoji.spacingY = config.ExpressionDistance; // 读表
        this.layout_word = new GridLayout(this.scrollBox_word, true);
        if (this.scrollBox_word.orientation == mw.Orientation.OrientVertical)
            this.layout_word.spacingY = config.WordDistance; // 读表，纵向间距
        else
            this.layout_word.spacingX = config.WordDistance; // 读表，横向间距
    }
    /**向滚动条中添加结点 */
    addLayoutNodes() {
        try {
            let length = GameConfig.ChatExpression.getAllElement().length;
            for (let i = 0; i < length; i++) {
                this.layout_emoji.addNode(Emoji_Generate);
            }
            let length_word = GameConfig.ChatWord.getAllElement().length;
            for (let i = 0; i < length_word; i++) {
                this.layout_word.addNode(Word_Generate);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    /** 为每个表情按钮添加监听事件 */
    addEmojiBtnEvents() {
        let eNodes = this.layout_emoji.nodes;
        let config = GameConfig.ChatExpression.getAllElement();
        eNodes.forEach(element => {
            let btn = element.mBtn_expression;
            let index = eNodes.indexOf(element); // index如果拿到外面会溢出
            btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
            btn.normalImageGuid = (config[index].ExpressionIcon);
            btn.onClicked.add(() => {
                this.canvas_emoji.visibility = (1);
                if (config[index].ExpressionVfx) {
                    ModuleService.getModule(GameModuleC).playEmoji(config[index].ExpressionVfx);
                }
            });
        });
    }
    /**为每个文字按钮添加监听事件 */
    addWordBtnEvents() {
        let config = GameConfig.ChatWord.getAllElement();
        let index = 0;
        this.layout_word.nodes.forEach(node => {
            let string = GameConfig.SquareLanguage.getElement(config[index].WordID).Value;
            node.mBtn_word.text = (string);
            node.mBtn_word.touchMethod = mw.ButtonTouchMethod.PreciseTap;
            node.mBtn_word.onClicked.add(() => {
                this.canvas_word.visibility = (1);
                ModuleService.getModule(PlayerModuleClient).chatBack(string);
            });
            index++;
        });
    }
    /**
     * 设置UI状态
     * @param state
     */
    setUIState(state) {
        switch (state) {
            case HudGameUIState.Show:
                this.mBottomCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mTopEventCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mRightDownCon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mVirtualJoystick.visibility = mw.SlateVisibility.Visible;
                this.visible = true;
                break;
            case HudGameUIState.HideAll:
                this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mRightDownCon.visibility = mw.SlateVisibility.Collapsed;
                this.mVirtualJoystick.visibility = mw.SlateVisibility.Collapsed;
                break;
        }
    }
    onShow(name) {
        this.resetJoyStick();
    }
    onHide() {
    }
    /**
     * 显示退出互动按钮
     * @param isShow 是否显示
     */
    showExitInteractiveBtn(isShow) {
        if (isShow) {
            this.mExitInteractive_btn.visibility = mw.SlateVisibility.Visible;
            this.mJump_btn.visibility = mw.SlateVisibility.Collapsed;
        }
        else {
            this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;
            this.mJump_btn.visibility = mw.SlateVisibility.Visible;
        }
    }
    /**
     * 刷新动作按钮
     * @param name 动作按钮显示文字
     * @param guid 动作按钮图片guid
     */
    refreshActionBtn(name, guid) {
        this.mAction_btn.normalImageGuid = guid;
        this.textBtn.text = name;
    }
    resetJoyStick() {
        this.mVirtualJoystick?.resetJoyStick();
    }
    /**
     * buff剩余时间计时。
     * @param dt
     */
    onUpdate(dt) {
        if (this._jumpTime > 0) {
            this._jumpTime -= dt;
            this.mJump.currentValue = this._jumpTime / GlobalData.buffDuration;
        }
        else {
            this.mJump.currentValue = 0;
        }
        if (this._speedTime > 0) {
            this._speedTime -= dt;
            this.mSpeed.currentValue = this._speedTime / GlobalData.buffDuration;
        }
        else {
            this.mSpeed.currentValue = 0;
        }
    }
}

var foreign36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Game_HUDUI
});

let MyUIManager = class MyUIManager {
    constructor() {
        this._gameRootUI = null;
        this._uis = [];
        this._uizOrders = [];
        this._isCloseAllUI = false;
    }
    get gameRootUI() {
        if (!this._gameRootUI)
            this._gameRootUI = mw.UIService.getUI(Game_HUDUI);
        return this._gameRootUI;
    }
    get canvas() {
        return mw.UIService.canvas;
    }
    create(PanelClass) {
        return mw.UIService.create(PanelClass);
    }
    getUI(PanelClass, bNeedNew) {
        return mw.UIService.getUI(PanelClass, bNeedNew);
    }
    show(PanelClass, ...params) {
        let panel = mw.UIService.show(PanelClass, ...params);
        if (this._isCloseAllUI && panel.layer == mw.UILayerTop) {
            panel.rootCanvas.visibility = mw.SlateVisibility.Collapsed;
            this._uizOrders.push(panel.uiObject.zOrder);
            this._uis.push(panel);
        }
        return panel;
    }
    showUI(panel, layer, ...params) {
        if (this._isCloseAllUI && (panel.layer == mw.UILayerTop || layer == mw.UILayerTop)) {
            panel.rootCanvas.visibility = mw.SlateVisibility.Collapsed;
            this._uizOrders.push(panel.uiObject.zOrder);
            this._uis.push(panel);
        }
        return mw.UIService.showUI(panel, layer, ...params);
    }
    hide(PanelClass) {
        return mw.UIService.hide(PanelClass);
    }
    hideUI(panel) {
        return mw.UIService.hideUI(panel);
    }
    hideAllUI(panel) {
        if (this._isCloseAllUI)
            return;
        this._isCloseAllUI = true;
        mw.UIService.instance["createPanelMap"].forEach((ui) => {
            for (let i = 0; i < ui.length; i++) {
                if (ui[i].visible && ui[i].uiObject.parent
                    && ui[i].uiObject.parent.equal(this.canvas)
                    && ui[i].uiObject.name != "HUD" && ui[i].uiObject.name != "Guide") {
                    this._uizOrders.push(ui[i].uiObject.zOrder);
                    this._uis.push(ui[i]);
                    ui[i].rootCanvas.visibility = mw.SlateVisibility.Collapsed;
                }
            }
        });
        if (panel)
            panel.rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }
    showAllUI(panel) {
        if (!this._isCloseAllUI)
            return;
        this._isCloseAllUI = false;
        for (let i = 0; i < this._uis.length; i++) {
            this._uis[i].rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this._uis[i].uiObject.zOrder = this._uizOrders[i];
        }
        this._uis.length = 0;
        this._uizOrders.length = 0;
        if (panel && panel.visible)
            panel.visible = false;
    }
    setUIstate(panel, state) {
        if (this._state == state)
            return;
        this._state = state;
        switch (state) {
            case HudGameUIState.Show:
                this.showAllUI(panel);
                break;
            default:
                this.hideAllUI(panel);
                break;
        }
        this.gameRootUI.setUIState(state);
    }
    getUIstate() {
        return this._state;
    }
    addUILayerMap(layer, startZOrder) {
        mw.UIService["addUILayerMap"](layer, startZOrder);
    }
};
MyUIManager.instance = null;
MyUIManager = __decorate([
    single()
], MyUIManager);

var foreign79 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MyUIManager () { return MyUIManager; }
});

global.UIManager = MyUIManager.instance;
class MyAction extends mw.Action {
}
class MyAction1 extends mw.Action1 {
}
class MyAction2 extends mw.Action2 {
}
class MyAction3 extends mw.Action3 {
}
class Tween extends mw.Tween {
}
const EffectManager = EffectService;
const TimeUtil$1 = mw.TimeUtil;
const GoPool = mwext.GameObjPool;
const AdsService$1 = mw.AdsService;
let myPlayerID = null;
function getMyPlayerID() {
    if (SystemUtil.isServer())
        return 0;
    if (!myPlayerID) {
        const player = Player.localPlayer;
        const playerID = player?.playerId;
        if (playerID)
            myPlayerID = playerID;
        else
            return 0;
    }
    return myPlayerID;
}
let myCharacterGuid = null;
function getMyCharacterGuid() {
    if (SystemUtil.isServer())
        return "";
    if (!myCharacterGuid) {
        const player = Player.localPlayer;
        const characterGuid = player?.character?.gameObjectId;
        if (characterGuid)
            myCharacterGuid = characterGuid;
        else
            return "";
    }
    return myCharacterGuid;
}

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AdsService: AdsService$1,
    EffectManager: EffectManager,
    GoPool: GoPool,
    MyAction: MyAction,
    MyAction1: MyAction1,
    MyAction2: MyAction2,
    MyAction3: MyAction3,
    TimeUtil: TimeUtil$1,
    Tween: Tween,
    getMyCharacterGuid: getMyCharacterGuid,
    getMyPlayerID: getMyPlayerID
});

/** 木板脚本 */
let BoardScript = class BoardScript extends mw.Script {
    constructor() {
        super(...arguments);
        /** 木板的位置 */
        this.location = Vector.zero;
        /** 模板位置刷新计时 */
        this.refreshTime = 0;
        /** 木板序号 */
        this.index = -1;
        /**
         * 获得木板
         * @param go 进入触发器的物体
         */
        this.getBoardC = (go) => {
            if (!GameUtils.isPlayerCharacter(go)) {
                return;
            }
            if (GlobalData.boardCount >= GlobalData.maxBoardCount) {
                Tips.show(GameConfig.SquareLanguage.Typhoon_Ts_0.Value);
                return;
            }
            Tips.show(GameConfig.SquareLanguage.Typhoon_Ts_1.Value);
        };
        //#endregion
    }
    onLocChanged() {
        if (!this._board || !this._triggerC) {
            return;
        }
        this._board.asyncReady().then(() => {
            this._board.worldTransform.position = this.location;
        });
        this._triggerC.asyncReady().then(() => {
            this._triggerC.worldTransform.position = this.location;
        });
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            this.initBoard();
        }
        else {
            this.initTrigger();
        }
    }
    /**
     * 初始化触发器
     */
    async initTrigger() {
        this._triggerS = await SpawnManager.asyncSpawn({ guid: "Trigger" });
        this._triggerS.enabled = (true);
        this._triggerS.worldTransform.scale = GlobalData.triggerScale;
        // 要用属性同步，所以只能用bind(this)
        this._triggerS.onEnter.add(this.getBoardS.bind(this));
    }
    /**
     * 获得木板
     * @param go 碰到木板触发器的物体
     */
    getBoardS(go) {
        if (!(PlayerManagerExtesion.isCharacter(go)) || !go.player) {
            return;
        }
        let playerID = go.player.playerId;
        if (ModuleService.getModule(BoardMoculeS).getPlayerBoardCount(playerID) >= GlobalData.maxBoardCount) {
            return;
        }
        this.setLocation(GlobalData.recyclePos);
        Event.dispatchToLocal(EventsName.GET_BOARD, playerID, this.index);
    }
    /**
     * 设置木板位置
     * @param loc 木板新的位置
     */
    setLocation(loc) {
        this._triggerS.asyncReady().then(() => {
            this._triggerS.worldTransform.position = loc;
            this.location = loc;
            this.refreshTime = Math.random() * 10;
            this.useUpdate = true;
        });
    }
    onUpdate(dt) {
        /** 刷新时间计时，超过规定时间就换个地方刷新
         * 有两个好处，1. 防止木板的位置不好，玩家找不到，2. 防止木板长时间未更新，新建来的玩家同步不到。
         */
        this.refreshTime += dt;
        if (this.refreshTime >= GlobalData.boardRefreshTime) {
            let loc = ModuleService.getModule(BoardMoculeS).getRandomLocation();
            this.setLocation(loc);
        }
    }
    /**
     * 初始化木板
     */
    async initBoard() {
        this._board = await SpawnManager.asyncSpawn({ guid: "3C14CCAB4FC1BCDB7A7A089A25F0362A" });
        this._triggerC = await SpawnManager.asyncSpawn({ guid: "Trigger" });
        this._board.worldTransform.scale = new Vector(1, 1, 1);
        this._board.worldTransform.position = this.location;
        this._triggerC.worldTransform.scale = GlobalData.triggerScale;
        this._triggerC.worldTransform.position = this.location;
        this._triggerC.enabled = (true);
        this._triggerC.onEnter.add(this.getBoardC);
    }
};
__decorate([
    mw.Property({ replicated: true, onChanged: "onLocChanged" })
], BoardScript.prototype, "location", void 0);
BoardScript = __decorate([
    Component
], BoardScript);

var foreign28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BoardScript
});

/** 台风位置锚点GUID */
const TyphoonLocGUID = "05DC5D7B";
class TyphoonS extends ModuleS {
    constructor() {
        super(...arguments);
        /** 距离下一阶段剩余时间 */
        this._time = 0;
        /** 是否在台风来袭状态 */
        this._typhoonIng = false;
        /** 摧毁建筑计时 */
        this._destroyTime = 0;
        /** 摧毁层数 */
        this.destroyFloor = 0;
        /** 失败 */
        this._fail = false;
        /** 台风目标点序号 */
        this._curTargetIndex = 0;
        /** 台风位置数组 */
        this._typhoonLocArr = [];
        /** 台风移动计时 */
        this._moveTime = 0;
        /** 台风移动到目标点需要的时间 */
        this._moveNeedTime = 0;
    }
    onStart() {
        this._destroyTime = 0;
        this.typhoonWait();
        this.init();
    }
    async init() {
        let locAnchor = await GameObject.asyncFindGameObjectById(TyphoonLocGUID);
        let children = locAnchor.getChildren();
        children.forEach((go) => {
            this._typhoonLocArr.push(go.worldTransform.position);
        });
    }
    /**
     * 有玩家进入游戏，同步给玩家当前状态
     * @param player 进入游戏的玩家
     */
    onPlayerEnterGame(player) {
        if (this._typhoonIng) {
            this.getClient(player)?.net_typhoonComing(this._time, this._curTyphoonInfo.endTime, this._curTyphoonInfo.cfgID, this._curPos, this._speed);
        }
        else {
            this.getClient(player)?.net_waitTyphoon(this._time, this._curTyphoonInfo.waitTime);
        }
    }
    /**
     * 获得随机的台风信息
     * @returns 台风信息
     */
    getRandomInfo() {
        let info = new TyphoonInfo();
        info.waitTime = Math.floor(Math.random() * 40 + 80);
        let cfgs = GameConfig.Typhoon.getAllElement();
        // 这里让台风强度随着层数和玩家的数量有些调整，没有试过多人效果，可能需要调整
        let index = Math.floor(Math.random() * (cfgs.length - 4));
        let fenceLen = ModuleService.getModule(FenceModuleS).getFenceLength();
        if (fenceLen > 20) {
            if (index + 4 < cfgs.length) {
                index += 4;
            }
            else {
                index = cfgs.length - 1;
            }
        }
        else if (fenceLen > 50) {
            if (index + 6 < cfgs.length) {
                index += 6;
            }
            else {
                index = cfgs.length - 1;
            }
        }
        let cfg = cfgs[index];
        info.endTime = Math.floor(Math.random() * (cfg.Time[1] - cfg.Time[0]) + cfg.Time[0]);
        info.cfgID = cfg.ID;
        info.intensity = cfg.Intensity * (0.8 + Player.getAllPlayers().length * 0.1);
        info.intensity = GlobalData.FenceHP * GlobalData.FenceNum / cfg.Intensity;
        return info;
    }
    /**
     * 等待台风状态
     */
    typhoonWait() {
        this._typhoonIng = false;
        this._curTyphoonInfo = this.getRandomInfo();
        this._time = this._curTyphoonInfo.waitTime;
        this._fail = false;
        this.destroyFloor = 0;
        this.getAllClient().net_waitTyphoon(this._time, this._curTyphoonInfo.waitTime);
    }
    /**
     * 台风来袭状态
     */
    typhoonComing() {
        this._typhoonIng = true;
        this._time = this._curTyphoonInfo.endTime;
        this._curPos = this._typhoonLocArr[0].clone();
        this._curTargetIndex = 0;
        this.setTarget();
        this.getAllClient().net_typhoonComing(this._time, this._curTyphoonInfo.endTime, this._curTyphoonInfo.cfgID, this._curPos, this._speed);
    }
    /**
     * 设置台风移动目标
     * @param syn 是否同步给客户端
     */
    setTarget(syn = false) {
        let index = this._curTargetIndex;
        while (index === this._curTargetIndex) {
            index = Math.floor(Math.random() * (this._typhoonLocArr.length - 1)) + 1;
        }
        this._curTargetIndex = index;
        this._targetPos = this._typhoonLocArr[index];
        this._moveNeedTime = Vector.distance(this._curPos, this._targetPos) / GlobalData.typhoonSpeed;
        this._speed = this._targetPos.clone().subtract(this._curPos).normalize().multiply(GlobalData.typhoonSpeed);
        if (syn) {
            this.getAllClient().net_setTyphoonVec(this._curPos, this._speed);
        }
    }
    /**
     * 台风结算
     * @param win 是否胜利
     */
    turnEnd(win) {
        this.getAllClient().net_showRsult(win, this.destroyFloor, this._curTyphoonInfo.cfgID);
    }
    /**
     * 失败
     */
    fail() {
        this._fail = true;
    }
    /**
     * 计时，计算台风状态切换
     * @param dt 每帧间隔
     */
    onUpdate(dt) {
        this._time -= dt;
        if (this._time <= 0) {
            if (this._typhoonIng) {
                this.turnEnd(!this._fail);
                this.typhoonWait();
            }
            else {
                this.typhoonComing();
            }
        }
        if (this._typhoonIng) {
            this._destroyTime += dt;
            if (this._destroyTime >= this._curTyphoonInfo.intensity) {
                this._destroyTime -= this._curTyphoonInfo.intensity;
                this.destroyFloor++;
                ModuleService.getModule(FenceModuleS).destroyFence();
            }
            this._curPos.add(this._speed.clone().multiply(dt));
            this._moveTime += dt;
            if (this._moveTime >= this._moveNeedTime) {
                this._moveTime = 0;
                this.setTarget(true);
            }
        }
    }
}
class TyphoonInfo {
}

var foreign75 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TyphoonS
});

class FenceModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        /** 存放每一层是哪个预制体 */
        this._fenceArr = [0];
    }
    /**
     * 客户端请求同步当前围墙信息
     */
    net_requestSyn() {
        let destroyFence = ModuleService.getModule(TyphoonS).destroyFloor;
        this.getClient(this.currentPlayer).net_init(this._fenceArr, destroyFence);
    }
    /**
     * 获得围墙样式序号
     * @param floor 是第几层的
     * @returns 样式序号
     */
    getFenceStyleIndex(floor) {
        let index = 0;
        // 前四层固定，后面随机，每五层一固定为阳台
        if (floor >= 4) {
            if ((floor + 1) % 5) {
                index = Math.floor(Math.random() * (GlobalData.fencePrefabID.length - 2)) + 2;
            }
            else {
                index = 1;
            }
        }
        return index;
    }
    /**
     * 层数增加，上限为100层
     * @returns
     */
    addFence() {
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
    destroyFence() {
        if (this._fenceArr.length === 1) {
            ModuleService.getModule(TyphoonS).fail();
        }
        else if (this._fenceArr.length < 1) {
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
    net_requestAddFence() {
        this.addFence();
    }
    /**
     * 获得挡墙围墙高度
     */
    getFenceLength() {
        return this._fenceArr.length;
    }
}

var foreign33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: FenceModuleS
});

let BuffScript = class BuffScript extends Script {
    constructor() {
        super(...arguments);
        /** buff生成的位置 */
        this.location = Vector.zero;
        /** buff类型 */
        this.type = BuffType.None;
        /** buff位置刷新计时 */
        this.refreshTime = 0;
        /**
         * 获得buff，主要是同步到主UI显示
         * @param go 进入触发器的物体
         * @returns
         */
        this.getBuffC = (go) => {
            if (!GameUtils.isPlayerCharacter(go)) {
                return;
            }
            Event.dispatchToLocal(EventsName.GET_BUFF, this.type);
            // Tips.show(GameConfig.SquareLanguage.Typhoon_Ts_1.Value);
        };
        //#endregion
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            this.initTrigger();
        }
    }
    /**
     * buff类型改变，设置buff类型是属性同步时调用，创建buff模型
     * @returns
     */
    onTypeChanged() {
        if (this._model || this.type === BuffType.None) {
            return;
        }
        this.initModel();
    }
    /**
     * 位置改变，设置位置是属性同步时调用，设置buff模型位置
     * @returns
     */
    onLocChanged() {
        if (!this._model || !this._triggerC) {
            return;
        }
        this._model.asyncReady().then(() => {
            this._model.worldTransform.position = this.location;
        });
        this._triggerC.asyncReady().then(() => {
            this._triggerC.worldTransform.position = this.location;
        });
    }
    /**
     * 服务端触发器初始化
     */
    async initTrigger() {
        this._triggerS = await GameObject.asyncSpawn("Trigger");
        this._triggerS.enabled = (true);
        this._triggerS.worldTransform.scale = GlobalData.triggerScale;
        // 要用属性同步，所以只能用bind(this)
        this._triggerS.onEnter.add(this.getBoardS.bind(this));
    }
    /**
     * 服务端获得buff
     * @param go 碰到buff触发器的物体
     */
    getBoardS(go) {
        if (!(PlayerManagerExtesion.isCharacter(go)) || !go.player) {
            return;
        }
        let playerID = go.player.playerId;
        this.setLocation(GlobalData.recyclePos);
        BuffMgr$1.instance.addBuff(playerID, this.type, GlobalData.buffDuration);
        this.refreshTime = 20;
    }
    /**
     * 设置buff位置
     * @param loc buff的位置
     */
    setLocation(loc) {
        this._triggerS.asyncReady().then(() => {
            this._triggerS.worldTransform.position = loc;
            this.location = loc;
            this.refreshTime = Math.random() * 20;
            this.useUpdate = true;
        });
    }
    onUpdate(dt) {
        this.refreshTime += dt;
        if (this.refreshTime >= GlobalData.buffRefreshTime) {
            let loc = BuffMgr$1.instance.getRandomLoc();
            this.setLocation(loc);
        }
    }
    /** 创建客户端模型 */
    async initModel() {
        let guid = "";
        switch (this.type) {
            case BuffType.Speed:
                guid = "7F28C3A04EEDDC68DF55DB970A91E1AD";
                break;
            case BuffType.Jump:
                guid = "1CF1FD6F44EA98C5CC0FB88E7C713E4F";
                break;
        }
        this._model = await GameObject.asyncSpawn(guid);
        this._triggerC = await GameObject.asyncSpawn("Trigger");
        this._model.worldTransform.scale = new Vector(1, 1, 1);
        this._model.worldTransform.position = this.location;
        this._triggerC.worldTransform.scale = GlobalData.triggerScale;
        this._triggerC.worldTransform.position = this.location;
        this._triggerC.enabled = (true);
        this._triggerC.onEnter.add(this.getBuffC);
    }
};
__decorate([
    mw.Property({ replicated: true, onChanged: "onLocChanged" })
], BuffScript.prototype, "location", void 0);
__decorate([
    mw.Property({ replicated: true, onChanged: "onTypeChanged" })
], BuffScript.prototype, "type", void 0);
BuffScript = __decorate([
    Component
], BuffScript);
var BuffScript$1 = BuffScript;

let BuffMgr = class BuffMgr {
    constructor() {
        /**
         * 玩家和buff的映射
         */
        this.playerMap = new Map();
    }
    /**
     * 未玩家添加buff
     * @param playerID 玩家ID
     * @param buffType buff类型
     * @param time buff持续时间
     */
    addBuff(playerID, buffType, time) {
        let buffArr = this.playerMap.get(playerID);
        if (!buffArr) {
            buffArr = [];
            this.playerMap.set(playerID, buffArr);
        }
        let buff = buffArr.find(buff => buff.type == buffType);
        if (buff) {
            buff.time = time;
        }
        else {
            let player = Player.getPlayer(playerID);
            let effect = 0;
            if (player?.character) {
                effect = this.setBuff(player.character, buffType);
            }
            buffArr.push({ type: buffType, time: time, effect: effect });
        }
    }
    /**
     * 玩家退出游戏
     * @param playerID 退出游戏的玩家的ID
     */
    playerLeave(playerID) {
        let buffArr = this.playerMap.get(playerID);
        if (!buffArr) {
            return;
        }
        while (buffArr[0]) {
            this.clearBuff(playerID, buffArr[0].type);
        }
    }
    /**
     * 移除玩家身上的buff
     * @param playerID 玩家ID
     * @param buffType buff类型
     */
    clearBuff(playerID, buffType) {
        let buffArr = this.playerMap.get(playerID);
        if (!buffArr) {
            return;
        }
        let buff = buffArr.find(buff => buff.type == buffType);
        if (buff) {
            EffectService.stop(buff.effect);
            buffArr.splice(buffArr.indexOf(buff), 1);
            let character = Player.getPlayer(playerID)?.character;
            if (character) {
                switch (buffType) {
                    case BuffType.Speed:
                        character.maxWalkSpeed = 450;
                        break;
                    case BuffType.Jump:
                        character.maxJumpHeight = 180;
                        break;
                }
            }
        }
    }
    /**
     * 设置buff效果
     * @param character 角色
     * @param type buff类型
     * @returns buff特效
     */
    setBuff(character, type) {
        let effect = 0;
        switch (type) {
            case BuffType.Speed:
                character.maxWalkSpeed = 800;
                effect = EffectService.playOnGameObject("219369", character, { loopCount: 0, position: new Vector(0, 0, -50) });
                break;
            case BuffType.Jump:
                character.maxJumpHeight = 1000;
                effect = EffectService.playOnGameObject("153608", character, { loopCount: 0, position: new Vector(0, 0, -50) });
                break;
        }
        return effect;
    }
    /**
     * 获得随机的位置
     * @returns 随机到的位置
     */
    getRandomLoc() {
        let loc = Vector.zero;
        loc.x = Math.random() * 8000 - 4000;
        loc.y = Math.random() * 7000 - 5000;
        loc.z += 1000;
        let end = loc.clone();
        end.z -= 2000;
        const res = QueryUtil.lineTrace(loc, end, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (PlayerManagerExtesion.isCharacter(element.gameObject))
                continue;
            loc = element.position;
            break;
        }
        return loc;
    }
    /**
     * 创建所有buff
     */
    createAllBuff() {
        /**
         * 创建的buff数量
         */
        let index = 10;
        let interval = setInterval(() => {
            if (index < 0) {
                clearInterval(interval);
                return;
            }
            // 2 是buff类型数量，轮流创建buff
            let type = Math.floor(index % 2) + 1;
            this.createBuff(type);
            index--;
        }, 500);
    }
    /**
     * 创建buff
     * @param type buff类型
     */
    async createBuff(type) {
        let buff = await mw.Script.spawnScript(BuffScript$1, true);
        // buff创建出来之后，要等buff里创建出来触发器，然后在设置
        setTimeout(() => {
            buff.type = type;
            let loc = this.getRandomLoc();
            buff.setLocation(loc);
        }, 1000);
    }
    onUpdate(dt) {
        // 玩家身上的buff剩余时间计算
        this.playerMap.forEach((buffArr, playerID) => {
            buffArr.forEach(buff => {
                buff.time -= dt;
                if (buff.time <= 0) {
                    this.clearBuff(playerID, buff.type);
                }
            });
        });
    }
};
BuffMgr.instance = null;
BuffMgr = __decorate([
    single()
], BuffMgr);
var BuffMgr$1 = BuffMgr;

var foreign30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BuffMgr$1
});

const BOARD_DEFAULT_LOC = new Vector(15, 0, -30);
const BOARD_ADD_LOC = new Vector(-1.3, 0, 17);
/** 木板刷新时间（秒） */
const BOARD_REFRESH_TIME = 10;
/** 木头飞到的锚点GUID */
const BOARD_ANCHOR_GUID = "3DB95C18";
/** 木头飞到锚点的时间（毫秒） */
const BOARD_ANCHOR_TIME = 700;
class BoardMoculeS extends ModuleS {
    constructor() {
        super(...arguments);
        /** 随机生成的木板数组 */
        this.randomBoards = [];
        /** 在固定点位生成的木板数组 */
        this.immBoards = [];
        /** 玩家身上的木板 */
        this.playerBoardsMap = new Map();
        /** 回收的木板数组 */
        this.playerBoards = [];
        /** 待刷新木板序号数组 */
        this._refreshIndexs = [];
        /** 木头飞到的点的位置 */
        this._anchorLoc = Vector.zero;
        /** 当前木板数量 */
        this._curCount = 0;
        /** 随机生成木板的配置信息数组 */
        this._boardRandomCfgs = [];
        /** 木板权重 */
        this._boardWeight = [];
        /** 固定生成的木板配置信息数组 */
        this._boardImmCfgs = [];
        /** 玩家卸木板的定时器 */
        this._playerUnloadIntervalMap = new Map();
        /**
         * 玩家获得木板
         * @param playerID 获得木板的玩家的ID
         * @param index 获得木板的序号，序号为正是随机生成的木板，为负是固定生成的木板
         * @returns
         */
        this.addBoard = async (playerID, index) => {
            let character = Player.getPlayer(playerID)?.character;
            if (!this.playerBoardsMap.has(playerID) || !character) {
                return;
            }
            let arr = this.playerBoardsMap.get(playerID);
            let playerBoard = this.playerBoards.pop();
            if (!playerBoard) {
                playerBoard = await this.createPlayerBoard();
            }
            character.attachToSlot(playerBoard, mw.HumanoidSlotType.BackOrnamental);
            let loc = BOARD_DEFAULT_LOC.clone();
            loc.add(BOARD_ADD_LOC.clone().multiply(arr.length));
            playerBoard.localTransform.position = loc;
            arr.push(playerBoard);
            let str = arr.length + "/8";
            PlayerManager$1.instance.changeTitle(str, playerID);
            let time = BOARD_REFRESH_TIME + Math.random() * 10;
            if (index >= 0) {
                this._refreshIndexs.push(index);
                setTimeout(() => {
                    this._refreshIndexs.splice(this._refreshIndexs.indexOf(index), 1);
                    let board = this.randomBoards[index];
                    let loc = this.getRandomLocation();
                    board?.setLocation(loc);
                }, 1000 * time);
            }
            else {
                setTimeout(() => {
                    let board = this.immBoards[-index];
                    let loc = this._boardImmCfgs[(-index - 1)].Mid.clone();
                    board?.setLocation(loc);
                }, 1000 * time);
            }
        };
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this._boardRandomCfgs = GameConfig.Board.findElements("Rules", 0);
        this._boardRandomCfgs.forEach((v) => {
            this._boardWeight.push(v.Radius);
        });
        this._boardImmCfgs = GameConfig.Board.findElements("Rules", 1);
        let index = 0;
        let interval = setInterval(() => {
            if (index > GlobalData.FenceTotal) {
                clearInterval(interval);
                return;
            }
            this.createRandomBoard(index);
            index++;
        }, 300);
        Event.addLocalListener(EventsName.GET_BOARD, this.addBoard);
        let immIndex = 0;
        let immInterval = setInterval(() => {
            if (immIndex >= this._boardImmCfgs.length) {
                clearInterval(immInterval);
                return;
            }
            this.createImmBoard(immIndex);
            immIndex++;
        }, 400);
        this.init();
    }
    async init() {
        let anchor = await GameObject.asyncFindGameObjectById(BOARD_ANCHOR_GUID);
        this._anchorLoc = anchor.worldTransform.position;
        this._boardCountScript = await mw.ScriptManager.asyncFindScript("2EB67DCB");
        this._boardCountScript.textNowProgress = this._curCount + "/" + GlobalData.FenceNum;
        BuffMgr$1.instance.createAllBuff();
    }
    onPlayerEnterGame(player) {
        this.playerBoardsMap.set(player.playerId, []);
        this._boardCountScript.textNowProgress = this._curCount + "/" + GlobalData.FenceNum;
    }
    onPlayerLeft(player) {
        const playerID = player.playerId;
        if (this._playerUnloadIntervalMap.has(playerID)) {
            clearInterval(this._playerUnloadIntervalMap.get(playerID));
            this._playerUnloadIntervalMap.delete(playerID);
            setTimeout(() => {
                this.recycleAllPlayerBoard(playerID);
                this.playerBoardsMap.delete(playerID);
            }, BOARD_ANCHOR_TIME);
        }
        else {
            this.recycleAllPlayerBoard(playerID);
            this.playerBoardsMap.delete(playerID);
        }
    }
    /**
     * 创建随机生成的木板
     * @param index 序号
     */
    async createRandomBoard(index) {
        let board = await mw.Script.spawnScript(BoardScript, true);
        setTimeout(() => {
            board.index = index;
            this.randomBoards.push(board);
            let loc = this.getRandomLocation();
            board.setLocation(loc);
        }, 1000);
    }
    /**
     * 获得随机的坐标
     * @returns 坐标
     */
    getRandomLocation() {
        let index = GameUtils.getRandomWeightIndex(this._boardWeight);
        let cfg = this._boardRandomCfgs[index];
        let loc = cfg.Mid.clone();
        loc.x += Math.random() * cfg.Radius * 2 - cfg.Radius;
        loc.y += Math.random() * cfg.Radius * 2 - cfg.Radius;
        loc.z += 1000;
        let end = loc.clone();
        end.z -= 2000;
        const res = QueryUtil.lineTrace(loc, end, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (PlayerManagerExtesion.isCharacter(element.gameObject))
                continue;
            loc = element.position;
            break;
        }
        return loc;
    }
    /**
     * 创建固定生成的木板
     * @param index 序号
     */
    async createImmBoard(index) {
        let board = await mw.Script.spawnScript(BoardScript, true);
        setTimeout(() => {
            board.index = -(index + 1);
            this.immBoards[index + 1] = board;
            let loc = this._boardImmCfgs[index].Mid.clone();
            board.setLocation(loc);
        }, 1000);
    }
    /**
     * 创建玩家背后背的木板
     */
    async createPlayerBoard() {
        let playerBoard = await SpawnManager.asyncSpawn({ guid: "49953", replicates: true });
        playerBoard.setCollision(PropertyStatus.Off, true);
        return playerBoard;
    }
    /**
     * 通过玩家ID回收玩家身上的木板
     * @param playerID 玩家ID
     * @returns
     */
    recycleAllPlayerBoard(playerID) {
        let arr = this.playerBoardsMap.get(playerID);
        if (!arr || arr.length <= 0) {
            return;
        }
        while (arr.length > 0) {
            let playerBoard = arr.pop();
            if (!playerBoard) {
                break;
            }
            this.recyclePlayerBoard(playerBoard);
        }
    }
    /**
     * 回收玩家身上的木板
     * @param playerBoard 回收的木板
     */
    recyclePlayerBoard(playerBoard) {
        playerBoard.parent = null;
        playerBoard.worldTransform.position = GlobalData.recyclePos;
        playerBoard.worldTransform.rotation = Rotation.zero;
        playerBoard.worldTransform.scale = Vector.one;
        this.playerBoards.push(playerBoard);
    }
    /**
     * 获取玩家木板数量
     * @param playerID 玩家ID
     */
    getPlayerBoardCount(playerID) {
        if (this.playerBoardsMap.has(playerID)) {
            return this.playerBoardsMap.get(playerID)?.length;
        }
        return 0;
    }
    /**
     * 卸木板
     * @param playerID 玩家ID
     */
    net_unloadBoard(playerID) {
        let arr = this.playerBoardsMap.get(playerID);
        if (!arr || arr.length <= 0 || this._playerUnloadIntervalMap.has(playerID)) {
            return;
        }
        let interval = setInterval(() => {
            let arr = this.playerBoardsMap.get(playerID);
            if (arr.length <= 0) {
                this._playerUnloadIntervalMap.delete(playerID);
                clearInterval(interval);
                return;
            }
            let playerBoard = arr.pop();
            playerBoard && this.playerBoardFly(playerBoard);
            PlayerManager$1.instance.changeTitle(arr.length.toString() + "/8", playerID);
        }, 300);
        this._playerUnloadIntervalMap.set(playerID, interval);
    }
    /**
     * 玩家的木板飞行
     * @param playerBoard 飞行的木板
     */
    playerBoardFly(playerBoard) {
        playerBoard.parent = null;
        let curloc = playerBoard.worldTransform.position.clone();
        new Tween({ loc: curloc })
            .to({ loc: this._anchorLoc }, BOARD_ANCHOR_TIME)
            .onUpdate((T) => {
            playerBoard.worldTransform.position = T.loc;
        })
            .start()
            .onComplete(() => {
            this.addBoardCount();
            this.recyclePlayerBoard(playerBoard);
        });
    }
    /**
     * 增加木板数量
     */
    addBoardCount() {
        this._curCount++;
        if (this._curCount >= GlobalData.FenceNum) {
            this._curCount -= GlobalData.FenceNum;
            ModuleService.getModule(FenceModuleS).addFence();
        }
        this._boardCountScript.textNowProgress = this._curCount + "/" + GlobalData.FenceNum;
    }
}

var foreign26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BoardMoculeS
});

class BoardModuleC extends ModuleC {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.init();
    }
    async init() {
        this._handTrigger = await GameObject.asyncFindGameObjectById(GlobalData.HAND_BOARD);
        this._handTrigger.onEnter.add(this.reqUnloadBoard.bind(this));
    }
    /**
     * 请求卸载木板
     * @param go 进入触发器的物体
     */
    reqUnloadBoard(go) {
        if (!GameUtils.isPlayerCharacter(go) || GlobalData.boardCount <= 0) {
            return;
        }
        this.server.net_unloadBoard(this.localPlayerId);
    }
}

var foreign27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BoardModuleC
});

//服务端
class GameModuleS extends ModuleS {
    onStart() {
        this.playerNickNameMap = new Map();
    }
    /**
     * 玩家离开，清理玩家昵称
     * @param player
     */
    onPlayerLeft(player) {
        let pid = player?.playerId;
        if (this.playerNickNameMap.has(pid)) {
            this.playerNickNameMap.delete(pid);
        }
        BuffMgr$1.instance.playerLeave(pid);
    }
    /**
     * 玩家进入游戏，同步玩家昵称
     * @param nickName 玩家昵称
     * @returns
     */
    net_PlayerLogin(nickName) {
        if (this.playerNickNameMap.has(this.currentPlayerId)) {
            return;
        }
        this.playerNickNameMap.set(this.currentPlayerId, nickName);
    }
    /**
     * 玩家使用表情
     * @param guid 表情资源GUID
     */
    net_playEmojiS(guid) {
        this.getAllClient().net_PlayEmojiC(guid, this.currentPlayerId);
    }
    getAllPlayerNickName() {
        return this.playerNickNameMap;
    }
}

var foreign35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameModuleS: GameModuleS
});

class InteractiveHelper {
}
InteractiveHelper.cdIngTips = "";
InteractiveHelper.interactArr = [];
InteractiveHelper.interactLocArr = [];
class Interval {
    constructor() {
        this.updateInterval = 5;
    }
}
//交互对象,上面挂行为能力的前后端逻辑
class InteractObject extends mw.Script {
    constructor() {
        super(...arguments);
        this.blockInteractNext = false;
        this.nextInteractGuid = "";
        this.own = false;
        this.isDynamic = false;
        this.ownerPlayerIds = [0]; //当前与之交互的玩家id
        this.isClient = 1;
        this.interval = new Interval();
        this.onTrriger = false;
    }
    init(ServerClass, ClientClass) {
        if (SystemUtil.isClient()) {
            this.objLogicC = new ClientClass(this);
        }
        if (SystemUtil.isServer()) {
            this.objLogicS = new ServerClass(this);
            this.isClient = -1;
        }
    }
    get logic() {
        if (SystemUtil.isClient()) {
            return this.objLogicC;
        }
        else {
            return this.objLogicS;
        }
    }
    onUpdate(dt) {
        this.objLogicS?.onUpdate(dt);
        this.objLogicC?.onUpdate(dt);
    }
    onDestroy() {
        if (this.objLogicS != null) {
            if (this.own && this.ownerPlayerIds[0] != 0) {
                InteractiveHelper.onPlayInteract(this.ownerPlayerIds[0], false);
            }
            this.objLogicS["destroy"]();
            this.objLogicS = null;
        }
        if (this.objLogicC != null) {
            if (this.ownerPlayerIds.includes(getMyPlayerID())) {
                this.objLogicC.onPlayerAction(getMyPlayerID(), false, null);
            }
            this.objLogicC["destroy"]();
            this.objLogicC = null;
        }
    }
    //#endregion
    onEnterTrriger() {
    }
    onLeaveTrriger() {
    }
    onStateTrriger() {
    }
}
__decorate([
    mw.Property({ replicated: true, displayName: "是否阻塞后续联动", group: "关联" })
], InteractObject.prototype, "blockInteractNext", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "下一个脚本", group: "关联" })
], InteractObject.prototype, "nextInteractGuid", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "是否独享", group: "属性" })
], InteractObject.prototype, "own", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "是否是动态交互物", group: "属性" })
], InteractObject.prototype, "isDynamic", void 0);
__decorate([
    mw.Property({ replicated: true, hideInEditor: true, onChanged: "inPlayerIdChange" })
], InteractObject.prototype, "ownerPlayerIds", void 0);
__decorate([
    mw.Property({ replicated: true, hideInEditor: true })
], InteractObject.prototype, "isClient", void 0);
//交互对象的行为逻辑 在这个基础上分出: 能力逻辑_S 和 能力逻辑_C
class InteractLogic {
    constructor(objScript) {
        if (objScript) {
            this.objScript = objScript;
            setTimeout(() => {
                this.scriptInit();
            }, 1000);
        }
    }
    //初始化
    scriptInit() {
        try {
            this.onStart();
        }
        catch (e) { }
        if (SystemUtil.isClient()) {
            setTimeout(() => {
                InteractiveHelper.interactArr.push(this.objScript);
                if (this.objScript["isTrriger"] && this.objScript["isTrriger"] == TrrigerType.Distance) {
                    InteractiveHelper.interactLocArr.push({ script: this.objScript, location: this.gameObject.worldTransform.position, activeDis: this.objScript["activeDis"] });
                }
            }, 1000);
        }
        else {
            InteractiveHelper.interactArr.push(this.objScript);
        }
    }
    //游戏对象上挂载的原始脚本
    get info() {
        return this.objScript;
    }
    //游戏对象
    get gameObject() {
        return this.info.gameObject;
    }
    get guid() {
        return this.info.guid;
    }
    get name() {
        return this.info.name;
    }
    //是否开启Update
    set useUpdate(value) {
        this.info.useUpdate = value;
    }
    /**激活或者反激活时调用 交互物事件的开始 */
    onPlayerAction(playerId, active, param) { }
    //刷新时调用(需要请重写，需要开启:this.useUpdate=true)
    onUpdate(dt) { }
    ;
    destroy() {
        for (let i = 0; i < InteractiveHelper.interactArr.length; i++) {
            if (InteractiveHelper.interactArr[i].guid == this.objScript.guid) {
                InteractiveHelper.interactArr.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < InteractiveHelper.interactLocArr.length; i++) {
            if (InteractiveHelper.interactLocArr[i].script.guid == this.objScript.guid) {
                InteractiveHelper.interactLocArr.splice(i, 1);
                break;
            }
        }
        this.objScript.onLeaveTrriger();
        this.objScript = null;
    }
}
//==============================================================================================================
//交互行为-服务端
class InteractLogic_S extends InteractLogic {
}
//交互行为-客户端
class InteractLogic_C extends InteractLogic {
}

var foreign56 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InteractLogic_C: InteractLogic_C,
    InteractLogic_S: InteractLogic_S,
    InteractiveHelper: InteractiveHelper,
    Interval: Interval,
    default: InteractObject
});

/**
 * @Author       : meta
 * @Date         : 2023-01-16 15:54:55
 * @LastEditors  : meta
 * @LastEditTime : 2023-07-27 18:38:42
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\InteractModuleServer.ts
 * @Description  :
 */
class InteractModuleServer extends ModuleS {
    onStart() {
        Player.onPlayerLeave.add((player) => {
            try {
                this.unActiveInteract(player.playerId);
            }
            catch (e) {
            }
        });
        Event.addClientListener(EventsName.CancelActive, (player) => {
            this.unActiveInteract(player.playerId);
        });
    }
    net_EnterScene() {
        InteractMgr$1.instance.initInteract();
    }
    unActiveInteract(playerID) {
        if (Player.getPlayer(playerID)) {
            this.getClient(playerID).net_UnActiveInteract();
            InteractiveHelper.onPlayInteract(playerID, false);
            let interacts = InteractMgr$1.instance.findInteract(playerID);
            if (interacts.length > 0) {
                for (const interact of interacts) {
                    interact.logic.onPlayerAction(playerID, false);
                    if (interact.own) {
                        interact.ownerPlayerIds[0] = 0;
                    }
                    else {
                        interact.ownerPlayerIds[interact.ownerPlayerIds.indexOf(playerID)] = 0;
                    }
                }
            }
        }
    }
    net_ActiveHandle(guid, flag, playerId) {
        const interact = InteractMgr$1.instance.getInteract(guid);
        if (!interact)
            return;
        if (flag) {
            if (interact.own && interact.ownerPlayerIds[0] != 0) {
                return;
            }
            this.playerAction(interact, playerId, true);
        }
        else {
            this.playerAction(interact, playerId, false);
        }
    }
    playerAction(interact, playerId, active, param) {
        if (!interact)
            return;
        if (active) {
            if (interact.own) {
                InteractiveHelper.onPlayInteract(playerId, true);
                interact.ownerPlayerIds[0] = playerId;
            }
            else {
                if (interact.ownerPlayerIds.includes(0)) {
                    interact.ownerPlayerIds[interact.ownerPlayerIds.indexOf(0)] = playerId;
                }
                else {
                    interact.ownerPlayerIds.push(playerId);
                }
            }
        }
        else {
            if (interact.own) {
                InteractiveHelper.onPlayInteract(playerId, false);
                interact.ownerPlayerIds[0] = 0;
            }
            else {
                interact.ownerPlayerIds[interact.ownerPlayerIds.indexOf(playerId)] = 0;
            }
        }
        interact.logic.onPlayerAction(playerId, active, param);
        if (interact.nextInteractGuid != "" && !interact.blockInteractNext) {
            this.playerAction(InteractMgr$1.instance.getInteract(interact.nextInteractGuid), playerId, active, param);
        }
    }
}

var foreign62 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InteractModuleServer: InteractModuleServer
});

/**触发模式 */
var TriggerMode;
(function (TriggerMode) {
    /**共有模式*/
    TriggerMode["Public"] = "0";
    /**独立模式*/
    TriggerMode["Private"] = "1"; //独立模式：每个人进出触发器，单独计算激活和关闭
})(TriggerMode || (TriggerMode = {}));
//交互物触发器-碰触交互
let Active_Trigger = class Active_Trigger extends InteractObject {
    constructor() {
        super(...arguments);
        this.mode = TriggerMode.Private;
        this.needExitBtn = false;
    }
    onStart() {
        this.init(Trigger_S, Trigger_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "工作模式", selectOptions: { "公共": TriggerMode.Public, "独立": TriggerMode.Private }, group: "属性" })
], Active_Trigger.prototype, "mode", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "退出按钮", group: "属性" })
], Active_Trigger.prototype, "needExitBtn", void 0);
Active_Trigger = __decorate([
    Component
], Active_Trigger);
var Active_Trigger$1 = Active_Trigger;
//客户端
class Trigger_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class Trigger_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.playerList = [];
    }
    onStart() {
        let trigger = null;
        if (this.gameObject instanceof mw.Trigger) {
            trigger = this.gameObject;
        }
        trigger.onEnter.add((go) => {
            if ((PlayerManagerExtesion.isCharacter(go))) {
                this.addPlayer(go.player);
            }
        });
        trigger.onLeave.add((go) => {
            if ((PlayerManagerExtesion.isCharacter(go))) {
                let player = go.player;
                if (player == null)
                    return;
                this.removePlayer(player);
            }
        });
        Player.onPlayerLeave.add((player) => {
            try {
                this.removePlayer(player);
            }
            catch (e) {
            }
        });
    }
    addPlayer(player) {
        if (this.playerList.includes(player.playerId) || InteractiveHelper.playInteractionEnable(player))
            return;
        this.playerList.push(player.playerId);
        if (this.info.mode == TriggerMode.Private) {
            ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, true);
        }
        else if (this.playerList.length >= 1) {
            ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, true);
        }
    }
    removePlayer(player) {
        let index = this.playerList.indexOf(player.playerId);
        if (index == -1)
            return;
        this.playerList.splice(index, 1);
        if (this.info.mode == TriggerMode.Private) {
            ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, false);
        }
        else if (this.playerList.length == 0) {
            ModuleService.getModule(InteractModuleServer).playerAction(this.info, player.playerId, false);
        }
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign40 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Active_Trigger$1
});

let SP_InteractiveFlag_generate = class SP_InteractiveFlag_generate extends UIScript {
    get mBtn() {
        if (!this.mBtn_Internal && this.uiWidgetBase) {
            this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn');
        }
        return this.mBtn_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        });
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        });
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
SP_InteractiveFlag_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/SP_InteractiveFlag.ui')
], SP_InteractiveFlag_generate);
var SP_InteractiveFlag_Generate = SP_InteractiveFlag_generate;

var foreign106 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_InteractiveFlag_Generate
});

let SP_InteractiveUI_generate = class SP_InteractiveUI_generate extends UIScript {
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
SP_InteractiveUI_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/SP_InteractiveUI.ui')
], SP_InteractiveUI_generate);
var SP_InteractiveUI_Generate = SP_InteractiveUI_generate;

var foreign107 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_InteractiveUI_Generate
});

/**
 * @Author       : meta
 * @Date         : 2023-01-13 12:00:28
 * @LastEditors  : meta
 * @LastEditTime : 2023-06-14 16:52:38
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\ClickUI.ts
 * @Description  :
 */
class ClickUI extends SP_InteractiveFlag_Generate {
    constructor() {
        super(...arguments);
        this._obj = null;
        this._offset = null;
        this.callBack = null;
    }
    onStart() {
        this.mBtn.onClicked.add(() => {
            this.callBack();
        });
        this.canUpdate = true;
    }
    show(obj, offset, callBack) {
        this.callBack = callBack;
        this._obj = obj;
        this._offset = offset;
        let pos = InputUtil.projectWorldPositionToWidgetPosition(obj.worldTransform.position.add(this._offset), false).screenPosition;
        this.uiObject.position = pos.subtract(this.uiObject.size.multiply(0.5));
        this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }
    changeIcon(guid) {
        this.mBtn.normalImageGuid = guid;
    }
    onUpdate(dt) {
        let pos = InputUtil.projectWorldPositionToWidgetPosition(this._obj.worldTransform.position.add(this._offset), false).screenPosition;
        const position = pos.subtract(this.uiObject.size.multiply(0.5));
        if (position.x < 0)
            position.x = 0;
        if (position.y < 0)
            position.y = 0;
        if (position.x > 1920)
            position.x = 1920;
        if (position.y > 1080)
            position.y = 1080;
        this.uiObject.position = position;
    }
}
//点击UI的对象池
class ClickUIPools {
    constructor() {
        this.pool = [];
        this.map = new Map();
    }
    static get instance() {
        if (ClickUIPools._instance == null) {
            ClickUIPools._instance = new ClickUIPools();
        }
        return ClickUIPools._instance;
    }
    /**
     * 显示交互UI
     * @param iconGuid 图标guid
     * @param obj 对应物体
     * @param offset 偏移
     * @param callBack 点击方法
     * @returns
     */
    show(obj, offset, callBack) {
        if (this.map.has(obj.gameObjectId)) {
            return;
        }
        let panel = UIManager.show(SP_InteractiveUI_Generate);
        panel.rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        let clickUI = null;
        if (this.pool.length > 0) {
            clickUI = this.pool.shift();
        }
        else {
            clickUI = UIManager.create(ClickUI);
            panel.rootCanvas.addChild(clickUI.uiObject);
            clickUI.uiObject.size = clickUISize;
        }
        clickUI.show(obj, offset, callBack);
        this.map.set(obj.gameObjectId, clickUI);
    }
    /**
     * 改变icon
     * @param iconGuid
     * @param obj
     * @returns
     */
    changeIcon(iconGuid, objGuid) {
        if (!this.map.has(objGuid)) {
            return;
        }
        let ui = this.map.get(objGuid);
        ui.changeIcon(iconGuid);
    }
    /**
     * 隐藏
     * @param obj
     */
    hide(objGuid) {
        let ui = this.map.get(objGuid);
        if (ui) {
            ui.uiObject.visibility = mw.SlateVisibility.Collapsed;
            this.map.delete(objGuid);
            this.pool.push(ui);
        }
    }
}
ClickUIPools._instance = null;
const clickUISize = new mw.Vector2(100, 100);

var foreign38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ClickUI: ClickUI,
    ClickUIPools: ClickUIPools
});

/**触发模式 */
var ExitMode;
(function (ExitMode) {
    ExitMode["None"] = "0";
    ExitMode["ExitBtn"] = "1";
    ExitMode["MoveJump"] = "2"; //移动或跳跃(独享)
})(ExitMode || (ExitMode = {}));
//触发交互-UI操作
let Active_UI = class Active_UI extends InteractObject {
    constructor() {
        super(...arguments);
        this.isTrriger = TrrigerType.Distance;
        this.activeDis = 150; //可交互的距离
        this.icon = "110111"; //默认是个小手
        this.cdIcon = "34423"; //默认是个小手
        this.offset = new mw.Vector(0, 0, 0);
        this.exitMode = ExitMode.ExitBtn;
        this.cdTime = 0;
        this.params = "";
        this.isRefresh = false;
        this.isInCD = false; //是否处于CD中
    }
    onStart() {
        this.init(ActiveUI_S, ActiveUI_C);
    }
    onEnterTrriger() {
        this.showClickIcon(true);
    }
    onLeaveTrriger() {
        this.showClickIcon(false);
    }
    onStateTrriger() {
        this.showClickIcon(true);
    }
    showClickIcon(value) {
        let isShow = this.ownerPlayerIds[0] == 0 && InteractiveHelper.playInteractionEnable(getMyPlayerID());
        if (value && isShow && this.gameObject.getVisibility()) {
            ClickUIPools.instance.show(this.gameObject, this.offset, this.logic.clickBtn);
            ClickUIPools.instance.changeIcon(this.isInCD ? this.cdIcon : this.icon, this.gameObject.gameObjectId);
        }
        else {
            ClickUIPools.instance.hide(this.gameObject.gameObjectId);
        }
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "交互方式", group: "属性", selectOptions: { "不交互": TrrigerType.None, "距离判断": TrrigerType.Distance, "盒状触发器": TrrigerType.BoxTrigger, "球状触发器": TrrigerType.SphereTrigger } })
], Active_UI.prototype, "isTrriger", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "交互距离", group: "属性" })
], Active_UI.prototype, "activeDis", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "UI图标", group: "属性" })
], Active_UI.prototype, "icon", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "CDUI图标", group: "属性" })
], Active_UI.prototype, "cdIcon", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "UI图标偏移", group: "属性" })
], Active_UI.prototype, "offset", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "退出方式(独享用)", selectOptions: { "无": ExitMode.None, "退出按钮": ExitMode.ExitBtn, "移动跳跃": ExitMode.MoveJump }, group: "属性" })
], Active_UI.prototype, "exitMode", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "冷却(秒)", group: "属性" })
], Active_UI.prototype, "cdTime", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "外部参数", group: "属性" })
], Active_UI.prototype, "params", void 0);
__decorate([
    mw.Property({ displayName: "是否需要更新位置", group: "属性" })
], Active_UI.prototype, "isRefresh", void 0);
__decorate([
    mw.Property({ replicated: true, hideInEditor: true, onChanged: "inCDChange" })
], Active_UI.prototype, "isInCD", void 0);
Active_UI = __decorate([
    Component
], Active_UI);
var Active_UI$1 = Active_UI;
//客户端
class ActiveUI_C extends InteractLogic_C {
    constructor() {
        super(...arguments);
        this.clickBtn = () => {
            if (this.info.isInCD) {
                InteractiveHelper.showTips(InteractiveHelper.cdIngTips);
                return;
            }
            InteractMgr$1.instance.activeHandle(this.info, true);
        };
        this.exit = () => {
            InteractiveHelper.removeExitInteractiveListener();
            InteractMgr$1.instance.activeHandle(this.info, false);
        };
    }
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (!StringUtil.isEmpty(this.info.params)) {
            InteractiveHelper.onPlayerAction(playerId, active, this.info.params);
        }
        if (active) {
            InteractiveHelper.addExitInteractiveListener(this.info.exitMode == ExitMode.ExitBtn ? 1 : 2, () => {
                this.exit();
            });
        }
        else {
            InteractiveHelper.removeExitInteractiveListener();
        }
    }
}
//服务端
class ActiveUI_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (!StringUtil.isEmpty(this.info.params)) {
            InteractiveHelper.onPlayerAction(playerId, active, this.info.params);
        }
    }
}

var foreign41 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Active_UI$1
});

//跳跃
let Jump = class Jump extends InteractObject {
    constructor() {
        super(...arguments);
        this.impulse = new mw.Vector(0, 0, 100);
    }
    onStart() {
        this.init(Jump_S, Jump_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "冲量", group: "属性" })
], Jump.prototype, "impulse", void 0);
Jump = __decorate([
    Component
], Jump);
var Jump$1 = Jump;
//客户端
class Jump_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class Jump_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.playerArr = [];
    }
    onStart() {
    }
    onPlayerAction(playerId, active) {
        let player = Player.getPlayer(playerId);
        if (active) {
            this.playerArr.push(player);
        }
        else {
            let index = this.playerArr.indexOf(player);
            if (index >= 0) {
                this.playerArr.splice(index, 1);
            }
        }
        this.useUpdate = this.playerArr.length > 0;
    }
    onUpdate(dt) {
        for (let i = 0; i < this.playerArr.length; i++) {
            if (!this.playerArr[i].character.isJumping) {
                this.playerArr[i].character.addImpulse(this.info.impulse, true);
                this.playerArr.splice(i, 1);
            }
        }
    }
}

var foreign44 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Jump$1
});

/**
 * 交互物-MW交互物对象
 * 按照设置，将玩家于MW交互物绑定
 */
let OldInteractive = class OldInteractive extends InteractObject {
    constructor() {
        super(...arguments);
        this.stanceGuid = "4175";
        this.autoChangerPos = false;
        this.isBeforPos = true;
    }
    onStart() {
        this.init(OldInteractive_S, OldInteractive_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "交互姿态绑定", group: "属性" })
], OldInteractive.prototype, "stanceGuid", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "身高匹配交互物高度", group: "属性" })
], OldInteractive.prototype, "autoChangerPos", void 0);
__decorate([
    mw.Property({ displayName: "退出是否回到交互前位置" })
], OldInteractive.prototype, "isBeforPos", void 0);
OldInteractive = __decorate([
    Component
], OldInteractive);
var OldInteractive$1 = OldInteractive;
//客户端
class OldInteractive_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class OldInteractive_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.handlePlayerId = 0;
        this.doing = false;
        this.isDown = false;
    }
    onStart() {
        if (this.gameObject && this.gameObject instanceof mw.Interactor) {
            this.interactiver = this.gameObject;
        }
        else {
            SpawnManager.asyncSpawn({ guid: "Interactor", replicates: true }).then((obj) => {
                this.interactiver = obj;
                this.interactiver.parent = this.gameObject;
                this.interactiver.localTransform.position = (mw.Vector.zero);
                this.interactiver.localTransform.rotation = (mw.Rotation.zero);
            });
        }
    }
    async onPlayerAction(playerId, active) {
        if (active) {
            if (this.info.stanceGuid && this.info.stanceGuid != "") {
                await GameUtils.downAsset(this.info.stanceGuid);
                // this.interactiver.animationId = this.info.stanceGuid;
                // this.interactiver.animationId = "4175";
            }
            this.sitDown(playerId);
        }
        else {
            this.standUp(playerId);
        }
    }
    //坐下
    sitDown(playerId) {
        if (this.handlePlayerId != 0 && this.handlePlayerId != playerId)
            return;
        const character = Player.getPlayer(playerId).character;
        this.handlePlayerId = playerId;
        this.isDown = true;
        if (this.doing)
            return;
        this.doing = true;
        this.beforPos = character.worldTransform.position.clone();
        if (this.interactiver.enter(character)) {
            this.doing = false;
            this._curStance = PlayerManagerExtesion.loadStanceExtesion(character, this.info.stanceGuid, true);
            this._curStance.play();
            if (!this.isDown) {
                this.standUp(playerId);
            }
        }
    }
    //站起
    standUp(playerId) {
        if (this.handlePlayerId != playerId)
            return;
        this.isDown = false;
        if (this.doing)
            return;
        this.doing = true;
        this.exitOwnObject(playerId, (res) => {
            this.doing = false;
            if (this.isDown) {
                this.sitDown(playerId);
            }
            else {
                this.handlePlayerId = 0;
            }
        });
    }
    //退出独享交互物的方法
    exitOwnObject(playerId, resCallback) {
        if (this.interactiver.leave(this.info.isBeforPos ? this.beforPos : this.gameObject.worldTransform.position)) {
            let player = Player.getPlayer(playerId);
            player.character.lookAt(this.gameObject.worldTransform.position);
            this._curStance.stop();
            // player.character.currentStance.stop();
            // PlayerManagerExtesion.changeStanceExtesion(player.character, "");
            if (resCallback != null)
                resCallback(true);
        }
        else {
            if (resCallback != null)
                resCallback(false);
        }
    }
}

var foreign48 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: OldInteractive$1
});

let Play3DSound = class Play3DSound extends InteractObject {
    constructor() {
        super(...arguments);
        this.resGuidList = "";
        this.loopNum = 1;
        this.worldPos = mw.Vector.zero;
        this.volume = 1;
        this.innerRadius = 200;
        this.maxDistance = 600;
        this.isStopBgm = false;
    }
    onStart() {
        this.init(Play3DSound_S, Play3DSound_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "资源ID列表", group: "属性" }) //如果写了就播放固定id 如果没写就播放上个节点传下来的声音
], Play3DSound.prototype, "resGuidList", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "循环次数", group: "属性" })
], Play3DSound.prototype, "loopNum", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "声音位置", group: "属性" })
], Play3DSound.prototype, "worldPos", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "声音大小,0~1", group: "属性" })
], Play3DSound.prototype, "volume", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "内部半径", group: "属性" })
], Play3DSound.prototype, "innerRadius", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "衰减距离:maxDistance", group: "属性" })
], Play3DSound.prototype, "maxDistance", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "是否停止当前BGM", group: "属性" })
], Play3DSound.prototype, "isStopBgm", void 0);
Play3DSound = __decorate([
    Component
], Play3DSound);
var Play3DSound$1 = Play3DSound;
//客户端
class Play3DSound_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (this.info.isStopBgm) {
            if (active) {
                SoundService.stopBGM();
            }
            else {
                let bgmConfig = GameConfig.Music.getElement(13);
                SoundService.playBGM(bgmConfig.MusicGUID, bgmConfig.Music);
            }
        }
    }
}
//服务端
class Play3DSound_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.playId = 0;
        this.curMusicIndex = 0;
    }
    onStart() {
        this.curMusicIndex = -1;
        this.musicList = [];
        let musicStrList = this.info.resGuidList.split(',');
        for (let i = 0; i < musicStrList.length; i++) {
            this.musicList.push(musicStrList[i]);
        }
    }
    onPlayerAction(playerId, active, param) {
        if (active) {
            this.curMusicIndex = (this.curMusicIndex + 1) % this.musicList.length;
            let curMusicResStr = this.musicList[this.curMusicIndex];
            if (this.playId != 0) {
                SoundService.stop3DSound(this.playId);
            }
            let pos = this.info.worldPos;
            if (this.info.worldPos.x == 0 && this.info.worldPos.y == 0 && this.info.worldPos.z == 0) {
                pos = this.gameObject.worldTransform.position.clone();
            }
            this.playId = SoundService.play3DSound(curMusicResStr, pos, this.info.loopNum, this.info.volume, { radius: this.info.innerRadius, falloffDistance: this.info.maxDistance });
        }
        else {
            SoundService.stop3DSound(this.playId);
            this.playId = 0;
        }
    }
}

var foreign49 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Play3DSound$1
});

let PlayEffect = class PlayEffect extends InteractObject {
    constructor() {
        super(...arguments);
        this.resGuid = "";
        this.loopNum = 0;
        this.offset = mw.Vector.zero;
        this.rotation = mw.Rotation.zero;
        this.scale = mw.Vector.one;
    }
    onStart() {
        this.init(PlayEffect_S, PlayEffect_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "资源ID", group: "属性" })
], PlayEffect.prototype, "resGuid", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "循环次数", group: "属性" })
], PlayEffect.prototype, "loopNum", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "坐标偏移", group: "属性" })
], PlayEffect.prototype, "offset", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "旋转", group: "属性" })
], PlayEffect.prototype, "rotation", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "缩放", group: "属性" })
], PlayEffect.prototype, "scale", void 0);
PlayEffect = __decorate([
    Component
], PlayEffect);
var PlayEffect$1 = PlayEffect;
//客户端
class PlayEffect_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class PlayEffect_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.playId = 0;
    }
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        const resGuid = param != null ? param : this.info.resGuid;
        if (mw.StringUtil.isEmpty(resGuid))
            return;
        if (active) {
            if (this.info.loopNum == 0 && this.playId != 0)
                return;
            this.playId = GeneralManager.rpcPlayEffectOnGameObject(resGuid, this.gameObject, this.info.loopNum, this.info.offset, this.info.rotation, this.info.scale);
        }
        else {
            EffectService.stop(this.playId);
            this.playId = 0;
        }
    }
}

var foreign50 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayEffect$1
});

let PlaySound = class PlaySound extends InteractObject {
    constructor() {
        super(...arguments);
        this.resGuid = "";
        this.loopNum = 1;
    }
    onStart() {
        this.init(PlaySound_S, PlaySound_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "资源ID", group: "属性" }) //如果写了就播放固定id 如果没写就播放上个节点传下来的声音
], PlaySound.prototype, "resGuid", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "循环次数", group: "属性" })
], PlaySound.prototype, "loopNum", void 0);
PlaySound = __decorate([
    Component
], PlaySound);
var PlaySound$1 = PlaySound;
//客户端
class PlaySound_C extends InteractLogic_C {
    onPlayerAction(playerId, active, param) {
        const resGuid = param != null ? param : this.info.resGuid;
        if (StringUtil.isEmpty(resGuid))
            return;
        if (active) {
            SoundService.stopSound(resGuid);
            SoundService.playSound(resGuid, this.info.loopNum);
        }
        else {
            SoundService.stopSound(resGuid);
        }
    }
    onStart() {
    }
}
//服务端
class PlaySound_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign51 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlaySound$1
});

let Input_UI = class Input_UI extends InteractObject {
    constructor() {
        super(...arguments);
        this.isTrriger = TrrigerType.Distance;
        this.activeDis = 150; //可交互的距离
        this.icon = "110111"; //默认是个小手
        this.offset = new mw.Vector(0, 0, 0);
        this.cdTime = 0;
        this.inCD = false;
        this.clickBtn = () => {
            this.inCD = true;
            this.showClickIcon(false);
            InteractMgr$1.instance.activeHandle(this, true);
        };
    }
    onStart() {
        this.init(InputUI_S, InputUI_C);
    }
    onEnterTrriger() {
        this.showClickIcon(true);
    }
    onLeaveTrriger() {
        this.showClickIcon(false);
    }
    onStateTrriger() {
        this.showClickIcon(true);
    }
    showClickIcon(value) {
        if (value && !this.inCD && this.gameObject.getVisibility()) {
            ClickUIPools.instance.show(this.gameObject, this.offset, this.clickBtn);
            ClickUIPools.instance.changeIcon(this.icon, this.gameObject.gameObjectId);
        }
        else {
            ClickUIPools.instance.hide(this.gameObject.gameObjectId);
        }
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "交互方式", group: "属性", selectOptions: { "不交互": TrrigerType.None, "距离判断": TrrigerType.Distance, "盒状触发器": TrrigerType.BoxTrigger, "球状触发器": TrrigerType.SphereTrigger } })
], Input_UI.prototype, "isTrriger", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "交互距离", group: "属性" })
], Input_UI.prototype, "activeDis", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "UI图标", group: "属性" })
], Input_UI.prototype, "icon", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "UI图标偏移", group: "属性" })
], Input_UI.prototype, "offset", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "冷却时间:单位秒", group: "属性" })
], Input_UI.prototype, "cdTime", void 0);
Input_UI = __decorate([
    Component
], Input_UI);
var Input_UI$1 = Input_UI;
//客户端
class InputUI_C extends InteractLogic_C {
    constructor() {
        super(...arguments);
        /**开始时间戳 */
        this.mStartTime = 0;
    }
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (active) {
            this.mStartTime = TimeUtil.elapsedTime();
            this.useUpdate = true;
        }
    }
    onUpdate(dt) {
        if (TimeUtil.elapsedTime() - this.mStartTime >= this.info.cdTime) {
            this.useUpdate = false;
            this.info.inCD = false;
        }
    }
}
//客户端
class InputUI_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign57 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Input_UI$1
});

//交互物
let PlayAni = class PlayAni extends InteractObject {
    constructor() {
        super(...arguments);
        this.animation = "";
        this.time = 1;
        this.loopNum = 0;
        this.lookAtOff = mw.Vector.zero;
        this.locationOff = mw.Vector.zero;
        this.moveJumpEnable = false;
    }
    onStart() {
        this.init(Animation_S, Animation_C);
    }
};
__decorate([
    mw.Property({ replicated: true, displayName: "动作ID", group: "属性" })
], PlayAni.prototype, "animation", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "动作速度,默认1", group: "属性" })
], PlayAni.prototype, "time", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "循环次数", group: "属性" })
], PlayAni.prototype, "loopNum", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "看向方向", group: "属性" })
], PlayAni.prototype, "lookAtOff", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "位置偏移", group: "属性" })
], PlayAni.prototype, "locationOff", void 0);
__decorate([
    mw.Property({ replicated: true, displayName: "可移动跳跃", group: "属性" })
], PlayAni.prototype, "moveJumpEnable", void 0);
PlayAni = __decorate([
    Component
], PlayAni);
var PlayAni$1 = PlayAni;
//客户端
class Animation_C extends InteractLogic_C {
    onStart() {
        GameUtils.downAsset(this.info.animation);
    }
    onPlayerAction(playerId, active, param) {
        this._moveToPos = this.gameObject.worldTransform.clone().transformPosition(this.info.locationOff);
        const character = Player.localPlayer.character;
        if (active) {
            this._moveToPos.z = character.worldTransform.position.z += this.info.locationOff.z;
            if (this.info.locationOff.x != 0 || this.info.locationOff.y != 0 || this.info.locationOff.z != 0)
                character.worldTransform.position = this._moveToPos;
            if (this.info.lookAtOff.x == 0 && this.info.lookAtOff.y == 0 && this.info.lookAtOff.z == 0)
                character.lookAt(mw.Vector.add(this.gameObject.worldTransform.position, this.gameObject.worldTransform.getForwardVector()));
            else
                character.lookAt(mw.Vector.add(this.gameObject.worldTransform.position, this.info.lookAtOff));
            this._curAnim = PlayerManagerExtesion.loadAnimationExtesion(character, this.info.animation, true);
            this._curAnim.loop = this.info.loopNum;
            this._curAnim.speed = this.info.time;
            TimeUtil.delaySecond(0.5).then(() => {
                if (this._curAnim)
                    this._curAnim.play();
            });
            character.movementEnabled = character.jumpEnabled = this.info.moveJumpEnable;
            if (this.gameObject.parent && this.gameObject.parent.name == '宿舍样式8') {
                Event.dispatchToLocal("CloseOpenDoorUI");
            }
        }
        else {
            this._curAnim.stop();
            this._curAnim = null;
            character.movementEnabled = character.jumpEnabled = true;
        }
    }
}
//服务端
class Animation_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active) {
    }
}

var foreign58 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayAni$1
});

/**
 * @Author       : meta
 * @Date         : 2023-01-16 17:30:22
 * @LastEditors  : meta
 * @LastEditTime : 2023-03-28 10:05:45
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\InteractMgr.ts
 * @Description  :
 */
class InteractMgr {
    constructor() {
        this.activeHandle = null;
        this.activeNextHandle = null;
    }
    static get instance() {
        if (!InteractMgr._instance) {
            InteractMgr._instance = new InteractMgr();
        }
        return InteractMgr._instance;
    }
    async initInteract() {
        if (InteractMgr.isInit) {
            return;
        }
        else {
            InteractMgr.isInit = true;
        }
        let i = 5;
        for (const config of GameConfig.InteractConfig.getAllElement()) {
            //分帧处理
            TimeUtil.delayExecute(async () => {
                await InteractMgr.instance.createInteract(config, SystemUtil.isServer());
            }, ++i);
        }
    }
    async createInteract(cfg, isServer) {
        if (!this.interactorChilden) {
            let interactorParent = await GameObject.asyncFindGameObjectById(GlobalData.interactorParent);
            if (interactorParent)
                this.interactorChilden = interactorParent.getChildren();
        }
        if (this.interactorChilden.length != 0 && isServer == cfg.IsServer) {
            let interact = this.interactorChilden.find(i => i.name === cfg.Name);
            if (!interact)
                return;
            let nextGuid = "";
            for (let i = cfg.Scripts.length; i > 0; i--) {
                let script = null;
                let Vectors = null;
                switch (cfg.Scripts[i - 1]) {
                    case "Active_UI":
                        script = await mw.Script.spawnScript(Active_UI$1, isServer, interact);
                        script.isTrriger = cfg["Params" + i][2];
                        script.activeDis = Number(cfg["Params" + i][3]);
                        script.icon = cfg["Params" + i][4];
                        script.cdIcon = cfg["Params" + i][5];
                        Vectors = cfg["Params" + i][6].split("/");
                        script.offset = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.exitMode = cfg["Params" + i][7];
                        script.CD = Number(cfg["Params" + i][8]);
                        if (cfg["Params" + i][9]) {
                            script.params = cfg["Params" + i][9];
                        }
                        break;
                    case "Input_UI":
                        script = await mw.Script.spawnScript(Input_UI$1, isServer, interact);
                        script.isTrriger = cfg["Params" + i][2];
                        script.activeDis = Number(cfg["Params" + i][3]);
                        script.icon = cfg["Params" + i][4];
                        Vectors = cfg["Params" + i][5].split("/");
                        script.offset = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.cdTime = Number(cfg["Params" + i][6]);
                        break;
                    case "Interactive":
                        script = await mw.Script.spawnScript(OldInteractive$1, isServer, interact);
                        script.stanceGuid = cfg["Params" + i][2];
                        script.autoChangerPos = MyBoolean(cfg["Params" + i][3]);
                        script.isBeforPos = MyBoolean(cfg["Params" + i][4]);
                        break;
                    case "Active_Trigger":
                        script = await mw.Script.spawnScript(Active_Trigger$1, isServer, interact);
                        script.mode = cfg["Params" + i][2];
                        script.needExitBtn = MyBoolean(cfg["Params" + i][3]);
                        break;
                    case "Jump":
                        script = await mw.Script.spawnScript(Jump$1, isServer, interact);
                        Vectors = cfg["Params" + i][2].split("/");
                        script.impulse = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        break;
                    case "PlayAni":
                        script = await mw.Script.spawnScript(PlayAni$1, isServer, interact);
                        script.animation = cfg["Params" + i][2];
                        script.time = Number(cfg["Params" + i][3]);
                        script.loopNum = Number(cfg["Params" + i][4]);
                        Vectors = cfg["Params" + i][5].split("/");
                        script.lookAtOff = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        Vectors = cfg["Params" + i][6].split("/");
                        script.locationOff = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.moveJumpEnable = MyBoolean(cfg["Params" + i][7]);
                        break;
                    case "Play3DSound":
                        script = await mw.Script.spawnScript(Play3DSound$1, isServer, interact);
                        script.resGuidList = cfg["Params" + i][2];
                        script.loopNum = Number(cfg["Params" + i][3]);
                        Vectors = cfg["Params" + i][4].split("/");
                        script.worldPos = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        script.volume = Number(cfg["Params" + i][5]);
                        script.innerRadius = Number(cfg["Params" + i][6]);
                        script.maxDistance = Number(cfg["Params" + i][7]);
                        script.isStopBgm = MyBoolean(cfg["Params" + i][8]);
                        break;
                    case "PlaySound":
                        script = await mw.Script.spawnScript(PlaySound$1, isServer, interact);
                        script.resGuid = cfg["Params" + i][2];
                        script.loopNum = Number(cfg["Params" + i][3]);
                        break;
                    case "PlayEffect":
                        script = await mw.Script.spawnScript(PlayEffect$1, isServer, interact);
                        script.resGuid = cfg["Params" + i][2];
                        script.loopNum = Number(cfg["Params" + i][3]);
                        Vectors = cfg["Params" + i][4].split("/");
                        script.offset = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        Vectors = cfg["Params" + i][5].split("/");
                        script.rotation = new mw.Rotation(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        Vectors = cfg["Params" + i][6].split("/");
                        script.scale = new mw.Vector(Number(Vectors[0]), Number(Vectors[1]), Number(Vectors[2]));
                        break;
                }
                if (script instanceof InteractObject) {
                    if (i != cfg.Scripts.length)
                        script.nextInteractGuid = nextGuid;
                    script.blockInteractNext = MyBoolean(cfg["Params" + i][0]);
                    script.own = MyBoolean(cfg["Params" + i][1]);
                    nextGuid = script.guid;
                }
            }
        }
    }
    getInteract(guid) {
        return InteractiveHelper.interactArr.find(i => i.guid === guid);
    }
    findInteract(playerID) {
        let interactArr = [];
        for (let i = 0; i < InteractiveHelper.interactArr.length; i++) {
            if (InteractiveHelper.interactArr[i].ownerPlayerIds.includes(playerID)) {
                interactArr.push(InteractiveHelper.interactArr[i]);
            }
        }
        return interactArr;
    }
    update(loc) {
        if (!loc)
            return;
        for (let i = 0; i < InteractiveHelper.interactLocArr.length; i++) {
            const interact = InteractiveHelper.interactLocArr[i];
            const script = interact.script;
            if (--script.interval.updateInterval <= 0) {
                const location = interact.location;
                if (script.isDynamic) {
                    location.set(interact.script.gameObject.worldTransform.position);
                }
                //let max = interact.activeDis * interact.activeDis;
                const distance = mw.Vector.distance(location, loc);
                const interval = Math.round(0.05 * distance);
                script.interval.updateInterval = interval > 1000 ? 1000 : interval < 5 ? 5 : interval;
                if (distance < interact.activeDis) {
                    if (script.onTrriger)
                        script.onStateTrriger();
                    else {
                        script.onTrriger = true;
                        script.onEnterTrriger();
                    }
                }
                else {
                    if (script.onTrriger) {
                        script.onTrriger = false;
                        script.onLeaveTrriger();
                    }
                }
            }
        }
    }
}
InteractMgr.isInit = false;
var InteractMgr$1 = InteractMgr;

var foreign60 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: InteractMgr$1
});

class InteractModuleClient extends ModuleC {
    constructor() {
        super(...arguments);
        this._updateIndex = 0;
        this.activeHandle = async (interact, flag) => {
            if (!interact)
                return;
            let err = null;
            if (interact.isClient == -1) {
                err = await this.server.net_ActiveHandle(interact.guid, flag, this.localPlayerId);
            }
            if (flag) {
                if (err != null) {
                    console.log("交互失败 error=" + err);
                }
                else {
                    // UIManager.show(InteractUtilUI, interact.gameObject)
                    this.playerAction(interact, this.localPlayerId, flag);
                    if (!StringUtil.isEmpty(interact.gameObject.tag)) {
                        InteractiveHelper.onPandoraAnalytics(interact.gameObject.gameObjectId, interact.gameObject.tag, true, interact.own);
                    }
                }
            }
            else {
                if (err != null) {
                    console.log("退出交互失败 error=" + err);
                }
                else {
                    this.playerAction(interact, this.localPlayerId, flag);
                    if (!StringUtil.isEmpty(interact.gameObject.tag)) {
                        InteractiveHelper.onPandoraAnalytics(interact.gameObject.gameObjectId, interact.gameObject.tag, false, true);
                    }
                }
            }
        };
        this.activeNextHandle = (interact, flag) => {
            if (interact.nextInteractGuid != "") {
                this.activeHandle(InteractMgr$1.instance.getInteract(interact.nextInteractGuid), flag);
            }
        };
    }
    onStart() {
        InteractMgr$1.instance.activeHandle = this.activeHandle;
        InteractMgr$1.instance.activeNextHandle = this.activeNextHandle;
    }
    onEnterScene(sceneType) {
        this.server.net_EnterScene();
        InteractMgr$1.instance.initInteract();
    }
    net_UnActiveInteract() {
        // CreditEventsC.endTimekeeper(CreditEvent.RP.Interact, 1);
        let interacts = InteractMgr$1.instance.findInteract(this.localPlayerId);
        if (interacts.length > 0) {
            for (const interact of interacts) {
                interact.logic.onPlayerAction(this.localPlayerId, false);
            }
        }
    }
    playerAction(interact, playerId, active) {
        interact.logic.onPlayerAction(playerId, active);
        if (interact.nextInteractGuid != "" && !interact.blockInteractNext) {
            this.playerAction(InteractMgr$1.instance.getInteract(interact.nextInteractGuid), playerId, active);
        }
    }
    onUpdate(dt) {
        if (++this._updateIndex % 5 != 0) {
            if (!this.localPlayer.character.worldTransform) {
                return;
            }
            this._playerLocation = this.localPlayer.character.worldTransform.position;
        }
        InteractMgr$1.instance.update(this._playerLocation);
    }
}

var foreign61 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InteractModuleClient: InteractModuleClient
});

let GameStart = class GameStart extends mw.Script {
    constructor() {
        super(...arguments);
        this.isOnline = false;
        this.isOpenGM = false;
        this.language = "-1";
    }
    onStart() {
        super.onStart();
        let sd = SystemUtil.isPIE ? true : !this.isOnline;
        DataStorage.setTemporaryStorage(sd);
        GameUtils.systemLanguageIndex = Number(this.language);
        // if (GameUtils.systemLanguageIndex == -1) {
        // 	GameUtils.systemLanguageIndex = this.getSystemLanguageIndex();
        // }
        if (SystemUtil.isClient()) {
            //初始化表格语言
            GameConfig.initLanguage(GameUtils.systemLanguageIndex, key => {
                if (!key)
                    return;
                let ele = GameConfig.SquareLanguage.getElement(key);
                if (ele == null)
                    return "unknow_" + key;
                return ele.Value;
            });
            //覆盖多语言获取日志，多语言调试开启日志
            // GameConfig.SquareLanguage["getElement"] = function (id: number | string) {
            // 	let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
            // 	if (ele == null) {
            // 		//console.error(this.constructor.name + "配置表中找不到元素 id:" + id);
            // 	}
            // 	return ele;
            // }
            mw.UIScript.addBehavior("lan", (ui) => {
                let key = ui.text;
                if (key) {
                    let data = GameUtils.getLanguage(key);
                    if (data) {
                        ui.text = data.info;
                        if (data.size > 0) {
                            ui.fontSize = data.size;
                        }
                    }
                }
            });
        }
        GlobalData.isOpenGM = this.isOpenGM;
        GlobalData.globalPos = this.gameObject.worldTransform.position;
        this.useUpdate = true;
        this.onRegisterModule();
        UIManager.addUILayerMap(mw.UILayerTop, 500000);
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        TweenUtil.TWEEN.update();
        BuffMgr$1.instance.onUpdate(dt);
    }
    //当注册模块
    async onRegisterModule() {
        // //注册模块
        ModuleService.registerModule(GameModuleS, GameModuleC, null); //负责大厅的一些UI点击
        ModuleService.registerModule(PlayerModuleServer, PlayerModuleClient, null);
        ModuleService.registerModule(ActionModuleS, ActionModuleC, null);
        ModuleService.registerModule(InteractModuleServer, InteractModuleClient, null);
        ModuleService.registerModule(BoardMoculeS, BoardModuleC, null);
        ModuleService.registerModule(FenceModuleS, FenceModuleC, null);
        ModuleService.registerModule(TyphoonS, TyphoonC, null);
    }
};
__decorate([
    mw.Property()
], GameStart.prototype, "isOnline", void 0);
__decorate([
    mw.Property({ displayName: "是否打开GM" })
], GameStart.prototype, "isOpenGM", void 0);
__decorate([
    mw.Property({ displayName: "多语言", selectOptions: { default: "-1", en: "0", zh: "1" } })
], GameStart.prototype, "language", void 0);
GameStart = __decorate([
    Component
], GameStart);
var GameStart$1 = GameStart;

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

/**
 * 额外注意修改项：
 * 1.lockTargetOffset属性已经改为接口参数了，需要这样加上Camera.currentCamera.lock({offset: })
 */
class ModifiedCameraSystem {
    /**
     * @description 获取摄像机位置模式
     */
    static get cameraLocationMode() {
        if (!SystemUtil.isClient()) {
            return;
        }
        return Camera.currentCamera.positionMode;
    }
    /**
     * @description 设置摄像机位置模式
     */
    static set cameraLocationMode(newCameraLocationMode) {
        if (!SystemUtil.isClient()) {
            return;
        }
        let tempTransform = Camera.currentCamera.springArm.localTransform;
        Camera.currentCamera.positionMode = newCameraLocationMode;
        if (newCameraLocationMode == CameraPositionMode.PositionFollow) {
            Camera.currentCamera.parent = Player.localPlayer.character;
            Camera.currentCamera.springArm.localTransform = tempTransform;
        }
    }
    static setCameraFollowTarget(target) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = target;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static cancelCameraFollowTarget() {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = Player.localPlayer.character;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static setOverrideCameraRotation(newOverrideRotation) {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = true;
        ModifiedCameraSystem.followRotationValue = newOverrideRotation;
        Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
        if (!ModifiedCameraSystem.isBind) {
            TimeUtil.onEnterFrame.add(() => {
                if (ModifiedCameraSystem.followEnable) {
                    Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
                }
            }, this);
            ModifiedCameraSystem.isBind = true;
        }
    }
    static resetOverrideCameraRotation() {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = false;
    }
    static getCurrentSettings() {
        if (!SystemUtil.isClient())
            return;
        cameraSystemConfig.cameraRelativeTransform = Camera.currentCamera.localTransform;
        cameraSystemConfig.cameraWorldTransform = Camera.currentCamera.worldTransform;
        cameraSystemConfig.targetArmLength = Camera.currentCamera.springArm.length;
        cameraSystemConfig.enableCameraLocationLag = Camera.currentCamera.positionLagEnabled;
        cameraSystemConfig.cameraLocationLagSpeed = Camera.currentCamera.positionLagSpeed;
        cameraSystemConfig.enableCameraRotationLag = Camera.currentCamera.rotationLagEnabled;
        cameraSystemConfig.cameraRotationLagSpeed = Camera.currentCamera.rotationLagSpeed;
        cameraSystemConfig.cameraFOV = Camera.currentCamera.fov;
        cameraSystemConfig.cameraLocationMode = Camera.currentCamera.positionMode;
        cameraSystemConfig.cameraRotationMode = Camera.currentCamera.rotationMode;
        cameraSystemConfig.enableCameraCollision = Camera.currentCamera.springArm.collisionEnabled;
        cameraSystemConfig.cameraUpLimitAngle = Camera.currentCamera.upAngleLimit;
        cameraSystemConfig.cameraDownLimitAngle = Camera.currentCamera.downAngleLimit;
        return cameraSystemConfig;
    }
    static applySettings(CameraSetting) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.localTransform = CameraSetting.cameraRelativeTransform;
        Camera.currentCamera.springArm.length = CameraSetting.targetArmLength;
        Camera.currentCamera.positionLagEnabled = CameraSetting.enableCameraLocationLag;
        Camera.currentCamera.positionLagSpeed = CameraSetting.cameraLocationLagSpeed;
        Camera.currentCamera.rotationLagEnabled = CameraSetting.enableCameraRotationLag;
        Camera.currentCamera.rotationLagSpeed = CameraSetting.cameraRotationLagSpeed;
        Camera.currentCamera.fov = CameraSetting.cameraFOV;
        ModifiedCameraSystem.cameraLocationMode = CameraSetting.cameraLocationMode;
        Camera.currentCamera.rotationMode = CameraSetting.cameraRotationMode;
        Camera.currentCamera.springArm.collisionEnabled = CameraSetting.enableCameraCollision;
        Camera.currentCamera.upAngleLimit = CameraSetting.cameraUpLimitAngle;
        Camera.currentCamera.downAngleLimit = CameraSetting.cameraDownLimitAngle;
    }
    static cameraFocusing(targetArmLength, targetOffset, timeInterval = 20) {
        if (!SystemUtil.isClient())
            return;
        let timer = TimeUtil.onEnterFrame.add(() => {
            let interpolationValue = Camera.currentCamera.springArm.length + (targetArmLength - Camera.currentCamera.springArm.length) / timeInterval;
            Camera.currentCamera.springArm.length = interpolationValue;
            if (Math.abs(Camera.currentCamera.springArm.length - targetArmLength) <= 0.5) {
                TimeUtil.onEnterFrame.remove(timer);
            }
        });
    }
    static startCameraShake(shakeData) {
        if (!SystemUtil.isClient())
            return;
        let info = {
            rotationYAmplitude: shakeData.rotYawOscillation.amplitude,
            rotationYFrequency: shakeData.rotYawOscillation.frequency,
            rotationZAmplitude: shakeData.rotRollOscillation.amplitude,
            rotationZFrequency: shakeData.rotRollOscillation.frequency,
            rotationXAmplitude: shakeData.rotPitchOscillation.amplitude,
            rotationXFrequency: shakeData.rotPitchOscillation.frequency,
            positionXAmplitude: shakeData.locXOscillation.amplitude,
            positionXFrequency: shakeData.locXOscillation.frequency,
            positionYAmplitude: shakeData.locYOscillation.amplitude,
            positionYFrequency: shakeData.locYOscillation.frequency,
            positionZAmplitude: shakeData.locZOscillation.amplitude,
            positionZFrequency: shakeData.locZOscillation.frequency,
        };
        Camera.shake(info);
    }
    static stopCameraShake() {
        if (!SystemUtil.isClient())
            return;
        Camera.stopShake();
    }
    static getDefaultCameraShakeData() {
        const defaultOscillator = {
            amplitude: 0,
            frequency: 0,
            waveform: CameraModifid.EOscillatorWaveform.SineWave,
        };
        const defaultCameraShakeData = {
            rotPitchOscillation: { ...defaultOscillator },
            rotYawOscillation: { ...defaultOscillator },
            rotRollOscillation: { ...defaultOscillator },
            locXOscillation: { ...defaultOscillator },
            locYOscillation: { ...defaultOscillator },
            locZOscillation: { ...defaultOscillator },
            fovOscillation: { ...defaultOscillator },
        };
        return defaultCameraShakeData;
    }
}
ModifiedCameraSystem.isBind = false;
ModifiedCameraSystem.followTargetEnable = true;
ModifiedCameraSystem.followTargetInterpSpeed = 15;
var CameraModifid;
(function (CameraModifid) {
    (function (EOscillatorWaveform) {
        /** 正弦波 */
        EOscillatorWaveform[EOscillatorWaveform["SineWave"] = 0] = "SineWave";
        /** Perlin噪声 */
        EOscillatorWaveform[EOscillatorWaveform["PerlinNoise"] = 1] = "PerlinNoise";
    })(CameraModifid.EOscillatorWaveform || (CameraModifid.EOscillatorWaveform = {}));
})(CameraModifid || (CameraModifid = {}));
const cameraSystemConfig = {
    cameraRelativeTransform: Transform.identity,
    cameraWorldTransform: Transform.identity,
    targetArmLength: 400,
    enableCameraLocationLag: false,
    cameraLocationLagSpeed: 10,
    enableCameraRotationLag: false,
    cameraRotationLagSpeed: 10,
    cameraFOV: 90,
    cameraLocationMode: CameraPositionMode.PositionFollow,
    cameraRotationMode: CameraRotationMode.RotationControl,
    enableCameraCollision: true,
    cameraUpLimitAngle: 40,
    cameraDownLimitAngle: -40,
};

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get CameraModifid () { return CameraModifid; },
    ModifiedCameraSystem: ModifiedCameraSystem
});

/**角色动作 */
class CharAction {
    constructor() {
        this._isPlaying = false;
    }
    async init(char, cfgId) {
        this.owner = char;
        this.cfgId = cfgId;
        let cfg = GameConfig.Action.getElement(cfgId);
        if (cfg) {
            if (cfg.animationGuid) {
                if (!AssetUtil.assetLoaded(cfg.animationGuid.toString())) {
                    await AssetUtil.asyncDownloadAsset(cfg.animationGuid.toString());
                }
                this.animation = PlayerManagerExtesion.loadAnimationExtesion(this.owner, cfg.animationGuid.toString(), true);
                this.animation.loop = cfg.times;
                this.animation.slot = cfg.animationSlot;
                this.animation.speed = cfg.animationRate;
                if (cfg.times > 0) {
                    this.animation.onFinish.add(() => {
                        // oTraceError("动画播放完毕 cfgId", cfgId);
                        ActionMgr.stopAction(cfgId, this.owner.gameObjectId);
                    });
                }
            }
            if (cfg.stanceGuid) {
                if (!AssetUtil.assetLoaded(cfg.stanceGuid.toString())) {
                    await AssetUtil.asyncDownloadAsset(cfg.stanceGuid.toString());
                }
                this.stance = PlayerManagerExtesion.loadStanceExtesion(this.owner, cfg.stanceGuid.toString(), true);
                //配置的是1-3，实际是0-2
                if (cfg.stanceSlot > 0) {
                    this.stance.blendMode = cfg.stanceSlot - 1;
                }
            }
        }
        if (this._isPlaying) {
            this.play();
        }
    }
    stop() {
        // oTraceError("--------->停止播放动画", this.cfgId);
        ActionMgr.stopFlag = Date.now();
        if (this.stance) {
            this.stance.stop();
        }
        if (this.animation) {
            this.animation.stop();
            this.owner["ueCharacter"]["StopAnimMontage"]();
        }
        this._isPlaying = false;
    }
    /**
     * 播放
     */
    play(cb = null) {
        ActionMgr.stopFlag = 0;
        // oTraceError("--------->播放动画", this.cfgId, this.owner.displayName);
        this._isPlaying = true;
        if (this.stance) {
            this.stance.play();
        }
        if (this.animation && this.animation.isPlaying == false) {
            this.animation.play();
            this.animation.onFinish.add(() => {
                cb && cb();
            });
        }
    }
    get isPlaying() {
        if (this.stance) {
            return true;
        }
        if (this.animation) {
            return this.animation.isPlaying;
        }
        return false;
    }
}
class ActionMgr {
    /**动作同步事件发送定时器 */
    static playAction(cfgId, char = Player.localPlayer.character, cb = null) {
        const gid = char.gameObjectId;
        if (!this.allActonMap.has(gid)) {
            this.allActonMap.set(gid, { curAction: null, inteval: null, actions: [] });
        }
        const curAction = this.allActonMap.get(gid).curAction;
        // console.log("jkjkjkjkj1", cfgId, curAction?.ID)
        if (curAction && curAction.ID == cfgId) {
            return;
        }
        let cfg = GameConfig.Action.getElement(cfgId);
        if (cfg == null)
            return;
        if (curAction) {
            // if (curAction.priority > cfg.priority) {
            //     return;
            // }
            // else {
            this.getAction(curAction.ID, char).stop();
            this.allActonMap.get(gid).curAction = cfg;
            this.getAction(cfgId, char).play(cb);
            // }
        }
        else {
            this.allActonMap.get(gid).curAction = cfg;
            this.getAction(cfgId, char).play(cb);
        }
    }
    static getAction(cfgId, char = Player.localPlayer.character) {
        const gid = char.gameObjectId;
        let info = this.allActonMap.get(gid);
        let vec = info.actions;
        let action = vec.find(e => e.cfgId == cfgId);
        if (!action) {
            action = new CharAction();
            action.init(char, cfgId);
            vec.push(action);
            this.allActonMap.set(gid, info);
        }
        return action;
    }
    static stopAction(cfgId, gid = Player.localPlayer.userId) {
        if (!this.allActonMap.has(gid))
            return;
        let info = this.allActonMap.get(gid);
        // console.log("jkjkjkjkj2", cfgId, info && info.curAction.ID, cfgId)
        if (info.curAction && info.curAction.ID == cfgId) {
            this.getAction(cfgId, info.actions[0].owner).stop();
            info.curAction = null;
        }
        if (info.inteval)
            return;
        info.inteval = setInterval(() => {
            if (this.stopFlag == 0)
                return;
            if (Date.now() - this.stopFlag > 800) {
                Event.dispatchToLocal("ActionStop", gid);
                this.stopFlag = 0;
            }
        }, 1000);
    }
}
ActionMgr.allActonMap = new Map(); //gid
ActionMgr.stopFlag = 0;

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CharAction: CharAction,
    default: ActionMgr
});

class ActionMC extends ModuleC {
    onStart() {
    }
    onEnterScene(sceneType) {
        this.init();
        this.registerEvent();
    }
    init() {
    }
    /**
     * 注册事件
     */
    registerEvent() {
        Event.addLocalListener("ActionStop", (gid) => {
            this.stopAnimationClient(gid);
        });
    }
    /**
     * 播放动画
    */
    playAction(ele, char = Player.localPlayer.character, cb = null) {
        ActionMgr.playAction(ele, char, cb);
    }
    net_playAction(id, gid) {
        let player = Player.localPlayer.userId === gid;
        if (player) {
            ActionMgr.playAction(id);
        }
        else {
            GameObject.asyncFindGameObjectById(gid).then(o => {
                const ch = o;
                ActionMgr.playAction(id, ch);
            });
        }
    }
    /**
     * 停止当前正在播放的动画
     */
    stopAction(id, gid) {
        ActionMgr.stopAction(id, gid);
    }
    net_stopAction(ids, gid) {
        ids.forEach(id => {
            ActionMgr.stopAction(id, gid);
        });
    }
    net_stopPlayAnimationUe(gid) {
        let player = Player.localPlayer.userId === gid;
        if (player) {
            Player.localPlayer.character["ueCharacter"]["StopAnimMontage"]();
        }
        else {
            GameObject.asyncFindGameObjectById(gid).then(o => {
                const ch = o;
                ch["ueCharacter"]["StopAnimMontage"]();
            });
        }
    }
    stopAnimationClient(gid) {
        this.server.net_stopPlayAnimationUe(gid);
    }
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
}

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ActionMC
});

class ActionMS extends ModuleS {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
    }
    net_stopPlayAnimationUe(gid) {
        this.getAllClient().net_stopPlayAnimationUe(gid);
    }
    stopAction(ids, gid) {
        this.getAllClient().net_stopAction(ids, gid);
    }
    playAction(id, gid) {
        this.getAllClient().net_playAction(id, gid);
    }
}

var foreign24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ActionMS
});

let BoardWorldUI_generate = class BoardWorldUI_generate extends UIScript {
    get canvasNow() {
        if (!this.canvasNow_Internal && this.uiWidgetBase) {
            this.canvasNow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasNow');
        }
        return this.canvasNow_Internal;
    }
    get textNowProgress() {
        if (!this.textNowProgress_Internal && this.uiWidgetBase) {
            this.textNowProgress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasNow/textNowProgress');
        }
        return this.textNowProgress_Internal;
    }
    get imageBoard() {
        if (!this.imageBoard_Internal && this.uiWidgetBase) {
            this.imageBoard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasNow/imageBoard');
        }
        return this.imageBoard_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.textNowProgress);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
BoardWorldUI_generate = __decorate([
    UIBind('UI/board/BoardWorldUI.ui')
], BoardWorldUI_generate);
var BoardWorldUI_generate$1 = BoardWorldUI_generate;

var foreign86 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BoardWorldUI_generate$1
});

class BoardWorldUI extends BoardWorldUI_generate$1 {
    /** 设置当前进度 */
    setNowProgress(str) {
        this.textNowProgress.text = str;
    }
}

var foreign29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BoardWorldUI
});

let BoardCount = class BoardCount extends mw.Script {
    constructor() {
        super(...arguments);
        this.textNowProgress = "0/" + GlobalData.FenceNum;
        //#endregion
    }
    onStart() {
        if (SystemUtil.isClient()) {
            this.initClient();
        }
    }
    onTextNowProgressChanged() {
        if (!this._worldUI) {
            return;
        }
        this._worldUI.setNowProgress(this.textNowProgress);
    }
    async initClient() {
        let ui = await mw.UIWidget.findGameObjectById("1D63BBBD");
        this._worldUI = UIManager.create(BoardWorldUI);
        ui.setTargetUIWidget(this._worldUI.uiObject);
    }
};
__decorate([
    mw.Property({ replicated: true, onChanged: "onTextNowProgressChanged" })
], BoardCount.prototype, "textNowProgress", void 0);
BoardCount = __decorate([
    Component
], BoardCount);
var BoardCount$1 = BoardCount;

var foreign25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BoardCount$1
});

//时间延迟
let ActiveDelay = class ActiveDelay extends InteractObject {
    constructor() {
        super(...arguments);
        this.delay = 1;
    }
    onStart() {
        this.init(ActiveDelay_S, ActiveDelay_C);
    }
};
__decorate([
    mw.Property({ displayName: "延迟(秒)", group: "属性" })
], ActiveDelay.prototype, "delay", void 0);
ActiveDelay = __decorate([
    Component
], ActiveDelay);
var ActiveDelay$1 = ActiveDelay;
//客户端
class ActiveDelay_C extends InteractLogic_C {
    constructor() {
        super(...arguments);
        this.startTime = 0;
    }
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (active) {
            this.startTime = mw.TimeUtil.elapsedTime();
            this.param = param;
            this.useUpdate = true;
        }
        else {
            this.useUpdate = false; //中途停止
            InteractMgr$1.instance.activeNextHandle(this.info, false, this.param);
        }
    }
    onUpdate(dt) {
        if (mw.TimeUtil.elapsedTime() - this.startTime >= this.info.delay) {
            this.useUpdate = false;
            InteractMgr$1.instance.activeNextHandle(this.info, true, this.param);
        }
    }
}
//服务端
class ActiveDelay_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign39 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ActiveDelay$1
});

let SP_Camera = class SP_Camera extends InteractObject {
    onStart() {
        this.init(SP_Camera_S, SP_Camera_C);
    }
};
SP_Camera = __decorate([
    Component
], SP_Camera);
var SP_Camera$1 = SP_Camera;
class SP_Camera_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        const character = Player.getPlayer(playerId).character;
        const camera = Camera.currentCamera;
        const location = character.worldTransform.position;
        if (active) {
            this._oldWorldRotation = character.worldTransform.rotation;
            camera.positionMode = mw.CameraPositionMode.PositionFixed;
            ModifiedCameraSystem.followTargetEnable = false;
            camera.springArm.collisionEnabled = false;
            const transform = camera.worldTransform.clone();
            transform.position = location;
            camera.springArm.localTransform = new mw.Transform(transform);
        }
        else {
            ModifiedCameraSystem.followTargetEnable = true;
            camera.springArm.collisionEnabled = true;
            camera.positionMode = mw.CameraPositionMode.PositionFollow;
            const transform = camera.localTransform.clone();
            camera.springArm.localTransform = new mw.Transform(transform);
            ModifiedCameraSystem.setOverrideCameraRotation(this._oldWorldRotation); //将相机与玩家方向一致
            setTimeout(() => {
                ModifiedCameraSystem.resetOverrideCameraRotation();
            }, 10);
        }
    }
}
//服务端
class SP_Camera_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign42 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_Camera$1
});

/**触发模式 */
var Mode$2;
(function (Mode) {
    /**随机*/
    Mode["Random"] = "random";
    /**循环*/
    Mode["Loop"] = "loop"; //循环
})(Mode$2 || (Mode$2 = {}));
/**
 * 交互物-输出参数
 * 作用：上个节点触发后，将本节点设置的参数队列按照一定规则传递给后续节点
 */
let SP_InputParams = class SP_InputParams extends InteractObject {
    constructor() {
        super(...arguments);
        this.itemList = "";
        this.mode = Mode$2.Loop;
    }
    onStart() {
        this.init(InputParams_S, InputParams_C);
    }
};
__decorate([
    mw.Property({ displayName: "参数列表", group: "属性" }) //,分隔 ‘null’代表null
], SP_InputParams.prototype, "itemList", void 0);
__decorate([
    mw.Property({ displayName: "模式", selectOptions: { "循环": Mode$2.Loop, "随机": Mode$2.Random }, group: "属性" })
], SP_InputParams.prototype, "mode", void 0);
SP_InputParams = __decorate([
    Component
], SP_InputParams);
var SP_InputParams$1 = SP_InputParams;
//客户端
class InputParams_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class InputParams_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.itemArr = null;
        this.currentIndex = -1; //当前索引
    }
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (!active) {
            InteractMgr$1.instance.activeNextHandle(this.info, active, param);
            return;
        }
        if (this.itemArr == null) {
            if (mw.StringUtil.isEmpty(this.info.itemList)) {
                this.itemArr = [];
            }
            else {
                this.itemArr = this.info.itemList.split(',');
                for (let i = 0; i < this.itemArr.length; i++) {
                    if (this.itemArr[i] == 'null') {
                        this.itemArr[i] = null;
                    }
                }
            }
        }
        if (this.itemArr.length == 0) {
            InteractMgr$1.instance.activeNextHandle(this.info, active, null);
        }
        else {
            if (this.info.mode == Mode$2.Random) {
                this.currentIndex = mw.MathUtil.randomInt(0, this.itemArr.length);
            }
            else {
                this.currentIndex = (this.currentIndex + 1) % this.itemArr.length;
            }
            InteractMgr$1.instance.activeNextHandle(this.info, active, this.itemArr[this.currentIndex]);
        }
    }
}

var foreign43 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_InputParams$1
});

/**触发模式 */
var Mode$1;
(function (Mode) {
    /**自变化*/
    Mode["Alone"] = "alone";
    /**依赖变化*/
    Mode["Depend"] = "depend"; //依赖变化,上级激活ping 上级不激活pong
})(Mode$1 || (Mode$1 = {}));
//PingPong运动，实现从初始状态到初始状态+偏移的往复运动，是两种状态的切换，不能做往返运动，如果想做往返运动请使用sp_sin
let PingPong = class PingPong extends InteractObject {
    constructor() {
        super(...arguments);
        this.mode = Mode$1.Depend;
        this.defauleAlpha = 0;
        this.speed = 1; //速度
        this.locationOff_ping = mw.Vector.zero;
        this.rotationOff_ping = mw.Vector.zero;
        this.locationOff_pong = mw.Vector.zero;
        this.rotationOff_pong = mw.Vector.zero;
    }
    onStart() {
        this.init(PingPong_S, PingPong_C);
    }
};
__decorate([
    mw.Property({ displayName: "变化模式", selectOptions: { "自变化": Mode$1.Alone, "依赖变化": Mode$1.Depend }, group: "属性" })
], PingPong.prototype, "mode", void 0);
__decorate([
    mw.Property({ displayName: "默认alpha(0-1)", group: "属性" })
], PingPong.prototype, "defauleAlpha", void 0);
__decorate([
    mw.Property({ displayName: "alpha速度", group: "属性" }) //一个ping或者一个pong所需要的时间(秒)
], PingPong.prototype, "speed", void 0);
__decorate([
    mw.Property({ displayName: "ping坐标偏移", group: "属性" })
], PingPong.prototype, "locationOff_ping", void 0);
__decorate([
    mw.Property({ displayName: "ping角度偏移", group: "属性" })
], PingPong.prototype, "rotationOff_ping", void 0);
__decorate([
    mw.Property({ displayName: "pong坐标偏移", group: "属性" })
], PingPong.prototype, "locationOff_pong", void 0);
__decorate([
    mw.Property({ displayName: "pong角度偏移", group: "属性" })
], PingPong.prototype, "rotationOff_pong", void 0);
PingPong = __decorate([
    Component
], PingPong);
var PingPong$1 = PingPong;
class PingPong_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class PingPong_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.SPEED = 1; //速度
        this.targetAlpha = -1; //目标aloha(0到1) -1:不动
        this.alpha = 0;
        this.handleTimes = 0;
        this._lerpPos = mw.Vector.zero;
        this._lerpRot = mw.Vector.zero;
    }
    onStart() {
        this.SPEED = this.info.speed;
        this.locationOff_ping = this.info.locationOff_ping;
        this.rotationOff_ping = this.info.rotationOff_ping;
        this.locationOff_pong = this.info.locationOff_pong;
        this.rotationOff_pong = this.info.rotationOff_pong;
        this.originalLocation = this.gameObject.localTransform.position;
        let ro = this.gameObject.localTransform.rotation;
        this.originalRotation = new mw.Vector(ro.x, ro.y, ro.z);
        this.setAlpha(this.info.defauleAlpha);
    }
    //激活执行ping 不激活执行pong
    onPlayerAction(playerId, active) {
        if (this.info.mode == Mode$1.Depend) {
            active ? this.ping() : this.pong();
        }
        else {
            if (active) {
                ++this.handleTimes % 2 == 1 ? this.ping() : this.pong();
            }
            else {
                this.setAlpha(this.info.defauleAlpha);
            }
        }
    }
    setAlpha(value) {
        if (value < 0 || value > 1)
            return;
        this.targetAlpha = value;
        this.useUpdate = true;
    }
    ping() {
        this.targetAlpha = 1;
        this.useUpdate = true;
    }
    pong() {
        this.targetAlpha = 0;
        this.useUpdate = true;
    }
    onUpdate(dt) {
        if (this.alpha < this.targetAlpha) {
            this.alpha += dt * this.SPEED;
            if (this.alpha >= this.targetAlpha) {
                this.alpha = this.targetAlpha;
                this.useUpdate = false;
            }
        }
        else {
            this.alpha -= dt * this.SPEED;
            if (this.alpha <= this.targetAlpha) {
                this.alpha = this.targetAlpha;
                this.useUpdate = false;
            }
        }
        mw.Vector.lerp(this.locationOff_pong, this.locationOff_ping, this.alpha, this._lerpPos);
        mw.Vector.lerp(this.rotationOff_pong, this.rotationOff_ping, this.alpha, this._lerpRot);
        targetPos$1.x = this.originalLocation.x + this._lerpPos.x;
        targetPos$1.y = this.originalLocation.y + this._lerpPos.y;
        targetPos$1.z = this.originalLocation.z + this._lerpPos.z;
        targetRot.x = this.originalRotation.x + this._lerpRot.x;
        targetRot.y = this.originalRotation.y + this._lerpRot.y;
        targetRot.z = this.originalRotation.z + this._lerpRot.z;
        this.gameObject.localTransform.position = (targetPos$1);
        this.gameObject.localTransform.rotation = (new mw.Rotation(targetRot));
    }
}
const targetPos$1 = mw.Vector.zero;
const targetRot = mw.Vector.zero;

var foreign45 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PingPong$1
});

let Rotate = class Rotate extends InteractObject {
    constructor() {
        super(...arguments);
        this.isRuning = true;
        this.speed = mw.Vector.zero;
    }
    onStart() {
        this.init(Rotate_S, Rotate_C);
    }
};
__decorate([
    mw.Property({ displayName: "启动", group: "属性" })
], Rotate.prototype, "isRuning", void 0);
__decorate([
    mw.Property({ displayName: "旋转速度", group: "属性" })
], Rotate.prototype, "speed", void 0);
Rotate = __decorate([
    Component
], Rotate);
var Rotate$1 = Rotate;
//客户端
class Rotate_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class Rotate_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this._multRot = mw.Vector.zero;
    }
    onStart() {
        this.rotation = this.gameObject.localTransform.rotation;
        this.useUpdate = this.info.isRuning;
    }
    onPlayerAction(playerId, active) {
        this.useUpdate = active;
    }
    onUpdate(dt) {
        mw.Vector.multiply(this.info.speed, dt, this._multRot);
        this.rotation = this.rotation.add(new mw.Rotation(this._multRot));
        this.gameObject.localTransform.rotation = (this.rotation);
    }
}

var foreign46 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Rotate$1
});

let SP_Sin = class SP_Sin extends InteractObject {
    constructor() {
        super(...arguments);
        this.isRuning = true;
        this.angleBegin = 0;
        this.angleSpeed = 360;
        this.location = mw.Vector.zero;
        this.rotation = mw.Vector.zero;
        this.stopReset = true;
    }
    onStart() {
        this.init(Sin_S, Sin_C);
    }
};
__decorate([
    mw.Property({ displayName: "默认激活", group: "属性" })
], SP_Sin.prototype, "isRuning", void 0);
__decorate([
    mw.Property({ displayName: "初始角度", group: "属性" })
], SP_Sin.prototype, "angleBegin", void 0);
__decorate([
    mw.Property({ displayName: "角速度", group: "属性" })
], SP_Sin.prototype, "angleSpeed", void 0);
__decorate([
    mw.Property({ displayName: "位置变化", group: "属性" })
], SP_Sin.prototype, "location", void 0);
__decorate([
    mw.Property({ displayName: "旋转变化", group: "属性" })
], SP_Sin.prototype, "rotation", void 0);
__decorate([
    mw.Property({ displayName: "停止重置", group: "属性" })
], SP_Sin.prototype, "stopReset", void 0);
SP_Sin = __decorate([
    Component
], SP_Sin);
var SP_Sin$1 = SP_Sin;
//客户端
class Sin_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class Sin_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.isRuning = true;
        this._multLoc = mw.Vector.zero;
    }
    onStart() {
        this.isRuning = this.info.isRuning;
        this.angle = this.info.angleBegin;
        this.originalLocation = this.gameObject.localTransform.position;
        this.originalRotation = this.gameObject.localTransform.rotation;
        this.refreshAngle();
        this.useUpdate = true;
    }
    onPlayerAction(playerId, isActive) {
        if (this.isRuning != isActive) {
            this.isRuning ? this.stop() : this.play();
        }
    }
    play() {
        this.isRuning = true;
    }
    stop() {
        this.isRuning = false;
        if (this.info.stopReset) {
            this.angle = this.info.angleBegin;
            this.refreshAngle();
        }
    }
    onUpdate(dt) {
        if (!this.isRuning)
            return;
        this.angle += this.info.angleSpeed * dt;
        this.refreshAngle();
    }
    refreshAngle() {
        let alpha = Math.sin(this.angle * Math.PI / 180);
        mw.Vector.multiply(this.info.location, alpha, this._multLoc);
        targetPos.x = this.originalLocation.x + this._multLoc.x;
        targetPos.y = this.originalLocation.y + this._multLoc.y;
        targetPos.z = this.originalLocation.z + this._multLoc.z;
        mw.Vector.add(this.originalLocation, mw.Vector.multiply(this.info.location, alpha));
        this.gameObject.localTransform.position = (targetPos);
        let rotation = mw.Rotation.zero;
        mw.Rotation.add(this.originalRotation, (new mw.Rotation(mw.Vector.multiply(this.info.rotation, alpha))), rotation);
        this.gameObject.localTransform.rotation = (rotation);
    }
}
const targetPos = mw.Vector.zero;

var foreign47 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_Sin$1
});

let SP_ShowQTE = 
/**
 * 交互物-QTE
 * 作用：展示、隐藏配置标记的外部的QTE玩法
 */
class SP_ShowQTE extends InteractObject {
    constructor() {
        super(...arguments);
        this.QTEName = "";
    }
    onStart() {
        this.init(ShowQTE_S, ShowQTE_C);
    }
};
__decorate([
    mw.Property({ displayName: "QTE名", group: "属性" })
], SP_ShowQTE.prototype, "QTEName", void 0);
SP_ShowQTE = __decorate([
    Component
    /**
     * 交互物-QTE
     * 作用：展示、隐藏配置标记的外部的QTE玩法
     */
], SP_ShowQTE);
var SP_ShowQTE$1 = SP_ShowQTE;
//服务端
class ShowQTE_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (active) {
            InteractiveHelper.showQTEGame(this.info.QTEName, (res) => {
            }, this.gameObject);
        }
        else {
            InteractiveHelper.hideQTEGame(this.info.QTEName);
        }
    }
}
//服务端
class ShowQTE_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign52 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_ShowQTE$1
});

let SP_ShowSelectUI = class SP_ShowSelectUI extends InteractObject {
    constructor() {
        super(...arguments);
        this.itemList = "";
    }
    onStart() {
        this.init(ShowSelectUI_S, ShowSelectUI_C);
    }
};
__decorate([
    mw.Property({ displayName: "选项信息", group: "属性" }) //id表示法：ico:id,ico:id,...    索引表示法：ico,ico...
], SP_ShowSelectUI.prototype, "itemList", void 0);
SP_ShowSelectUI = __decorate([
    Component
], SP_ShowSelectUI);
var SP_ShowSelectUI$1 = SP_ShowSelectUI;
//服务端
class ShowSelectUI_C extends InteractLogic_C {
    constructor() {
        super(...arguments);
        this.itemId = [];
        this.itemIndex = [];
    }
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (active) {
            let icoList = [];
            let itemList = this.info.itemList.split(',');
            for (let i = 0; i < itemList.length; i++) {
                let item = itemList[i].split(':');
                icoList.push(item[0]);
                if (item.length == 2) {
                    this.itemId.push(item[1]);
                }
                else {
                    this.itemIndex.push(i);
                }
            }
            if (icoList.length == 0) {
                console.log("ShowSelectUI_C->net_showUI:缺少数据");
            }
            else if (this.itemId.length > 0 && this.itemIndex.length > 0) {
                console.log("ShowSelectUI_C->net_showUI:两种方法不能混用");
            }
            else {
                InteractiveHelper.showSelectUI(icoList, (select) => {
                    this.itemId.length > 0 ? this.itemId[select] : this.itemIndex[select];
                    InteractMgr$1.instance.activeNextHandle(this.info, true);
                });
            }
        }
        else {
            InteractiveHelper.hideSelectUI();
        }
    }
}
//服务端
class ShowSelectUI_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}

var foreign53 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_ShowSelectUI$1
});

//开关形式的交互物
let SP_TouchScreen = class SP_TouchScreen extends InteractObject {
    onStart() {
        this.init(TouchScreen_S, TouchScreen_C);
    }
};
SP_TouchScreen = __decorate([
    Component
], SP_TouchScreen);
var SP_TouchScreen$1 = SP_TouchScreen;
//客户端
class TouchScreen_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
        if (active) {
            InputManager.instance.onTouch.add(this.touchHandle, this);
        }
        else {
            InputManager.instance.onTouch.remove(this.touchHandle, this);
        }
    }
    touchHandle() {
        ModuleService.getModule(InteractModuleClient).activeNextHandle(this.info, true);
    }
}
//服务端
class TouchScreen_S extends InteractLogic_S {
    onStart() {
    }
    onPlayerAction(playerId, active) {
    }
}

var foreign54 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_TouchScreen$1
});

/**触发模式 */
var Mode;
(function (Mode) {
    /**自变化*/
    Mode["Alone"] = "alone";
    /**依赖变化*/
    Mode["Depend"] = "depend"; //依赖变化,随上级控制器激或活关闭而切换状态
})(Mode || (Mode = {}));
//开关形式的交互物
/**
 * 交互物-显示、隐藏
 * 作用：显示或隐藏挂载的GameObject
 */
let SP_Visible = class SP_Visible extends InteractObject {
    constructor() {
        super(...arguments);
        this.defaultValue = true;
        this.mode = Mode.Alone;
    }
    onStart() {
        this.init(Visible_S, Visible_C);
    }
};
__decorate([
    mw.Property({ displayName: "默认显示", group: "属性" })
], SP_Visible.prototype, "defaultValue", void 0);
__decorate([
    mw.Property({ displayName: "变化模式", selectOptions: { "自变化": Mode.Alone, "依赖变化": Mode.Depend }, group: "属性" })
], SP_Visible.prototype, "mode", void 0);
SP_Visible = __decorate([
    Component
], SP_Visible);
var SP_Visible$1 = SP_Visible;
//客户端
class Visible_C extends InteractLogic_C {
    onStart() {
    }
    onPlayerAction(playerId, active, param) {
    }
}
//服务端
class Visible_S extends InteractLogic_S {
    onStart() {
        this.value = this.info.defaultValue;
        this.collision = this.gameObject.getCollision();
        this.setState(!this.value);
    }
    onPlayerAction(playerId, active) {
        this.setState(active);
    }
    setState(value) {
        this.gameObject.setVisibility(value ? mw.PropertyStatus.Off : mw.PropertyStatus.On);
        this.gameObject.setCollision(value ? mw.PropertyStatus.Off : this.collision);
    }
}

var foreign55 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SP_Visible$1
});

//交互物
let RP_PlayAniDouble = class RP_PlayAniDouble extends InteractObject {
    constructor() {
        super(...arguments);
        this.animation = "";
        this.time = 1;
        this.loopNum = 0;
        this.lookAtOff = mw.Vector.zero;
        this.moveJumpEnable = false;
    }
    onStart() {
        this.init(PlayAniDouble_S, PlayAniDouble_C);
    }
};
__decorate([
    mw.Property({ displayName: "动作ID", group: "属性" })
], RP_PlayAniDouble.prototype, "animation", void 0);
__decorate([
    mw.Property({ displayName: "动作速度，默认1", group: "属性" })
], RP_PlayAniDouble.prototype, "time", void 0);
__decorate([
    mw.Property({ displayName: "循环次数", group: "属性" })
], RP_PlayAniDouble.prototype, "loopNum", void 0);
__decorate([
    mw.Property({ displayName: "世界旋转", group: "属性" })
], RP_PlayAniDouble.prototype, "lookAtOff", void 0);
__decorate([
    mw.Property({ displayName: "可移动跳跃", group: "属性" })
], RP_PlayAniDouble.prototype, "moveJumpEnable", void 0);
RP_PlayAniDouble = __decorate([
    Component
], RP_PlayAniDouble);
var RP_PlayAniDouble$1 = RP_PlayAniDouble;
//客户端
class PlayAniDouble_C extends InteractLogic_C {
    onPlayerAction(playerId, active, param) {
        // const location = this.gameObject.worldTransform.position
        // const movLocation = new mw.Vector(location.x, location.y, Player.localPlayer.character.worldTransform.position.z)
        // Player.localPlayer.character.worldTransform.position = movLocation
    }
    onStart() {
        GameUtils.downAsset(this.info.animation);
    }
}
//服务端
class PlayAniDouble_S extends InteractLogic_S {
    constructor() {
        super(...arguments);
        this.playerList = new Map();
        this.playerArr = [];
        this.animation = [];
        this.num = 0;
    }
    onStart() {
        this.lookAtRot = new mw.Rotation(this.info.lookAtOff);
        this.animation = this.info.animation.split(',');
        Player.onPlayerLeave.add((player) => {
            try {
                this.removePlayer(player);
            }
            catch (e) {
            }
        });
        this.num = 0;
    }
    onPlayerAction(playerId, active) {
        if (mw.StringUtil.isEmpty(this.info.animation))
            return;
        let player = Player.getPlayer(playerId);
        if (active) {
            this.addPlayer(player);
        }
        else {
            this.removePlayer(player);
        }
    }
    addPlayer(player) {
        if (!this.playerList.has(player.playerId)) {
            this.playerArr.push(player);
            this.playerList.set(player.playerId, player.character.worldTransform.rotation.clone());
            let char = player.character;
            char.worldTransform.rotation = this.lookAtRot.clone();
            let index = 0;
            this.num++;
            player.character.movementEnabled = player.character.jumpEnabled = false;
            if (this.num === 2) {
                this.playerArr.forEach((player) => {
                    const anim = PlayerManagerExtesion.loadAnimationExtesion(player.character, this.animation[index], true);
                    anim.loop = this.info.loopNum;
                    anim.speed = this.info.time;
                    anim.play();
                    index++;
                });
            }
            // else {
            //     console.log('--------------------@@@@@@@@@@@@@@');
            //     Tips.show(GameConfig.SquareLanguage.Text_Text_675.Value, player)
            // }
        }
    }
    removePlayer(player) {
        if (this.playerList.has(player.playerId)) {
            player.character.movementEnabled = player.character.jumpEnabled = true;
            this.playerArr.forEach((player) => {
                let index = this.playerArr.indexOf(player);
                PlayerManagerExtesion.loadAnimationExtesion(player.character, this.animation[index]).stop();
            });
            this.playerArr.splice(this.playerArr.indexOf(player), 1);
            this.num--;
            this.playerList.delete(player.playerId);
        }
    }
}

var foreign59 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RP_PlayAniDouble$1
});

let InteractUtil_generate = class InteractUtil_generate extends UIScript {
    get mPosX() {
        if (!this.mPosX_Internal && this.uiWidgetBase) {
            this.mPosX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPosX');
        }
        return this.mPosX_Internal;
    }
    get mPosY() {
        if (!this.mPosY_Internal && this.uiWidgetBase) {
            this.mPosY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPosY');
        }
        return this.mPosY_Internal;
    }
    get mPosZ() {
        if (!this.mPosZ_Internal && this.uiWidgetBase) {
            this.mPosZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPosZ');
        }
        return this.mPosZ_Internal;
    }
    get mObjPosX() {
        if (!this.mObjPosX_Internal && this.uiWidgetBase) {
            this.mObjPosX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mObjPosX');
        }
        return this.mObjPosX_Internal;
    }
    get mObjPosY() {
        if (!this.mObjPosY_Internal && this.uiWidgetBase) {
            this.mObjPosY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mObjPosY');
        }
        return this.mObjPosY_Internal;
    }
    get mObjPosZ() {
        if (!this.mObjPosZ_Internal && this.uiWidgetBase) {
            this.mObjPosZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mObjPosZ');
        }
        return this.mObjPosZ_Internal;
    }
    get mRotX() {
        if (!this.mRotX_Internal && this.uiWidgetBase) {
            this.mRotX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRotX');
        }
        return this.mRotX_Internal;
    }
    get mRotY() {
        if (!this.mRotY_Internal && this.uiWidgetBase) {
            this.mRotY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRotY');
        }
        return this.mRotY_Internal;
    }
    get mRotZ() {
        if (!this.mRotZ_Internal && this.uiWidgetBase) {
            this.mRotZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRotZ');
        }
        return this.mRotZ_Internal;
    }
    get mBtn() {
        if (!this.mBtn_Internal && this.uiWidgetBase) {
            this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn');
        }
        return this.mBtn_Internal;
    }
    get mID() {
        if (!this.mID_Internal && this.uiWidgetBase) {
            this.mID_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mID');
        }
        return this.mID_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        });
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        });
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn);
        //文本多语言
        this.setLanguage(this.mID);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
InteractUtil_generate = __decorate([
    UIBind('UI/InteractUtil.ui')
], InteractUtil_generate);
var InteractUtil_generate$1 = InteractUtil_generate;

var foreign87 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: InteractUtil_generate$1
});

/**
 * @Author       : meta
 * @Date         : 2023-07-13 11:19:18
 * @LastEditors  : meta
 * @LastEditTime : 2023-07-13 11:19:18
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\InteractUtilUI.ts
 * @Description  :
 */
class InteractUtilUI extends InteractUtil_generate$1 {
    onStart() {
        let loc = mw.Vector.zero;
        let objLoc = mw.Vector.zero;
        let rot = mw.Rotation.zero;
        this._character = Player.localPlayer.character;
        this.mBtn.onClicked.add(() => {
            loc.x = Number(this.mPosX.text);
            loc.y = Number(this.mPosY.text);
            loc.z = Number(this.mPosZ.text);
            objLoc.x = Number(this.mObjPosX.text);
            objLoc.y = Number(this.mObjPosY.text);
            objLoc.z = Number(this.mObjPosZ.text);
            rot.x = Number(this.mRotX.text);
            rot.y = Number(this.mRotY.text);
            rot.z = Number(this.mRotZ.text);
            // this._character.localTransform.position = loc
            this._interactObj.worldTransform.position = objLoc;
            this._interactObj.worldTransform.rotation = rot;
        });
    }
    onShow(interactObj) {
        this._interactObj = interactObj;
        this.mID.text = interactObj.name;
        this._oriObjLocation = this._interactObj.worldTransform.position.clone();
        this._oriRotation = this._interactObj.worldTransform.rotation.clone();
        this.mPosX.text = "0";
        this.mPosY.text = "0";
        this.mPosZ.text = "0";
        this.mObjPosX.text = this._oriObjLocation.x.toFixed(2).toString();
        this.mObjPosY.text = this._oriObjLocation.y.toFixed(2).toString();
        this.mObjPosZ.text = this._oriObjLocation.z.toFixed(2).toString();
        this.mRotX.text = this._oriRotation.x.toFixed(2).toString();
        this.mRotY.text = this._oriRotation.y.toFixed(2).toString();
        this.mRotZ.text = this._oriRotation.z.toFixed(2).toString();
    }
}

var foreign63 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    InteractUtilUI: InteractUtilUI
});

let InterHelperBuild = class InterHelperBuild {
    static init() {
        InteractiveHelper.addExitInteractiveListener = this.addExitInteractiveListener;
        InteractiveHelper.removeExitInteractiveListener = this.removeExitInteractiveListener;
        InteractiveHelper.showSelectUI = this.showSelectUI;
        InteractiveHelper.hideSelectUI = this.hideSelectUI;
        InteractiveHelper.showQTEGame = this.showQTEGame;
        InteractiveHelper.hideQTEGame = this.hideQTEGame;
        InteractiveHelper.activeConditions = this.activeConditions;
        InteractiveHelper.onPlayerAction = this.onPlayerAction;
        InteractiveHelper.onPlayInteract = this.onPlayInteract;
        InteractiveHelper.playInteractionEnable = this.playInteractionEnable;
        InteractiveHelper.onPandoraAnalytics = this.onPandoraAnalytics;
    }
    /**
     * 退出交互监听
     * @param type 类型 1-按钮退出 2-行走和跳跃退出
     * @param callback
     */
    static addExitInteractiveListener(type, callback) {
        ModuleService.getModule(GameModuleC).addExitInteractiveListener(type, callback);
    }
    //取消退出交互监听
    static removeExitInteractiveListener() {
        ModuleService.getModule(GameModuleC).removeExitInteractiveListener();
    }
    //显示选择UI(Client)
    static showSelectUI(icoList, selectCallback) {
    }
    //关闭选择UI(Client)
    static hideSelectUI() {
        //关闭
    }
    /**
     * 显示QTE小游戏(Client)
     * @param gameName 游戏名
     * @param callBack 返回成功失败的回调
     */
    static showQTEGame(gameName, callBack) {
    }
    static hideQTEGame(gameName) {
    }
    /**
     * 外部激活条件判断(Server)
     * @param param 自定义激活条件参数(就是SP_Active_Trigger喝SP_Active_UI中的“外部条件”)
     * @returns 是否激活
     */
    static activeConditions(param) {
        return true;
    }
    /**
     * 外部联动调用(Server)
     * @param playerId 玩家id
     * @param active 是否激活
     * @param activeParam 上个节点传递的参数
     * @param param 自定义参数(外部关联参数)
     */
    static onPlayerAction(playerId, active, param) {
        console.log(`外部关联 playerId=${playerId} active=${active}  param=${param} `);
        return true;
    }
    //设置一个玩家的交互状态(服务端)
    static onPlayInteract(player, state) {
        PlayerManager$1.instance.setPlayerState(PlayerStateType.Interaction, state, player);
    }
    //判断玩家当前的状态是否可以交互(服务器&客户端)
    static playInteractionEnable(player) {
        let id = null;
        if (typeof player === "number") {
            id = player;
        }
        else if (player) {
            id = player["getPlayerID"]();
        }
        if (id === null)
            return false;
        return PlayerManager$1.instance.playerIsFree();
    }
    /**
     * 潘多拉埋点(Client)
     * @param guid gameObject的guid
     * @param tag gameObject的tag
     * @param active 开始结束交互(true-开始 false-结束)
     * @param needExit 是否需要结束(如果为false，说明这个交互物没有退出)
     */
    static onPandoraAnalytics(guid, tag, active, needExit) {
    }
};
InterHelperBuild = __decorate([
    Decorator.autoExecute("init")
], InterHelperBuild);

var foreign64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get InterHelperBuild () { return InterHelperBuild; }
});

let AnnouncementUI_generate = class AnnouncementUI_generate extends UIScript {
    get mTextBlock() {
        if (!this.mTextBlock_Internal && this.uiWidgetBase) {
            this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock');
        }
        return this.mTextBlock_Internal;
    }
    get mTextBlock_1() {
        if (!this.mTextBlock_1_Internal && this.uiWidgetBase) {
            this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock_1');
        }
        return this.mTextBlock_1_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.mTextBlock);
        this.setLanguage(this.mTextBlock_1);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
AnnouncementUI_generate = __decorate([
    UIBind('UI/AnnouncementUI.ui')
], AnnouncementUI_generate);
var AnnouncementUI_generate$1 = AnnouncementUI_generate;

var foreign85 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: AnnouncementUI_generate$1
});

let HeadUI_generate = class HeadUI_generate extends UIScript {
    get styleCanvas() {
        if (!this.styleCanvas_Internal && this.uiWidgetBase) {
            this.styleCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas');
        }
        return this.styleCanvas_Internal;
    }
    get back() {
        if (!this.back_Internal && this.uiWidgetBase) {
            this.back_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/back');
        }
        return this.back_Internal;
    }
    get styleLeft() {
        if (!this.styleLeft_Internal && this.uiWidgetBase) {
            this.styleLeft_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/styleLeft');
        }
        return this.styleLeft_Internal;
    }
    get styleCenter() {
        if (!this.styleCenter_Internal && this.uiWidgetBase) {
            this.styleCenter_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/styleCenter');
        }
        return this.styleCenter_Internal;
    }
    get styleRight() {
        if (!this.styleRight_Internal && this.uiWidgetBase) {
            this.styleRight_Internal = this.uiWidgetBase.findChildByPath('Canvas/styleCanvas/styleRight');
        }
        return this.styleRight_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/Title"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/Name"));
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/Chat/Text"));
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
HeadUI_generate = __decorate([
    UIBind('UI/uiTemplate/Chat/HeadUI.ui')
], HeadUI_generate);
var HeadUI_generate$1 = HeadUI_generate;

var foreign94 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HeadUI_generate$1
});

let P_PropAction_generate = class P_PropAction_generate extends UIScript {
    get mBtn() {
        if (!this.mBtn_Internal && this.uiWidgetBase) {
            this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn');
        }
        return this.mBtn_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        });
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        });
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
P_PropAction_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/PropBase/P_PropAction.ui')
], P_PropAction_generate);
var P_PropAction_generate$1 = P_PropAction_generate;

var foreign103 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: P_PropAction_generate$1
});

let P_PropFly_generate = class P_PropFly_generate extends UIScript {
    get mBtn() {
        if (!this.mBtn_Internal && this.uiWidgetBase) {
            this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn');
        }
        return this.mBtn_Internal;
    }
    get mBtn2() {
        if (!this.mBtn2_Internal && this.uiWidgetBase) {
            this.mBtn2_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn2');
        }
        return this.mBtn2_Internal;
    }
    get mBtn3() {
        if (!this.mBtn3_Internal && this.uiWidgetBase) {
            this.mBtn3_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn3');
        }
        return this.mBtn3_Internal;
    }
    get forbidden() {
        if (!this.forbidden_Internal && this.uiWidgetBase) {
            this.forbidden_Internal = this.uiWidgetBase.findChildByPath('Canvas/forbidden');
        }
        return this.forbidden_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        });
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        });
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mBtn2.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn2");
        });
        this.mBtn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn2");
        });
        this.mBtn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn2");
        });
        this.mBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mBtn3.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn3");
        });
        this.mBtn3.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn3");
        });
        this.mBtn3.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn3");
        });
        this.mBtn3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn);
        this.setLanguage(this.mBtn2);
        this.setLanguage(this.mBtn3);
        //文本多语言
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
P_PropFly_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/PropBase/P_PropFly.ui')
], P_PropFly_generate);
var P_PropFly_generate$1 = P_PropFly_generate;

var foreign104 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: P_PropFly_generate$1
});

let P_PropPlace_generate = class P_PropPlace_generate extends UIScript {
    get mBtn() {
        if (!this.mBtn_Internal && this.uiWidgetBase) {
            this.mBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn');
        }
        return this.mBtn_Internal;
    }
    get mImg() {
        if (!this.mImg_Internal && this.uiWidgetBase) {
            this.mImg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImg');
        }
        return this.mImg_Internal;
    }
    get mText() {
        if (!this.mText_Internal && this.uiWidgetBase) {
            this.mText_Internal = this.uiWidgetBase.findChildByPath('Canvas/mText');
        }
        return this.mText_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        });
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        });
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        });
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        //按钮添加点击
        // 初始化多语言
        this.initLanguage();
    }
    initLanguage() {
        //按钮多语言
        this.setLanguage(this.mBtn);
        //文本多语言
        this.setLanguage(this.mText);
    }
    setLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    /**
    * 设置显示时触发
    */
    show(...params) {
        UIService.showUI(this, this.layer, ...params);
    }
    /**
    * 设置不显示时触发
    */
    hide() {
        UIService.hideUI(this);
    }
    onStart() { }
    ;
    onShow(...params) { }
    ;
    onHide() { }
    ;
    onUpdate(dt) { }
    onPause() { }
    onResume() { }
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent) {
        parent.addChild(this.uiObject);
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size);
    }
};
P_PropPlace_generate = __decorate([
    UIBind('UI/uiTemplate/RPNPMUI/PropBase/P_PropPlace.ui')
], P_PropPlace_generate);
var P_PropPlace_generate$1 = P_PropPlace_generate;

var foreign105 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: P_PropPlace_generate$1
});

const MWModuleMap = { 
     '5D767BD64607F4FB5B8F60AD69BE1212': foreign13,
     'CAA6B3D54FE513F9966F06B818FA31A6': foreign14,
     '92816A6346421D88E5CD6190BDDEE547': foreign15,
     'D70B5EA94D684056330F9EA072969F68': foreign16,
     '90AC5AF542B13E1A2DC6ECAE9B6BB1E6': foreign17,
     'C974C6E84F22FF2AC661968120D6AC36': foreign18,
     'E9FAC1CF4EECD36170CC1E8A82F7AA49': foreign19,
     'E9A496A54DAF09517E7AEAB8A51643B8': foreign20,
     '56A520C14075BC1869D8379EFB44539A': foreign21,
     '3781BA854BE30543AFC0CB8B1C8B1A42': foreign22,
     'FBEEA9D6412FC46E2EA760813862587E': foreign23,
     '0B17BD8B437699FF0EBFB881EF698786': foreign24,
     '802B9A8E4BDA76BEFDBADB8F11FE418D': foreign25,
     'FF1E78C24E4AB9461388D3A2E212A185': foreign26,
     '3711C5DE437B90F35DED5ABB2A6B5614': foreign27,
     '53BBE2A248DBE8FD3E2100A34DA853E7': foreign28,
     '8C4032B0460053F076F8A0BD4C84F64E': foreign29,
     'E89317424D982760B14F009D346C515D': foreign30,
     'D9C956E441B664CEA06F5FAA9DF2EB0F': foreign32,
     '5BCDFAF546A0468A3DA0C4A923A1005D': foreign33,
     '35C3E94149CC0D295773FD984512499C': foreign34,
     '36E7EF304AC620C28D23A99CA282A665': foreign35,
     '73446D32410869264916C2B431ED6240': foreign36,
     '7C05B0F442A4B65CDAC1FDB6699B9307': foreign37,
     '434289D74DC39EBAB5B4188F75C129C7': foreign38,
     '0F43101F4FABFB43CE2E0DAA6C6B3FA5': foreign39,
     '36FDC3294FABE3B44F1FE7869E2AE91D': foreign40,
     '7199A9864CA9AD3E98819DB30C0BA3C0': foreign41,
     '0617BF1E42873A94803191A0D8D0ACF6': foreign42,
     'ED0A4F8441C287D46B38BD970332B323': foreign43,
     '772B79DE4D511391AB2EBEB3907AE525': foreign44,
     '22F15FDE463FD06E6BEA7789804B51BC': foreign45,
     'FE9981A445E481CE2A8AF2ABAEDA7531': foreign46,
     'B3687C8B40E807A3682783852D611D41': foreign47,
     '7460AB8E42FB991277D2D3A9794B85F0': foreign48,
     '6B1DF7B249B2BA72D07FE8B98C8D6D00': foreign49,
     'F54C1AC54C8BBF294FDB569A1C7D74D1': foreign50,
     'EDBA290C4D97D0EAE25E68ABD7658184': foreign51,
     '5E48034F42356392220739B4FE4B2445': foreign52,
     'E0EC23D24F2C3AFA49B67C8883551E3F': foreign53,
     '1D522BFB464DED25B921E19C1C75A592': foreign54,
     '39E25C674F911FACC85536B3BC6B85DA': foreign55,
     '94BDA6454B221000CE4CED845663CBEE': foreign56,
     '0042B8F24C03848DE8D7299D90AC76D8': foreign57,
     'CAC5A21C4B90A11FC9BE119582B4327B': foreign58,
     '04A64C364791FEB13D868298BDD96695': foreign59,
     'E5FFC7B14BB31D4D260B299029C7509E': foreign60,
     '6B74D6E24D71CDC909D8BEB49C238EC4': foreign61,
     '6F1E36424D96C37CA91302850D9826A8': foreign62,
     '7D27C12141149DF07D0435A6E75A610F': foreign63,
     '61E51F0E45D9CCCE8318128AAA5F7C25': foreign64,
     '5E21795B4309188562B5BD9FD52B7B22': foreign65,
     '6E32E2C24AAE6518866CD0AF2694DC1F': foreign66,
     '76AA4AA343CFA562EC62C29186FAE520': foreign67,
     '809C926A48FE83B1048A9A8ACA468F20': foreign68,
     '6226A3B24305A15CF48276BAA773901E': foreign69,
     '26EB165F469D9E1B467798942FDB0C5D': foreign70,
     'FBF5F67544189B0C1E76C99963C7AB02': foreign71,
     '4AF9ADBD4B6A209E8DB0269721E51025': foreign72,
     'B3E90A16490C703781EC9DAFA8A8D626': foreign73,
     '3803C9F544FA140578FED48278912409': foreign74,
     '444EEE5A4A4A6F482D3FA6A2229C60C8': foreign75,
     'E6EC5B55471D9EC2A59936A897CC6988': foreign76,
     '074BF2F045F58DFEECCD87860B6BC2C1': foreign77,
     'A53D10C34BE6DA5BFAA2C38EBC751B5B': foreign78,
     'D7AD04E94B598839EB8BCA99ADBC19EA': foreign79,
     'A4D20FC84117DB68576190BE06C8FFC1': foreign80,
     '54191E4B45C64D3B8965F1BABD0833BD': foreign81,
     '2BEE51234C2D7258F3D2CBA4E18DADCD': foreign82,
     '63D2C22C4793A4F54DA256AC18CB41B6': foreign83,
     '7A04BBBD41311A07DA8D949986639A93': foreign84,
     '56A6C66D4C47A3DBCBC8638A9AAF2780': foreign85,
     '968158BE4E73C6BFA110F8BE0C0EC8D2': foreign86,
     '19A77BC54FB696D84043BE8041860456': foreign87,
     '788434BE419ED33E04EA4781C530B150': foreign88,
     '69E84D9842834D07A38E8190B446DA29': foreign89,
     '1D859F3848902BD1DD2C009CA4428D91': foreign90,
     'B66DC90F46EF10602E48B0BB8C6678B3': foreign91,
     '49C19AAD4ECF9E02AD5B6FB2A73BB39A': foreign92,
     '9837ED14485E9D206FE269847B2B0A63': foreign93,
     '6CEABDC247FC7540D08C42975AECD821': foreign94,
     'F7C37F3C44A3468A0EE298B34A27C2D4': foreign95,
     '723DC1734541DBC8DA52C3B792512B06': foreign96,
     'D1971ECA4AC039952A81E7AD8AE22BB2': foreign97,
     'DF40EBF249E5E973DFB6F4BEEA53ECC0': foreign98,
     '88ADE6F642450E1A18273A9EDC3682A2': foreign99,
     '85B017F844B534222536F894D496E173': foreign100,
     '4CB10CD24848C89B264F2688A91E6931': foreign101,
     '99F8857E4925A4297837B4B4D06B2E01': foreign102,
     'B859EF92420622D6202C75A607CCB855': foreign103,
     '70C928A646A689B34A379D91EC059C33': foreign104,
     '84290ABA4DC406255250F2AFAE3B127D': foreign105,
     '76B6FA1B4120FDCC0E5D27AC011E397B': foreign106,
     'C2DF53A941027F6FBFD875A7F1C97B0F': foreign107,
     'CA8478064BF15D9986A8F68C56A7131B': foreign108,
};
const MWFileMapping = new WeakMap([[foreign13 || {}, "GameEnum"],
[foreign14 || {}, "GlobalData"],
[foreign15 || {}, "ExtensionType"],
[foreign16 || {}, "GameStart"],
[foreign17 || {}, "InputManager"],
[foreign18 || {}, "ModifiedCamera"],
[foreign19 || {}, "ModifiedPlayer"],
[foreign20 || {}, "ModifiedSpawn"],
[foreign21 || {}, "ModifiedStaticAPI"],
[foreign22 || {}, "ActionMC"],
[foreign23 || {}, "ActionMgr"],
[foreign24 || {}, "ActionMS"],
[foreign25 || {}, "BoardCount"],
[foreign26 || {}, "BoardMoculeS"],
[foreign27 || {}, "BoardModuleC"],
[foreign28 || {}, "BoardScript"],
[foreign29 || {}, "BoardWorldUI"],
[foreign30 || {}, "BuffMgr"],
[foreign32 || {}, "FenceModuleC"],
[foreign33 || {}, "FenceModuleS"],
[foreign34 || {}, "GameModuleC"],
[foreign35 || {}, "GameModuleS"],
[foreign36 || {}, "Game_HUDUI"],
[foreign37 || {}, "GMBasePanelUI"],
[foreign38 || {}, "ClickUI"],
[foreign39 || {}, "SP_ActiveDelay"],
[foreign40 || {}, "SP_Active_Trigger"],
[foreign41 || {}, "SP_Active_UI"],
[foreign42 || {}, "SP_Camera"],
[foreign43 || {}, "SP_InputParams"],
[foreign44 || {}, "SP_Jump"],
[foreign45 || {}, "SP_Motion_PingPong"],
[foreign46 || {}, "SP_Motion_Rotate"],
[foreign47 || {}, "SP_Motion_Sin"],
[foreign48 || {}, "SP_OldInteractive"],
[foreign49 || {}, "SP_Play3DSound"],
[foreign50 || {}, "SP_PlayEffect"],
[foreign51 || {}, "SP_PlaySound"],
[foreign52 || {}, "SP_ShowQTE"],
[foreign53 || {}, "SP_ShowSelectUI"],
[foreign54 || {}, "SP_TouchScreen"],
[foreign55 || {}, "SP_Visible"],
[foreign56 || {}, "InteractObject"],
[foreign57 || {}, "RP_Input_UI"],
[foreign58 || {}, "RP_PlayAni"],
[foreign59 || {}, "RP_PlayAniDou"],
[foreign60 || {}, "InteractMgr"],
[foreign61 || {}, "InteractModuleClient"],
[foreign62 || {}, "InteractModuleServer"],
[foreign63 || {}, "InteractUtilUI"],
[foreign64 || {}, "InterHelperBuilder"],
[foreign65 || {}, "PlayerManager"],
[foreign66 || {}, "ActionModule"],
[foreign67 || {}, "PlayerInfo"],
[foreign68 || {}, "PlayerModuleClient"],
[foreign69 || {}, "PlayerModuleServer"],
[foreign70 || {}, "ActionBaseHud"],
[foreign71 || {}, "ActionBaseItem"],
[foreign72 || {}, "ActionBaseP"],
[foreign73 || {}, "HeadUI"],
[foreign74 || {}, "TyphoonC"],
[foreign75 || {}, "TyphoonS"],
[foreign76 || {}, "DeadUI"],
[foreign77 || {}, "TyphoonResult"],
[foreign78 || {}, "TyphoonTip"],
[foreign79 || {}, "MyUIManager"],
[foreign80 || {}, "ResManager"],
[foreign81 || {}, "GridLayout"],
[foreign82 || {}, "Tips"],
[foreign83 || {}, "SettingUI"],
[foreign84 || {}, "TyphoonGUI"],
[foreign85 || {}, "AnnouncementUI_generate"],
[foreign86 || {}, "BoardWorldUI_generate"],
[foreign87 || {}, "InteractUtil_generate"],
[foreign88 || {}, "SettingUI_generate"],
[foreign89 || {}, "DeadUI_generate"],
[foreign90 || {}, "TyphoonResult_generate"],
[foreign91 || {}, "TyphoonTip_generate"],
[foreign92 || {}, "TyphoonGame_generate"],
[foreign93 || {}, "Emoji_generate"],
[foreign94 || {}, "HeadUI_generate"],
[foreign95 || {}, "Word_generate"],
[foreign96 || {}, "Tips_generate"],
[foreign97 || {}, "Game_HUD_generate"],
[foreign98 || {}, "GMHUD_generate"],
[foreign99 || {}, "GMItem_generate"],
[foreign100 || {}, "ActionBtn_generate"],
[foreign101 || {}, "ActionItem_generate"],
[foreign102 || {}, "ActionPanel_generate"],
[foreign103 || {}, "P_PropAction_generate"],
[foreign104 || {}, "P_PropFly_generate"],
[foreign105 || {}, "P_PropPlace_generate"],
[foreign106 || {}, "SP_InteractiveFlag_generate"],
[foreign107 || {}, "SP_InteractiveUI_generate"],
[foreign108 || {}, "GameUtils"]]);

exports.MWFileMapping = MWFileMapping;
exports.MWModuleMap = MWModuleMap;