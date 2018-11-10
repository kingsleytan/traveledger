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

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { B2BPartnerComponent } from './B2BPartner.component';
import { B2BPartnerService } from './B2BPartner.service';
import { Observable } from 'rxjs';

describe('B2BPartnerComponent', () => {
  let component: B2BPartnerComponent;
  let fixture: ComponentFixture<B2BPartnerComponent>;

  let mockB2BPartnerService;
  let mockDataService

  beforeEach(async(() => {

    mockB2BPartnerService = sinon.createStubInstance(B2BPartnerService);
    mockB2BPartnerService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ B2BPartnerComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: B2BPartnerService, useValue: mockB2BPartnerService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(B2BPartnerComponent);
    component = fixture.componentInstance;

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the table when a B2BPartner is added', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceB2BPartner, 'addParticipant').returns(new Observable(observer => {
      observer.next('');
      observer.complete();
    }));

    component.addParticipant({});

    tick();

    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));

  it('should update the table when a B2BPartner is updated', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceB2BPartner, 'updateParticipant').returns(new Observable(observer => {
      observer.next('');
      observer.complete();
    }));

    // mock form to be passed to the update function
    let mockForm = new FormGroup({
      participantKey: new FormControl('id')
    });
    
    component.updateParticipant(mockForm);

    tick();

    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));
  
  it('should update the table when a B2BPartner is deleted', fakeAsync(() => {
    let loadAllSpy = sinon.stub(component, 'loadAll');
    sinon.stub(component.serviceB2BPartner, 'deleteParticipant').returns(new Observable(observer => {
      observer.next('');
      observer.complete();
    }));

    component.deleteParticipant();

    tick();

    expect(loadAllSpy.callCount).toBe(1);

    loadAllSpy.restore();
  }));

});
