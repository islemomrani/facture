import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupClientComponent } from './components/signup-client/signup-client.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { AdminComponent } from './components/admin/admin.component';
import { AgentComptableComponent } from './components/agent-comptable/agent-comptable.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { FormationsComponent } from './components/formations/formations.component';
import { RequestDevisComponent } from './components/request-devis/request-devis.component';
import { EditeFormationComponent } from './components/edite-formation/edite-formation.component';
import { RequestFactureComponent } from './components/request-facture/request-facture.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DevisClientComponent } from './components/devis-client/devis-client.component';
import { FactureClientComponent } from './components/facture-client/facture-client.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'connecter',component:LoginComponent},
{path:'inscription',component:SignupClientComponent},
{path:'inscriptionAgent',component:SignupClientComponent},
{path:'inscriptionAdmin',component:SignupClientComponent},
{path:'ajouterFormation',component:AddFormationComponent},
{path:'admin',component:AdminComponent},
{path:'agentComptable',component:AgentComptableComponent},
{path:'recherche',component:SearchClientComponent},
{path:'formations',component:FormationsComponent},
{path:'demandeDevis/:id',component:RequestDevisComponent},
{path:'demandeFacture/:id',component:RequestFactureComponent},
{path:'modifierFormation/:id',component:EditeFormationComponent},
{path:'profile',component:ProfileComponent},
{path:'modifierProfile',component:EditProfileComponent},
{path:'devisClient',component:DevisClientComponent},
{path:'factureClient',component:FactureClientComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
