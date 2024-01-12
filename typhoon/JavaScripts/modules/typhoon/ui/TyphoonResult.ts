import { GameConfig } from "../../../config/GameConfig";
import { EventsName } from "../../../const/GameEnum";
import TyphoonResult_generate from "../../../ui-generate/typhoon/TyphoonResult_generate";

export default class TyphoonResult extends TyphoonResult_generate {

	protected onStart(): void {

		this.buttonWin.onClicked.add(() => {
			UIManager.hide(TyphoonResult);
		})
		Event.addLocalListener(EventsName.SetTime, this.setTime);
	}

	/**
	 * 
	 * @param win 是否胜利
	 * @param floor 摧毁了几层
	 * @param name 台风名称
	 * @param nextTiime 下一场台风还有多久到
	 */
	protected onShow(win: boolean, floor: number, name: string, nextTiime: number): void {
		if (!win && !floor && !name && !nextTiime) {
			return;
		}
		this.textFloor.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_10.Value, floor);
		if (win) {
			this.textTyphoon.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_11.Value, name);
		} else {
			this.textTyphoon.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_12.Value, name);
		}
		this.setTime(nextTiime);
	}

	/**
	 * 设置时间
	 * @param time 下次台风到来剩余时间
	 */
	private setTime = (time: number) => {
		this.textNext.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_13.Value, time);

	}
}
