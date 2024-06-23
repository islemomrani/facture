import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';
import { FormationService } from 'src/app/services/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devis-table',
  templateUrl: './devis-table.component.html',
  styleUrls: ['./devis-table.component.css']
})
export class DevisTableComponent implements OnInit {
  devisTab: any = [];
  foramtionTab: any = [];
  actuelDate: Date = new Date();

  constructor(private devisService: DevisService,
    private activatedRoute: ActivatedRoute,
    private formationService: FormationService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.params['id']
    this.getAllDevis();
  }
  getAllDevis() {
    this.devisService.getAllDevisWithFormationInfo().subscribe((data) => {

      this.devisTab = data.devis;
    })
  }

  getAllFormation() {
    this.formationService.getAllFormation().subscribe((data) => {
      this.foramtionTab = data.formations;
    })
  }
  editDevis(id: number) {
    // this.router.navigate([`editDevis/${id}`]);

  }

  deleteDevis(id: number) {
    this.devisService.deleteDevis(id).subscribe((result) => {
      this.getAllDevis();
      this.showAlert();
    })
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
  generatePdf(id:number){
    this.devisService.generatePdf(id).subscribe((result)=>{
  
    });
  }
}
