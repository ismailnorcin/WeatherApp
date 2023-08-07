import { PageElements } from "../Config/ApiTestConfig";
import { PageService } from "../Services/PageService";
import { FormRules } from "../Libraries/FormRules";
import { ApiService } from "../Services/ApiService";
import { Api, apiResult } from "../Entites/Api";



const apiTestPage = new PageService(PageElements);
const page = apiTestPage.page();
const resultArea = document.querySelector("blockquote");
const pageMessage = document.querySelector(page.message);


(function(){  
    apiTestPage.setTitle().setBreadcrumb();

})();



let rules = new FormRules();

page.form?.addEventListener("submit", (e) => {
  e.preventDefault();

  let lat = page.formLat as HTMLInputElement;
  let long = page.formLong as HTMLInputElement;
  let api = new ApiService(new Api(Number(lat.value), Number(long.value)));

  let resultClass, resultMessage;

  if (api.getResult() === "error") {
    resultClass = "blockquote blockquote-danger";
    resultMessage = "Başarısız";
  } else {
    resultClass = "blockquote blockquote-success";
    resultMessage = "Başarılı";
  }



  if (resultArea) {
    resultArea.className = resultClass;

    if (pageMessage)
    {
      pageMessage.textContent = resultMessage;
    }
  }

});

apiTestPage.page().formLat?.addEventListener("input", (e) => {
  let input = e.target as HTMLInputElement;
  input.value = rules.latRules(input.value);
});

apiTestPage.page().formLong?.addEventListener("input", (e) => {
  let input = e.target as HTMLInputElement;
  input.value = rules.latRules(input.value);
});