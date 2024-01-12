// 轴类型
export enum Axis {
	X = 0,
	Y,
	Z,
}

export enum EventsName {
	/** 获得木板 */
	GET_BOARD = "GET_BOARD",
	/** 取消交互 */
	CancelActive = "CancelActive",
	/** 设置时间 */
	SetTime = "SetTime",
	/** 玩家状态 */
	PLAYER_STATE = "PLAYER_STATE",
	/** 获得buff */
	GET_BUFF = "GET_BUFF",
	/** 玩家位置重置 */
	PlayerReset = "PlayerReset",
}
/**
 * 角色状态
 */
export enum PlayerStateType {
	/**正常 */
	None = 1,
	/**和交互物交互 */
	Interaction,
	/**双人动作 */
	DoublePeopleAction,
	/**正在使用技能 */
	isUsingSkill,
	/**繁忙中 */
	Busy,
	/**死亡状态 */
	Dead
}

export enum HudGameUIState {
	/** 显示 */
	Show = 0,
	/** 隐藏所有UI */
	HideAll,
}

export enum TrrigerType {
	None = "0",
	Distance = "1",
	BoxTrigger = "2",
	SphereTrigger = "3",
}

/** buff类型 */
export enum BuffType {
	/** 无 */
	None = 0,
	/** 加速 */
	Speed = 1,
	/** 跳跃 */
	Jump = 2,
}