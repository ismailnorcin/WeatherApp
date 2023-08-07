import { IDatabase, dataType } from "../Interfaces/IDatabase";
import { LocationEntity } from "../Entites/Location";

export class LocalStorage implements IDatabase {
  public _data = "data";
  public _locations = "locations";


  supportStorageType(): boolean {
    return (
      !!window.localStorage &&
      typeof localStorage.getItem === "function" &&
      typeof localStorage.setItem === "function" &&
      typeof localStorage.removeItem === "function"
    );
  }

  connectDb(): object {
    if (this.supportStorageType()) {
      return window.localStorage;
    }

    throw new Error("Method not implemented.");
  }

  getLocation(id: number): Array<dataType> {
    
    let db = this.connectDb() as Storage;
    let storedData = db.getItem(this._data)
      ? db.getItem(this._data)
      : JSON.stringify([]);


    if (id === 0) {
        return JSON.parse(storedData!); 
    } else {
        return JSON.parse(storedData!).filter((item: dataType) => {
            return item.id == id;
        });
    }
  }


  insertData(data: {
    latitude: number;
    longitude: number;
    location: string;
  }): void {
    let items;
    let db = this.connectDb() as Storage;
    let storedData = db.getItem(this._data);

    if (storedData !== null) {
      items = JSON.parse(storedData);
    } else {
      items = [];
    }

    let allItemsCount = items.length;
    let lastItemId = allItemsCount > 0 ? items[allItemsCount - 1].id : 0;

    const newData = {
      id: Number(lastItemId) + 1,
      latitude: data.latitude,
      longitude: data.longitude,
      location: data.location,
    };

    items.push(newData);
    db.setItem(this._data, JSON.stringify(items));
  }

  deleteData(id: number): void {
    let db = this.connectDb() as Storage;
    let storedData = db.getItem(this._data);

    if (storedData !== null) {
      let items = JSON.parse(storedData);
      items.forEach((item:any, key:number) => {
        
        if (item.id === id)
        {
          items.splice(key, 1);
        }

      });
      db.setItem(this._data, JSON.stringify(items));
    }
  }
}
