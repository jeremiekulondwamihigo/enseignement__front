import React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { Clear, Check } from '@mui/icons-material'
import PropType from 'prop-types'

function AlertFunction(props) {
  const { message, type } = props
  return (
    <Stack sx={{ width: '100%', marginBottom: '15px' }} spacing={2}>
      <Alert
        icon={
          type !== 'success' ? (
            <Clear fontSize="inherit" />
          ) : (
            <Check fontSize="inherit" />
          )
        }
        severity={type}
      >
        {message}
      </Alert>
    </Stack>
  )
}

AlertFunction.PropType = {
  message: PropType.string.isRequired,
  type: PropType.string.isRequired,
  props: PropType.object.isRequired,
}
export default AlertFunction
