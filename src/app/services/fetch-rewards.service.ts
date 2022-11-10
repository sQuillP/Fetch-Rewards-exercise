import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { OccupationAndState, User } from "../models/APIModels";

@Injectable({providedIn:"root"})
export class FetchRewardsService {

    endpoint:string = "https://frontend-take-home.fetchrewards.com/form";

    constructor(private http:HttpClient){}

    /* Call api endpoint to get occupation and state information */
    getOccupationAndStateInfo():Observable<OccupationAndState> {
        return this.http.get<OccupationAndState>(this.endpoint);
    }


    /* POST method for creating a new user */
    createUser(body):Observable<HttpResponse<User>>{
        return this.http.post<User>(this.endpoint,body,{observe:'response'});
    }
}