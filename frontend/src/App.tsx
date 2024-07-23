

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Register from './Page/publicPage/Register'


function App() {

  return (
   <Routes>
    <Route path='/' element={<Layout>
      <p>HomrPage</p>
    </Layout>}/>
    <Route path='/search' element={<Layout>
      <p>search</p>
    </Layout>}/>
    <Route path="/sign-in" element={<Register/>}/>
    <Route path='*' element={<Navigate to='/'/>}/>
   </Routes>
  
  )
}

export default App
