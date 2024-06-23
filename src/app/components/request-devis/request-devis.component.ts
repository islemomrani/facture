import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';
import { FactureService } from 'src/app/services/facture.service';
import { FormationService } from 'src/app/services/formation.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-request-devis',
  templateUrl: './request-devis.component.html',
  styleUrls: ['./request-devis.component.css']
})
export class RequestDevisComponent implements OnInit {
  requestForm!: FormGroup;
  devis: any = {};
  path: any;

  formation: any = {};
  id!: number;
  decoded:any={};
actuelDate:Date=new Date();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formationService: FormationService,
    private devisService: DevisService,) { }

  ngOnInit(): void {
    
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getFormationById();
   this.getUserInfo();
  }

  getFormationById() {
    this.formationService.getFormationById(this.id).subscribe((data) => {
      this.formation = data.formation;
    })
  }

getUserInfo(){
  let token=sessionStorage.getItem('jwt');
    if (token) {
     this.decoded=jwtDecode(token);
}}

  requestDevis() {
    this.devis.userId=this.decoded._id;
    this.devis.formationId = this.id;
    this.devis.date=this.actuelDate;
    this.devisService.addDevis(this.devis).subscribe((data) => {      
      this.router.navigate(['formations']);
    })





  }
}
