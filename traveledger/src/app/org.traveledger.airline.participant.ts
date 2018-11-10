import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.traveledger.airline.participant{
   export abstract class TraveledgerParticipant extends Participant {
      participantKey: string;
      contact: Contact;
   }
   export class Contact {
      fName: string;
      lname: string;
      email: string;
   }
   export class traveledgerNetworkAdmin extends TraveledgerParticipant {
   }
   export class traveledgerPersonnel extends TraveledgerParticipant {
      department: string;
   }
   export class B2BPartner extends TraveledgerParticipant {
   }
// }
