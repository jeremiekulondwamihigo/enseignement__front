import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function RadioButtonsGroup(props) {
  const { title, option, setValue } = props

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        {title || 'Titre'}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        defaultValue={true}
        name="row-radio-buttons-group"
        onChange={(e) => setValue(e.target.value)}
      >
        {option.map((index) => {
          return (
            <FormControlLabel
              key={index.id}
              value={index.id}
              control={<Radio />}
              label={index.title}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
