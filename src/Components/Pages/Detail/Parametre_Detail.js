import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from "styled-components";
import Periode from './Periode';
import AnneeScolaire from './AnneeScolaire';



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

function Parameters_Detail(props) {

    const { data } = props

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

  return (

    <div className='container'>
    
        <main>
            

        {/* le corps de mon component */}
            <Container>
                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="PERIODE" {...a11yProps(0)} />
                      <Tab label="ANNEE SCOLAIRE" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Periode data={data}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AnneeScolaire data={data}/>
                </TabPanel>
               
                </Box>
            </Container>
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

export default Parameters_Detail