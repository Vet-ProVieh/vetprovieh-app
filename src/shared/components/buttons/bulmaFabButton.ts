
import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";

@WebComponent({
    template: VetproviehElement.template + `
                <style>
                  .button.is-floating{
                      position:fixed;
                      width:60px;
                      height:60px;
                      top:10px;
                      right:10px;
                      border-radius:100px;
                      text-align:center;
                      font-size:1.6rem;
                      box-shadow:0 .0625em .125em rgba(10,10,10,.05);
                      z-index:1000
                    }
                    .button.is-floating.is-large{width:90px;height:90px;font-size:2.6rem}
                    .button.is-floating.is-medium{width:75px;height:75px;font-size:2.2rem}
                    .button.is-floating.is-small{top:20px;right:20px;width:25px;height:45px;font-size:1.2rem;border-radius:50px}
                </style>
               <a href="\${this.href}" type="button" class="button is-floating is-warning is-\${this.size}">
                    <i class="fas \${this.icon}"></i>
               </a>`,
    tag: 'bulma-fab-button'
})
export class BulmaFabButton extends VetproviehElement {

    private _icon: string = "";
    private _size: string = "medium";
    private _href: string = "";

    /**
     * Icon from Fontawesome to show
     * @property icon
     */
    public get icon(): string {
        return this._icon;
    }

    public set icon(v: string) {
        if (v !== this._icon) {
            this._icon = v;
        }
    }

    /**
     * Rendering Element
     */
    public render() {
        super.render();
    }

    /**
     * Size of Fab-Button
     * @property size
     */
    public get size(): string {
        return this._size;
    }
    public set size(v: string) {
        if (this._size !== v) {
            this._size = v;
        }
    }


    /**
     * Link to next element
     * @property {string}
     */
    public get href(): string {
        return this._href;
    }
    public set href(v: string) {
        if (this.href !== v) {
            this._href = v;
        }
    }



    /**
     * Observed Attributes
     * @return {Array<string>}
     */
    static get observedAttributes() {
        return ['icon', 'size', 'href']
    }

}