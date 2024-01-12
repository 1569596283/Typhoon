import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","IsServer","Name","Scripts","Tips","Params1","Params2","Params3","Params4"],["","","","","","","","",""],[1,true,"1",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[2,true,"2",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[3,true,"3",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[4,true,"4",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[5,true,"5",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[6,true,"6",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","126331","0","1"],null,null],[7,true,"7",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[8,true,"8",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","4175","0","1"],null,null],[9,true,"9",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","14023","0","1"],null,null],[10,true,"10",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","14023","0","1"],null,null],[11,true,"11",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","14023","0","1"],null,null],[12,true,"12",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","14023","0","1"],null,null],[13,true,"13",["Active_UI","Interactive"],"小屋交互物",["0","1","1","150","110111","34423","0/0/0","1","0"],["0","0","14023","0","1"],null,null]];
export interface IInteractConfigElement extends IElementBase{
 	/**交互物唯一ID*/
	ID:number
	/**是否是双端交互物*/
	IsServer:boolean
	/**交互物名字*/
	Name:string
	/**绑定脚本顺序*/
	Scripts:Array<string>
	/**备注*/
	Tips:string
	/**脚本参数1*/
	Params1:Array<string>
	/**脚本参数2*/
	Params2:Array<string>
	/**脚本参数3*/
	Params3:Array<string>
	/**脚本参数4*/
	Params4:Array<string>
 } 
export class InteractConfigConfig extends ConfigBase<IInteractConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}