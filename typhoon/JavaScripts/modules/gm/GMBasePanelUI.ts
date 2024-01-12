import { GMBasePanel } from "module_gm";
import GMItem_Generate from "../../ui-generate/uiTemplate/GM/GMItem_generate";
import GMHUD_generate from "../../ui-generate/uiTemplate/GM/GMHUD_generate";

export default class GMBasePanelUI extends GMBasePanel<GMHUD_generate, GMItem_Generate> {

	constructor() {
		super(GMHUD_generate, GMItem_Generate);
	}


}
