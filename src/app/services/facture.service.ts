import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
factureUrl='http://localhost:3000/api/factures';
  constructor(private httpClient: HttpClient) { }

  addFacture(facture: any) {
    return this.httpClient.post<{ msg: string }>(this.factureUrl, facture);
  }

  getAllFacture() {
    return this.httpClient.get<{ factures: any }>(this.factureUrl);
  }

  getFactureById(id: number) {
    return this.httpClient.get<{ facture: any }>(`${this.factureUrl}/${id}`);
  }


  deleteFacture(id: number) {
    return this.httpClient.delete<{ message: string }>(`${this.factureUrl}/${id}`);
  }

  editFacture(facture: any) {
    return this.httpClient.put<{ message: string }>(this.factureUrl, facture);
  }

  getAllFactureWithFormationInfo() {
    return this.httpClient.get<{ factures: any }>("http://localhost:3000/api/factureFormation");
  }

  getfactureForClient(id: number) {
    return this.httpClient.get<{ factures: any }>(`http://localhost:3000/api/factureFormation/${id}`);

  }


  searchFacture(obj: any) {
    return this.httpClient.post<{ factures: any, msg: string }>(this.factureUrl+'/search', obj);

  }

  generatePdf(id:number){
    return this.httpClient.get<{message:string}>(`http://localhost:3000/api/factures/pdf/${id}`);
  }






}
