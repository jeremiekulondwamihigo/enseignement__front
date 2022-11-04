import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Paper, Grid } from '@mui/material'
import { Add, Edit } from '@mui/icons-material'
import { lien_create, isEmpty, lien_update } from '../../../Static/Liens'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import RadioButtons from '../../../Utils/RadioBtn'
import { fonctionLog } from '../../../Utils/Fonction'

export default function Form_Secteur(props) {
  const { data, reload } = props

  const [message, setMessage] = useState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }

  const id = new Date()

  const [valeur, setValeur] = useState({
    code_province: '',
    code_agent: '',
    denomination: '',
    username: '',
    password: '',
    code_secteur: '',
    id: id,
  })
  const { code_province, code_agent, denomination, code_secteur } = valeur

  useEffect(() => {
    if (!isEmpty(data)) {
      setValeur({ ...data })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValeur({
      ...valeur,
      [name]: value,
    })
  }

  const updateSecteur = (e) => {
    e.preventDefault()
    axios
      .put(
        `${lien_update}/updatesecteur/${data._id}`,
        {
          data: valeur,
        },
        config,
      )
      .then((response) => {
        setMessage(response.data)
        reload()
      })
  }

  const [fonctionChange, setFonctionChange] = useState('')
  const [messageCatch, setMessageCatch] = useState()

  const handleForm = (e) => {
    e.preventDefault()
    axios
      .post(
        `${lien_create}/addsecteur`,
        { valeur: valeur, fonction: fonctionChange },
        config,
      )
      .then((response) => {
        console.log(response)
        if (response.data.catch) {
          setMessageCatch(response.data.message.keyPattern)
          setMessage(null)
        } else {
          setMessageCatch(null)
          setMessage(response.data)
          reload()
        }

        // setTimeout(() => {
        //   setMessage(null)
        // }, 4000);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      {message && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            variant="filled"
            severity={message.success === false ? 'warning' : 'success'}
          >
            <h3>{message.error}</h3>
          </Alert>
        </Stack>
      )}
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <Grid style={{ marginRight: '10px' }}>
            <div className="divForm">
              <TextField
                className="textField"
                value={code_province}
                onChange={(e) => handleChange(e)}
                label="Code de la province"
                name="code_province"
              />
              {messageCatch?.code_province ? (
                <span className="Error___catch">
                  Le code de la province doit être unique
                </span>
              ) : null}
            </div>
            <div className="divForm">
              <TextField
                className="textField"
                onChange={(e) => handleChange(e)}
                value={code_agent}
                label="Code agent"
                name="code_agent"
              />
            </div>
            <div className="divForm">
              <TextField
                className="textField"
                value={denomination}
                onChange={(e) => handleChange(e)}
                label="Dénomination"
                name="denomination"
              />
              {messageCatch?.denomination ? (
                <span className="Error___catch">
                  La dénomination doit être unique
                </span>
              ) : null}
            </div>
            <div className="divForm">
              <TextField
                className="textField"
                value={code_secteur}
                onChange={(e) => handleChange(e)}
                label="Code secteur"
                name="code_secteur"
              />
              {messageCatch?.code_secteur ? (
                <span className="Error___catch">
                  Le code Proved doit être unique
                </span>
              ) : null}
            </div>
            <div className="divForm">
              <RadioButtons
                items={fonctionLog('nationale')}
                label="Fonction de l'agent"
                setValue={setFonctionChange}
              />
            </div>
          </Grid>
        </Box>
        <Button
          variant="contained"
          endIcon={!data ? <Add /> : <Edit />}
          onClick={!data ? (e) => handleForm(e) : (e) => updateSecteur(e)}
          color={data ? 'secondary' : 'primary'}
        >
          {data ? 'Modifier' : 'Enregistrer'}
        </Button>
      </Paper>
    </div>
  )
}
