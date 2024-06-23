import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css']
})
export class HomeInfoComponent implements OnInit {

  constructor(private formationService:FormationService) { }

  ngOnInit(): void {
  }

}
