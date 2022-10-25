import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtons(props) {
    const { items, label, setValue } = props
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {
            items.map( index =>{
                return <FormControlLabel key={index.id} onChange={(e)=>setValue(e.target.value)} value={index.value} control={<Radio />} label={index.label} />
            })
        }
        
        
      </RadioGroup>
    </FormControl>
  );
}