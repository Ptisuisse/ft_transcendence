// Game state manager to handle cleanup between page navigations
export const gameState = {
  cleanupFunction: null as (() => void) | null,
  
  // Register a cleanup function
  registerCleanup(cleanup: () => void) {
    this.cleanupFunction = cleanup;
  },
  
  // Execute cleanup if it exists
  executeCleanup() {
    if (this.cleanupFunction) {
      this.cleanupFunction();
      this.cleanupFunction = null;
      return true;
    }
    return false;
  }
};