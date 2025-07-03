// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TournamentScores {
    struct Score {
        address player;
        uint256 score;
        uint256 timestamp;
    }

    // Tableau de scores pour chaque tournoi (id => scores)
    mapping(uint256 => Score[]) private tournamentScores;

    // Event pour notifier l’ajout d’un score
    event ScoreAdded(uint256 indexed tournamentId, address indexed player, uint256 score, uint256 timestamp);

    // Ajouter un score à un tournoi
    function addScore(uint256 tournamentId, uint256 score) public {
        tournamentScores[tournamentId].push(Score(msg.sender, score, block.timestamp));
        emit ScoreAdded(tournamentId, msg.sender, score, block.timestamp);
    }

    // Récupérer le nombre de scores pour un tournoi
    function getScoresCount(uint256 tournamentId) public view returns (uint256) {
        return tournamentScores[tournamentId].length;
    }

    // Récupérer un score précis d’un tournoi
    function getScore(uint256 tournamentId, uint256 index) public view returns (address, uint256, uint256) {
        Score memory s = tournamentScores[tournamentId][index];
        return (s.player, s.score, s.timestamp);
    }

    // Récupérer tous les scores d’un tournoi (attention, peut être coûteux en gas si beaucoup de scores)
    function getAllScores(uint256 tournamentId) public view returns (Score[] memory) {
        return tournamentScores[tournamentId];
    }
}
