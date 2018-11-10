# Traveledger

Blockchain Hyperledger for Travel Information

Travedger - Hyperledger Composer Network

# To create bna file
- Run command: composer archive create -a dist/traveledger.bna --sourceType dir --sourceName .
- composer network install --card PeerAdmin@hlfv1 --archiveFile traverledger.bna

# Deploying a BNA to Hyperledger Fabric
- Step 1: Launch Fabric Network
`./startFabric.sh`
- Step 2: Verify | Create Peer Admin Card
`./createPeerAdminCard.sh`
(Note: Solve `errors found in the connection profile in the card` by upgrading composer-cli to higher version with `npm install -g composer-cli@0.20.2`)
- Step 3: Install network application to Fabric
`composer network install -a traveledger@0.0.1.bna -c PeerAdmin@hlfv1`
- Step 4: Start BNA on Fabric
`composer network start -c PeerAdmin@hlfv1 -n traveledger -V 0.0.1 -A admin -S adminpw`
(Note: must follow exactly same command, cannot amend password)
- Step 5: Import composer card
`composer card import -f ./admin\@traveledger.card`

# To restart Fabric server
- Stop your fabric services using `./stopFabric.sh`
- Start it again `./startFabric.sh` 
- Note: Remember to delete .composer file from root directory, or run `rm -fr $HOME/.composer`
- And `./createPeerAdminCard.sh`

- then go to dist directory . 
- run `composer network start -c PeerAdmin@hlfv1 -n traveledger -V 0.0.1 -A admin -S adminpw` and import card

# Composer Network CLI

To check health of BNA
- Ping network: `composer network ping -c admin@traveledger`
- List network: `composer network list -c admin@traveledger`

To upgrade composer network after code changes:
1. Go change version in package.json
2. Run `composer network install -a traveledger@0.0.2.bna -c PeerAdmin@hlfv1`
3. Run `composer network upgrade -c PeerAdmin@hlfv1 -n traveledger -V 0.0.2`

# Composer REST Server
Solve bug in 0.20.4:
`npm uninstall -g composer-rest-server`
`npm install -g composer-rest-server@0.20.2`

composer-rest-server
? Enter the name of the business network card to use: `admin@traveledger`
? Specify if you want namespaces in the generated REST API: `never use namespaces`
? Specify if you want to use an API key to secure the REST API: `No`
? Specify if you want to enable authentication for the REST API using Passport: `No`
? Specify if you want to enable the explorer test interface: `Yes`
? Specify a key if you want to enable dynamic logging:
? Specify if you want to enable event publication over WebSockets: `No`
? Specify if you want to enable TLS security for the REST API: `No`