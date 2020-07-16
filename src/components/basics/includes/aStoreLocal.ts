import { VetproviehNavParams } from "@tomuench/vetprovieh-shared";

/**
 * Extension for a Link Tag (a-element)
 */
export class AStoreLocal extends HTMLAnchorElement {


    private _params: any;

    public get params(): any {
        return this._params;
    }

    public set params(v: any) {
        if (this._params != v) {
            this._params = v;
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this._attachClickListener();
    }

    _attachClickListener() {
        var _self = this;

        this.addEventListener("click", (e) => {
            let target = e.target as AStoreLocal;
            VetproviehNavParams.set(target.href, target.params);
        });
    }
}



// Komponente registrieren
customElements.define("local-store", AStoreLocal, { extends: "a" });