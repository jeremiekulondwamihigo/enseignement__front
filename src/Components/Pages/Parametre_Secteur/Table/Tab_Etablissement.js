import React, { useState, useEffect } from 'react'
import {Avatar, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Popup from '../../../Static/Popup';
import { Add, Edit } from "@mui/icons-material"
import {  lien_read, isEmpty } from "../../../Static/Liens"
import axios from 'axios'
import Etablissement_Form from '../Form/Etablissement';


function Tab_Etablissement({ data }) {

  const { agent, user, secteur } = data
  const { code_secteur } = user
  
  const config = {
    headers : {
        "Content-Type":"application/json",
        "Authorization" : "Bearer "+localStorage.getItem('authToken')
    }
  }

  const [rows, setRows] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopupModifier, setOpenPopupModifier] = useState(false)
  const [dataModifier, setDataModifier] = useState()

  const read_Etablissement = async ()=>{

    const etablissement = await axios.get(`${lien_read}/readetablissement/${code_secteur}`, config)
   
    if(etablissement.data.success === false){
      localStorage.removeItem("authToken");
      window.location.replace("/sign")
    }
    if(!isEmpty(etablissement.data)){
      setRows(etablissement.data)
    }
  }

  useEffect(()=>{
    read_Etablissement()
  }, [])

  const modifier =(e, data)=>{
    e.preventDefault()
    setDataModifier(data)
    setOpenPopupModifier(true)
  }
  
  
  const items = [
    {id:"En fonction", title : "En fonction" },
    {id:"Malade", title : "Malade" },
    {id:"Retraité", title : "Retraité" },
    {id:"En congé", title : "En congé" },
    {id:"Licencié", title : "Licencié" },
    {id:"Mort", title : "Mort" },
  ]

 

    const columns = [
        { field: 'id', headerName: 'Date', width: 80, renderCell : (params)=>{
          return <>{new Date(params.row.id).toLocaleDateString()}</>
        } },
        { field: 'etablissement', headerName: 'Etablissement', width: 250 },
        { field: 'nbOption', headerName: 'Nbre Option', width: 100 },
        { field: 'nbEns', headerName: 'Nbre Enseign', width: 100 },
        { field: 'effectif', headerName: 'Elèves inscrit(e)s', width: 100 },
        { field: 'nom', headerName: "Chef d'établissement", width: 180, renderCell : (params)=>{
          return <>{params.row.agent[0].nom}</>
        } },
        { field: 'tel', headerName: "Contact", width: 100, renderCell : (params)=>{
          return <>{params.row.agent[0].telephone}</>
        } },
        { field: 'province', headerName: "Province", width: 120, renderCell : (params)=>{
          return <>{params.row.secteur[0].denomination}</>
        } },
        
        {
          field:"action", headerName :"Actions", width:100, renderCell : (params)=>{
            return <>
            
            <Edit  color='primary' style={{cursor:"pointer", marginRight:"20px"}}/>
            <p>Plus</p>
            
          
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
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Etablissement">
        <Etablissement_Form data={data}/>    
      </Popup>
      {/*
      <Popup openPopup={openPopupModifier} setOpenPopup={setOpenPopupModifier} title="Modifier un agent">
        <FormEnseignant data={dataModifier} read_Agent={read_Agent}/>    
      </Popup> */}
    </div>
  )
}

export default Tab_Etablissement