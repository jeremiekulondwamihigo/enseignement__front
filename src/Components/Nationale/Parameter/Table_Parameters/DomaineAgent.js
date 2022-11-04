import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { isEmpty, lien_read } from '../../../Static/Liens'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { Edit } from '@mui/icons-material'
import Popup from '../../../Static/Popup'
import Domaine from '../Form_Parameter/DomaineAgent'
import PropType from 'prop-types'

function TabDomaineEtude() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }

  const [row, setRows] = useState([])

  const readDomaine = async () => {
    const response = await axios.get(`${lien_read}/domaine`, config)
    const { data } = response
    setRows(data)
  }
  useEffect(() => {
    readDomaine()
  }, [])

  const [openModification, setOpenModification] = useState(false)
  const [dataMofication, setDataMofication] = useState([])

  const makeTrue = (e, data) => {
    e.preventDefault()
    setDataMofication(data)
    setOpenModification(true)
  }

  const columns = [
    {
      field: 'title',
      headerName: "Domaine d'étude",
      width: 200,
      renderCell: (params) => {
        return (
          <p
            onClick={(e) => makeTrue(e, params.row)}
            style={{ cursor: 'pointer' }}
          >
            {params.row.title}{' '}
            <sub className="subDomaine">{params.row.total}</sub>{' '}
            <Edit
              style={{ marginLeft: '10px', position: 'absolute', right: '5px' }}
            />
          </p>
        )
      },
    },
  ]
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <React.Fragment>
      {!row && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <div style={{ width: '22%', height: 450, marginRight: '2%' }}>
        <div
          onClick={() => setOpenPopup(true)}
          style={{
            width: '100%',
            backgroundColor: '#dedede',
            padding: '5px',
            cursor: 'pointer',
          }}
        >
          <h3 style={{ textAlign: 'center' }}>Ajouter un domaine d'étude</h3>
        </div>
        {!isEmpty(row) && (
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
          />
        )}
      </div>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Enregistrer le domaine"
      >
        <Domaine readDomaine={readDomaine} />
      </Popup>

      <Popup
        openPopup={openModification}
        setOpenPopup={setOpenModification}
        title="Modifier le domaine"
      >
        <Domaine donner={dataMofication} readDomaine={readDomaine} />
      </Popup>
    </React.Fragment>
  )
}

TabDomaineEtude.PropType = {
  config: PropType.object.isRequired,
  row: PropType.array,
  readDomaine: PropType.func.isRequired,
  openModification: PropType.bool.isRequired,
  dataMofication: PropType.bool.isRequired,
  makeTrue: PropType.func.isRequired,
  columns: PropType.array.isRequired,
  openPopup: PropType.bool.isRequired,
}

export default TabDomaineEtude
