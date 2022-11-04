import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Paper, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import { lien_create, lien_update, lien_read } from '../../../Static/Liens'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import Autocompletion from '../../../Utils/AutoComplete'
import PropType from 'prop-types'

function FormEnseignant(props) {
  const { fonctions, agentConnect } = props

  const { data } = agentConnect
  const { code_province } = data[0]

  const [messageE, setMessage] = useState({ message: '', error: Boolean })
  const { message, error } = messageE
  const [imageError, setImageError] = useState(true)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }

  const [file, setImage] = useState()
  const id = new Date()

  const [valeur, setValeur] = useState({
    nom: '',
    dateNaissance: '',
    nationalite: '',
    matricule: '',
    telephone: '',
    dateEngagement: '',
    fonction: 'enseignant',
  })
  const {
    nom,
    dateEngagement,
    dateNaissance,
    nationalite,
    matricule,
    telephone,
    fonction,
  } = valeur

  // useEffect(()=>{
  //   if(!isEmpty(data)){
  //     setValeur({...data})

  //   }
  // }, [data])

  const handleChange = (e) => {
    const { id, value } = e.target
    setValeur({
      ...valeur,
      [id]: value,
    })
  }

  useEffect(() => {
    if (file) {
      if (file.size > 204800) {
        setImageError(true)
      } else {
        setImageError(false)
      }
    }
  }, [file])

  const updateAgent = (e) => {
    e.preventDefault()
    axios
      .put(
        `${lien_update}/updateagent`,
        {
          id: data._id,
          data: valeur,
        },
        config,
      )
      .then((response) => {
        setMessage(response.data)
        fonctions()
      })
  }

  const [valueDomaine, setValueDomaine] = useState('')

  const [items, setItems] = useState([])

  const readDomaine = async () => {
    const response = await axios.get(`${lien_read}/domaine`, config)
    const { data } = response

    setItems(data)
  }
  useEffect(() => {
    readDomaine()
  }, [])

  const gender = [
    { id: 'M', title: 'Masculin' },
    { id: 'F', title: 'Féminin' },
  ]
  const [valueGender, setValueGender] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    const domainess = valueDomaine.codeDomaine
    const genre = valueGender.id

    const datas = new FormData()
    datas.append('file', file)
    datas.append('agent_save', agentConnect)
    datas.append('nom', nom)
    datas.append('dateNaissance', dateNaissance)
    datas.append('nationalite', nationalite)
    datas.append('matricule', matricule)
    datas.append('telephone', telephone)
    datas.append('dateEngagement', dateEngagement)
    datas.append('fonction', fonction)
    datas.append('id', id)
    datas.append('genre', genre)
    datas.append('codeDomaine', domainess)

    if (imageError) {
      setMessage({
        message: "La taille de l'image doit etre inferieure à 50ko",
        error: true,
      })
    } else {
      axios.post(`${lien_create}/agent`, datas, config).then((response) => {
        setMessage(response.data)
      })
    }
  }

  return (
    <div>
      {message && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            variant="filled"
            severity={error === false ? 'success' : 'warning'}
          >
            <h3>{message}</h3>
          </Alert>
        </Stack>
      )}
      <Paper elevation={0} style={{ padding: '20px' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
          }}
        >
          <Grid style={{ marginRight: '10px' }}>
            <TextField
              disabled
              value={code_province}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: '10px' }}
              fullWidth
              id="agent_save"
            />
            <TextField
              autoComplete="off"
              type="text"
              onChange={(e) => handleChange(e)}
              value={nom}
              name="nom"
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Nom de l'agent"
              id="nom"
            />
            <TextField
              autoComplete="off"
              value={dateNaissance}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: '10px' }}
              fullWidth
              type="date"
              label="dateNaissance"
              id="dateNaissance"
            />
            <TextField
              autoComplete="off"
              value={nationalite}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Nationalité"
              id="nationalite"
            />
            {items ? (
              <Autocompletion
                value={valueDomaine}
                setValue={setValueDomaine}
                items={items}
                label="Domaine d'étude"
              />
            ) : (
              <p>Veuillez patienter svp</p>
            )}
          </Grid>
          <Grid>
            <div>
              <Autocompletion
                value={valueGender}
                setValue={setValueGender}
                items={gender}
                label="Genre"
              />
            </div>
            <TextField
              autoComplete="off"
              value={matricule}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Matricule"
              id="matricule"
            />
            <TextField
              autoComplete="off"
              value={telephone}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Téléphone"
              id="telephone"
            />
            <TextField
              style={{ marginBottom: `${!imageError && '10px'}` }}
              onChange={(event) => {
                const file = event.target.files[0]
                setImage(file)
              }}
              fullWidth
              type="file"
              label="Image"
              id="file"
            />
            {imageError && (
              <span
                style={{
                  color: 'red',
                  marginBottom: '10px',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                La taille doit etre inferieure à 50ko
              </span>
            )}

            <TextField
              autoComplete="off"
              value={dateEngagement}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: '10px' }}
              fullWidth
              type="date"
              label="Date d'engagement"
              id="dateEngagement"
            />
          </Grid>
        </Box>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={(e) => handleForm(e)}
          color="primary"
        >
          Enregistrer
        </Button>
      </Paper>
    </div>
  )
}

FormEnseignant.PropType = {
  imageError: PropType.bool.isRequired,
  code_province: PropType.string.isRequired,
  data: PropType.object.isRequired,
  valeur: PropType.object.isRequired,
  nom: PropType.string,
  dateNaissance: PropType.string,
  nationalite: PropType.string,
  matricule: PropType.string,
  telephone: PropType.string,
  dateEngagement: PropType.string,
  fonction: PropType.string,
  handleChange: PropType.func.isRequired,
  updateAgent: PropType.func.isRequired,
  valueDomaine: PropType.string,
  items: PropType.object.isRequired,
  readDomaine: PropType.func.isRequired,
}
export default FormEnseignant
