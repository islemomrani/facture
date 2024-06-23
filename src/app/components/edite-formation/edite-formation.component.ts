import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edite-formation',
  templateUrl: './edite-formation.component.html',
  styleUrls: ['./edite-formation.component.css']
})
export class EditeFormationComponent implements OnInit {
  editForm!:FormGroup;
  formation:any={};
  id!:number;
  constructor(private activatedRoute:ActivatedRoute , private formationService:FormationService , private router:Router) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.getFormationById();
  }
getFormationById(){
  this.formationService.getFormationById(this.id).subscribe((data)=>{
    console.log('dataaaa',data)
    this.formation=data.formation;
  })
}

  edit(){
this.formationService.editFormation(this.formation).subscribe((data)=>{
  console.log('here after edit',data.message)
  this.router.navigate(['admin']);
});
this.showAlert()
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
