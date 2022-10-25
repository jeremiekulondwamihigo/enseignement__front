import React, { useEffect, useState } from 'react'
import { Provider } from "react-redux"
import { store } from "../../../store"
import SideBar from '../../SideBar/SideBar'
import axios from "axios"
import { lien_read } from "../../Static/Liens"
import Nav from '../Nav'
import EtablissementTable from '../Table/Etablissement'

export default function IndexDivision() {


    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
    }
    const [dataLog, setDataLog ] = useState()

    const loading = async ()=>{
        const response = await axios.get(`${lien_read}/user`, config)
        
        if(response.data.success === false || response.data.fonction !== "proved"){
            localStorage.removeItem("authToken");
            window.location.replace("/sign")
        }else{
            setDataLog(response.data)
        }
    }
    useEffect(()=>{
        loading()
    }, [])

   

  return (
    <Provider store={store}>
        {
            dataLog ? 
            <div className='container'>
            <SideBar donner={dataLog.fonction}/>

                <main>
                <h1>{dataLog.data[0].denomination}</h1>
                <div className="date">
                    <input type="date"/>
                </div>
                        <EtablissementTable dataLog={dataLog}/>
                    
                </main>

            </div>
            : <div className="loader"><div></div></div>
     
        }
    
    </Provider>
  )
}