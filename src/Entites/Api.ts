export interface apiResult{
    now: {
        temperature: number,
        date: string,
        temperatureType: string
    },
    dailiy: {
        temperaturesMax: number[],
        temperaturesMin: number[],
        dates: string[],
        temperatureType: string
    }
}


export class Api{

    private _baseUrl: string;
    private _latitude: number;
    private _longitude: number;

    constructor(
        latitude: number,
        longitude: number
    ){
        this._baseUrl = "https://api.open-meteo.com/v1/forecast";
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get baseUrl():string{
        return this._baseUrl;
    }

    get latitude(): number{
        return this._latitude;
    }

    get longitude(): number{
        return this._longitude;
    }


}

