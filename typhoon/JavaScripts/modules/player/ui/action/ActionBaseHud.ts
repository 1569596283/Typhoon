/**
 * @Author       : metag
 * @Date         : 2023-06-19 10:02:03
 * @LastEditors  : meta
 * @LastEditTime : 2023-08-02 14:28:34
 * @FilePath     : \mollywoodschool\JavaScripts\modules\player\ui\action\ActionBaseHud.ts
 * @Description  : 
 */

import ActionBtn_Generate from "../../../../ui-generate/uiTemplate/RPNPMUI/ActionModule/ActionBtn_generate";
import Game_HUDUI from "../../../gameModule/ui/Game_HUDUI";
import { ActionLuanguage, ActionModuleC } from "../../modules/ActionModule";


export class ActionBaseHud {
    //当前z值
    private zIndex = 0;
    //item列表
    private itemList: ActionBtn[] = [];

    private cons: Map<number, ActionBtn> = new Map();


    /**
     * 获取Item
     * @returns 
     */
    private getItem(): ActionBtn {
        if (this.itemList.length <= 0) {
            this.createItem();
        }
        let item = this.itemList.splice(0, 1)[0];
        return item;
    }

    /**
     * 建造item
     */
    private createItem(): void {
        let data = UIManager.create(ActionBtn)
        data.noBtn.onClicked.add(() => {
            this.removePlayer(data.id)
        })
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
    public addPlayer(id: number, guid: number, name: string): void {
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
    public removePlayer(id: number): void {
        let con = this.cons.get(id);
        if (!con) {
            return;
        }
        con.hide();
        this.itemList.push(con);
        this.cons.delete(id);
    }
}

export class ActionBtn extends ActionBtn_Generate {
    public id = 0;
    private time = 0;
    /**接受 */
    private text1 = "";
    /**拒绝 */
    private text2 = "";
    /**描述 */
    private desc = "";

    protected onStart(): void {
        this.yesBtn.onClicked.add(() => {
            this.onAccept()
        })
        this.text1 = ActionLuanguage.acceptText;
        this.text2 = ActionLuanguage.refuseText;
        this.yesBtn.text = this.text1

        this.desc = ActionLuanguage.desc1 + ActionLuanguage.desc2;
        this.yesBtn.normalImageGuid = ActionLuanguage.isOverseas ? "95786" : "95788";
    }

    /**
     * 设置层级
     * @param zIndex 
     */
    public setZIndex(zIndex: number): void {
        this.uiObject.zOrder = zIndex;
    }

    public setData(id: number, guid: number, name: string): void {
        this.time = 5;
        this.nameText.text = name;
        this.descText.text = this.desc;
        this.noBtn.text = `${this.text2}(${this.time})S`
        this.id = id;
    }

    protected onUpdate(dt: number): void {
        if (this.time > 0) {
            this.time -= dt;
            this.noBtn.text = `${this.text2}(${Math.floor(this.time)})S`
        } else {
            this.hide()
        }
    }

    private onAccept(): void {
        ModuleService.getModule(ActionModuleC).aceeptAction(this.id);
        this.noBtn.onClicked.broadcast()
    }

    public show(): void {
        this.uiObject.visibility = mw.SlateVisibility.Visible
        this.canUpdate = true
    }

    public hide(): void {
        this.uiObject.visibility = mw.SlateVisibility.Hidden
        this.canUpdate = false
    }
}