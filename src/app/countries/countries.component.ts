import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesApiService } from '../services/countries-api.service';
import { CountryModel } from '../models/country.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CountryFormComponent } from '../country-form/country-form.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id','name', 'capital', 'continent', 'population', 'actions'];
  dataSource: any;

  constructor(private countriesApi: CountriesApiService, private dialogRef: MatDialog){

  }

  ngOnInit(): void {
    this.countriesApi.getAll().subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource<CountryModel>(res.map((country:any) => {
        return {
          id: country.id,
          name: country.name,
          capital: country.capital.name,
          continent: country.continent,
          population: country.population
        }
      }))
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(country?: CountryModel): void{
    const dialogRef = this.dialogRef.open(CountryFormComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: country
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result.event === 'submit' && country){
        this.countriesApi.updateCountry(country.id.toString(), result.data).subscribe();
        location.reload();
      } else if(result.event === 'add'){
        this.countriesApi.addCountry(result.data).subscribe();
      }
    });
  }

  deleteCountry(id: string): void{
    this.countriesApi.deleteCountry(id).subscribe(res=>{
      console.log(res);
      location.reload();
    });
  }

}
