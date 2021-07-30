
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";

const STAR_FULL: string = "fas fa-star";
const STAR_OPEN: string = "far fa-star";

@WebComponent({
    template:
        VetproviehElement.template +
        ` 
    <style>
        #content {
            color: red;
            cursor: pointer;
        }
    </style>

    <div id="content"> 
    </div>
    `,
    tag: "vp-stars",
})

export class StarsComponent extends VetproviehElement {

    private _score: number = 0;
    private _amount: number = 5;

    connectedCallback(){
        this.render();
        this.renderCurrentState();
        this.registerHoverEvents();
        this.registerClickEvents();
    }

    render(){
        super.render();
        for(let i=0; i<this._amount; i++){
            this.wrapper.innerHTML += `<i class="far fa-star"></i>`;
        }
    }

    
    /*  FILL ALL STARS UNTIL THE HOVERED ONE AND GO
        BACK TO CURRENT STATE AFTER LEAVING WRAPPER
    */
    private registerHoverEvents(){
        this.stars.forEach((node, i)=>{
            node.addEventListener("mouseover",()=>{
                this.stars.forEach((star, j)=>{
                    if(j <= i){
                        star.className = STAR_FULL;
                    }else{
                        star.className = STAR_OPEN;
                    }
                })
            });
        });
        this.wrapper.addEventListener("mouseleave", ()=>{
            this.renderCurrentState();
        });
    }

    /* RENDER CURRENT STATE DEPENDING ON this._score */
    private renderCurrentState(){
        this.stars.forEach((node, i)=>{
            if(i < this._score){
                (node as HTMLElement).className = STAR_FULL;
            }else{
                (node as HTMLElement).className = STAR_OPEN;
            }
        });
    }

    /* SET VALUE FOR this._score DEPENDING ON STAR */
    private registerClickEvents(){
        this.stars.forEach((node, index)=>{
            (node as HTMLElement).addEventListener("click", ()=>{
                this._score = index+1;
            })
        });
    }

    static get observedAttributes() {
        return ['amount'];
    }

    public set amount(val: number | undefined) {
        (val != undefined) ? this._amount = val : this._amount = 5;
    }

    public get amount() {
        return this._amount;
    }

    public set score(val: number) {
        this._score = val;
    }

    public get score() {
        return this._score;
    }

    private get wrapper(){
        return this.getByIdFromShadowRoot("content") as HTMLElement;
    }
    
    private get stars(){
        return this.wrapper.querySelectorAll('i');
    }

}
