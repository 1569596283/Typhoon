import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';

import { GameConfig } from "../../config/GameConfig";
import { EventsName, PlayerStateType } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { getMyPlayerID } from "../../ExtensionType";
import GameUtils from "../../utils/GameUtils";
import HeadUI from "./ui/HeadUI";


@Component
export default class PlayerInfo extends mw.Script {
    @mw.Property({ replicated: true, onChanged: "stateChange" })
    private _myState: PlayerStateType = PlayerStateType.Dead
    public get myState(): PlayerStateType {
        return this._myState
    }
    private _stateArr: PlayerStateType[] = [PlayerStateType.None]
    @mw.Property({ replicated: true })
    public myName: string = ""
    @mw.Property({ replicated: true, onChanged: "titleTypeChange" })
    public myTitle: string = ""
    @mw.Property({ replicated: true })
    private _playerID: number = 0
    public get playerID() { return this._playerID }

    public player: mw.Player = null
    public character: mw.Character = null
    public userID: string = ""
    public headUI: HeadUI = null;
    public onStateChange: Action1<PlayerStateType> = new Action1()
    public onAttrChange: Action = new Action()

    private _isInit: boolean = false
    private _isDead: boolean = false
    private _chatTime: number = 0

    private stateChange() {
        if (this.onStateChange) {
            this.onStateChange.call(this._myState)
        }
    }

    private titleTypeChange() {
        if (this._isInit) {
            this.headUI.setTitle(this.myTitle)
            if (GameUtils.isPlayerCharacter(this.player)) {
                let num = Number(this.myTitle[0]);
                if (num !== undefined) {
                    GlobalData.boardCount = num;
                }
            }
        }
    }

    protected onStart(): void {
        this.useUpdate = true
        this.onStateChange.add((state: PlayerStateType) => {
            if (SystemUtil.isClient() && this.playerID != getMyPlayerID())
                return;
            if (state == PlayerStateType.Dead) {
                this.onDead()
            }
            Event.dispatchToLocal(EventsName.PLAYER_STATE, state)
        })
    }

    public init(player: mw.Player) {
        if (this._isInit) return
        if (player) {
            this.player = player
            this._playerID = this.player.playerId
            this.character = this.player.character;
            this.userID = this.player.userId
            Event.dispatchToLocal("Player_Init", this._playerID, this)
            this._myState = PlayerStateType.None
            if (SystemUtil.isClient()) {
                if (!mw.AssetUtil.assetLoaded("8355")) mw.AssetUtil.asyncDownloadAsset("8355");
                let widget = this.character.overheadUI;
                widget.setUIbyID("7EE386804E380932BF41959F2B514BC7");
                widget.drawSize = new mw.Vector2(351, 123);
                this.headUI = new HeadUI(widget);
                this.headUI.setName(this.myName);
                this.headUI.setTitle(this.myTitle);
                if (this.playerID == getMyPlayerID()) Event.dispatchToLocal("initMySelf", this)
            } else {
                this.myTitle = "0/" + GlobalData.FenceNum;
            }
            this._isInit = true
        }
    }

    public setState(stateType: PlayerStateType, bool: boolean) {
        if (bool) {
            if (stateType == PlayerStateType.None) {
                this._stateArr = [PlayerStateType.None]
            } else if (!this._stateArr.includes(stateType)) {
                this._stateArr.push(stateType)
            }
        } else {
            if (stateType != PlayerStateType.None) {
                if (this._stateArr.includes(stateType)) {
                    this._stateArr.splice(this._stateArr.indexOf(stateType), 1)
                }
            }
        }
        const newState = this._stateArr[this._stateArr.length - 1]
        if (this._myState == newState) return;
        this._myState = newState
        this.onStateChange.call(this._myState)
    }

    public showChat(str: string) {
        if (SystemUtil.isServer()) return
        if (this._isInit) {
            this.headUI.showChat(str)
            this._chatTime = 5
        }
    }

    private async onDead() {
        if (this._isDead) return
        if (SystemUtil.isClient()) {
            this.character.movementEnabled = false
            PlayerManagerExtesion.rpcPlayAnimation(this.character, "8355", 1, 1.17 / 2)
        } else {
            this._myState = PlayerStateType.Dead
        }
        this._isDead = true
        await TimeUtil.delaySecond(ReTime)
        this.onAwake()
    }

    private onAwake() {
        if (SystemUtil.isClient()) {
            Event.dispatchToLocal(EventsName.PlayerReset)
        } else {
            this.setState(PlayerStateType.None, true)
        }
        this._isDead = false
    }

    protected onUpdate(dt: number): void {
        if (SystemUtil.isClient() && !this._isInit && this._playerID != 0) {
            this.init(Player.getPlayer(this._playerID))
        }
        if (this.myState == PlayerStateType.Dead) return;
        if (this._isInit && this._chatTime > 0) {
            this._chatTime -= dt
            if (this._chatTime <= 0) {
                this.headUI.hideChat()
            }
        }
    }

    protected onDestroy(): void {
        if (SystemUtil.isClient())
            this.headUI?.destory()
    }
}

export const ReTime = 5