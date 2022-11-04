import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function SimpleBackdrop(props) {
  const { open, setOpen, click, couleur, back, position, title } = props
  const handleClose = () => {
    click && setOpen(false)
  }
  const handleToggle = () => {
    setOpen(!open)
  }
  React.useEffect(() => {
    handleToggle()
  }, [])

  return (
    <div>
      <Backdrop
        sx={{
          color: couleur,
          position: position,
          backgroundColor: back,
        }}
        open={open}
        onClick={handleClose}
      >
        <div>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" />
          </div>

          <div>
            <p style={{ textAlign: 'center', color: 'red' }}>{title}</p>
          </div>
        </div>
      </Backdrop>
    </div>
  )
}
