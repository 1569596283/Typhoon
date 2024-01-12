import BoardWorldUI_generate from "../../../ui-generate/board/BoardWorldUI_generate";


export default class BoardWorldUI extends BoardWorldUI_generate {
    /** 设置当前进度 */
    public setNowProgress(str: string) {
        this.textNowProgress.text = str;
    }
}