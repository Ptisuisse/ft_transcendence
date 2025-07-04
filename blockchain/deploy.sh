#!/bin/sh
set -e

cd "$(dirname "$0")"

# Install dependencies if missing
npm install dotenv ethers

# Compile
npx hardhat compile

# Deploy (adapte la commande selon ton script de déploiement)
CONTRACT_ADDRESS=$(npx hardhat run scripts/deploy.js --network fuji | grep -Eo '0x[a-fA-F0-9]{40}' | tail -1)

# Update .env (dans le dossier parent)
if [ -n "$CONTRACT_ADDRESS" ]; then
  sed -i "s/^CONTRACT_ADDRESS=.*/CONTRACT_ADDRESS=$CONTRACT_ADDRESS/" ../.env
  echo "CONTRACT_ADDRESS mis à jour dans .env : $CONTRACT_ADDRESS"
fi

# Copy ABI
cp artifacts/contracts/TournamentScores.sol/TournamentScores.json ../backend/abi/TournamentScores.json
echo "ABI copiée dans backend/abi/TournamentScores.json"

# (Optionnel) Vérification automatique
npx hardhat verify --network fuji "$CONTRACT_ADDRESS" || echo "Vérification échouée ou déjà faite"