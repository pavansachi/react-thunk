// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import UserAction from "./actions/User";
import UserMockAction from "./actions/UserMock";

import sinon from "sinon";

const api = Object.assign({}, {
  get: sinon.stub()
})
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares)

test('mocks fetch and dispatches success action', () => {
  
  fetchMock.getOnce('https://jsonplaceholder.typicode.com/todos/1', {
    body: {
      userId: 1,
      title: "delectus aut autem",
      completed: false,
      id: 1
    },
    headers: { 'content-type': 'application/json' }
  })
  const expectedActions = [
    { type: "FETCH_USER"},
    { type: "FETCHED_USER_DATA", data: {
      userId: 1,
      title: "delectus aut autem",
      completed: false,
      id: 1
    } }
  ]
  const store = mockStore({ todos: [] })
  return store.dispatch(UserMockAction()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  })
});

test('dispatches success action', () => {
  
  api.get.resolves({
    userId: 1,
    title: "delectus aut autem",
    completed: false,
    id: 1
  });
  const expectedActions = [
    { type: "FETCHED_USER_DATA", data: {
      userId: 1,
      title: "delectus aut autem",
      completed: false,
      id: 1
    } }
  ]
  const store = mockStore({ todos: [] })
  return store.dispatch(UserAction()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  })

});

test('dispatches error action', () => {
  
  api.get.rejects({});
  const expectedActions = [
    { type: "ERROR" }
  ]
  const store = mockStore({ todos: [] })
  return store.dispatch(UserAction()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  })

});