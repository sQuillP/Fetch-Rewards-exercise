import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/APIModels';

@Component({
  selector: 'app-successful-creation',
  templateUrl: './successful-creation.component.html',
  styleUrls: ['./successful-creation.component.css']
})
export class SuccessfulCreationComponent {


  showPassword:boolean = false;

  /* Asynchronously store user result. */
  createdUser$ = new BehaviorSubject<User>(null);


  /* Grab the state data on initialization */
  constructor(private router:Router) { 
    this.createdUser$.next(
       this.router.getCurrentNavigation().extras.state as User
    )
  }


  /* Toggle password visibility. */
  getUserPassword():string{
    if(!this.showPassword) return "•".repeat(this.createdUser$.getValue().password.length);
    return this.createdUser$.getValue().password;
  }


}
