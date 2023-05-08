import { Component, OnInit } from '@angular/core';
import { CountriesApiService } from '../services/countries-api.service';
import { CountryModel } from '../models/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit{
  countries: CountryModel[] = [];

  constructor(private countriesApi: CountriesApiService){

  }

  ngOnInit(): void {
    this.countriesApi.getAll().subscribe(res => {
      console.log(res);
      this.countries = res.map((country:any) => {
        return {
          id: country.id,
          name: country.name,
          capital: country.capital.name,
          continent: country.continent,
          population: country.population
        }
      })
    });
  }

  update(): void{
    console.log("UPDATE!!!!")
  }

}
