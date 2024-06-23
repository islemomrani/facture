import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formation-info',
  templateUrl: './formation-info.component.html',
  styleUrls: ['./formation-info.component.css']
})
export class FormationInfoComponent implements OnInit {
@Input() obj:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  //demande devis:
  askForDevis(id:number){
this.router.navigate([`demandeDevis/${id}`]);



  }


  askForFacture(id:number){
    this.router.navigate([`demandeFacture/${id}`]);

  }



}
