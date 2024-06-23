import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-table',
  templateUrl: './formation-table.component.html',
  styleUrls: ['./formation-table.component.css']
})
export class FormationTableComponent implements OnInit {
  foramtionTab:any=[];
   
  constructor(private router:Router , private formationService:FormationService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.activatedRoute.snapshot.params['id'];

    this.getAllFormation();
  }
  getAllFormation(){
    this.formationService.getAllFormation().subscribe((data)=>{
      this.foramtionTab=data.formations;
    })
  }


  editeFormation(id:number){
this.router.navigate([`modifierFormation/${id}`]);
  }


  deleteFormation(id:number){
this.formationService.deleteFormationById(id).subscribe((data)=>{
  this.getAllFormation();
  this.showAlert();
})
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
