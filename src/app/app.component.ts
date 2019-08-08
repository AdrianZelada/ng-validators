import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
function onlyNumbers(control: AbstractControl): { [key: string]: boolean } | null {
  console.log('control.value');
  console.log(control.value);
  // if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
  //   // control.setValue('asdasdas');
  //   return { 'ageRange': true };
  // }
  const pattern = /^\d+$/;
  if (!pattern.test(control.value) && (control.value !== '')) {
    const value = control.value.substring(0, control.value.length - 1);
    control.setValue(value);
    // control.setErrors({
    //   age: true
    // });
    return { notNumbers: true};
  } else {
    // return {notNumbers: false};
  }

  return null;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'controlValueAccesor';
  // control: FormControl = new FormControl('');

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    // this.control.valueChanges.subscribe((data) => {
    //   console.log('data');
    //   console.log(data);
    // });

    this.form = this.fb.group({
      age: new FormControl('', [onlyNumbers]),
      control:  new FormControl('')
    });

    this.form.valueChanges.subscribe((data) => {
      console.log('data data data');
      console.log(data);
      console.log(this.form.controls.age.errors);
      console.log(this.form.controls.age.valid);
    });
  }
}
