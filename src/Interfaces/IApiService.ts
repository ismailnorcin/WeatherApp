import { apiResult } from "../Entites/Api";

export interface IApiService{

    url(): string;
    fetch(): string;
    getResult(): apiResult | string;

}