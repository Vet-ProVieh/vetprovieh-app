import {VetproviehElement, WebComponent} from '@vetprovieh/vetprovieh-shared';
import {Drugtreatment} from '..';

// eslint-disable-next-line new-cap
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

/**
  * Component for displaying Drugtreatmens as list
  */
export class DrugtreatmentList extends VetproviehElement {
  /**
   * Return table-Body
   * @return {HTMLTableSectionElement}
   */
  private get tableBody() :HTMLTableSectionElement {
    const tableBody = this.shadowRoot?.getElementById('tableBody');
    return tableBody as HTMLTableSectionElement;
  }

  /**
   * Append a treatment
   * @param {DrugTreatment} drugtreatment
   */
  public appendTreatment(drugtreatment: Drugtreatment) {
    const row: HTMLTableRowElement = this.tableBody.insertRow();
    const cell0: HTMLTableCellElement = row.insertCell(0);
    const cell1: HTMLTableCellElement = row.insertCell(1);
    const cell2: HTMLTableCellElement = row.insertCell(2);
    const cell3: HTMLTableCellElement = row.insertCell(3);
    const cell4: HTMLTableCellElement = row.insertCell(4);
    const cell5: HTMLTableCellElement = row.insertCell(5);
    if (drugtreatment.id != undefined) {
      cell0.textContent = drugtreatment.id?.toString();
    }
    cell1.textContent = drugtreatment.treatmentDate;
    if (drugtreatment.barn != undefined) {
      cell2.textContent = drugtreatment.barn?.farmer.name;
    }
    cell3.textContent = drugtreatment.amount + ' ' +
    drugtreatment.drugs[0].dose;
    cell4.textContent = drugtreatment.drugs[0].name;
    if (drugtreatment.isReported) {
      cell5.textContent = 'ja';
    } else {
      cell5.textContent = 'nein';
    }
  }
}
