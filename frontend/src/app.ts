// ou dans votre point d'entrée principal de l'application

// Fonction à exécuter au démarrage de l'application
function cleanupOrphanedTournamentMatches() {
  const currentMatchData = localStorage.getItem('currentTournamentMatch');
  
  if (currentMatchData) {
    try {
      const match = JSON.parse(currentMatchData);
      // Si match de tournoi sans source valide ou ancien
      if (!match.source || match.source !== 'tournament') {
        localStorage.removeItem('currentTournamentMatch');
        //console.log('Match de tournoi orphelin nettoyé au démarrage');
      }
    } catch (e) {
      localStorage.removeItem('currentTournamentMatch');
    }
  }
}

// Appelez cette fonction au démarrage de l'application
cleanupOrphanedTournamentMatches();