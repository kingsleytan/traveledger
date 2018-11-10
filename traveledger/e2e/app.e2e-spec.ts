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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for traveledger', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be traveledger', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('traveledger');
    })
  });

  it('network-name should be traveledger@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('traveledger@0.0.1.bna');
    });
  });

  it('navbar-brand should be traveledger',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('traveledger');
    });
  });

  
    it('Aircraft component should be loadable',() => {
      page.navigateTo('/Aircraft');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Aircraft');
      });
    });

    it('Aircraft table should have 7 columns',() => {
      page.navigateTo('/Aircraft');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Flight component should be loadable',() => {
      page.navigateTo('/Flight');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Flight');
      });
    });

    it('Flight table should have 7 columns',() => {
      page.navigateTo('/Flight');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Passenger component should be loadable',() => {
      page.navigateTo('/Passenger');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Passenger');
      });
    });

    it('Passenger table should have 8 columns',() => {
      page.navigateTo('/Passenger');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('traveledgerNetworkAdmin component should be loadable',() => {
      page.navigateTo('/traveledgerNetworkAdmin');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('traveledgerNetworkAdmin');
      });
    });

    it('traveledgerNetworkAdmin table should have 3 columns',() => {
      page.navigateTo('/traveledgerNetworkAdmin');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('traveledgerPersonnel component should be loadable',() => {
      page.navigateTo('/traveledgerPersonnel');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('traveledgerPersonnel');
      });
    });

    it('traveledgerPersonnel table should have 4 columns',() => {
      page.navigateTo('/traveledgerPersonnel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('B2BPartner component should be loadable',() => {
      page.navigateTo('/B2BPartner');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('B2BPartner');
      });
    });

    it('B2BPartner table should have 3 columns',() => {
      page.navigateTo('/B2BPartner');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateFlight component should be loadable',() => {
      page.navigateTo('/CreateFlight');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateFlight');
      });
    });
  
    it('AssignAircraft component should be loadable',() => {
      page.navigateTo('/AssignAircraft');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AssignAircraft');
      });
    });
  

});