import React, { useState } from 'react'
import { TextField, Box, Button } from '@mui/material'
import { NiveauLettre } from '../../../Static/NiveauLettre'
import axios from 'axios'
import { lien_create, isEmpty } from '../../../Static/Liens'
import AlertFunction from '../../../Controls/Alert'

function Classe({ donner }) {
  const [data, setData] = useState({ pourcentage: 0, effectif: 0 })
  const [messageE, setMessage] = useState({ message: '', error: Boolean })

  const { classe, option } = donner

  const { pourcentage, effectif } = data

  const { message, error } = messageE

  const submitClasse = () => {
    var opt = option.code_Option ? option.code_Option : option
    axios
      .post(`${lien_create}/classe`, {
        code_Option: opt,
        effectif,
        resultat: pourcentage,
        niveau: classe,
      })
      .then((response) => {
        setMessage(response.data)
      })
  }
  if (donner) {
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
          <AlertFunction
            message={message}
            type={error ? 'warning' : 'success'}
          />
        )}
        <div className="optionClasse">
          <div>
            <h5>Classe : {NiveauLettre(parseInt(classe))}</h5>
          </div>
          <div>
            <h5>Option : {option.option || option} </h5>
          </div>
        </div>

        <TextField
          autoComplete="off"
          // onChange={(e) => handleChange(e)}
          sx={{ marginBottom: '10px' }}
          fullWidth
          label="Résultat Minimum à obtenir"
          name="resultat"
          id="resultat"
          type="number"
          onChange={(e) =>
            setData({
              ...data,
              pourcentage: e.target.value,
            })
          }
        />
        <TextField
          autoComplete="off"
          // onChange={(e) => handleChange(e)}
          sx={{ marginBottom: '10px' }}
          fullWidth
          label="Maximum d'élève à y inscrire"
          name="eleve"
          id="eleve"
          type="number"
          onChange={(e) =>
            setData({
              ...data,
              effectif: e.target.value,
            })
          }
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => submitClasse()}
        >
          Enregistrer
        </Button>
      </Box>
    )
  }
}

export default React.memo(Classe)
