import React, { useState, useEffect } from 'react'
import SideBar from '../../SideBar/SideBar'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box} from '@mui/material';
import styled from "styled-components"
import { Provider } from "react-redux"
import { store } from "../../../store"
import { lien_read } from "../../Static/Liens"
import axios from "axios"
import EleveTable from '../Tab/Eleves';
import InscriptionForm from '../Form/Inscription';
import InscriptionEleveTable from '../Tab/InscriptionEleve';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

   
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
            <Typography component={'span'} variant={"body2"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function PageEleve() {

    const config = {
      headers : {
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("authToken")
      }
    }
    const [dataLog, setDataLog ] = useState()
    useEffect(()=>{
        axios.get(`${lien_read}/user`, config).then(response =>{
          if(response.data.fonction !== "etablissement"){
            localStorage.removeItem("authToken");
            window.location.replace("/sign")
          }
          setTimeout(() => {
            setDataLog(response.data)
          }, 2000);
        })

      }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

  return (
    <Provider store={store}>
      {
        dataLog ?
        <div className='container'>
      
    <SideBar donner={dataLog.fonction}/>
        <main>
            <h1>{dataLog.data[0].etablissement}</h1>
            <div className="date">
                <input type="date"/>
            </div>

            <div style={{position:"absolute", top:"30px", right:"40rem"}}>
                <h2>Troisieme période</h2>
            </div>

        {/* le corps de mon component */}
            <Container>
                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="ELEVES" {...a11yProps(0)} />
                      <Tab label="ELEVES INSCRITS" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                  <TabPanel value={value} index={0}>
                    <EleveTable dataLog={dataLog}/> 
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {/* <InscriptionEleve dataLog={dataLog}/> */}
                    {/* <InscriptionForm dataLog={dataLog}/> */}
                    <InscriptionEleveTable dataLog={dataLog}/>

                  </TabPanel>
                </Box>
            </Container>
    {/* Fin corps de mon component */}
            
           
        </main>
        {/* <RightParameters/> */}

    </div> : <div className="loader">
            
            <div>
            
            </div>
            </div>
      }
    
    </Provider>
    
  )
}

const Container = styled.div`
    width : 80vw;
    border-bottom-right-radius : 2rem;
    border-top-right-radius : 2rem;
    
    
    @media screen and (min-width: 320px) and (max-width: 1080px){
        flex-direction : column;
        display:flex;
        width: 100%;
        margin : 1rem 0 0 0 ;
      }
`;

export default PageEleve