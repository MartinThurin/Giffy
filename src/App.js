import React, { Suspense } from 'react';
import './App.css';
import Home from './pages/home';
import SearchResults from './pages/searchResults';
import Detail from './pages/detail';
import staticContext from './context/StaticContext'
import { GifsContextProvider } from './context/GifsContext';

import { Link, Route } from "wouter"



export default function App() {
  return (
    <staticContext.Provider value={
      {
        name: 'martin',
        suscribeteAlCanal: true
      }
    }>
      <div className="App">
        <Suspense fallback={null}>
        <section className="App-content">
          <Link to='/'>
            <figure className="App-logo">
              <img alt='Giffy logo' src='/logo.jpeg' />
            </figure>
          </Link>
          <GifsContextProvider>
            <Route
              component={Home}
              path="/"
            />
            <Route 
              component={SearchResults}
              path="/search/:keyword/:rating?" 
            />
            <Route 
              component={Detail}
              path="/gif/:id"
            />
            <Route 
              component={() => <h1>404 ERROR :(</h1>} 
              path="/404"  
            />
          </GifsContextProvider>
        </section>
        </Suspense>
      </div>
    </staticContext.Provider>
  )
}
