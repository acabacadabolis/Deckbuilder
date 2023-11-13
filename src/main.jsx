import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Magic from './components/Magic.jsx';
import MagicSearch,{MagSearch} from './components/MagicSearch.jsx';
import Yugioh from './components/Yugioh.jsx';
import Pokemon from './components/Pokemon.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import MagicDeck, { LoadDeck } from './components/MagicDeck.jsx';
import SearchErrorPage from './components/SearchErrorPage.jsx';
import MagicCard, { DeleteCard } from './components/MagicCard.jsx';
import MagicDeckList from './components/MagicDeckList.jsx';
import YugiohSearch, { YgoSearch } from './components/YugiohSearch.jsx';
import YugiohCard from './components/YugiohCard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Magic",
        element: <Magic />,
        loader: MagSearch,
        errorElement: <ErrorPage />,
        children:[
          {
            path: "/Magic/search",
            element: <MagicSearch />,
            loader: MagSearch,
            errorElement: <div>Search Failed.</div>,
            children:[
              {
                element:<MagicCard/>,
                loader:MagSearch,
                action:DeleteCard,
              }
            ]
          },
          {
            path: "/Magic/deck",
            element: <MagicDeck />,
            loader: LoadDeck,
            children:[
              {
                element:<MagicCard />
              },
              {
                element:<MagicDeckList />
              }
            ]
          }
        ]
      },
      {
        path: "/Yugioh",
        element: <Yugioh />,
        loader: YgoSearch,
        errorElement: <ErrorPage />,
        children:[
          {
            path: "/Yugioh/search",
            element: <YugiohSearch />,
            loader: YgoSearch,
            children:[
              {
                element:<YugiohCard/>,
                loader: YgoSearch,
              }
            ]
          }
        ]
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
