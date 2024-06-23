import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { FormationService } from 'src/app/services/formation.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-request-facture',
  templateUrl: './request-facture.component.html',
  styleUrls: ['./request-facture.component.css']
})
export class RequestFactureComponent implements OnInit {
  requestForm!: FormGroup;
  facture: any = {};
  decoded: any = {};
  formation: any = {};
  actuelDate: Date = new Date();
  status: string = "non payé ";

  id!: any;
  constructor(private activatedRoute: ActivatedRoute, private formationService: FormationService,
    private factureService: FactureService,
    private router: Router) { }

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

  getUserInfo() {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);
    }
  }




  requestFacture() {
    this.facture.userId = this.decoded._id;
    this.facture.formationId = this.id;
    this.facture.date = this.actuelDate;
    this.facture.status = this.status;
    this.factureService.addFacture(this.facture).subscribe((data) => {
      this.router.navigate(['formations']);
    })
  }



}
