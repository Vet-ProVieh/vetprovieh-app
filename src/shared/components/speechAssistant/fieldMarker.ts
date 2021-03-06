import { VetproviehElement } from "@tomuench/vetprovieh-shared/lib";


export class FieldMarker {



    public markField(name: string, final: boolean): any {
        console.log(`Marking field: ${name}`);
        let fields = (document.getElementById("detail") as VetproviehElement).shadowRoot?.querySelectorAll("textarea, input");

        let f;
        fields?.forEach((field: any) => {
            if (field.name.toLocaleLowerCase() === name) {
                field.classList.add("is-link");
                f = field;

                if (final) {
                    setTimeout(() => {
                        field.classList.remove("is-link");
                    }, 1000);
                }
            }
        })
        return f;
    }
}