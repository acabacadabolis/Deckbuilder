import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Magic from './components/Magic.jsx';
import MagicSearch,{Search} from './components/MagicSearch.jsx';
import Yugioh from './components/Yugioh.jsx';
import Pokemon from './components/Pokemon.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import MagicDeck from './components/MagicDeck.jsx';
import SearchErrorPage from './components/SearchErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Magic",
        element: <Magic />,
        loader: Search,
        errorElement: <ErrorPage />,
        children:[
          {
            path: "/Magic/search",
            element: <MagicSearch />,
            loader: Search,
            errorElement:   <div>
                                <p> Search failed</p>
                            </div>,
          },
          {
            path: "/Magic/deck",
            element: <MagicDeck />,
          }
        ]
      },
      {
        path: "/YuGiOh",
        element: <Yugioh />
      },
      {
        path: "/Pokemon",
        element: <Pokemon />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
