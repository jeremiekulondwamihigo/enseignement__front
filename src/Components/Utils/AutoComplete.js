import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Autocompletion(props) {
    const { value, setValue, items, label } = props
  

  return (
    <Autocomplete
    
      value={value}
      style={{width:"100%", marginBottom:"10px"}}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={label}
      options={items}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth style={{width:"100%"}}  />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top