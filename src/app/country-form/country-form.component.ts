import { Component, Optional, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CountryModel } from '../models/country.model';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit{
  countryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    capital: new FormControl('', Validators.required),
    continent: new FormControl('', Validators.required),
    population: new FormControl('', Validators.required)
  })

  currentCountry: CountryModel;

  constructor(
    public dialogRef: MatDialogRef<CountryFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:CountryModel
  ){
    console.log(data);
    this.currentCountry = data;
  }

  ngOnInit(): void {
    this.countryForm.controls.name.setValue(this.currentCountry.name);
    this.countryForm.controls.capital.setValue(this.currentCountry.capital);
    this.countryForm.controls.continent.setValue(this.currentCountry.continent);
    this.countryForm.controls.population.setValue(this.currentCountry.population.toString());
  }

  onSubmit(){
    console.log("submit");
    const updatedCountry ={
      name: this.countryForm.controls.name.getRawValue(),
      capital: {
        name: this.countryForm.controls.capital.getRawValue()
      },
      continent: this.countryForm.controls.continent.getRawValue(),
      population: this.countryForm.controls.population.getRawValue(),
    }
    this.dialogRef.close({event:'submit', data: updatedCountry})
  }

  cancel():void {
    this.dialogRef.close();
  }
}
