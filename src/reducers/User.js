const initialState = {
    userData: {},
    isFetching: false,
    isError: false
  };

  const usereducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USER":
        return Object.assign({}, state, {
          isFetching: true,
        });
      case "FETCHED_USER_DATA":
        return Object.assign({}, state, {
          isFetching: false,
          userData: action.data
        });
      default:
        return state;
    }
  };
  
  export default usereducer;