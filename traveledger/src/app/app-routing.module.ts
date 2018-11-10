/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AircraftComponent } from './Aircraft/Aircraft.component';
import { FlightComponent } from './Flight/Flight.component';
import { PassengerComponent } from './Passenger/Passenger.component';

import { traveledgerNetworkAdminComponent } from './traveledgerNetworkAdmin/traveledgerNetworkAdmin.component';
import { traveledgerPersonnelComponent } from './traveledgerPersonnel/traveledgerPersonnel.component';
import { B2BPartnerComponent } from './B2BPartner/B2BPartner.component';

import { CreateFlightComponent } from './CreateFlight/CreateFlight.component';
import { AssignAircraftComponent } from './AssignAircraft/AssignAircraft.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Aircraft', component: AircraftComponent },
  { path: 'Flight', component: FlightComponent },
  { path: 'Passenger', component: PassengerComponent },
  { path: 'traveledgerNetworkAdmin', component: traveledgerNetworkAdminComponent },
  { path: 'traveledgerPersonnel', component: traveledgerPersonnelComponent },
  { path: 'B2BPartner', component: B2BPartnerComponent },
  { path: 'CreateFlight', component: CreateFlightComponent },
  { path: 'AssignAircraft', component: AssignAircraftComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
