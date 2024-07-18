import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Layout } from './Layout'
import { Register } from './pages/Register'

function App() {

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Layout />} >
            <Route path="/" element={<Landing />  } />
            <Route path="/login" element={<Login />  } />
            <Route path="/register" element={<Register />  } />

      </Route>
    </Routes>
   
    </>
  )
}

export default App
