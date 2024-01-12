import { GameConfig } from "../config/GameConfig";
import { HudGameUIState } from "../const/GameEnum";
import SettingUI_Generate from "../ui-generate/SettingUI_generate";

export class SettingUI extends SettingUI_Generate {
    protected onStart(): void {
        this.mBtn_Exit.onClicked.add(() => {
            UIManager.hideUI(this);
        })

        Event.addLocalListener("PlayButtonClick", () => {
            this.playSound(31);
        });
        this.soundLogic();
    }

    public async wearHat(bool: boolean) {
        if (bool) {
            this.mHeadText.text = GameConfig.SquareLanguage.Typhoon_Ts_14.Value;
            this.headicon.visibility = mw.SlateVisibility.SelfHitTestInvisible
        } else {
            this.mHeadText.text = GameConfig.SquareLanguage.Typhoon_Ts_15.Value;
            this.headicon.visibility = mw.SlateVisibility.Collapsed
        }
    }

    /**
     * 音效画质设置界面
     */
    private soundLogic() {
        this.mBar_Music.currentValue = SoundService.BGMVolumeScale;
        this.mBar_Music.onSliderValueChanged.add((val: number) => {
            try {
                SoundService.volumeScale = val;
            } catch (error) { }
        });

        this.mBar_Sound.currentValue = SoundService.volumeScale;
        this.mBar_Sound.onSliderValueChanged.add((val: number) => {
            SoundService.BGMVolumeScale = val;
        });
        let defaultCpu = GraphicsSettings.getDefaultCPULevel();
        this.mBar_GraphicsLev.currentValue = defaultCpu
        this.mBar_GraphicsLev.sliderButtonReleaseDelegate.add((val: number) => {
            GraphicsSettings.setGraphicsCPULevel(val);
            GraphicsSettings.setGraphicsGPULevel(val);
        });
    }

    protected onShow(): void {
        UIManager.setUIstate(this, HudGameUIState.HideAll);
    }

    protected onHide(): void {
        UIManager.setUIstate(this, HudGameUIState.Show);
    }

    private async playSound(id: number) {
        let config = GameConfig.Music.getElement(id);
        if (!AssetUtil.assetLoaded(config.MusicGUID)) {
            await AssetUtil.asyncDownloadAsset(config.MusicGUID);
        }
        return SoundService.playSound(config.MusicGUID, 1, config.Music);
    }
}