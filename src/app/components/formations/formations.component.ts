import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
foramtionTab:any=[];

  constructor(private formationService:FormationService) { }

  ngOnInit(): void {
    this.getAllFormation();
  }

  getAllFormation(){
    this.formationService.getAllFormation().subscribe((data)=>{
      this.foramtionTab=data.formations;
    });
  }

}
