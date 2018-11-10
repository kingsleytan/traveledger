import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Aircraft} from './org.traveledger.airline.aircraft';
import {Passenger} from './org.traveledger.airline.passenger';
// export namespace org.traveledger.airline.flight{
   export class Flight extends Asset {
      flightId: string;
      flightNumber: string;
      route: Route;
      aliasFlightNumber: string[];
      aircraft: Aircraft;
      passenger: Passenger;
   }
   export class Route {
      origin: string;
      destination: string;
      schedule: Date;
   }
   export class CreateFlight extends Transaction {
      flightNumber: string;
      origin: string;
      destination: string;
      schedule: Date;
   }
   export class FlightCreated extends Event {
      flightId: string;
   }
   export class AssignAircraft extends Transaction {
      flightId: string;
      aircraftId: string;
   }
   export class AircraftAssigned extends Event {
      flightId: string;
      aircraftId: string;
   }
// }
