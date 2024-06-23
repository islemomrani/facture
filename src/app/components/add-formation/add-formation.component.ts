import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  addForm!: FormGroup;
  formation: any = {};
  priceTtc: any;
  imagePreview: any;
  formationImg: any;
  constructor(private formBuilder: FormBuilder, private formationService: FormationService) { }

  ngOnInit(): void {


  }

  add() {
    this.priceTtc = this.formation.priceHt * (1 + (this.formation.tva / 100));

    this.formation.priceTtc = this.priceTtc;

    this.formationService.addFormation(this.formation, this.formationImg).subscribe((data) => {
    })
   
  }

  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];

      this.formationImg = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  

}
