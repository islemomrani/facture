import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg: string = '';
  constructor(private fBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  login() {
    let user = this.loginForm.value;
    this.userService.login(user).subscribe((data) => {

      if (data.msg == 'welcome') {
        sessionStorage.setItem('jwt', data.user);
        let decoded: any = jwtDecode(data.user);

        if (decoded.role == 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['/']);

        }
        if (data.user.role == 'agent comptable') {
          this.router.navigate(['agentComptable']);

        }
      } else {
        this.errorMsg = 'vérifier email/pwd'
      }
    })
  }
}
