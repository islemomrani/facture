import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupClientComponent } from './components/signup-client/signup-client.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { FormationTableComponent } from './components/formation-table/formation-table.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { DevisTableComponent } from './components/devis-table/devis-table.component';
import { FactureTableComponent } from './components/facture-table/facture-table.component';
import { AgentComptableComponent } from './components/agent-comptable/agent-comptable.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { FormationsComponent } from './components/formations/formations.component';
import { FormationInfoComponent } from './components/formation-info/formation-info.component';
import { HomeInfoComponent } from './components/home-info/home-info.component';
import { RequestDevisComponent } from './components/request-devis/request-devis.component';
import { EditeFormationComponent } from './components/edite-formation/edite-formation.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestFactureComponent } from './components/request-facture/request-facture.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DevisClientComponent } from './components/devis-client/devis-client.component';
import { FactureClientComponent } from './components/facture-client/facture-client.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HomePartieComponent } from './components/home-partie/home-partie.component';


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupClientComponent,
    AddFormationComponent,
    AdminComponent,
    FormationTableComponent,
    ClientTableComponent,
    DevisTableComponent,
    FactureTableComponent,
    AgentComptableComponent,
    SearchClientComponent,
    FormationsComponent,
    FormationInfoComponent,
    HomeInfoComponent,
    RequestDevisComponent,
    EditeFormationComponent,
    RequestFactureComponent,
    ProfileComponent,
    EditProfileComponent,
    DevisClientComponent,
    FactureClientComponent,
    SearchResultComponent,
    HomePartieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
