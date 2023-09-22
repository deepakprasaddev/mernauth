import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import PrivateRoute from './Auth/PrivateRoute';

function App() {

  return (
    <div className='main-wrapper relative'>
      <Navbar />
      <main className='mt-16'>
        <Routes>
          <Route path='/' index={true} element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
