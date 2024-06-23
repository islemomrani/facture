import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { FactureService } from 'src/app/services/facture.service';

@Component({
  selector: 'app-facture-client',
  templateUrl: './facture-client.component.html',
  styleUrls: ['./facture-client.component.css']
})
export class FactureClientComponent implements OnInit {
  decoded: any;
  id!: any;
  factureTab: any = [];
  constructor(private factureService: FactureService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);

    }
    this.id = this.decoded._id;
    this.getFactureClient();
  }
  getFactureClient() {
    this.factureService.getfactureForClient(this.id).subscribe((result) => {
      this.factureTab = result.factures;

    })
  }
}
