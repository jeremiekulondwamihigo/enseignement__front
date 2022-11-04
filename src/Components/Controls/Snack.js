import React from 'react'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'
import PropType from 'prop-types'

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}
function SnackFunction({ message }) {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  })
  const { open, Transition } = state

  const handleCloseSnack = () => {
    setState({
      ...state,
      open: false,
    })
  }

  React.useEffect(() => {
    setState({
      open: true,
      Transition: SlideTransition,
    })
  }, [message])

  return (
    <Snackbar
      open={open}
      onClose={handleCloseSnack}
      TransitionComponent={Transition}
      message={message}
      key={state.Transition.name}
    />
  )
}

SnackFunction.PropType = {
  message: PropType.string.isRequired,
  state: PropType.object.isRequired,
  Transition: PropType.func.isRequired || PropType.object.isRequired,
  open: PropType.bool.isRequired,
  handleCloseSnack: PropType.func.isRequired,
}
export default React.memo(SnackFunction)
