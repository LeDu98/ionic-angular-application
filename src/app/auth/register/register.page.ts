import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  constructor(private authService:AuthService) { }

  ngOnInit() {
    /*this.registerForm=new FormGroup({
      name: new FormGroup(null,Validators.required),
      surname: new FormGroup(null,Validators.required),
      email: new FormGroup(null,[Validators.required,Validators.email]),
      password: new FormGroup(null, [Validators.required, Validators.minLength(8)]),
    });*/
  }

  onRegister(form: NgForm){
    console.log(form);
    this.authService.register(form.value).subscribe(resData=>{
      console.log('Registracija uspela');
      console.log(resData);
    });
  }

}
