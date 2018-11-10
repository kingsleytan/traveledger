import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.traveledger.airline.passenger{
   export class Passenger extends Asset {
      passengerId: string;
      fName: string;
      lname: string;
      passportNumber: string;
      nricNumber: string;
      issuanceDate: Date;
      expiryDate: Date;
   }
// }
