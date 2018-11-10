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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FlightService } from './Flight.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-flight',
  templateUrl: './Flight.component.html',
  styleUrls: ['./Flight.component.css'],
  providers: [FlightService]
})
export class FlightComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  flightId = new FormControl('', Validators.required);
  flightNumber = new FormControl('', Validators.required);
  route = new FormControl('', Validators.required);
  aliasFlightNumber = new FormControl('', Validators.required);
  aircraft = new FormControl('', Validators.required);
  passenger = new FormControl('', Validators.required);

  constructor(public serviceFlight: FlightService, fb: FormBuilder) {
    this.myForm = fb.group({
      flightId: this.flightId,
      flightNumber: this.flightNumber,
      route: this.route,
      aliasFlightNumber: this.aliasFlightNumber,
      aircraft: this.aircraft,
      passenger: this.passenger
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceFlight.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.traveledger.airline.flight.Flight',
      'flightId': this.flightId.value,
      'flightNumber': this.flightNumber.value,
      'route': this.route.value,
      'aliasFlightNumber': this.aliasFlightNumber.value,
      'aircraft': this.aircraft.value,
      'passenger': this.passenger.value
    };

    this.myForm.setValue({
      'flightId': null,
      'flightNumber': null,
      'route': null,
      'aliasFlightNumber': null,
      'aircraft': null,
      'passenger': null
    });

    return this.serviceFlight.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'flightId': null,
        'flightNumber': null,
        'route': null,
        'aliasFlightNumber': null,
        'aircraft': null,
        'passenger': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.traveledger.airline.flight.Flight',
      'flightNumber': this.flightNumber.value,
      'route': this.route.value,
      'aliasFlightNumber': this.aliasFlightNumber.value,
      'aircraft': this.aircraft.value,
      'passenger': this.passenger.value
    };

    return this.serviceFlight.updateAsset(form.get('flightId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceFlight.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceFlight.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'flightId': null,
        'flightNumber': null,
        'route': null,
        'aliasFlightNumber': null,
        'aircraft': null,
        'passenger': null
      };

      if (result.flightId) {
        formObject.flightId = result.flightId;
      } else {
        formObject.flightId = null;
      }

      if (result.flightNumber) {
        formObject.flightNumber = result.flightNumber;
      } else {
        formObject.flightNumber = null;
      }

      if (result.route) {
        formObject.route = result.route;
      } else {
        formObject.route = null;
      }

      if (result.aliasFlightNumber) {
        formObject.aliasFlightNumber = result.aliasFlightNumber;
      } else {
        formObject.aliasFlightNumber = null;
      }

      if (result.aircraft) {
        formObject.aircraft = result.aircraft;
      } else {
        formObject.aircraft = null;
      }

      if (result.passenger) {
        formObject.passenger = result.passenger;
      } else {
        formObject.passenger = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'flightId': null,
      'flightNumber': null,
      'route': null,
      'aliasFlightNumber': null,
      'aircraft': null,
      'passenger': null
      });
  }

}
