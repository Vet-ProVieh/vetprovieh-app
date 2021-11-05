import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Drug } from "../../drugs";

@WebComponent({
    template: VetproviehElement.template + `
        <table class="table">
            <thead>
                <tr><th>#</th>
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
        const count = this.tableBody.childElementCount+1
        let row: HTMLTableRowElement = this.tableBody.insertRow();
        let cell0: HTMLTableCellElement = row.insertCell(0);
        let cell1: HTMLTableCellElement = row.insertCell(1);
        let cell2: HTMLTableCellElement = row.insertCell(2);
        let cell3: HTMLTableCellElement = row.insertCell(3);
        cell0.textContent = count.toString();
        cell1.textContent = drug.name;
        cell2.textContent = drug.dose;
        cell3.textContent = drug.approvalNumber;
        
    }

  }