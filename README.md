#Running Fabric.

Go To Fabric Directory and then To first-Network directory.

Run the command 

``` ./byfn up -s couchdb -an ```

After the Fabric is Up and Running

Run these following commands to install the Fabcar Chaincode on Fabric.

```docker exec cli peer chaincode install -n fabcar -l golang -p github.com/chaincode/fabcar -v 0.1```

```docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" -e "CORE_PEER_ADDRESS=peer1.org1.example.com:8051" cli peer chaincode install -n fabcar -p github.com/chaincode/fabcar -v 0.1```

```docker exec -e "CORE_PEER_LOCALMSPID=Org2MSP" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp" -e "CORE_PEER_ADDRESS=peer0.org2.example.com:9051" cli peer chaincode install -n fabcar -p github.com/chaincode/fabcar -v 0.1```

```docker exec -e "CORE_PEER_LOCALMSPID=Org2MSP" -e "CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp" -e "CORE_PEER_ADDRESS=peer1.org2.example.com:10051" cli peer chaincode install -n fabcar -p github.com/chaincode/fabcar -v 0.1```

```export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem```

```docker exec cli peer chaincode instantiate -o orderer.example.com:7050 --cafile $ORDERER_CA -C mychannel -c '{"Args":[]}' -n fabcar -v 0.1 -P "OR('Org1MSP.member', 'Org2MSP.member')"```

#Running Node.

Go to Node-SDK foler and Run the Following Commands

```npm install```

```node enrollAdmin.js```

```node registerUser.js```

```node app.js```


Then double click the index.html and use the Fabcar Project.
