
function cleanupOrphanedTournamentMatches() {
  const currentMatchData = localStorage.getItem('currentTournamentMatch');
  
  if (currentMatchData) {
    try {
      const match = JSON.parse(currentMatchData);
      if (!match.source || match.source !== 'tournament') {
        localStorage.removeItem('currentTournamentMatch');
      }
    } catch (e) {
      localStorage.removeItem('currentTournamentMatch');
    }
  }
}

cleanupOrphanedTournamentMatches();