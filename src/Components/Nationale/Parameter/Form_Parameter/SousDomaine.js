import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isEmpty, lien_create, lien_read } from '../../../Static/Liens'
import AutoComplement from '../../../Controls/AutoComplete'
import { Box, TextField, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import AlertFunction from '../../../Controls/Alert'
import PropType from 'prop-types'

function SousDomaine({ niveau }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }
  const [domaine, setDomaine] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadingDomaine = async () => {
    const response = await axios.get(
      `${lien_read}/readdomaine/${'code'}/${niveau}`,
      config,
    )
    setDomaine(Array.from(response.data))
  }

  useEffect(() => {
    loadingDomaine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niveau])

  const [value, setValue] = useState(null)
  const [messageE, setMessage] = useState({ message: '', error: Boolean })
  const { message, error } = messageE
  const [valeurSousDomaine, setValeurSous] = useState('')

  const id = new Date()
  const submit = async (e) => {
    e.preventDefault()

    const response = await axios.post(
      `${lien_create}/sousdomaine`,
      {
        code_domaine: value.code_domaine,
        titre_sous_domaine: valeurSousDomaine,
        id,
      },
      config,
    )
    setMessage(response.data)
  }

  return (
    <div>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {!isEmpty(message) && (
          <AlertFunction
            message={message}
            type={error ? 'warning' : 'success'}
          />
        )}

        {!isEmpty(domaine) && (
          <AutoComplement
            value={value}
            setValue={setValue}
            options={domaine}
            title="Domaines"
          />
        )}
        <TextField
          fullWidth
          autoComplete="off"
          label="Entrer le sous domaine"
          id="titre_sous_domaine"
          onChange={(e) => setValeurSous(e.target.value)}
          style={{ marginTop: '15px', marginBottom: '20px' }}
        />
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={(e) => submit(e)}
          disabled={isEmpty(value) || isEmpty(valeurSousDomaine) ? true : false}
        >
          Enregistrer
        </Button>
      </Box>
    </div>
  )
}
SousDomaine.PropType = {
  niveau: PropType.string.isRequired,
  config: PropType.object.isRequired,
  domaine: PropType.array.isRequired,
  loadingDomaine: PropType.func.isRequired,
  value: PropType.object.isRequired || PropType.string,
  messageE: PropType.object.isRequired,
  message: PropType.string,
  error: PropType.bool,
  valeurSousDomaine: PropType.string,
  submit: PropType.func.isRequired,
  id: PropType.string.isRequired,
}
export default React.memo(SousDomaine)
