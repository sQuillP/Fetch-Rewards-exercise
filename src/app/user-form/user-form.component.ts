import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/APIModels';
import { FetchRewardsService } from '../services/fetch-rewards.service';
import { validatePassword } from '../validators/form.validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  passwordInputType:string = 'password'
  timeout:any;
  shakeTimeout:any;
  shakeForm:boolean = false;
  isLoading:boolean = false;
  showNetworkError:boolean = false;

  /* It is better to use observables for displaying asynchronous data. */
  occupationAndState$:Observable<any>;


  /* Form group fields for creating a new user */
  createUser:FormGroup = new FormGroup({
    fullName: new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(8), validatePassword]),
    occupation: new FormControl("",[Validators.required]),
    state: new FormControl("",[Validators.required])
  });


  /* Call occupation and state info API when component is initialized.
  Note that because this operation is asynchronous, the dropdown form fields will
  not appear until the request has been completed. */
  constructor(
    private router:Router,
    private fetchService:FetchRewardsService
  ) { 
    this.occupationAndState$ = this.fetchService.getOccupationAndStateInfo();
  }



  /* Validate form fields and call API to submit data. */
  onSubmit(event):void{
    event.preventDefault();
    if(this.createUser.status.toLowerCase() === 'invalid'){
      this.toggleShake();
      this.createUser.reset();
      return;
    }

    const createdUser:User =  {
      name: this.createUser.get('fullName').value,
      email: this.createUser.get('email').value,
      password: this.createUser.get('password').value,
      occupation: this.createUser.get('occupation').value,
      state: this.createUser.get('state').value
    }
    this.isLoading = true;

    this.createNewUser(createdUser).then((user:User)=> {
      this.router.navigateByUrl("/create-user/success", {state: user});
    });
  }


  /* Return one error at a time for each input field. This de-clutters
  the number of errors shown on the inputs. */
  getUserError(field:string):string{
    const error:string = Object.keys(this.createUser.get(field).errors)[0];
    if(error === 'required')
      return "This field is required";

    if(error === 'minlength')
      return "must be at least 8 characters long";

    if(error === "email")
      return "Please provide a valid email";

    if(error === "invalidPasswordFormat")
      return "need uppercase, number and special character";
  }


  /* Shake the input */
  toggleShake():void{
    if(this.timeout)
      clearTimeout(this.timeout);
    this.shakeForm = true;
    this.timeout = setTimeout(()=>{
      this.shakeForm = false;
    },500);
  }


  /* Call api and create a 1 second delay to play the animation. I know this is 
  VERY studpid to implement into production grade code however, but because this is an 
  assignment, I chose to do it for the sake of demonstration.
  You cannot navigate inside a subscribe() call so I made this method 
  return a promise.*/
  createNewUser(createdUser):Promise<User> {
    if(this.timeout)
      clearTimeout(this.timeout);
    return new Promise((resolve, reject)=> {
      this.timeout = setTimeout(() => {
        this.fetchService.createUser(createdUser)
        .subscribe((response)=> {
          this.isLoading = false;
          if(response.status !== 201 || !response.ok){
            this.showNetworkError = true;
            return;
          }
          resolve(response.body);
        });
      }, 1000);
    });
  }


  /* Return true if the form input was touched and if it is invalid */
  hasError(form): boolean {
    return this.createUser.get(form).touched && !this.createUser.get(form).valid;
  }


}
