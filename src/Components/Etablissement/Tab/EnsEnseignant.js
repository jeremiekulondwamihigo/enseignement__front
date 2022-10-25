import React, { useState, useEffect } from 'react'
import SideBar from '../../SideBar/SideBar';
import styled from "styled-components"
import { lien_read, lien_image_admin } from "../../Static/Liens"
import axios from "axios"
import { Provider } from "react-redux"
import {store} from "../../../store"
import FormAgent from "../Form/Form_Agent"
import "../agent.css"
import Popup from '../../Static/Popup';
import {Avatar, Fab } from '@mui/material';
import MenuListComposition from '../../Utils/MenuEdit'
import { RemoveCircle } from "@mui/icons-material"
import { DataGrid } from '@mui/x-data-grid';
import { Add } from "@mui/icons-material"
import ProtoType from "prop-types"



function EnsEnseignant() {

    const config = {
      headers : {
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("authToken")
      }
    }
    const [dataLog, setDataLog ] = useState()

    useEffect(()=>{
      async function fetchData(){
        const response = await axios.get(`${lien_read}/user`, config);
        if(response.data.success === false){
          localStorage.removeItem("authToken");
          window.location.replace("/sign")
        }else{
          setDataLog(response.data)
        }
      }
      fetchData();
        
      }, [])

      const [enseignant, setEnseignant] = useState([])
      
    
      const fechAgent = async(e)=>{
        if(dataLog){
          const response = await axios.get(`${lien_read}/allAgentEtablissement/${dataLog.data[0].codeEtablissement}`, config)
         
          setEnseignant(response.data)
        }

      }
      useEffect(()=>{
          fechAgent()
      }, [dataLog])

    
      const items = [
        {id:"En fonction", title : "En fonction" },
        {id:"Malade", title : "Malade" },
        {id:"Retraité", title : "Retraité" },
        {id:"En congé", title : "En congé" },
        {id:"Licencié", title : "Licencié" },
        {id:"Mort", title : "Mort" },
      ]
      

      const [openPopup, setOpenPopup] = useState(false)

      const columns = [
        { field: 'id', headerName: '#', width: 55, renderCell : (params)=>{
            return (<Avatar><img  src={`${lien_image_admin}/${params.row.agent[0].filename}`} alt={params.row._id}/></Avatar>)
        } },
        { field: 'code_agent', headerName: 'ID Agent', width: 80, renderCell: (params)=>{
          return <>{params.row.agent[0].code_agent}</>
        } },
        { field: 'nom', headerName: 'Nom et postnom', width: 150, renderCell: (params)=>{
          return <>{params.row.agent[0].nom}</>
        } },
        { field: 'matricule', headerName: 'Matricule', width: 100, renderCell: (params)=>{
          return <>{params.row.agent[0].matricule}</>
        } },
  
        { field: 'nationalite', headerName: 'Nationalité', width: 100, renderCell: (params)=>{
          return <>{params.row.agent[0].nationalite}</>
        } },
        { field: 'telephone', headerName: 'Téléphone', width: 100, renderCell: (params)=>{
          return <>{params.row.agent[0].telephone}</>
        } },
      
        { field: 'domaine', headerName: 'Domaine', width: 100, renderCell : (params)=>{
          return <>{params.row.domaine[0].title}</>
        } },
        { field: 'genre', headerName: 'Genre', width: 100, renderCell: (params)=>{
          return <>{params.row.agent[0].genre}</>
        } },
        {
          field : 'etat', headerName : "Etat", width:100
        },
        {
          field:"action", headerName :"Actions", width:100, renderCell : (params)=>{
            return <>
            <div >
              <MenuListComposition item={items} changeEtat={params.row._id}  icon={<RemoveCircle/>} style={{zIndex:10}} /> 
            </div>
            </>
          }
        }
      ];

  return (
    <Provider store={store}>
     
        <div className='container'>
          {
            dataLog ?
            <>
              <SideBar donner={dataLog.fonction}/>
            <main>
                <h1>{dataLog.data[0].etablissement}</h1>
                <div className="date">
                    <input type="date"/>
                </div>
    
                <div style={{position:"absolute", top:"30px", right:"40rem"}}>
                    <h2>Troisieme période</h2>
                </div>
                

                <div className='table'>
                <Fab variant="extended" style={{position:"absolute", right:"10px", top:"30px"}} color="primary" aria-label="add" onClick={()=>setOpenPopup(true)}>
                    <Add sx={{ mr: 1 }} />
                    Ajouter
                </Fab>
                {
                enseignant &&
                <div style={{width:"100%", height: 480, zIndex:0}}>
                <DataGrid
                  rows={enseignant}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  checkboxSelection
                  />
              </div>
              }
                  
                      
                </div>
            </main>
            </> : <div className="loader">
            
            <div>
            
            </div>
            </div>
          }
            {/* <RightMain dataLog={dataLog}/> */}
            {
              dataLog && 
              <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Recruter un enseignant">
                <FormAgent dataLog={dataLog} fonctions={fechAgent}/>
              </Popup>
            }
    
        </div>
     
    </Provider>
    
  )
}

const Container = styled.div`
    width : 80vw;
    border-bottom-right-radius : 2rem;
    border-top-right-radius : 2rem;
    
    
    @media screen and (min-width: 320px) and (max-width: 1080px){
        flex-direction : column;
        display:flex;
        width: 100%;
        margin : 1rem 0 0 0 ;
      }
`;
EnsEnseignant.ProtoType = {
  config : ProtoType.object.isRequired,
  dataLog : ProtoType.array.isRequired,
  enseignant : ProtoType.array.isRequired,
  items : ProtoType.array.isRequired,
  openPopup : ProtoType.bool.isRequired,
  columns : ProtoType.array.isRequired
}

export default EnsEnseignant