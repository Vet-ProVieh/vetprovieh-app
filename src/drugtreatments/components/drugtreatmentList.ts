import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Drugtreatment } from "..";
import { Drug } from "../../drugs";

@WebComponent({
    template: VetproviehElement.template + `
        <table class="table">
            <thead>
                <tr><th>ID</th>
                    <th>Datum</th>
                    <th>Landwirt</th>
                    <th>Anzahl</th>
                    <th>Medikament</th>
                    <th>Gemeldet</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                
            </tbody>
        </table>
            `,
    tag: 'drugtreatment-list',
  })

  /* 
  * Component for displaying Drugtreatmens as list 
  */
  export class DrugtreatmentList extends VetproviehElement {

    render(){
        super.render();
    }

    private get tableBody(){
        return this.shadowRoot?.getElementById("tableBody") as HTMLTableSectionElement;
    }

    public appendTreatment(drugtreatment: Drugtreatment){
        let row: HTMLTableRowElement = this.tableBody.insertRow();
        let cell0: HTMLTableCellElement = row.insertCell(0);
        let cell1: HTMLTableCellElement = row.insertCell(1);
        let cell2: HTMLTableCellElement = row.insertCell(2);
        let cell3: HTMLTableCellElement = row.insertCell(3);
        let cell4: HTMLTableCellElement = row.insertCell(4);
        let cell5: HTMLTableCellElement = row.insertCell(5);
        if(drugtreatment.id != undefined)
        cell0.textContent = drugtreatment.id?.toString();
        cell1.textContent = drugtreatment.treatmentDate;
        if(drugtreatment.barn != undefined)
        cell2.textContent = drugtreatment.barn?.farmer.name;
        cell3.textContent = drugtreatment.amount + " " + drugtreatment.drugs[0].dose;
        cell4.textContent = drugtreatment.drugs[0].name;
        if(drugtreatment.isReported){
            cell5.textContent = "ja";
        }else{
            cell5.textContent = "nein";
        }
        
    }

  }