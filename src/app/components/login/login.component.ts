import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMinMaxValidators, getLengthValidationError } from 'src/app/utils/validation.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required, ...getMinMaxValidators('password')]
      )
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
  }

  getLengthValidationError(field: string) {
    return getLengthValidationError(field);
  }

}
