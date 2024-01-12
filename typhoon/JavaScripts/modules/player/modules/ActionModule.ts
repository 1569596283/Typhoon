import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager, SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../../config/GameConfig";
import { ISquareActionConfigElement } from "../../../config/SquareActionConfig";
import { EventsName, PlayerStateType } from "../../../const/GameEnum";
import Tips from "../../../ui/commonUI/Tips";
import GameUtils from "../../../utils/GameUtils";
import Game_HUDUI from "../../gameModule/ui/Game_HUDUI";
import PlayerManager from "../managers/PlayerManager";
import { ActionBaseHud } from "../ui/action/ActionBaseHud";
import { ActionBaseP } from "../ui/action/ActionBaseP";
import PlayerModuleServer from '../PlayerModuleServer';

/**动作类型 */
export enum ActionType {
    /**单人动作 */
    Single = 1,
    /**双人动作 */
    Double
}

/**双人动作类型 */
export enum ActionDoubleType {
    /**普通动作 */
    Ordinary = 1,
    /**交互动作 */
    Interactive,
    /**强制动作 */
    Force
}

export class ActionLuanguage {
    //多语言
    public static isOverseas = !mw.LocaleUtil.getDefaultLocale().toString().toLowerCase().match("zh");

    /**接受动作文本 */
    public static acceptText: string = "";
    /**拒绝动作文本 */
    public static refuseText: string = "";
    /**发起描述1 */
    public static desc1: string = "";
    /**发起描述2 */
    public static desc2: string = "";
    /**与交互物互斥提示 */
    public static interactiveTips: string = "";
    /**与道具互斥提示 */
    public static itemType: string = "";
    /**重复发起动作提示 */
    public static actionTips: string = "";
    /**动作发起成功提示 */
    public static succes: string = "";
    /**动作发起失败提示 */
    public static fail: string = "";
    /**脱离 */
    public static leave: string = "";
    /**动作按钮文字 */
    public static action: string = "";
    /**脱离按钮图标 */
    // public static leaveIcon: string = "";
    /**页签1 */
    public static tab1: string = "";
    /**页签2 */
    public static tab2: string = "";
    /**距离过远 */
    public static toolong: string = "";
    /**当前玩家处于双人动作中 */
    public static ing: string = "";
    /**请先离开当前玩家 */
    public static pleaseLeave: string = "";
}

enum ActionEvent {
    //client To Sever//========================================
    net_LeaveInteract = "net_LeaveInteract",
    net_login = "net_login",
    net_ForeceAction = "net_ForeceAction",
    net_LuanchAction = "net_LuanchAction",
    net_OnActionSuccess = "net_OnActionSuccess",
    dancing_Wand = "dancing_Wand",
    water_Wand = "water_Wand",
    //Sever && Client//========================================
    net_PlayAction = "net_PlayAction",
    //Server To Client//========================================
    net_GetPlayer = "net_GetPlayer",
    net_ShowTips = "net_ShowTips",
    net_SetActionMSG = "net_SetActionMSG",
    net_Interact = "net_Interact",
    net_danceWand = "net_danceWand",
    net_waterWand = "net_waterWand",
}

export class ActionModuleC extends ModuleC<ActionModuleS, null> {
    /**当前交互 */
    public curId = 0;
    /**是否为接收者 */
    public isAccepter = false;
    /**是否单人姿态 */
    public isSingleStance = false;
    /**默认相机位置 */
    public camerPos: mw.Vector = null;
    /**当前循环动作 */
    public curloop = "";
    public actionHUD: ActionBaseHud = new ActionBaseHud();
    private self: mw.Player = null;
    public map: Map<number, ISquareActionConfigElement> = new Map<number, ISquareActionConfigElement>();
    /**当前简单双人动作 */
    private singleA: mw.Animation = null;

