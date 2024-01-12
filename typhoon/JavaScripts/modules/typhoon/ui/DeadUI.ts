import { GameConfig } from "../../../config/GameConfig";
import DeadUI_generate from "../../../ui-generate/typhoon/DeadUI_generate";


export default class DeadUI extends DeadUI_generate {

	protected onShow(name: string): void {
		if (!name) {
			return;
		}
		this.text.text = StringUtil.format(GameConfig.SquareLanguage.Typhoon_Ts_9.Value, name);
	}
}
