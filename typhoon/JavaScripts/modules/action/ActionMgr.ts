import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
﻿import { IActionElement } from "../../config/Action";
import { GameConfig } from "../../config/GameConfig";

/**角色动作 */
export class CharAction {
    private stance: mw.SubStance;
    private animation: mw.Animation;
    public cfgId: number;
    private _isPlaying: boolean = false;
    public owner: mw.Character;


    constructor() {
    }

    public async init(char: mw.Character, cfgId: number) {
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
                this.animation.speed = cfg.animationRate

                if (cfg.times > 0) {
                    this.animation.onFinish.add(() => {
                        // oTraceError("动画播放完毕 cfgId", cfgId);
                        ActionMgr.stopAction(cfgId, this.owner.gameObjectId);
                    })
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

    public stop() {
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
    public play(cb: () => void = null) {
        ActionMgr.stopFlag = 0;
        // oTraceError("--------->播放动画", this.cfgId, this.owner.displayName);
        this._isPlaying = true;
        if (this.stance) {
            this.stance.play();
        }
        if (this.animation && this.animation.isPlaying == false) {
            this.animation.play();
            this.animation.onFinish.add(() => {
                cb && cb()
            })
        }
    }

    public get isPlaying() {
        if (this.stance) {
            return true;
        }
        if (this.animation) {
            return this.animation.isPlaying;
        }
        return false;
    }
}

export default class ActionMgr {
    private static allActonMap: Map<string, { curAction: IActionElement, inteval: any, actions: CharAction[] }> = new Map();//gid
    /**动作同步事件发送定时器 */
    public static playAction(cfgId: number, char: mw.Character = Player.localPlayer.character, cb: () => void = null) {
        const gid = char.gameObjectId
        if (!this.allActonMap.has(gid)) {
            this.allActonMap.set(gid, { curAction: null, inteval: null, actions: [] })
        }
        const curAction = this.allActonMap.get(gid).curAction
        // console.log("jkjkjkjkj1", cfgId, curAction?.ID)
        if (curAction && curAction.ID == cfgId) {
            return;
        }
        let cfg = GameConfig.Action.getElement(cfgId);
        if (cfg == null) return;
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

    private static getAction(cfgId: number, char: mw.Character = Player.localPlayer.character) {
        const gid = char.gameObjectId
        let info = this.allActonMap.get(gid)
        let vec = info.actions
        let action = vec.find(e => e.cfgId == cfgId);
        if (!action) {
            action = new CharAction();
            action.init(char, cfgId);
            vec.push(action)
            this.allActonMap.set(gid, info)
        }
        return action;
    }

    public static stopFlag: number = 0;
    public static stopAction(cfgId: number, gid: string = Player.localPlayer.userId) {
        if (!this.allActonMap.has(gid))
            return
        let info = this.allActonMap.get(gid)
        // console.log("jkjkjkjkj2", cfgId, info && info.curAction.ID, cfgId)
        if (info.curAction && info.curAction.ID == cfgId) {
            this.getAction(cfgId, info.actions[0].owner).stop();
            info.curAction = null;
        }
        if (info.inteval) return;
        info.inteval = setInterval(() => {
            if (this.stopFlag == 0) return;
            if (Date.now() - this.stopFlag > 800) {
                Event.dispatchToLocal("ActionStop", gid);
                this.stopFlag = 0;
            }
        }, 1000)
    }

}