    public onStart(): void {
        this.addLinster()
    }
    private addLinster() {
        Event.addServerListener(ActionEvent.net_GetPlayer, (id: number, guid: number, name: string) => {
            this.net_GetPlayer(id, guid, name);
        })

        Event.addServerListener(ActionEvent.net_ShowTips, (num: number) => {
            this.net_ShowTips(num);
        });

        Event.addServerListener(ActionEvent.net_SetActionMSG, (id: number) => {
            this.net_SetActionMSG(id)
        })

        Event.addServerListener(ActionEvent.net_PlayAction, (aniguid: string) => {
            this.net_PlayAction(aniguid)
        })

        Event.addServerListener(ActionEvent.net_Interact, (playerId: number, isAccepter: boolean, configId: number) => {
            this.net_Interact(playerId, isAccepter, configId)
        })

        Event.addServerListener(ActionEvent.net_OnActionSuccess, (succes: boolean) => {
            this.net_OnActionSucces(succes)
        })


        Event.addServerListener(ActionEvent.net_danceWand, (actionId: number, nickName: string) => {
            let actionConfig = this.map.get(actionId)
            if (actionConfig) {
                Tips.show(StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_2.Value, this.luanchAction(actionConfig)))
            }
        })
    }

    public onEnterScene(sceneType: number): void {
        this.initLanguage();
        this.initConfig();
        this.self = Player.localPlayer;
        this.camerPos = Camera.currentCamera.localTransform.position;
        Event.dispatchToServer(ActionEvent.net_login)
        Event.addLocalListener(EventsName.CancelActive, () => {
            this.off()
        })
    }

    private initLanguage() {
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

    private initConfig(): void {
        let configs = GameConfig.SquareActionConfig.getAllElement();
        for (let config of configs) {
            this.map.set(config.ID, config);
        }
    }

    public openActionPanle() {
        if (this.curId <= 0) {
            this.showPanle()
        } else {
            Event.dispatchToServer(ActionEvent.net_LeaveInteract, Number(this.curId))
        }
    }

    /**打开动作列表 */
    private showPanle(): void {
        UIManager.show(ActionBaseP, this.getAction());
    }


    public getAction(): ISquareActionConfigElement[] {
        let list: ISquareActionConfigElement[] = []
        this.map.forEach((value) => {
            list.push(value)
        })
        list.sort((a, b) => {
            return a.quality - b.quality;
        })
        return list;
    }

    /**离开交互 */
    public off(): void {
        if (this.curId > 0) {
            Event.dispatchToServer(ActionEvent.net_LeaveInteract, Number(this.curId))
        }
    }

    protected bagAcceptSkip(): boolean {
        return true;
    }

    protected bagLuanchSkip(): boolean {
        return true;
    }

    protected isFree(): boolean {
        return PlayerManager.instance.playerIsFree(this.localPlayerId)
    }

    protected net_showTips(str: string): void {
        Tips.show(str);
    }

    private _selfName = ""
    protected getSelfName(): string {
        if (StringUtil.isEmpty(this._selfName))
            this._selfName = mw.AccountService.getNickName() || "player"
        return this._selfName
    }


    /**
     * 跳舞魔杖让一个玩家跳舞
     * @param actionId action表ID
     * @param actionPlayer 受到影响的玩家
     */
    public dancingWand(actionId: number, actionPlayer: mw.Player) {
        if (actionPlayer) {
            Event.dispatchToServer(ActionEvent.dancing_Wand, actionId, actionPlayer.playerId, this.getSelfName())
        }
    }

    /**
     * 水枪魔杖让一个玩家被水冲起来
     * @param actionPlayer 受到影响的玩家
     */
    public waterWand(actionPlayer: mw.Player) {
        if (actionPlayer) {
            Event.dispatchToServer(ActionEvent.water_Wand, actionPlayer.playerId, this.getSelfName())
        }
    }

    public luanchActionOut(configId: number, playerId?: number): void {
        let config = this.map.get(configId);
        this.luanchAction(config, playerId);
    }

    /**
     * 发起动作
     * @param config 
     * @returns 
     */
    public async luanchAction(config: ISquareActionConfigElement, playerId?: number): Promise<void> {
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
        if (config.type == ActionType.Single) {//单人动作
            await GameUtils.downAsset(config.actionId)
            this.cleanStance();
            if (config.singleType) {
                PlayerManagerExtesion.changeStanceExtesion(this.self.character, config.actionId);
                this.isSingleStance = true;
            } else {
                if (config.circulate) {
                    this.curloop = config.actionId;
                }
                PlayerManagerExtesion.rpcPlayAnimation(this.self.character, config.actionId, config.circulate ? 0 : 1, config.time);
            }
            this.setMGS(config.ID);
        } else {//双人动作
            if (config.doubleType == ActionDoubleType.Force) {//强制动作
                Event.dispatchToServer(ActionEvent.net_ForeceAction, config.ID, playerId)
            } else {//交互动作
                let name = this.getSelfName();
                Event.dispatchToServer(ActionEvent.net_LuanchAction, config.ID, name, playerId)
            }
        }
    }

    public cleanStance(): void {
        if (this.isSingleStance) {
            PlayerManagerExtesion.changeStanceExtesion(this.self.character, "");
            this.isSingleStance = false;
        }
        if (this.curloop) {
            PlayerManagerExtesion.rpcStopAnimation(this.self.character, this.curloop);
            this.curloop = "";
        }
    }

    private net_OnActionSucces(succes: boolean) {
        let str = succes ? ActionLuanguage.succes : ActionLuanguage.fail;
        this.net_showTips(str);
    }

    private net_SetActionMSG(id: number) {
        this.setMGS(id);
    }

    private setMGS(id: number): void {
    }

    /**
     * 收到发起动作的人
     * @param guid 
     */
    private net_GetPlayer(playerId: number, guid: number, name: string): void {
        this.actionHUD.addPlayer(playerId, guid, name);
    }

    /**
     * 接受动作
     * @param id 
     * @returns 
     */
    public aceeptAction(id: number): void {
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
    private net_PlayAction(actionId: string): void {
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
    private net_Interact(playerId: number, isAccepter: boolean, configId: number): void {
        this.curId = playerId;
        this.isAccepter = isAccepter;
        let guid = playerId > 0 ? "192139" : "183754";
        let name = playerId > 0 ? ActionLuanguage.leave : ActionLuanguage.action;
        UIManager.getUI(Game_HUDUI).refreshActionBtn(name, guid);
        if (playerId <= 0) {
            PlayerManagerExtesion.changeStanceExtesion(this.self.character, "");
            Camera.currentCamera.localTransform.position = this.camerPos;
        } else {
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
    private net_ShowTips(num: number): void {
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

export class ActionModuleS extends ModuleS<ActionModuleC, null> {
    /**发起动作的人 */
    private actionPlayers: Map<number, number> = new Map<number, number>();
    /**交互的人*/
    public interactPlayers: Map<number, InteractPlayer> = new Map<number, InteractPlayer>();
    /**显示交互距离 */
    private showFlagDis = 400;
    public map: Map<number, ISquareActionConfigElement> = new Map<number, ISquareActionConfigElement>();

    onStart(): void {
        //监听玩家离开房间
        this.initConfig();
        this.addLinster()
    }

    public onPlayerLeft(player: mw.Player): void {
        this.peopleLeft(player?.playerId)
    }

    private addLinster() {
        Event.addClientListener(ActionEvent.net_ForeceAction, (player: mw.Player, id: number, playerId: number) => {
            this.net_ForeceAction(player, id, playerId);
        })

        Event.addClientListener(ActionEvent.net_LuanchAction, (player: mw.Player, id: number, name: string, playerId?: number) => {
            this.net_LuanchAction(player, id, name, playerId);
        })

        Event.addClientListener(ActionEvent.net_LeaveInteract, (player: mw.Player, id: number) => {
            this.net_LeaveInteract(player, id);
        })

        Event.addClientListener(ActionEvent.net_login, (player: mw.Player) => {
            this.net_login(player);
        })

        Event.addClientListener(ActionEvent.net_PlayAction, (player: mw.Player, actionId: number) => {
            this.net_PlayAction(player, actionId);
        })

        Event.addClientListener(ActionEvent.dancing_Wand, (player: mw.Player, actionId: number, actionPlayerId: number, nickName: string) => {
            this.dancingPlayer(actionId, actionPlayerId, nickName)
        })

        Event.addClientListener(ActionEvent.water_Wand, (player: mw.Player, actionPlayerId: number, nickName: string) => {
            this.waterPlayer(actionPlayerId, nickName)
        })
    }

    protected initConfig(): void {
        let configs = GameConfig.SquareActionConfig.getAllElement();
        for (let config of configs) {
            this.map.set(config.ID, config);
        }
    }

    /**
     * 玩家离开
     * @param player 
     */
    private peopleLeft(playerid: number): void {
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
    public net_LuanchAction(player: mw.Player, guid: number, name: string, playerId?: number) {
        let id = player.playerId;
        let succes = false;
        if (playerId) {
            if (this.isCanLuanch(player, playerId)) {
                this.actionPlayers.set(id, guid);
                Event.dispatchToClient(Player.getPlayer(playerId), ActionEvent.net_GetPlayer, id, guid, name);
                succes = true;
            }
        } else {
            for (let playeritem of Player.getAllPlayers()) {
                if (!this.isCanLuanch(player, playeritem.playerId)) {
                    continue;
                }

                this.actionPlayers.set(id, guid);
                Event.dispatchToClient(playeritem, ActionEvent.net_GetPlayer, id, guid, name);
                succes = true;
            }
        }
        Event.dispatchToClient(player, ActionEvent.net_OnActionSuccess, succes)
    }

    private isCanLuanch(luanchPlayer: mw.Player, playerId: number): boolean {
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

    public waterPlayer(playerId: number, nickName: string) {
        let player = Player.getPlayer(playerId)
        if (player) {
            Event.dispatchToClient(player, ActionEvent.net_waterWand, nickName)
        }
    }

    public dancingPlayer(actionId: number, playerId: number, nickName: string) {
        let player = Player.getPlayer(playerId)
        if (player) {
            Event.dispatchToClient(player, ActionEvent.net_danceWand, actionId, nickName)
        }
    }

    /**
    * 检查是否为接收者
    * @param id 
    */
    private isAccepter(id: number): boolean {
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
    public net_ForeceAction(player: mw.Player, configId: number, playerId?: number): void {
        if (playerId) {
            if (this.isCanForece(player, playerId)) {
                this.beginAction(configId, Player.getPlayer(playerId), player);
                return;
            }
        } else {
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

    public isFree(playerId: number): boolean {
        return PlayerManager.instance.playerIsFree(playerId)
    }

    protected setActionMSG(id: number, player: mw.Player): void {
        Event.dispatchToClient(player, ActionEvent.net_SetActionMSG, id);
    }

    /**
     * 是否可以强制动作
     * @param self 
     * @param playerId 
     */
    private isCanForece(sendPlayer: mw.Player, playerId: number): boolean {
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
    public isCanDo(playerId: number): boolean {
        return true;
    }

    /**
    * 开始动作
    * @param playerId 
    */
    public net_PlayAction(player: mw.Player, playerId: number): void {
        let accectPlayer = player

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
    private beginAction(id: number, accectPlayer: mw.Player, luanchPlayer: mw.Player): void {
        let config = this.map.get(id);
        if (!config) {
            return;
        }
        if (config.doubleType == ActionDoubleType.Ordinary) {
            //简单动作
            accectPlayer.character.collisionWithOtherCharacterEnabled = false;
            setTimeout(() => {
                let forwardV = mw.Vector.add(luanchPlayer.character.worldTransform.getForwardVector().normalized.clone().multiply(config.v.length), luanchPlayer.character.worldTransform.position)
                accectPlayer.character.worldTransform.position = mw.Vector.rotateZ(forwardV, luanchPlayer.character.worldTransform.position, config.angle * (Math.PI / 180))

                let r = mw.Rotation.zero;
                mw.Rotation.add(luanchPlayer.character.worldTransform.rotation, new mw.Rotation(config.r), r);
                accectPlayer.character.worldTransform.rotation = r;
            }, 100);
            Event.dispatchToClient(luanchPlayer, ActionEvent.net_PlayAction, config.sendAni);
            Event.dispatchToClient(accectPlayer, ActionEvent.net_PlayAction, config.accectAni);
        } else {
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
    public net_LeaveInteract(player: mw.Player, id: number): void {
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
    private leaveCheck(player: mw.Player): void {
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
    public net_login(player: mw.Player): void {
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

export class InteractPlayer {
    public sendPlayerId: number = 0;
    public accectPlayerId: number = 0;
    public interactObj: mw.Interactor = null;
    public action: mw.Action = new mw.Action();
    public configId = 0;

    public start(player1: mw.Player, player2: mw.Player, config: ISquareActionConfigElement): void {
        this.configId = config.ID;

        if (!this.interactObj) {
            this.interactObj = SpawnManager.spawn({ guid: "Interactor", replicates: true }) as mw.Interactor;
        }
        this.sendPlayerId = player1.playerId;
        this.accectPlayerId = player2.playerId;

        player2.character.collisionWithOtherCharacterEnabled = false;
        GeneralManager.modiftEnterInteractiveState(this.interactObj, player2.character).then((suc: boolean) => {
            if (!suc) {
                return;
            }
            this.action.call();
            if (config.sendStance && config.accectStance) {
                PlayerManagerExtesion.changeStanceExtesion(player2.character, config.accectStance);
                PlayerManagerExtesion.changeStanceExtesion(player1.character, config.sendStance);
            } else if (config.sendAni && config.accectAni) {
                PlayerManagerExtesion.rpcPlayAnimation(player2.character, config.accectAni, 1)
                let ani = PlayerManagerExtesion.loadAnimationExtesion(player1.character, config.sendAni, true)
                ani.play();
                setTimeout(() => {
                    ModuleService.getModule(PlayerModuleServer).net_LeaveInteract(null, player1.playerId)
                }, ani.length * 1000);
                //需要发起者的id
            }

            PlayerManager.instance.setPlayerState(PlayerStateType.DoublePeopleAction, true, player1)
            PlayerManager.instance.setPlayerState(PlayerStateType.DoublePeopleAction, true, player2)
            this.interactObj.localTransform.position = (config.v);
            this.interactObj.localTransform.rotation = (new mw.Rotation(config.r));
        });
        player1.character.attachToSlot(this.interactObj, mw.HumanoidSlotType.FaceOrnamental);
    }

    public leave(): void {
        let accectPlayer = Player.getPlayer(this.accectPlayerId);
        let sendPlayer = Player.getPlayer(this.sendPlayerId);
        const leaveLoc = accectPlayer.character.worldTransform.getForwardVector().multiply(100)
        leaveLoc.z += 100;
        GeneralManager.modifyExitInteractiveState(this.interactObj, accectPlayer.character.worldTransform.position.add(leaveLoc), "").then(() => {
            PlayerManagerExtesion.changeStanceExtesion(sendPlayer.character, "");
            PlayerManagerExtesion.changeStanceExtesion(accectPlayer.character, "");
            const accectHight = accectPlayer.character.description.advance.bodyFeatures.body.height;
            const sendHight = sendPlayer.character.description.advance.bodyFeatures.body.height;
            accectPlayer.character.description.advance.bodyFeatures.body.height = sendHight, true;
            setTimeout(() => {
                accectPlayer.character.description.advance.bodyFeatures.body.height = accectHight, true;
            }, 33);
            PlayerManager.instance.setPlayerState(PlayerStateType.DoublePeopleAction, false, accectPlayer)
            PlayerManager.instance.setPlayerState(PlayerStateType.DoublePeopleAction, false, sendPlayer)
        });


    }

    public reLoginLeave(): void {
        let accectPlayer = Player.getPlayer(this.accectPlayerId);
        let sendPlayer = Player.getPlayer(this.sendPlayerId);
        if (accectPlayer) {
            const leaveLoc = accectPlayer.character.worldTransform.getForwardVector().multiply(100)
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