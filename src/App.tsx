import './App.css';
import * as React from 'react';
import HeaderComponent from './Components/HeaderComponent';
import {Provider} from "react-redux";
import {Outlet} from "react-router-dom";
import store from './Store';

function App() {
  return (
    <>
      <Provider store={store}>
        <div className='flex relative z-0'>
              <div>
                <HeaderComponent/>
                <Outlet/>
              </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
