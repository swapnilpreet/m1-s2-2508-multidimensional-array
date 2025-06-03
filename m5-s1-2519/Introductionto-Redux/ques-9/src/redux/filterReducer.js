const initialFilterState = {
  author: '',
  genre: '',
  status: 'all',
};

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case 'SET_AUTHOR_FILTER':
      return { ...state, author: action.payload };
    case 'SET_GENRE_FILTER':
      return { ...state, genre: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, status: action.payload };
    case 'RESET_FILTERS':
      return initialFilterState;
    default:
      return state;
  }
};

export default filterReducer;