import React, { useState } from 'react';
import {Route, Routes, Link } from 'react-router-dom';
import Near from '../Display components/nearest';
import Up from '../Display components/upcoming';
import Pass from '../Display components/Past';
import './nav.css';
function Nav(prop)
{
    const[select,updateselect]=useState(null)
    const handleselectu=()=>{
        updateselect('u')
    }
    const handleselectn=()=>{
        updateselect('n')
    }
    const handleselectp=()=>{
        updateselect('p')
    }
    return(
        <>
            <Link onClick={handleselectn} className={select==='n'?'change_near':'near'} to='/nearest'>Nearest rides</Link>
            <Link onClick={handleselectu} className={select==='u'?'change_up':'up'} to='/upcoming'>Upcoming rides</Link>
            <Link onClick={handleselectp} className={select==='p'?'change_pass':'pass'} to='/past'>Past rides</Link>
            <Routes>
                <Route path='/nearest' element={<Near nn={prop.n}></Near>}></Route>
                <Route path='/upcoming' element={<Up ff={prop.f}></Up>}></Route>
                <Route path='/past'  element={<Pass pp={prop.p}></Pass>}></Route>
            </Routes>
        </>
    )
}
export default Nav;