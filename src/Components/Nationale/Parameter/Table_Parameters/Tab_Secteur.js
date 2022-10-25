import React, { useState, useEffect } from 'react'
import { Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Popup from '../../../Static/Popup';
import { Add, Edit,  } from "@mui/icons-material"
import FormSecteur from '../Form_Parameter/Secteur';
import {  lien_read, lien_update,  } from "../../../Static/Liens"
import { Link } from "react-router-dom"
import axios from 'axios'
import "./style_Tab.css"


function Tab_Secteur() {

  const [rows, setRows] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopupModifier, setOpenPopupModifier] = useState(false)
  const [dataModifier, setDataModifier] = useState()

  const config = {
    headers : {
        "Content-Type":"application/json",
        "Authorization" : "Bearer "+localStorage.getItem('authToken')
    }
}

  const read_Secteur = ()=>{
    axios.get(`${lien_read}/readsecteur`, config).then(response =>{
      setRows(response.data)
    })
  }

  useEffect(()=>{
    read_Secteur()
  }, [])

  const modifier =(e, data)=>{
    e.preventDefault()
    setDataModifier(data)
    setOpenPopupModifier(true)
  }

  const Initialiser =(_id)=>{
    axios.put(`${lien_update}/updatesecteur/${_id}`, config).then(response =>{
      
    })
  }

    const columns = [
        { field: 'id', headerName: '#', width: 100, renderCell : (params)=>{
            return <>{ new Date(params.row.id).toLocaleDateString()}</>
        } },
        { field: 'denomination', headerName: 'Dénomination', width: 200, },
        { field: 'code_province', headerName: 'Code Province', width: 100 },
        { field: 'code_agent', headerName: 'Agent', width: 100 },
        { field: 'code_secteur', headerName: 'code Secteur', width: 100 },
        { field: 'periode', headerName: 'Periode', width: 100 },
        { field: 'etat', headerName: 'état', width: 100 },
        {
          field:"action", headerName :"Actions", width:150, renderCell : (params)=>{
            return <>
            
            <Edit onClick={(e)=>modifier(e, params.row)} color='primary' style={{cursor:"pointer", marginRight:"10px"}}/>
            <span style={{cursor:"pointer", margin:"10px", color:"green"}} onClick={()=>Initialiser(params.row._id)}>Initiale</span>
            
            <Link to={{
              pathname:"/detail",
              state : {
                postTitle : params.row.code_secteur
              }
            }}>
              <span style={{cursor:"pointer"}} >Détail</span>
            </Link>
            
            </>
          }
        }
      ];

  return (
    <div>
      
      <div style={{marginTop:"10px", position:"absolute", right:'12px', top:"0px"}}>
        <Fab variant="extended" color="primary" aria-label="add" onClick={()=>setOpenPopup(true)}>
            <Add sx={{ mr: 1 }} />
            Ajouter
        </Fab>
      </div>
      <div style={{width:"100%", height: 480, zIndex:0}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          style={{zIndex:0}}
          />
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Enregistrer la province">
        <FormSecteur reload={read_Secteur}/>    
      </Popup>
      <Popup openPopup={openPopupModifier} setOpenPopup={setOpenPopupModifier} title="Modifier la province">
        <FormSecteur data={dataModifier} reload={read_Secteur}/>    
      </Popup>
    </div>
  )
}

export default Tab_Secteur