import { IApiService } from "../Interfaces/IApiService";
import { Api, apiResult } from "../Entites/Api";



export class ApiService implements IApiService{
    
    private _api: Api;

    constructor(api: Api){
        this._api = api;
    }

    url(): string {
        let {baseUrl, latitude, longitude} = this._api;
        let url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`;
        return url;
    }

    fetch(): any{
        let result;
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.url(), false);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                result = xhttp.response;
            }
        };
        xhttp.onerror = () => {
        throw new Error("Error 1");
        };
        xhttp.send();    

        return result;
    }

    getResult(): apiResult | string{

        try {
            let data = JSON.parse(this.fetch());
            
            return {
                now:{
                    temperature: data.current_weather.temperature,
                    date: data.current_weather.time,
                    temperatureType: data.daily_units.temperature_2m_max
                },
                dailiy:{
                    temperaturesMax: data.daily.temperature_2m_max,
                    temperaturesMin: data.daily.temperature_2m_min,
                    dates: data.daily.time,
                    temperatureType: data.daily_units.temperature_2m_max
                }
            }
        } catch (error) {
            return "error";
        }

    }
 

    
}




