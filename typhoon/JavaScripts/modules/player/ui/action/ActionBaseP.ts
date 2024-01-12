
import { ISquareActionConfigElement } from "../../../../config/SquareActionConfig";
import { HudGameUIState } from "../../../../const/GameEnum";
import ActionPanel_generate from "../../../../ui-generate/uiTemplate/RPNPMUI/ActionModule/ActionPanel_generate";
import { ActionLuanguage, ActionModuleC } from "../../modules/ActionModule";
import { ActionBaseItem } from "./ActionBaseItem";

export class ActionBaseP extends ActionPanel_generate {
    //控件
    private barList: mw.StaleButton[] = [];
    private canvas: mw.Canvas = null;
    //是否打开
    private isOpen = false;
    //是否关闭
    private isClose = false;
    //移动速度
    private moveSpeed = 1800;
    //舞台宽度
    private stageWide = 0;
    //目标位置
    private targetPos = 0;
    //item列表
    private itemList: ActionBaseItem[] = [];
    //选中类型
    private _typeIndex = 0;
    //动作配置列表
    private _config: ISquareActionConfigElement[];

    public set typeIndex(index: number) {
        this._typeIndex = index
        this.refreshType();
    }

    public onStart() {
        this.mCloseBtn.onClicked.add(() => {
            this.isClose = true;
        });
        this.canvas = this.mCon;
        this.stageWide = UIManager.canvas.size.x;
        this.targetPos = this.stageWide - this.canvas.size.x;
        this.barList.push(this.mTypeBar1, this.mTypeBar2);
        this.mTypeBar1.onClicked.add(() => { this.typeIndex = 0 });
        this.mTypeBar2.onClicked.add(() => { this.typeIndex = 1 });
        this.mTypeBar1.text = ActionLuanguage.tab1
        this.mTypeBar2.text = ActionLuanguage.tab2
        let oversea = ActionLuanguage.isOverseas ? "89649" : "86265";
        this.mTypeBar1.disableImageGuid = oversea;
        this.mTypeBar2.disableImageGuid = oversea;
    }

    public onShow(config: ISquareActionConfigElement[]): void {
        UIManager.setUIstate(this, HudGameUIState.HideAll)
        this._config = config;
        this.mCloseBtn.visibility = mw.SlateVisibility.Hidden;
        this.canvas.position = new mw.Vector2(this.stageWide, 0);
        this.isOpen = true;
        this.canUpdate = true;
        this.typeIndex = 0
    }

    /**刷新类型 */
    private refreshType(): void {
        for (let i = 0; i < this.barList.length; i++) {
            this.barList[i].enable = (i == this._typeIndex ? false : true);
        }
        this.setList();
    }

    private setList(): void {
        this.hideAll();
        this.mScr.scrollToStart();
        for (let i = 0; i < this._config.length; i++) {
            if (this._config[i].type != this._typeIndex + 1) continue;
            const item = this.getItem(i)
            item.setData(this._config[i])
        }
    }

    /**
     * 获取Item
     * @returns 
     */
    private getItem(index: number): ActionBaseItem {
        let item: ActionBaseItem = this.itemList[index]
        if (!item) {
            item = this.createItem(index);
        }

        return item;
    }

    /**
     * 建造item
     */
    private createItem(index: number): ActionBaseItem {
        let item = UIManager.create(ActionBaseItem)
        item.active.add((info: ISquareActionConfigElement) => {
            this.onClickItem(info);
        });
        this.mContent.addChild(item.uiObject);
        this.itemList[index] = item
        return item;
    }


    private onClickItem(info: ISquareActionConfigElement): void {
        ModuleService.getModule(ActionModuleC).luanchAction(info)
        UIManager.hide(ActionBaseP)
    }


    public onUpdate(dt: number): void {
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
                UIManager.hideUI(this)
                return;
            }
            this.canvas.position = new mw.Vector2(x, 0);
        }
    }

    private hideAll() {
        this.itemList.forEach(item => {
            item.visible = false
        });
    }

    protected onHide(): void {
        UIManager.setUIstate(this, HudGameUIState.Show)
    }
}