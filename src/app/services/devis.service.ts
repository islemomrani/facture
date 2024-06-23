import { HttpClient, HttpHandler, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
devisUrl='http://localhost:3000/api/devis';
  constructor(private httpClient:HttpClient) { }

addDevis(devis:any){
return this.httpClient.post<{msg:string}>(this.devisUrl,devis);
}

getAllDevis(){
  return this.httpClient.get<{devis:any}>(this.devisUrl);
}

getDevisById(id:number){
  return this.httpClient.get<{devis:any}>(`${this.devisUrl}/${id}`);
}
 
deleteDevis(id:number){
return this.httpClient.delete<{message:string}>(`${this.devisUrl}/${id}`);
}
editDevis(devis:any){
  return this.httpClient.put<{message:string}>(this.devisUrl,devis);
}


getAllDevisWithFormationInfo(){
  return this.httpClient.get<{devis:any}>("http://localhost:3000/api/devisFormation");
}

devisClient(id:number){
  return this.httpClient.get<{devis:any}>(`http://localhost:3000/api/devisFormation/${id}`);

}
generatePdf(id:number){
  return this.httpClient.get<{message:string}>(`http://localhost:3000/api/devis/pdf/${id}`);
}


}
