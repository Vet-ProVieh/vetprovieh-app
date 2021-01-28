import { VetproviehNavParams } from "@tomuench/vetprovieh-shared/lib";
import { VetproviehDetail } from "../../../app/main";


export class BasicShowPage extends HTMLElement {


    public connectedCallback() {
        this.beforeDataLoaded();
        this.detailElement.addEventListener("loadeddata", (event: any) => {
            this.afterDataLoaded();
        });
    }

    /**
     * CurrentObject is already saved?
     * @return {boolean}
     */
    protected get currentObjectIsNotPersisted() : boolean {
        return this.currentObject.id == null || this.currentObject.id == undefined;
    }


    /**
     * Lifecycle to Override
     * Executed before Data is loaded
     */
    protected beforeDataLoaded() {
        console.debug("BasicShowPage: beforeDataLoaded Executed");
    }

    /**
     * Lifecycle to Override
     * Executed after Data is loaded
     */
    protected afterDataLoaded() {
        console.debug("BasicShowPage: afterDataLoaded Executed");
    }


    /**
     * Maximale Position ermitteln
     * @return {number}
     */
    protected maxPosition(positions: Array<any> = []) : number {
        console.log("maxPosition");

        if(positions.length == 0){
            return 1;
        } else {
            return Math.max(...positions.map((p: any) => p.position)) + 1;
        }
    }

    /**
     * Setting URL-Parameter to Object
     * @param {string} param 
     * @param {any} obj 
     * @param {string} attribute 
     */
    protected setUrlParameter(obj: any, param: string, attribute: string, transformFunction: Function | undefined = undefined ){
        let paramValue = VetproviehNavParams.getUrlParameter(param);
        if(paramValue) {
            console.info(`Found UrlParameter '${param}'. Value -> ${paramValue}`)
            if(transformFunction){
                this.currentObject[attribute] = transformFunction(paramValue);    
            } else {
                this.currentObject[attribute] = paramValue;    
            }
            
        }
    }

    /**
     * Getting CurrentObject from DetailElement
     * @return {any}
     */
    protected get currentObject() : any {
        return this.detailElement.currentObject;
    }

    /**
     * Load Detail-Element from DOM
     * @return {VetproviehDetail}
     */
    protected get detailElement(): VetproviehDetail {
        return document.getElementsByTagName("vetprovieh-detail")[0] as VetproviehDetail;
    }
}