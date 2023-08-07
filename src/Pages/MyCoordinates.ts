import { PageElements } from "../Config/MyCoordinatesConfig";
import { Page } from "../Entites/Page";
import { PageService } from "../Services/PageService";
import { FormRules } from "../Libraries/FormRules";
import { LocalStorage } from "../Services/LocalStorage";

const formLocation = document.querySelector(PageElements.extra.formLocation) as HTMLInputElement;
const locationsTable = document.querySelector(PageElements.extra.locationTable) as HTMLTableElement;
const currentLocation = document.querySelector(PageElements.extra.currentLocation) as HTMLButtonElement;
//let removeButtons = document.querySelectorAll(PageElements.extra.removeButton) as NodeListOf<HTMLButtonElement>;



const myCoordinates = new PageService(PageElements);
const rules = new FormRules();
let db = new LocalStorage();



myCoordinates.page().form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
      latitude: Number(myCoordinates.page().formLat?.value),
      longitude: Number(myCoordinates.page().formLong?.value),
      location: formLocation?.value
    };
    db.insertData(data);
    loadTable(0);
    (e.target as HTMLFormElement).reset();
});

currentLocation.addEventListener("click", (e) => {
  e.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(item){
      let data = {
        latitude: Number(item.coords.latitude.toFixed(4)),
        longitude: Number(item.coords.longitude.toFixed(4)),
        location: "My Location",
      };
      db.insertData(data);
      loadTable(0);
    });
  }
  else
  {
    alert("Hizmet desteklenmiyor");
  }

});


myCoordinates.page().formLat?.addEventListener("input", (e) => {
    let input = e.target as HTMLInputElement;
    input.value = rules.latRules(input.value);
});

myCoordinates.page().formLong?.addEventListener("input", (e) => {
    let input = e.target as HTMLInputElement;
    input.value = rules.longRules(input.value);
});

let loadTable = (id:number = 0) => {
    let items = db.getLocation(id);
    let row = "";

    items.forEach(item => {
        row += `
        <tr>
        <td>${item.location}</td>
        <td>${item.latitude}</td>
        <td>${item.longitude}</td>
        <td><label class="badge badge-danger remove-button" row-id="${item.id}">Sil</label></td>
        </tr>
        `;
    });

    locationsTable.innerHTML = row;
    initializeRemoveButtons();
};




function initializeRemoveButtons() {
  let removeButtons = document.querySelectorAll(
    PageElements.extra.removeButton
    ) as NodeListOf<HTMLButtonElement>;
    
    removeButtons.forEach((item) => {
      item.addEventListener("click", (e) => {
        let id = (e.target as HTMLElement).getAttribute("row-id");
        db.deleteData(Number(id));
        loadTable(0);
        alert("mşmşmş");
      });
    });
}





(function () {
  myCoordinates.setTitle().setBreadcrumb();
  loadTable(0);
})();