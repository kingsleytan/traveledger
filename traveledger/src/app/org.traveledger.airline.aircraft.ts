import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.traveledger.airline.aircraft{
   export class Aircraft extends Asset {
      aircraftId: string;
      ownershipType: Ownership;
      firstClassSeats: number;
      businessClassSeats: number;
      economyClassSeats: number;
      nickName: string;
   }
   export enum Ownership {
      LEASED,
      OWNED,
   }
// }
