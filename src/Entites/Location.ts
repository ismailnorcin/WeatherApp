// Location Object Details

interface Weather{
    main: string,
    description: string,
    icon: string
}



export class LocationEntity {

    private _id: number = 0;
    private _forecastType: string;
    private _latitude: number = 0;
    private _longitude: number  = 0;
    private _location: string = '';
    private _humidity: number  = 0;
    private _weather!: Weather;

    constructor( type: "minutely" | "hourly" | "daily" | "current" = "current"){
        this._forecastType = type;
    }


    set id(val: number){
        this._id = val;
    }

    set latitude(val: number){
        this._latitude = val;
    }

    set longitude(val: number){
        this._longitude = val;
    }

    set location(val: string){
        this._location = val;
    }

    set humidity(val: number){
        this._humidity = val;
    }

    set weather(val: Weather){
        this._weather = val;
    }

    get requestType(): string{
        return this._forecastType;
    }

    get id(): number{
        return this._id;
    }

    get latitude(): number{
        return this._latitude;
    }

    get longitude(): number{
        return this._longitude;
    }

    get location(): string{
        return this._location.charAt(0).toUpperCase() + this._location.slice(1);
    }

    get humidity(): string{
        return this._humidity.toString() + "%";
    }

    get weather(): Weather{
        return this._weather;
    }

    get locationObject(){
        return {
            id: this._id,
            latitude: this._latitude,
            longitude: this._longitude,
            location: this._location,
            humidity: this._humidity,
            weather:this.weather
        };
    }
}
