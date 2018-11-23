export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('auth');
      if (serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return null;
    }
};

export const saveState = (state) => {
    console.log("Save State");
    console.log(state);
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('auth', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  };