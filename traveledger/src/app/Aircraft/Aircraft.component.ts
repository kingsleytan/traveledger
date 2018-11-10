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
import { AircraftService } from './Aircraft.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-aircraft',
  templateUrl: './Aircraft.component.html',
  styleUrls: ['./Aircraft.component.css'],
  providers: [AircraftService]
})
export class AircraftComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  aircraftId = new FormControl('', Validators.required);
  ownershipType = new FormControl('', Validators.required);
  firstClassSeats = new FormControl('', Validators.required);
  businessClassSeats = new FormControl('', Validators.required);
  economyClassSeats = new FormControl('', Validators.required);
  nickName = new FormControl('', Validators.required);

  constructor(public serviceAircraft: AircraftService, fb: FormBuilder) {
    this.myForm = fb.group({
      aircraftId: this.aircraftId,
      ownershipType: this.ownershipType,
      firstClassSeats: this.firstClassSeats,
      businessClassSeats: this.businessClassSeats,
      economyClassSeats: this.economyClassSeats,
      nickName: this.nickName
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAircraft.getAll()
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
      $class: 'org.traveledger.airline.aircraft.Aircraft',
      'aircraftId': this.aircraftId.value,
      'ownershipType': this.ownershipType.value,
      'firstClassSeats': this.firstClassSeats.value,
      'businessClassSeats': this.businessClassSeats.value,
      'economyClassSeats': this.economyClassSeats.value,
      'nickName': this.nickName.value
    };

    this.myForm.setValue({
      'aircraftId': null,
      'ownershipType': null,
      'firstClassSeats': null,
      'businessClassSeats': null,
      'economyClassSeats': null,
      'nickName': null
    });

    return this.serviceAircraft.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'aircraftId': null,
        'ownershipType': null,
        'firstClassSeats': null,
        'businessClassSeats': null,
        'economyClassSeats': null,
        'nickName': null
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
      $class: 'org.traveledger.airline.aircraft.Aircraft',
      'ownershipType': this.ownershipType.value,
      'firstClassSeats': this.firstClassSeats.value,
      'businessClassSeats': this.businessClassSeats.value,
      'economyClassSeats': this.economyClassSeats.value,
      'nickName': this.nickName.value
    };

    return this.serviceAircraft.updateAsset(form.get('aircraftId').value, this.asset)
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

    return this.serviceAircraft.deleteAsset(this.currentId)
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

    return this.serviceAircraft.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'aircraftId': null,
        'ownershipType': null,
        'firstClassSeats': null,
        'businessClassSeats': null,
        'economyClassSeats': null,
        'nickName': null
      };

      if (result.aircraftId) {
        formObject.aircraftId = result.aircraftId;
      } else {
        formObject.aircraftId = null;
      }

      if (result.ownershipType) {
        formObject.ownershipType = result.ownershipType;
      } else {
        formObject.ownershipType = null;
      }

      if (result.firstClassSeats) {
        formObject.firstClassSeats = result.firstClassSeats;
      } else {
        formObject.firstClassSeats = null;
      }

      if (result.businessClassSeats) {
        formObject.businessClassSeats = result.businessClassSeats;
      } else {
        formObject.businessClassSeats = null;
      }

      if (result.economyClassSeats) {
        formObject.economyClassSeats = result.economyClassSeats;
      } else {
        formObject.economyClassSeats = null;
      }

      if (result.nickName) {
        formObject.nickName = result.nickName;
      } else {
        formObject.nickName = null;
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
      'aircraftId': null,
      'ownershipType': null,
      'firstClassSeats': null,
      'businessClassSeats': null,
      'economyClassSeats': null,
      'nickName': null
      });
  }

}
