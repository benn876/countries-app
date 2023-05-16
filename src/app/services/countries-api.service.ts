import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {
  private url:string = "http://localhost:8080/countries";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    var result = this.httpClient.get(this.url);
    return result;
  }

  updateCountry(id:string, request: CountryModel): Observable<any> {
    return this.httpClient.put(this.url + "/" + id, request);
  }

  addCountry(request: CountryModel): Observable<any> {
    return this.httpClient.post(this.url , request);
  }

  deleteCountry(id:string): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
}
