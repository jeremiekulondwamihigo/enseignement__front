import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { lien_create } from '../../../Static/Liens'
import axios from 'axios'
import AlertFunction from '../../../Controls/Alert'

function Domaine({ niveau }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }
  const [domaines, setDomaine] = useState('')
  const [messageE, setMessage] = useState({ message: '', error: Boolean })
  const { message, error } = messageE
  const now = new Date()

  const addDomaine = () => {
    axios
      .post(
        `${lien_create}/adddomaine`,
        {
          domaines: domaines,
          classe: niveau,
          id: now,
        },
        config,
      )
      .then((response) => {
        setMessage(response.data)
      })
  }
  return (
    <div>
      {message && (
        <AlertFunction
          message={message}
          type={!error ? 'success' : 'warning'}
        />
      )}
      {niveau ? (
        <>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <TextField
              fullWidth
              label="Ajouter domaine"
              id="domaine"
              onChange={(e) => setDomaine(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={() => addDomaine()}
          >
            Enregistrer
          </Button>
        </>
      ) : (
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <p style={{ color: 'red', textAlign: 'center' }}>
            Veuillez selectionner le niveau
          </p>
        </Box>
      )}
    </div>
  )
}

export default Domaine
