import React, { useEffect, useState } from "react"
import SideBar from "../../SideBar/SideBar";
import axios from 'axios'
import { lien_read, lien_image_admin } from "../../Static/Liens";
import "./style.css"
import { useLocation } from "react-router-dom"
import Parameters_Detail from "./Parametre_Detail";
import { useSelector, useDispatch } from "react-redux"



export default function Index_Detail(){

    
    const location = useLocation()
    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }
    // const parametre = location.pathname.split("/")[2]

    const [data, setData] = useState()

    const fetch = ()=>{
        axios.get(`${lien_read}/read_one_secteur/${location.state.postTitle}`, config).then(response =>{
            
            setData(response.data)
        })
    }

    useEffect(()=>{
        fetch()
        
    }, [])


    

    return(
        <div className='container'>
        <SideBar/>
        <main>
            
                {
                    data && data[0].agent ?
                    <div className="container-detail">
                        <div className="icone">
                            <img src={`${lien_image_admin}/${data[0].agent[0].filename}`} alt="image"/>
                        </div>
                        <div className="identite">
                            <p>Code secteur : <span>{data[0].code_secteur}</span></p>
                            <p>Code Province : <span>{data[0].code_province}</span></p>
                            <p>Inspecteur Provincial : <span>{data[0].agent[0].nom}</span></p>
                        </div>
                        <div className="secteur">
                            <h2>Secteur {data[0].denomination}</h2>
                            <p>Année scolaire {data[0].annee[0] && data[0].annee[0].annee }</p>
                        </div>
                        
                    </div> : <p>Undefined</p>
                }
                <div className="parameter">
                    <Parameters_Detail data={data}/>
                </div>
                
        </main>
    </div>
    )
}