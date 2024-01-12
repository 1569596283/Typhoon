import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Describe","Value","Value2","Value3","Value4","Judge","Value5","Text"],["","","","","","","","","Language"],[1,"所有3dui的对象id",0,null,null,["1B5CCFF3"],null,null,null]];
export interface IGlobalElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**描述*/
	Describe:string
	/**数值*/
	Value:number
	/**数值*/
	Value2:Array<number>
	/**数值*/
	Value3:string
	/**数值*/
	Value4:Array<string>
	/**判断*/
	Judge:boolean
	/**向量*/
	Value5:mw.Vector
	/**多语言*/
	Text:string
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}

}