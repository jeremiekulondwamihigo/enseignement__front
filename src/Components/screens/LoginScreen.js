import React, { useState } from 'react'
import { Paper, Grid, Fab } from '@mui/material'
import './style.css'
import { Facebook, GitHub, Instagram } from '@mui/icons-material'
import axios from 'axios'
import { lien_create, isEmpty } from '../Static/Liens'
import SnackFunction from '../Controls/Snack'

function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loginHandler = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        `${lien_create}/login`,
        { username, password },
        config,
      )

      if (res.data.sucess) {
        localStorage.setItem('authToken', res.data.token)
        window.location.replace('/')
      } else {
        setError(res.data.error)
      }

      setTimeout(() => {
        setError('')
      }, 4000)
    } catch (error) {
      if (error) {
        setTimeout(() => {
          setError('')
        }, 5000)
      }
    }
  }
  return (
    <Paper elevation={7} className="PaperLoginee">
      <Grid container>
        <Grid items lg={6} md={6} className="first">
          <div className="firstContent">
            <h2>WELCOME</h2>
            <h5>Enter your personal details and start journey with us</h5>
          </div>
        </Grid>
        <Grid items lg={6} md={6} style={{ padding: '20px' }}>
          <p className="auth">AUTHENTIFICATION</p>
          <div className="icons">
            <span>
              <Fab size="small" color="primary">
                <Facebook />
              </Fab>
            </span>
            <span>
              <Fab size="small">
                <GitHub />
              </Fab>
            </span>
            <span>
              <Fab size="small" color="red" style={{ color: 'red' }}>
                <Instagram />
              </Fab>
            </span>
          </div>
          <h6 className="textS">
            Use your username and password for identification
          </h6>
          <div className="error">
            {!isEmpty(error) && <SnackFunction message={error} />}
          </div>

          <div className="second">
            <div className="content">
              <div>
                <div className="dateS">
                  <input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="dateS">
                  <input
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="btne">
                  <button
                    className="buttonLogin"
                    onClick={(e) => loginHandler(e)}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default LoginScreen
