const initialState = {
  locationsInfo: [],
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAP_LOCATIONS':
      return {
        locationsInfo: [...action.locationsInfo],
      };
    case 'RESET_MAP':
      return initialState;
    default:
      return state;
  }
};

export default mapReducer;
