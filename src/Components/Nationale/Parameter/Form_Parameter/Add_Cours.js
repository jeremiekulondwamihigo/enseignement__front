import React, { useState, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'
import { lien_create, isEmpty, lien_update } from '../../../Static/Liens'
import RadioButtonsGroup from '../../../Controls/RadioGroup'
import AlertFunction from '../../../Controls/Alert'

function Add_Cours(props) {
  const { code, niveau, loadingCours, data, branches } = props

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }

  const validation = [
    { id: true, title: "Autoriser l'examen" },
    { id: false, title: "Pas d'examen" },
  ]
  const [hookValidExamen, setValidExamen] = useState(true)

  const [values, setValue] = useState({ maxima: 0, branche: '' })
  const { maxima, branche } = values

  const handleChange = (e) => {
    const { id, value } = e.target

    setValue({
      ...values,
      [id]: value,
    })
  }
  useEffect(() => {
    if (!isEmpty(data)) {
      setValidExamen(Boolean(data.validExamen))
      setValue({ ...data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches])

  let id = new Date()
  const [messageAlert, setMessageAlert] = useState({
    message: '',
    error: Boolean,
  })
  const { message, error } = messageAlert

  const functionModCours = (e) => {
    axios
      .put(
        `${lien_update}/cours`,
        {
          valeur: values,
          validExamen: hookValidExamen,
          id: data._id,
        },
        config,
      )
      .then((response) => {
        setMessageAlert(response.data)
      })
      .finally(() => {
        loadingCours()
      })

    e.preventDefault()
  }

  const submitCours = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `${lien_create}/cours`,
      {
        valeur: values,
        classe: niveau,
        id,
        validExamen: hookValidExamen,
        code_Option:
          parseInt(niveau) > 5 ? 'Education de Base' : code.code_Option,
      },
      config,
    )
    setMessageAlert(response.data)
    loadingCours()
  }

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      {!isEmpty(message) && (
        <AlertFunction message={message} type={error ? 'warning' : 'success'} />
      )}

      <TextField
        autoComplete="off"
        onChange={(e) => handleChange(e)}
        sx={{ marginBottom: '10px' }}
        fullWidth
        label="Branche"
        name="branche"
        id="branche"
        value={branche}
      />
      <TextField
        autoComplete="off"
        // onChange={(e) => handleChange(e)}
        sx={{ marginBottom: '10px' }}
        fullWidth
        label="Maxima"
        name="maxima"
        value={maxima}
        id="maxima"
        onChange={(e) => handleChange(e)}
      />
      <div style={{ marginBottom: '10px' }}>
        <RadioButtonsGroup
          title="Examen"
          option={validation}
          value={hookValidExamen}
          setValue={setValidExamen}
        />
      </div>

      <Button
        color="primary"
        variant="contained"
        onClick={(e) => (!isEmpty(data) ? functionModCours(e) : submitCours(e))}
      >
        {!isEmpty(data) ? 'Modification' : 'Enregistrer'}
      </Button>
    </Box>
  )
}

export default React.memo(Add_Cours)
