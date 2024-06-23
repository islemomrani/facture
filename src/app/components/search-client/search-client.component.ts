import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FactureService } from 'src/app/services/facture.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {
  searchForm!: FormGroup;
  searchFacture: any = [];
  constructor(private fBuilder: FormBuilder, private factureService: FactureService) { }

  ngOnInit(): void {
    this.searchForm = this.fBuilder.group({
      phone: [''],

    })


  }


  search() {
    let search = this.searchForm.value;
    this.factureService.searchFacture(search).subscribe((result) => {
      console.log("here user factures by phone", result.factures);

      this.searchFacture = result.factures;

    });

  }



}
