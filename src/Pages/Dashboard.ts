import { PageElements } from "../Config/DashboardConfig";
import { PageService } from "../Services/PageService";
import { ApiService } from "../Services/ApiService";
import { Api, apiResult } from "../Entites/Api";
import { LocalStorage } from "../Services/LocalStorage";

const totalLocation = document.querySelector(PageElements.extra.myLocationsCount) as HTMLElement;
const lastLocation = document.querySelector(PageElements.extra.lastLocation) as HTMLElement;
const lastLocationCoordinates = document.querySelector(PageElements.extra.lastLocationCoordinates) as HTMLElement;
const selectList = document.querySelector(PageElements.extra.selectLocation) as HTMLSelectElement;
const selectedLocation = document.querySelector(PageElements.extra.selectedLocation) as HTMLElement;
const resultArea = document.querySelector(PageElements.extra.resultArea) as HTMLElement;

let db = new LocalStorage();
let storedData = db.getLocation(0);

const dashboard = new PageService(PageElements);

window.onload = () => {
    let total = storedData.length;
    totalLocation.textContent = total.toString();
    lastLocation.textContent = storedData[total-1].location;
    lastLocationCoordinates.textContent = storedData[total - 1].latitude + " / " + storedData[total - 1].longitude;
    initList();
}

const initList = () => {
    let options = "";
    storedData.forEach(item => {
        let opt = document.createElement("option");
        opt.value = item.id.toString();
        opt.text = item.location.toString();
        selectList.appendChild(opt);
    });
}

selectList.addEventListener("change", (e) => {
    let id = (e.target as HTMLSelectElement).value;
    let location = db.getLocation(Number(id));

    selectedLocation.removeAttribute("style");
    selectedLocation.style.display = "inline-block !important";
    selectedLocation.querySelector("h6")!.textContent = location[0].location;
    selectedLocation.querySelector("p")!.textContent = `${location[0].latitude}, ${location[0].longitude}`;

    let api = new ApiService(
      new Api(location[0].latitude, location[0].longitude)
    );

    let result = api.getResult();
    if (result === "error")
    {
        alert("Bilgi alınamıyor");
        return;
    }
    
    (resultArea.querySelector("pre") as HTMLElement).textContent =
      JSON.stringify(result, null, 10);

});

(function () {
  dashboard.setTitle();
})();


