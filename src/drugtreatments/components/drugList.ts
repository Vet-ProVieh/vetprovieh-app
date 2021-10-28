import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Drug } from "../../drugs";

@WebComponent({
    template: VetproviehElement.template + `
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Dosierung</th>
                    <th>Zulassungsnummer</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                
            </tbody>
        </table>
            `,
    tag: 'drug-list',
  })
  export class DrugList extends VetproviehElement {

    render(){
        super.render();
    }

    private get tableBody(){
        return this.shadowRoot?.getElementById("tableBody") as HTMLTableSectionElement;
    }

    public appendDrug(drug: Drug){
        let row: HTMLTableRowElement = this.tableBody.insertRow();
        let cell0: HTMLTableCellElement = row.insertCell(0);
        let cell1: HTMLTableCellElement = row.insertCell(1);
        let cell2: HTMLTableCellElement = row.insertCell(2);
        cell0.textContent = drug.name;
        cell1.textContent = drug.dose;
        cell2.textContent = drug.approvalNumber
        
    }

  }