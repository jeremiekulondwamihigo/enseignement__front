import React, { useState, useEffect } from 'react'
import { Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Popup from '../../Static/Popup';
import { Add, Edit } from "@mui/icons-material"
import {  lien_read, isEmpty } from "../../Static/Liens"
import axios from 'axios'
import AddEcole from '../Form/AddEcole';
import { Link } from 'react-router-dom';
import ProtoType from "prop-types"


function EtablissementTable({ dataLog }) {
  

  const { data } = dataLog

  const { code_proved } = data[0]
  
  
  const config = {
    headers : {
        "Content-Type":"application/json",
        "Authorization" : "Bearer "+localStorage.getItem('authToken')
    }
  }

  const [rows, setRows] = useState([])
  const [openPopup, setOpenPopup] = useState(false)

  const read_Etablissement = async ()=>{

    const etablissement = await axios.get(`${lien_read}/readetablissement/${code_proved}`, config)

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

  const [dataChange, setDataChange] = useState([])
  const [openPopupModifier, setOpenPopupModifier] = useState(false)
  
  const Modification = (e, params)=>{
    e.preventDefault();
    setDataChange(params)
    setOpenPopupModifier(true)
  }

 
    const columns = [
      { field: 'active', headerName: 'Active', width: 80, renderCell : (params)=>{
        return <>
          <div style={{backgroundColor: `${params.row.active ? "green":"red"}`}} className="trueAndFalse">
            <div></div>
          </div>
        </>
      } },
        { field: 'id', headerName: 'Date', width: 80, renderCell : (params)=>{
          return <>{new Date(params.row.id).toLocaleDateString()}</>
        } },
        { field: 'etablissement', headerName: 'Etablissement', width: 250 },
        { field: 'codeEtablissement', headerName: 'Code', width: 100 },
        
        { field: 'option', headerName: 'Options', width: 100, renderCell : (params)=>{
          return <>{params.row.code_option.length < 1 ? "Aucune":params.row.code_option.length }</>
        } },
        { field: 'effectif', headerName: 'Effectif', width: 100, renderCell : (params)=>{
          return <>00000</>
        } },
        { field: 'agent', headerName: "Chef d'établissement", width: 150, renderCell: (params)=>{
          return <>{params.row.agent[0].nom}</>
        } },
        { field: 'telephone', headerName: "Téléphone", width: 120, renderCell: (params)=>{
          return <>{params.row.agent[0].telephone}</>
        } },
        {
          field:"action", headerName :"Actions", width:100, renderCell : (params)=>{
            return <>
            
            <Edit  color='primary' style={{cursor:"pointer", marginRight:"20px"}} onClick={(e)=>Modification(e, params.row)}/>
            <Link to={{
              pathname : "/information",
              state : {
                lien : params.row.codeEtablissement,
                ecole : params.row.etablissement
              }
            }}>
              Plus
            </Link>
            </>
          }
        }
      ];

  return (
    <div style={{width:1000}}>
        {
            rows ? <>
            <div style={{marginTop:"10px", position:"absolute", right:'12px', top:"0px"}}>
        <Fab variant="extended" color="primary" aria-label="add" onClick={()=>setOpenPopup(true)}>
            <Add sx={{ mr: 1 }} />
            Ajouter
        </Fab>
      </div>
      <div style={{width:"100%", height: 480, zIndex:0, marginTop: "20px"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          
          style={{zIndex:0}}
          />
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Etablissement">
           <AddEcole dataLog={dataLog}/> 
      </Popup>
      <Popup openPopup={openPopupModifier} setOpenPopup={setOpenPopupModifier} title="Modification">
           <AddEcole dataLog={dataLog} dataModifier={dataChange}/> 
      </Popup>
            
            </> : <div className="loader"><div></div></div>
        }
      
    </div>
  )
}
EtablissementTable.ProtoType = {
  Popup : ProtoType.node.isRequired,
  AddEcole : ProtoType.node.isRequired,
  dataLog : ProtoType.object.isRequired,
  data : ProtoType.array.isRequired,
  code_proved : ProtoType.string.isRequired,
  config : ProtoType.object.isRequired,
  rows : ProtoType.array,
  openPopup : ProtoType.bool.isRequired,
  read_Etablissement : ProtoType.func.isRequired,
  dataChange : ProtoType.any,
  openPopupModifier : ProtoType.bool.isRequired,
  Modification : ProtoType.func.isRequired,
  columns : ProtoType.array.isRequired
}
export default EtablissementTable