export default () => (dispatch, getState, api) => {

  dispatch({
    type:'FETCH_USER'
  });
  return fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        }
        else {
          dispatch({
            type: "FETCHED_USER_DATA",
            data: data
          })
        }
      })
      .catch(err => dispatch({type: 'Error'}));
}
