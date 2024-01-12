/**
 * @Author       : meta
 * @Date         : 2023-07-13 11:19:18
 * @LastEditors  : meta
 * @LastEditTime : 2023-07-13 11:19:18
 * @FilePath     : \mollywoodschool\JavaScripts\modules\interactModule\InteractUtilUI.ts
 * @Description  : 
 */

import InteractUtil_generate from "../../ui-generate/InteractUtil_generate";

export class InteractUtilUI extends InteractUtil_generate {

    private _interactObj: mw.GameObject
    private _character: mw.Character;
    private _oriRotation: mw.Rotation
    private _oriObjLocation: mw.Vector;
    protected onStart(): void {
        let loc: mw.Vector = mw.Vector.zero
        let objLoc: mw.Vector = mw.Vector.zero
        let rot: mw.Rotation = mw.Rotation.zero
        this._character = Player.localPlayer.character
        this.mBtn.onClicked.add(() => {
            loc.x = Number(this.mPosX.text)
            loc.y = Number(this.mPosY.text)
            loc.z = Number(this.mPosZ.text)
            objLoc.x = Number(this.mObjPosX.text)
            objLoc.y = Number(this.mObjPosY.text)
            objLoc.z = Number(this.mObjPosZ.text)
            rot.x = Number(this.mRotX.text)
            rot.y = Number(this.mRotY.text)
            rot.z = Number(this.mRotZ.text)

            // this._character.localTransform.position = loc
            this._interactObj.worldTransform.position = objLoc
            this._interactObj.worldTransform.rotation = rot;
        })
    }

    protected onShow(interactObj: mw.GameObject): void {
        this._interactObj = interactObj
        this.mID.text = interactObj.name
        this._oriObjLocation = this._interactObj.worldTransform.position.clone()
        this._oriRotation = this._interactObj.worldTransform.rotation.clone()
        this.mPosX.text = "0"
        this.mPosY.text = "0"
        this.mPosZ.text = "0"
        this.mObjPosX.text = this._oriObjLocation.x.toFixed(2).toString()
        this.mObjPosY.text = this._oriObjLocation.y.toFixed(2).toString()
        this.mObjPosZ.text = this._oriObjLocation.z.toFixed(2).toString()
        this.mRotX.text = this._oriRotation.x.toFixed(2).toString()
        this.mRotY.text = this._oriRotation.y.toFixed(2).toString()
        this.mRotZ.text = this._oriRotation.z.toFixed(2).toString()
    }
}