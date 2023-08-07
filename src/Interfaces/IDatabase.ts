import { LocationEntity } from "../Entites/Location";

export type dataType = {
    id: number, 
    latitude: number, 
    longitude: number, 
    location:string
}

export interface IDatabase {
  supportStorageType(): boolean;
  connectDb(): object;
  getLocation(id?: number | undefined): Array<dataType>;

  insertData(data: {
    id: number;
    latitude: number;
    longitude: number;
    location: string;
  }): void;

  deleteData(id: number): void;
}