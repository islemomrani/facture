import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit {
userTab:any=[]; 
  constructor(private router:Router , private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  editUser(id:number){
this.router.navigate([`modifierClient/${id}`]);


  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((result)=>{
      this.userTab=result.users;
    });
  }


deleteUser(id:any){
  this.userService.deleteUser(id).subscribe((result)=>{
    this.getAllUsers();
})
this.showAlert();
}

showAlert(){
  Swal.fire({
    title: "supprimé avec succès",
    icon:"success",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
}
}