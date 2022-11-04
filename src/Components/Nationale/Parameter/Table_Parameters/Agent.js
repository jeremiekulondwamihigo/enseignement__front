import React, { useState, useEffect } from 'react'
import { Avatar, Fab, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Popup from '../../../Static/Popup'
import { Add, Person, RemoveCircle } from '@mui/icons-material'
import FormEnseignant from '../Form_Parameter/Agent'
import {
  lien_read,
  lien_image_admin,
  difference,
  isEmpty,
} from '../../../Static/Liens'
import MenuListComposition from '../../../Utils/MenuEdit'
import axios from 'axios'
import './style_Tab.css'

function Agent({ dataLog }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }
  const [openPopup, setOpenPopup] = useState(false)
  const [all_Agent, setAll_Agent] = useState([])

  const read_All_Agent = async () => {
    const response = await axios.get(`${lien_read}/readagent`, config)
    if (response) {
      setAll_Agent(response.data)
    }
  }

  useEffect(() => {
    read_All_Agent()
  }, [])

  const items = [
    { id: 'En fonction', title: 'En fonction' },
    { id: 'Malade', title: 'Malade' },
    { id: 'Retraité', title: 'Retraité' },
    { id: 'En congé', title: 'En congé' },
    { id: 'Licencié', title: 'Licencié' },
    { id: 'Mort', title: 'Mort' },
  ]

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 55,
      renderCell: (params) => {
        return (
          <Avatar>
            {isEmpty(params.row.filename) ? (
              <Person />
            ) : (
              <img
                src={`${lien_image_admin}/${params.row.filename}`}
                alt={params.row.filename}
              />
            )}
          </Avatar>
        )
      },
    },
    { field: 'code_agent', headerName: 'ID Agent', width: 80 },
    { field: 'nom', headerName: 'Nom et postnom', width: 150 },
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    {
      field: 'dateNaissance',
      headerName: 'Age',
      width: 70,
      renderCell: (params) => {
        return <>{difference(params.row.dateNaissance)} ans</>
      },
    },
    { field: 'nationalite', headerName: 'Nationalité', width: 100 },
    { field: 'telephone', headerName: 'Téléphone', width: 100 },
    {
      field: 'dateEngagement',
      headerName: 'Encieneté',
      width: 100,
      renderCell: (params) => {
        return <>{difference(params.row.dateEngagement)} ans</>
      },
    },
    { field: 'fonction', headerName: 'Fonction', width: 100 },
    {
      field: 'domaine',
      headerName: 'Domaine',
      width: 100,
      renderCell: (params) => {
        return <>{params.row.domaine[0].title}</>
      },
    },
    { field: 'genre', headerName: 'Genre', width: 100 },
    {
      field: 'etat',
      headerName: 'Etat',
      width: 100,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <div>
              <MenuListComposition
                item={items}
                changeEtat={params.row._id}
                icon={<RemoveCircle />}
                style={{ zIndex: 10 }}
              />
            </div>
          </>
        )
      },
    },
  ]

  return (
    <>
      <div
        style={{
          marginTop: '10px',
          position: 'absolute',
          right: '12px',
          top: '0px',
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setOpenPopup(true)}
        >
          <Add sx={{ mr: 1 }} />
          Ajouter
        </Fab>
      </div>
      {all_Agent && (
        <Paper elevation={4}>
          <div style={{ width: '100%', height: 480, zIndex: 0 }}>
            <DataGrid
              rows={all_Agent}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
        </Paper>
      )}
      {
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Enregistrer un enseignant"
        >
          <FormEnseignant agentConnect={dataLog} />
        </Popup>
      }
    </>
  )
}

export default Agent
