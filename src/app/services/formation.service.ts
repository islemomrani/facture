import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
formationUrl='http://localhost:3000/api/formations';
  constructor(private httpClient: HttpClient) { }

  addFormation(formation: any, picture: File) {
    let formData = new FormData();
    formData.append("name", formation.name);
    formData.append("description", formation.description);
    formData.append("duration", formation.duration);
    formData.append("priceHt", formation.priceHt);
    formData.append("priceTtc", formation.priceTtc);
    formData.append("tva", formation.tva);
    formData.append("picture", picture);

    return this.httpClient.post<{ msg: any }>(this.formationUrl, formData);
  }

  getAllFormation() {
    return this.httpClient.get<{ formations: any }>(this.formationUrl);
  }

  getFormationById(id: number) {
    return this.httpClient.get<{ formation: any }>(`${this.formationUrl}/${id}`);
  }

  deleteFormationById(id: number) {
    return this.httpClient.delete<{ message: string }>(`${this.formationUrl}/${id}`);
  }

  editFormation(formation: any) {
    return this.httpClient.put<{ message: string }>(this.formationUrl, formation);
  }

}
