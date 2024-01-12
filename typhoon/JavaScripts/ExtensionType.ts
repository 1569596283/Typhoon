import { MyUIManager } from "./MyUIManager";

global.UIManager = MyUIManager.instance
export class MyAction extends mw.Action { };
export class MyAction1<T> extends mw.Action1<T>{ };
export class MyAction2<T, U> extends mw.Action2<T, U>{ };
export class MyAction3<T, U, V> extends mw.Action3<T, U, V>{ };

export class Tween<T> extends mw.Tween<T>{ };

export const EffectManager = EffectService;
export const TimeUtil = mw.TimeUtil;
export const GoPool = mwext.GameObjPool;
export const AdsService = mw.AdsService;

let myPlayerID: number = null;
export function getMyPlayerID() {
    if (SystemUtil.isServer()) return 0
    if (!myPlayerID) {
        const player = Player.localPlayer;
        const playerID = player?.playerId;
        if (playerID) myPlayerID = playerID
        else return 0
    }
    return myPlayerID;
}

let myCharacterGuid: string = null;
export function getMyCharacterGuid() {
    if (SystemUtil.isServer()) return ""
    if (!myCharacterGuid) {
        const player = Player.localPlayer;
        const characterGuid = player?.character?.gameObjectId
        if (characterGuid) myCharacterGuid = characterGuid
        else return ""
    }
    return myCharacterGuid;
}