import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { FormationService } from 'src/app/services/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facture-table',
  templateUrl: './facture-table.component.html',
  styleUrls: ['./facture-table.component.css']
})
export class FactureTableComponent implements OnInit {
factureTab:any=[];
foramtionTab: any = [];
  constructor(private activatedRoute:ActivatedRoute , private factureService:FactureService,private router:Router,private formationService: FormationService,) { }

  ngOnInit(): void {
this.activatedRoute.snapshot.params['id']
this.getAllFacture();
  }

  getAllFacture(){
this.factureService.getAllFactureWithFormationInfo().subscribe((result)=>{
  
  this.factureTab=result.factures;
});
  }

  editFacture(id:number){
  // this.router.navigate([`editFacture/${id}`]);

  }

deleteFacture(id:number){
this.factureService.deleteFacture(id).subscribe((result)=>{
  this.getAllFacture();
  this.showAlert();
})
}

updateStatus(id:number){
this.factureService.getFactureById(id).subscribe((result)=>{
this.getAllFacture();
})
}
getAllFormation() {
  this.formationService.getAllFormation().subscribe((data) => {
    this.foramtionTab = data.formations;
  });
}


statusStyle(status:any){
if (status=='payé') {
  return 'green';
} else  {
  return 'red';
}
}


generatePdf(id:number){
  this.factureService.generatePdf(id).subscribe((result)=>{

  });
}


showAlert() {
  Swal.fire({
    title: "supprimé avec succès",
    icon: "success",
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
