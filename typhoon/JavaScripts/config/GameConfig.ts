import {ConfigBase, IElementBase} from "./ConfigBase";
import {ActionConfig} from "./Action";
import {BoardConfig} from "./Board";
import {ChatExpressionConfig} from "./ChatExpression";
import {ChatWordConfig} from "./ChatWord";
import {GlobalConfigConfig} from "./GlobalConfig";
import {GlobalConfig} from "./Global";
import {InteractConfigConfig} from "./InteractConfig";
import {MusicConfig} from "./Music";
import {SquareActionConfigConfig} from "./SquareActionConfig";
import {SquareLanguageConfig} from "./SquareLanguage";
import {TyphoonConfig} from "./Typhoon";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Action():ActionConfig{ return this.getConfig(ActionConfig) };
	public static get Board():BoardConfig{ return this.getConfig(BoardConfig) };
	public static get ChatExpression():ChatExpressionConfig{ return this.getConfig(ChatExpressionConfig) };
	public static get ChatWord():ChatWordConfig{ return this.getConfig(ChatWordConfig) };
	public static get GlobalConfig():GlobalConfigConfig{ return this.getConfig(GlobalConfigConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get InteractConfig():InteractConfigConfig{ return this.getConfig(InteractConfigConfig) };
	public static get Music():MusicConfig{ return this.getConfig(MusicConfig) };
	public static get SquareActionConfig():SquareActionConfigConfig{ return this.getConfig(SquareActionConfigConfig) };
	public static get SquareLanguage():SquareLanguageConfig{ return this.getConfig(SquareLanguageConfig) };
	public static get Typhoon():TyphoonConfig{ return this.getConfig(TyphoonConfig) };
}