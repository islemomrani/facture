import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  decoded:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);
      console.log('here decoded token into profile', this.decoded);

    }
  }


  Profile(){
this.router.navigate(['modifierProfile']);
  }
}
