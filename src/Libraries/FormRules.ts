
export class FormRules {


  latRules(val: any): string {
    return isNaN(val) ? val.replace(/[^\d]+/g, "") : val;
  }

  longRules(val: any): string {
    return isNaN(val) ? val.replace(/[^\d]+/g, "") : val;
  }

}
