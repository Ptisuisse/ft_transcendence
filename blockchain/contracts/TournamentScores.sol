// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TournamentScores {
    struct Score {
        address player;
        uint256 score;
        uint256 timestamp;
    }

    Score[] public scores;

    event ScoreSubmitted(address indexed player, uint256 score, uint256 timestamp);

    function submitScore(uint256 _score) public {
        scores.push(Score(msg.sender, _score, block.timestamp));
        emit ScoreSubmitted(msg.sender, _score, block.timestamp);
    }

    function getScore(uint256 index) public view returns (address, uint256, uint256) {
        Score memory s = scores[index];
        return (s.player, s.score, s.timestamp);
    }

    function getScoresCount() public view returns (uint256) {
        return scores.length;
    }
}
