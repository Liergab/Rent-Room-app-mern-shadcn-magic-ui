

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Register from './Page/publicPage/Register'
import { Toaster }       from 'react-hot-toast';
import Login from './Page/publicPage/Login';
import { useAppContext } from './context/AppContext';
import AddHotel from './Page/authenticated/AddHotel';
import MyRooms from './Page/authenticated/MyRooms';
import EditRoom from './Page/authenticated/EditRoom';
import Search from './Page/publicPage/Search';
import Details from './Page/publicPage/Details';

function App() {
  const {isLoggin} = useAppContext()
  return (
    <>
      <Toaster position='top-right'  toastOptions={{duration:5000}} />
      <Routes>
        <Route path='/' element={<Layout>
          <p>HomrPage</p>
        </Layout>}/>
        <Route path='/search' element={<Layout>
          <Search/>
        </Layout>}/>
        <Route path='/detail/:id' element={<Layout>
          <Details/>
        </Layout>}/>
        <Route path="/sign-up" element={<Register/>}/>
        <Route path='/sign-in' element={<Login/>}/>
        {isLoggin && <Route path='/my-hotel' element={<Layout><MyRooms/></Layout>}/>}
        {isLoggin && <Route path='/edit-hotel/:id' element={<Layout><EditRoom/></Layout>}/>}
        {isLoggin == true && <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>}
        <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    </>
  )
}

export default App
