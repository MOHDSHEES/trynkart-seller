import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
// import {createStore,applyMiddleware,compose} from 'redux';
import { Provider } from "react-redux";
import store from "./store.js";
// import { ContainerItems } from "./actions/itemsDataActions.js";
// import { listItems, userDetails } from "./actions/itemsDataActions.js";

// import thunk from "redux-thunk";

// useEffect(() => {
//   setsearch("");
//   props.user && dispatch(userDetails(props.user.user._id));
// }, [dispatch, props.user]);

// const exampleThunkFunction = (dispatch, getState) => {
//   // dispatch(userDetails("60c1f37774893e4ab4aee51a"));
// dispatch(ContainerItems());
//   // const stateAfter = getState();
//   // console.log(`Counter after: ${stateAfter}`);
// };
// store.dispatch(exampleThunkFunction);

// const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store=createStore(allReducers,{}, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
