import { Component, OnInit } from '@angular/core';
import { DevisService } from 'src/app/services/devis.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-devis-client',
  templateUrl: './devis-client.component.html',
  styleUrls: ['./devis-client.component.css']
})
export class DevisClientComponent implements OnInit {
  decoded:any;
  id!:any;
  devisTab:any=[];
  constructor(private devisService:DevisService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);

    }
this.id=this.decoded._id;
this.getDevisForClient();
  }

getDevisForClient(){
this.devisService.devisClient(this.id).subscribe((result)=>{
this.devisTab=result.devis;
})
}

}
