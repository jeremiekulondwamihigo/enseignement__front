import React, { useState, useEffect } from 'react'
import SideBar from '../../SideBar/SideBar'
import axios from 'axios'
import { lien_read, lien_image_admin } from "../../Static/Liens"
import { useLocation } from "react-router-dom"
import { Paper } from "@mui/material"
import "./table.css"
import { Delete } from "@mui/icons-material"
import AffecterOption from '../Form/AffecterOption'
import Popup from "../../Static/Popup"
import ProtoType from "prop-types"

function DetailEcole() {

    const location = useLocation()
    const { ecole, lien } = location.state
    const [openPopup, setOpenPopup] = useState(false)
   

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
    const [optionEtablissement, setOptionEtablissement] = useState([])

    const lookOption = async()=>{
        const response = await axios.get(`${lien_read}/etablissementOption/${lien}`)
        setOptionEtablissement(response.data)
    }
    useEffect(()=>{
        lookOption()
    }, [])
    

  return (
    <div className='container'>
        {
            dataLog ? <>
            <SideBar donner={dataLog.fonction}/>
        <main>
            
            <div className="container-detail">
                <div className="icone">
                    <img src={`${lien_image_admin}/${dataLog.data[0].agent[0].filename}`}  alt="image"/>
                </div>
                <div className="identite">
                    <p>Code Etablissement : {lien && lien} <span></span></p>
                    <p>Code Province : <span></span></p>
                    <p>Inspecteur Provincial : <span></span></p>
                </div>
                <div className="secteur">
                    <h2>{ecole && ecole} </h2>
                    <p>Année scolaire</p>
                </div>
            </div> 
            <div className='information'>
            <Paper elevation={5} className="paper">
                <p onClick={()=>setOpenPopup(true)}>Ajouter une option</p>
                <table>
                    
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Option</td>
                            <td>Max</td>
                            <td>Action</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            optionEtablissement &&
                            optionEtablissement.map((index, key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{index.option}</td>
                                        <td>{index.max}</td>
                                        <td style={{cursor:"pointer"}}>
                                            <Delete color='default'/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td colSpan={2} style={{textAlign:"center"}}>{optionEtablissement && optionEtablissement.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </Paper>

            </div>
        </main>
            </> : <div className="loader"><div></div></div>
        }
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Affectation option">
            <AffecterOption dataLog={lien} lookOption={lookOption}/>
        </Popup>
    </div>
  )
}

DetailEcole.ProtoType = {
    SideBar : ProtoType.element.isRequired,
    lien_read : ProtoType.string.isRequired,
    lien_image_admin : ProtoType.string.isRequired,
    AffecterOption : ProtoType.element.isRequired,
    location : ProtoType.object.isRequired,
    ecole : ProtoType.string.isRequired,
    lien : ProtoType.string.isRequired,
    openPopup : ProtoType.bool.isRequired,
    config : ProtoType.string.isRequired,
    dataLog : ProtoType.string.isRequired,
    loading : ProtoType.func.isRequired,
    optionEtablissement : ProtoType.array,
    lookOption : ProtoType.func.isRequired
}

export default DetailEcole
