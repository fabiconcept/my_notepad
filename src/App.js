import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesPage from './pages/notesPage'
import WelcomePage from './pages/welcome';
import NavBar from './ui-Objects/navBar'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<NotesPage />}></Route>
          </Route>
          <Route path='/intro' element={<WelcomePage/>}></Route>
          <Route path='/edit/:ids' element={<NotesPage />}></Route>
          <Route path="/view/:type" element={<NotesPage />}></Route>
          <Route path="/create" element={<NotesPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App