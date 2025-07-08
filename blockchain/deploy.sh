#!/bin/sh
set -e

cd "$(dirname "$0")"

npm install dotenv ethers

npx hardhat compile

CONTRACT_ADDRESS=$(npx hardhat run scripts/deploy.js --network fuji | grep -Eo '0x[a-fA-F0-9]{40}' | tail -1)

if [ -n "$CONTRACT_ADDRESS" ]; then
  sed -i "s/^CONTRACT_ADDRESS=.*/CONTRACT_ADDRESS=$CONTRACT_ADDRESS/" ../.env
  echo "CONTRACT_ADDRESS mis à jour dans .env : $CONTRACT_ADDRESS"
fi

cp artifacts/contracts/TournamentScores.sol/TournamentScores.json ../backend/abi/TournamentScores.json
echo "ABI copiée dans backend/abi/TournamentScores.json"

npx hardhat verify --network fuji "$CONTRACT_ADDRESS" || echo "Vérification échouée ou déjà faite"