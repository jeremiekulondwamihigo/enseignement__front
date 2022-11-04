import React, { useState, useEffect } from 'react'
import SideBar from '../../SideBar/SideBar'
import PropTypes from 'prop-types'
import { Tabs, Tab, Typography, Box } from '@mui/material'
import styled from 'styled-components'
import TabAnnee from './Table_Parameters/Tab_Annee'
import TableauSection from './Table_Parameters/TableauSection'
import TabCours from './Table_Parameters/Tab_Cours'
import Agent from './Table_Parameters/Agent'
import TabSecteur from './Table_Parameters/Tab_Secteur'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import { lien_read } from '../../Static/Liens'
import axios from 'axios'
import TabDomaineEtude from './Table_Parameters/DomaineAgent'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function Parameters() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }
  const [dataLog, setDataLog] = useState()
  useEffect(() => {
    axios.get(`${lien_read}/user`, config).then((response) => {
      if (response.data.fonction !== 'nationale') {
        localStorage.removeItem('authToken')
        window.location.replace('/sign')
      }
      setDataLog(response.data)
    })
  }, [])

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Provider store={store}>
      {dataLog ? (
        <div className="container">
          <SideBar donner={dataLog.fonction} />
          <main>
            <h1>NATIONAL</h1>
            <div className="date">
              <input type="date" />
            </div>

            <div style={{ position: 'absolute', top: '30px', right: '40rem' }}>
              <h2>Troisieme période</h2>
            </div>

            {/* le corps de mon component */}
            <Container>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="ANNEE" {...a11yProps(0)} />
                    <Tab label="SECTION" {...a11yProps(1)} />
                    <Tab label="COURS" {...a11yProps(2)} />
                    <Tab label="Enseignant" {...a11yProps(3)} />
                    <Tab label="Entité" {...a11yProps(4)} />
                    <Tab label="Administrateur" {...a11yProps(5)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <TabAnnee />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TableauSection />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <TabCours />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Agent dataLog={dataLog} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <TabSecteur />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <TabDomaineEtude />
                </TabPanel>
              </Box>
            </Container>
            {/* Fin corps de mon component */}
          </main>
          {/* <RightParameters/> */}
        </div>
      ) : (
        <div className="loader">
          <div></div>
        </div>
      )}
    </Provider>
  )
}

const Container = styled.div`
  width: 80vw;
  border-bottom-right-radius: 2rem;
  border-top-right-radius: 2rem;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    display: flex;
    width: 100%;
    margin: 1rem 0 0 0;
  }
`

export default Parameters
