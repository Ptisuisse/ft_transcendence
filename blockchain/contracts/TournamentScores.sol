// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TournamentScores {
    struct Score {
        address player;
        uint256 score;
        uint256 timestamp;
        string winnerName;
        string scoreDetail;
    }

    Score[] public scores;

    event ScoreSubmitted(string winnerName, string scoreDetail);

    function submitScore(
        uint256 score,
        string memory winnerName,
        string memory scoreDetail
    ) public {
        scores.push(Score(msg.sender, score, block.timestamp, winnerName, scoreDetail));
        emit ScoreSubmitted(msg.sender, score, block.timestamp, winnerName, scoreDetail);
    }

    function getScore(uint256 index) public view returns (
        address, uint256, uint256, string memory, string memory
    ) {
        Score memory s = scores[index];
        return (s.player, s.score, s.timestamp, s.winnerName, s.scoreDetail);
    }

    function getScoresCount() public view returns (uint256) {
        return scores.length;
    }
}