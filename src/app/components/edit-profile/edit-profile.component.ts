import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!:FormGroup;
  decoded:any;
  constructor(private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);

    }
    this.profileForm=this.formBuilder.group({
      phone:[''],
      oldPassword:['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      newPassword:['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
    })
  }

  editProfile(){
    this.profileForm.value.userId=this.decoded._id;
    console.log('here obj recupérer',this.profileForm.value);
    
    this.userService.editProfile(this.profileForm.value).subscribe((res) => {
      console.log("here edit profile",res.msg);


    });
    this.showAlert();
  }

  mustMatch(): boolean {
    return this.profileForm.value.newPassword != this.profileForm.value.confirmPassword;
  }
  showAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "éditer avec succès",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
