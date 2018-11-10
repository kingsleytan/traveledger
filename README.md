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
(Note: Solve `errors found in the connection profile in the card` by upgrading composer-cli to higher version with `npm install -g composer-cli@0.19.14`)
- Step 3: Install network application to Fabric
`composer network install -a traveledger@0.0.1.bna -c PeerAdmin@hlfv1`
- Step 4: Start BNA on Fabric
`composer network start -c PeerAdmin@hlfv1 -n traveledger -V 0.0.1 -A admin -S password`
- Step 5: Import composer card
`composer card import -f ./admin\@traveledger.card`