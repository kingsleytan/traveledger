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
import { PassengerService } from './Passenger.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-passenger',
  templateUrl: './Passenger.component.html',
  styleUrls: ['./Passenger.component.css'],
  providers: [PassengerService]
})
export class PassengerComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  passengerId = new FormControl('', Validators.required);
  fName = new FormControl('', Validators.required);
  lname = new FormControl('', Validators.required);
  passportNumber = new FormControl('', Validators.required);
  nricNumber = new FormControl('', Validators.required);
  issuanceDate = new FormControl('', Validators.required);
  expiryDate = new FormControl('', Validators.required);

  constructor(public servicePassenger: PassengerService, fb: FormBuilder) {
    this.myForm = fb.group({
      passengerId: this.passengerId,
      fName: this.fName,
      lname: this.lname,
      passportNumber: this.passportNumber,
      nricNumber: this.nricNumber,
      issuanceDate: this.issuanceDate,
      expiryDate: this.expiryDate
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePassenger.getAll()
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
      $class: 'org.traveledger.airline.passenger.Passenger',
      'passengerId': this.passengerId.value,
      'fName': this.fName.value,
      'lname': this.lname.value,
      'passportNumber': this.passportNumber.value,
      'nricNumber': this.nricNumber.value,
      'issuanceDate': this.issuanceDate.value,
      'expiryDate': this.expiryDate.value
    };

    this.myForm.setValue({
      'passengerId': null,
      'fName': null,
      'lname': null,
      'passportNumber': null,
      'nricNumber': null,
      'issuanceDate': null,
      'expiryDate': null
    });

    return this.servicePassenger.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'passengerId': null,
        'fName': null,
        'lname': null,
        'passportNumber': null,
        'nricNumber': null,
        'issuanceDate': null,
        'expiryDate': null
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
      $class: 'org.traveledger.airline.passenger.Passenger',
      'fName': this.fName.value,
      'lname': this.lname.value,
      'passportNumber': this.passportNumber.value,
      'nricNumber': this.nricNumber.value,
      'issuanceDate': this.issuanceDate.value,
      'expiryDate': this.expiryDate.value
    };

    return this.servicePassenger.updateAsset(form.get('passengerId').value, this.asset)
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

    return this.servicePassenger.deleteAsset(this.currentId)
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

    return this.servicePassenger.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'passengerId': null,
        'fName': null,
        'lname': null,
        'passportNumber': null,
        'nricNumber': null,
        'issuanceDate': null,
        'expiryDate': null
      };

      if (result.passengerId) {
        formObject.passengerId = result.passengerId;
      } else {
        formObject.passengerId = null;
      }

      if (result.fName) {
        formObject.fName = result.fName;
      } else {
        formObject.fName = null;
      }

      if (result.lname) {
        formObject.lname = result.lname;
      } else {
        formObject.lname = null;
      }

      if (result.passportNumber) {
        formObject.passportNumber = result.passportNumber;
      } else {
        formObject.passportNumber = null;
      }

      if (result.nricNumber) {
        formObject.nricNumber = result.nricNumber;
      } else {
        formObject.nricNumber = null;
      }

      if (result.issuanceDate) {
        formObject.issuanceDate = result.issuanceDate;
      } else {
        formObject.issuanceDate = null;
      }

      if (result.expiryDate) {
        formObject.expiryDate = result.expiryDate;
      } else {
        formObject.expiryDate = null;
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
      'passengerId': null,
      'fName': null,
      'lname': null,
      'passportNumber': null,
      'nricNumber': null,
      'issuanceDate': null,
      'expiryDate': null
      });
  }

}
