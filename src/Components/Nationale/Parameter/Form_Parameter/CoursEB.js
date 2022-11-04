/* eslint-disable react/no-typos */
import React, { useState, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'
import { isEmpty, lien_create, lien_read } from '../../../Static/Liens'
import AutoComplement from '../../../Controls/AutoComplete'
import { Add } from '@mui/icons-material'
import RadioButtonsGroup from '../../../Controls/RadioGroup'
import AlertFunction from '../../../Controls/Alert'
import SnackFunction from '../../../Controls/Snack'
import PropTypes from 'prop-types'

function CoursEB(props) {
  const { niveau, loadingCours } = props

  const [value, setValue] = useState('')

  const option = [
    { id: true, title: 'Domaine' },
    { id: false, title: 'Sous domaine' },
  ]
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }
  const [dataSousDomaine, setDataSousDomaine] = useState([])

  const [domaineData, setDomaineData] = useState([])
  const loadSousDomaine = async () => {
    let table = []
    const response = await axios.get(
      `${lien_read}/readdomaine/${'code'}/${niveau}`,
      config,
    )
    for (let iteration = 0; iteration < response.data.length; iteration++) {
      table = table.concat(response.data[iteration].sousDomaine)
    }
    setDomaineData(Array.from(response.data))
    setDataSousDomaine(Array.from(table))
  }

  useEffect(() => {
    loadSousDomaine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niveau])

  const [selectSousDomaine, setSelectSousDomaine] = useState(null)
  const [selectDomaine, setSelectDomaine] = useState(null)

  const [validExamen, setValidExamen] = useState(true)
  const optionExa = [
    { id: true, title: 'Examen valide' },
    { id: false, title: "Pas d'examen" },
  ]
  const [valeur, setValeur] = useState()
  let id = new Date()

  const [messageE, setMessage] = useState({ message: '', error: Boolean })
  const { message, error } = messageE
  const [openSnack, setOpenSnack] = useState(false)

  const submitCours = async () => {
    if (isEmpty(selectSousDomaine) && isEmpty(selectDomaine)) {
      setOpenSnack(true)
    } else {
      let identifiant = value.id
        ? selectDomaine.code_domaine
        : selectSousDomaine.code_sous_domaine

      const response = await axios.post(
        `${lien_create}/cours`,
        {
          valeur,
          classe: niveau,
          id,
          validExamen,
          identifiant,
          code_Option: 'Education de Base',
        },
        config,
      )
      setMessage(response.data)
      loadingCours()
    }
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
        {openSnack && (
          <SnackFunction message="Selectionner le domaine ou le sous domaine" />
        )}
        {!isEmpty(message) && (
          <AlertFunction
            message={message}
            type={error ? 'warning' : 'success'}
          />
        )}
        <AutoComplement
          value={value}
          setValue={setValue}
          title="Cours appartenant au"
          options={option}
        />
        <div style={{ marginTop: '15px' }}>
          {value.id ? (
            <AutoComplement
              value={selectDomaine}
              setValue={setSelectDomaine}
              title="domaine"
              options={domaineData}
            />
          ) : (
            <AutoComplement
              value={selectSousDomaine}
              setValue={setSelectSousDomaine}
              title="Sous domaine"
              options={dataSousDomaine}
            />
          )}
        </div>
        <TextField
          fullWidth
          autoComplete="off"
          label="Branche"
          id="branche"
          style={{ marginTop: '15px' }}
          onChange={(e) => setValeur({ ...valeur, branche: e.target.value })}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Maxima"
          id="maxima"
          type="number"
          style={{ marginTop: '15px' }}
          onChange={(e) => setValeur({ ...valeur, maxima: e.target.value })}
        />
        <div>
          <RadioButtonsGroup
            title="Examen"
            option={optionExa}
            setValue={setValidExamen}
          />
        </div>
        <Button
          style={{ marginTop: '15px' }}
          variant="contained"
          endIcon={<Add />}
          onClick={() => submitCours()}
        >
          Enregistrer
        </Button>
      </Box>
    </div>
  )
}

CoursEB.PropTypes = {
  value: PropTypes.string.isRequired,
  niveau: PropTypes.string.isRequired,
  option: PropTypes.array.isRequired,
  domaineData: PropTypes.array.isRequired,
  loadSousDomaine: PropTypes.func.isRequired,
  selectSousDomaine: PropTypes.object.isRequired,
  selectDomaine: PropTypes.object.isRequired,
  validExamen: PropTypes.bool.isRequired,
  optionExa: PropTypes.array.isRequired,
  valeur: PropTypes.object,
  messageE: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  openSnack: PropTypes.bool.isRequired,
  submitCours: PropTypes.func.isRequired,
}
export default React.memo(CoursEB)
