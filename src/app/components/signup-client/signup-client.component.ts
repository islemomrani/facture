import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent implements OnInit {
  signupForm!: FormGroup;
  path!: string;
  title!: string;
  imagePreview: any;

  constructor(private fBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.path = this.router.url;
    if (this.path == '/inscription') {
      this.title = "S'inscrire Client :";
    } else {
      this.title = "S'inscrire AgentComptable :";

    }
    if (this.path == '/inscriptionAdmin') {
      this.title = "S'inscrire Admin :";

    }

    this.signupForm = this.fBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      picture: [''],




    })
  }


  //pour ajouter images:
  onImageSelected(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ picture: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }





  signup() {
    let user = this.signupForm.value;
    console.log('here signup',user);
    
    if (this.path == '/inscription') {
      user.role = 'client';
    } else {
      user.role = 'agent comptable';

    }
    if (this.path == '/inscriptionAdmin') {
      user.role = 'admin';
    }
    this.userService.addUser(user, this.signupForm.value.picture).subscribe((data) => {
      console.log('hre isss new', data);
    })

    this.router.navigate(['connecter']);

    this.showAlert();
  }



  showAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Bienvenue dans notre famille",
      showConfirmButton: false,
      timer: 1500
    });
  }





}
