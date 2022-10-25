import React from 'react'
import SideBar from '../../SideBar/SideBar'


export default function Tab_Ecole() {
  return (
    <div className='container'>
        <SideBar/>
        <main>
            <h1>NORD-KIVU</h1>
            <div className="date">
                <input type="date"/>
            </div>
        </main>
    </div>
  )
}
