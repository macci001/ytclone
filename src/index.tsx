import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BodyComponent from './Components/BodyComponent';
import WatchComponent from './Components/WatchComponent';
import SearchBodyComponent from "./Components/SearchBodyComponent";

const routerConfig = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [{
        path: "/",
        element: <BodyComponent />
      }, 
      {
        path: "/watch/:id",
        element: <WatchComponent />
      },
      {
        path: "/search/:query",
        element: <SearchBodyComponent />
      }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={routerConfig}/>
  </React.StrictMode>
);