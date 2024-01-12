import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { BuffType } from "../../const/GameEnum";
import { single } from "../../utils/GameUtils";
import BuffScript from "./BuffScript";

@single()
export default class BuffMgr {
    public static readonly instance: BuffMgr = null;
    /** 
     * 玩家和buff的映射
     */
    private playerMap: Map<number, IBuff[]> = new Map();

    /**
     * 未玩家添加buff
     * @param playerID 玩家ID
     * @param buffType buff类型
     * @param time buff持续时间
     */
    public addBuff(playerID: number, buffType: BuffType, time: number) {
        let buffArr = this.playerMap.get(playerID);
        if (!buffArr) {
            buffArr = [];
            this.playerMap.set(playerID, buffArr);
        }
        let buff = buffArr.find(buff => buff.type == buffType);
        if (buff) {
            buff.time = time;
        } else {
            let player = Player.getPlayer(playerID);
            let effect: number = 0;
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
    playerLeave(playerID: number) {
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
    private clearBuff(playerID: number, buffType: BuffType) {
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
    private setBuff(character: Character, type: BuffType) {
        let effect = 0;
        switch (type) {
            case BuffType.Speed:
                character.maxWalkSpeed = 800;
                effect = EffectService.playOnGameObject("219369", character, { loopCount: 0, position: new Vector(0, 0, -50) })
                break;
            case BuffType.Jump:
                character.maxJumpHeight = 1000;
                effect = EffectService.playOnGameObject("153608", character, { loopCount: 0, position: new Vector(0, 0, -50) })
                break;
        }
        return effect;
    }

    /**
     * 获得随机的位置
     * @returns 随机到的位置
     */
    public getRandomLoc() {
        let loc: Vector = Vector.zero;
        loc.x = Math.random() * 8000 - 4000;
        loc.y = Math.random() * 7000 - 5000;
        loc.z += 1000;
        let end = loc.clone();
        end.z -= 2000;

        const res = QueryUtil.lineTrace(loc, end, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (PlayerManagerExtesion.isCharacter(element.gameObject)) continue;
            loc = element.position;
            break;
        }
        return loc;
    }

    /**
     * 创建所有buff
     */
    public createAllBuff() {
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
        }, 500)
    }

    /**
     * 创建buff
     * @param type buff类型
     */
    private async createBuff(type: BuffType) {
        let buff = await mw.Script.spawnScript(BuffScript, true);
        // buff创建出来之后，要等buff里创建出来触发器，然后在设置
        setTimeout(() => {
            buff.type = type;
            let loc = this.getRandomLoc();
            buff.setLocation(loc);
        }, 1000);
    }

    onUpdate(dt: number) {
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
}

/**
 * buff接口
 */
interface IBuff {
    /** buff类型 */
    type: BuffType;
    /** buff剩余时间 */
    time: number;
    /** 特效管理id */
    effect: number;
}