import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";


@WebComponent({
    template: `
        <li class="is-active">
            <a>
                <span class="icon is-small"><i class="fas \${this.icon}" aria-hidden="true"></i></span>
                <span>\${this.displayName}</span>
            </a>
        </li>
    `,
    tag: 'bulma-tab-element'
})
export class BulmaTabElementComponent extends VetproviehElement {
    private _active: boolean = false;
    public icon: string | undefined;
    public name: string | undefined;
    public displayName: string | undefined;

    constructor(element: BulmaTabElement) {
        super();
        if (element) {
            this.icon = element.icon;
            this.name = element.name;
            this.displayName = element.displayName;
        }
    }

    public set active(v: boolean) {
        if (this._active !== v) {
            this._active = v;
            if (v) this.listElement.classList.add("is-active");
            else this.listElement.classList.remove("is-active");
        }
    }

    public get active(): boolean {
        return this._active;
    }

    connectedCallback() {
        this.registerEventListeners();
    }

    private get listElement(): HTMLLIElement {
        return this.shadowRoot?.querySelector("li") as HTMLLIElement;
    }

    private registerEventListeners() {
        this.listElement.addEventListener("click", (x) => {
            this.dispatchEvent(new CustomEvent("selected",
                {
                    detail: {
                        name: this.name
                    }
                }));
        })
    }
}

export class BulmaTabElement {
    public icon: string | undefined;
    public name: string | undefined;
    public displayName: string | undefined;
}


@WebComponent({
    template: `
        <div class="tabs is-toggle is-fullwidth is-large">
            <ul id="tabElements">
            </ul>   
        </div>  
    `,
    tag: "bulma-tab"
})
export class BumlaTabComponent extends VetproviehElement {

    private _tabElements: BulmaTabElement[] = [];

    private _current: string = "";

    public set current(v: string) {
        if (this._current !== v) {

        }
    }

    public get current(): string {
        return this._current;
    }

    public set tabElements(v: BulmaTabElement[]) {
        if (this._tabElements !== v) {
            this._tabElements = v;
            this.renderTabElements();
        }
    }

    /**
     * Adding new Element to Content
     * @param {BulmaTabElement} tab 
     */
    public appendTab(tab: BulmaTabElement) {
        let newElement = new BulmaTabElementComponent(tab);
        this.tabElementsContainer.append(newElement);
    }

    /**
     * Rendering Tab Element
     */
    private renderTabElements() {
        this._tabElements.forEach((element: BulmaTabElement) => this.appendTab(element));
    }

    /**
     * Tab-Elemente laden
     * @return {HTMLUListElement}
     */
    private get tabElementsContainer(): HTMLUListElement {
        return this.getByIdFromShadowRoot("tabElements") as HTMLUListElement;
    }

    private get tabElementComponents(): NodeListOf<BulmaTabElementComponent> | undefined {
        return this.shadowRoot?.querySelectorAll("bulma-tab-element");
    }

    /**
     * Tab-Buttons registrieren. 
     */
    private registerTabEvents() {
        this.tabElementComponents?.forEach((a: BulmaTabElementComponent) => {
            if (a) {
                a.addEventListener("selected", (event) => {
                    this.activateTabAnchor(a);
                    this.deactiveTabAnchors(a);
                });
            }
        })
    }

    /**
     * Mark Anchor as activated and remove hidden vor Tab
     * @param {BulmaTabElementComponent} a 
     */
    private activateTabAnchor(a: BulmaTabElementComponent) {
        a.active = true;
    }

    /**
     * Mark Tab-Anchor as not active and hide other Elements
     * @param {BulmaTabElementComponent} a 
     */
    private deactiveTabAnchors(a: BulmaTabElementComponent) {
        let showId = a.dataset.id;
        this.tabElementComponents?.forEach((otherA) => {
            if (otherA !== a) {
                let showCatId = otherA.dataset.id;
                otherA.active = false;

            }
        }, false);
    }


}
