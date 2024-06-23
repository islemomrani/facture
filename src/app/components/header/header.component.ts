import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode} from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  isLoggedIn(){
    let token=sessionStorage.getItem('jwt');
    if (token) {
       this.user =jwtDecode(token);
    }
    return !!token;
  }

  logout(){
    sessionStorage.removeItem('jwt');
  this.router.navigate(['']);
  }

}
