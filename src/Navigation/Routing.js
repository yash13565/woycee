import React from 'react'
import Signup from '../Screens/Signup'
import TableData from '../Screens/TableData'
import { Route, Routes } from 'react-router-dom'

function Routing() {
  return (
    <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/userdata' element={<TableData/>}/>
    </Routes>
  )
}

export default Routing