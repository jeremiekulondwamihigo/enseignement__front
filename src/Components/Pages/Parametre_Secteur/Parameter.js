import React, { useState, useEffect } from 'react'
import SideBar from '../../SideBar/SideBar'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box} from '@mui/material';
import styled from "styled-components"
import { lien_read } from "../../Static/Liens"
import axios from "axios"
import TabEtablissement from './Table/Tab_Etablissement';
import TabSousDivision from './Table/Tab_Sous_Division';



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

function Parameters_Secteur() {

    const config = {
      headers : {
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("authToken")
      }
    }
    const [dataLog, setDataLog ] = useState({ user : {}, secteur : {}, etablissement : {}})
    const [disponible, setDisponible] = useState(false)

    useEffect(()=>{
      async function fetchData(){
        const response = await axios.get(`${lien_read}/user`, config);
        if(response.data.success === false){
          localStorage.removeItem("authToken");
          window.location.replace("/sign")
        }else{
          setDataLog(response.data)
          setDisponible(true)
        }
      }
      fetchData();
        
      }, [])

    const { user, secteur, etablissement } = dataLog

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      console.log(newValue)
      setValue(newValue);
    };
  

  return (
    <div className='container'>
    <SideBar donner={secteur ? "secteur" : etablissement ? "etablissement" : ""}/>
        <main>
            <h1>{secteur ? user.denomination : null}</h1>
            <div className="date">
                <input type="date"/>
            </div>

            <div style={{position:"absolute", top:"30px", right:"40rem"}}>
                <h2>Troisieme période</h2>
            </div>

        {/* le corps de mon component */}
        {
          disponible && 
          <Container>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                     
                      <Tab label="Etablissement" {...a11yProps(0)} />
                      <Tab label="Division" {...a11yProps(1)} />
                    </Tabs>
                </Box>
               
                <TabPanel value={value} index={0}>
                    <TabEtablissement data={dataLog}/> 
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TabSousDivision/>
                </TabPanel>
              </Box>
          </Container>

        }
            
    {/* Fin corps de mon component */}
            
           
        </main>
        {/* <RightParameters/> */}

    </div>
    
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

export default Parameters_Secteur