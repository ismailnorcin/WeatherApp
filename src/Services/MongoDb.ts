import { IDatabase, dataType } from "../Interfaces/IDatabase";

export class MongoDb implements IDatabase{

    private connectionString;

    constructor(){
        this.connectionString = "mongodb://localhost:27017";
    }

    supportStorageType(): boolean {
        throw new Error("Method not implemented.");
    }
    connectDb(): object {
        throw new Error("Method not implemented.");
    }
    getLocation(id?: number | undefined): dataType[] {
        throw new Error("Method not implemented.");
    }
    insertData(data: { id: number; latitude: number; longitude: number; location: string; }): void {
        throw new Error("Method not implemented.");
    }
    deleteData(id: number): void {
        throw new Error("Method not implemented.");
    }

    
}