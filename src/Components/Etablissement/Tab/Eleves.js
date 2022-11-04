import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { lien_read, lien_image_eleve, isEmpty } from '../../Static/Liens'
import axios from 'axios'
import '../agent.css'
import Popup from '../../Static/Popup'
import { Avatar, Fab, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Add, Delete } from '@mui/icons-material'
import FormEleve from '../Form/Eleve'
import { deepPurple } from '@mui/material/colors'
import ProtoType from 'prop-types'
import ConfirmDialog from '../../Controls/ConfirmDelete'

function EleveTable({ dataLog }) {
  const { data } = dataLog

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })

  const deleteOption = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    alert(id)
  }

  const [eleveEcole, setEleve] = useState()
  const fechAgent = async (e) => {
    if (dataLog) {
      const response = await axios.get(
        `${lien_read}/readEleve/${data[0].codeEtablissement}`,
        config,
      )
      setEleve(response.data)
    }
  }
  useEffect(() => {
    fechAgent()
  }, [dataLog])

  const [openPopup, setOpenPopup] = useState(false)

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 55,
      renderCell: (params) => {
        return (
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {!isEmpty(params.row.filename) ? (
              <img
                src={`${lien_image_eleve}/${params.row.filename}`}
                alt={params.row.agent[0].filename}
              />
            ) : (
              params.row.nom.substr(0, 1)
            )}{' '}
          </Avatar>
        )
      },
    },
    {
      field: 'nom',
      headerName: 'Nom complet',
      width: 220,
      renderCell: (params) => {
        return (
          <>{`${params.row.nom} ${params.row.postNom} ${params.row.prenom}`}</>
        )
      },
    },
    {
      field: 'lieu_naissance',
      headerName: 'Lieu de naissance',
      width: 120,
    },
    {
      field: 'date_Naissance',
      headerName: 'Date de naissance',
      width: 120,
      renderCell: (params) => {
        return <>{new Date(params.row.date_Naissance).toLocaleDateString()}</>
      },
    },
    {
      field: 'code_eleve',
      headerName: 'Code',
      width: 100,
    },
    {
      field: 'code_tuteur',
      headerName: 'Code tuteur',
      width: 100,
    },
    {
      field: 'genre',
      headerName: 'Genre',
      width: 70,
    },
    {
      field: 'nationalite',
      headerName: 'Nationalité',
      width: 140,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 60,
      renderCell: (params) => {
        return (
          <>
            <Fab
              color="secondary"
              size="small"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Voulez-vous supprimer cette informaton ?',
                  subTitle: 'Si oui vous pouvez confirmer la suppression',
                  onConfirm: () => {
                    deleteOption(params.row._id)
                  },
                })
              }}
            >
              <Delete />
            </Fab>
          </>
        )
      },
    },
  ]

  return (
    <Container>
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
      {eleveEcole && (
        <>
          <Paper elevation={4}>
            <div
              style={{
                width: '100%',
                height: 440,
                zIndex: 0,
              }}
            >
              <DataGrid
                rows={eleveEcole}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[6]}
                checkboxSelection
              />
            </div>
          </Paper>
        </>
      )}

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Enregistrement d'un nouveau élève dans le systeme"
      >
        <FormEleve dataLog={dataLog} fechAgent={fechAgent} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
  )
}

const Container = styled.div`
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    display: flex;
    width: 100%;
    margin: 1rem 0 0 0;
  }
`
EleveTable.Prototype = {
  data: ProtoType.object.isRequired,
  config: ProtoType.object.isRequired,
  eleveEcole: ProtoType.array.isRequired,
  openPopup: ProtoType.bool.isRequired,
  lien_image_eleve: ProtoType.string.isRequired,
  params: ProtoType.object,
  columns: ProtoType.array,
  confirmDialog: ProtoType.object.isRequired,
  deleteOption: ProtoType.func.isRequired,
}

export default EleveTable
