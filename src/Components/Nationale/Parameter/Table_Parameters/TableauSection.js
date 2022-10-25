import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Fab, Toolbar, TextField, InputAdornment } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Section from '../Section';
import axios from 'axios';
import { lien_read } from "../../../Static/Liens"
import AddIcon from '@mui/icons-material/Add';
import Popup from '../../../Static/Popup';
import Option from '../Option';
import styled from "styled-components"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { ModeEdit } from '@mui/icons-material';




function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [data, setData] = React.useState()
  const [openPopupModif_Opt, setOpenPopupModif_Option] = React.useState(false)
  const [dataModification, setDataMofication] = React.useState("")

  const functionOpen =(data)=>{
    setData(data)
    setOpenPopup(true)
  }

  const modifierOption =(e, data)=>{
    e.preventDefault()
    setDataMofication(data)
    setOpenPopupModif_Option(true)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} component='tr'>
        <TableCell component={"td"}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.section}
        </TableCell>
        <TableCell align="right">{row.code_Section}</TableCell>
        <TableCell align="right">{new Date(row.id).toLocaleDateString()}</TableCell>
        <TableCell align="right">
            <AddCircleIcon fontSize='large' onClick={()=>functionOpen(row.code_Section)} style={{cursor:"pointer"}}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="span">
                {`${row.option.length < 1 ? "Aucune" : `${row.option.length}`} 
                ${row.option.length < 1 ? "option" : "options"} 
                ${row.option.length < 1 ? "organisée" : "organisées"} en ${row.section}`}
                
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{backgroundColor:"#dedede"}} component={'tr'}>
                    <TableCell>Option</TableCell>
                    <TableCell>code_option</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.option.map((option) => (
                    <TableRow key={option.option}>
                      <TableCell component="th" scope="row">
                        {option.option}
                      </TableCell>
                      <TableCell>{option.code_Option}</TableCell>
                      <TableCell>{new Date(option.id).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <ModeEdit onClick={(e)=>modifierOption(e, option._id)}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
              
          </Collapse>
          <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Ajouter l'option">
                <Option code_section={data}/>
              </Popup>
              <Popup openPopup={openPopupModif_Opt} setOpenPopup={setOpenPopupModif_Option} title="Modifier l'option">
                  <Option option_modification={dataModification}/>
              </Popup>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}





export default function TableauSection() {

  const [RowSection, setRowSection] = useState([])
  const [openSection, setOpenSection] = useState(false)

  const config = {
    headers : {
      "Content-Type":"application/json",
      "Authorization": "Bearer "+localStorage.getItem("authToken")
    }
  }
  
  const loadingSection = ()=>{
    axios.get(`${lien_read}/readsectionoption`, config).then(sectionFound =>{
      
      if(sectionFound.data.success === false){
        localStorage.removeItem("authToken");
        window.location.replace("/sign");
      }
      if(sectionFound){

        setRowSection(Array.from(sectionFound.data))
      }
    })
  }
  useEffect(()=>{
    loadingSection()
  }, [])

  const [filterFn, setFilterFn] = useState({fn:items=>{return items;}})
  const handleChange =(e)=>{
    let target = e.target
  
    setFilterFn({
      fn:items =>{
        if(target.value === ""){
          return items
        }else{
          return items.filter(x=> x.section.includes(target.value))
        }
        }
      })
    }


  return (
    <Paper elevation={3} style={{
      margin:"5px", 
      padding:"10px", 
      height:"72vh", 
      position:"relative",
      overflowX:'auto',
      }}>
      <Div>
      <Toolbar>
          <TextField
          style={{width:"80%"}}
                  onChange={handleChange}
                  label="Chercher une section"
                  InputProps={{
                    startAdornment:(<InputAdornment position="start">
                      <SearchIcon/>
                  
                    </InputAdornment>)
                  }}
                  />
                   <Fab size='large' style={{margin:"20px 40px", position:"absolute", right:"10px"}} color="primary" aria-label="add" onClick={()=>setOpenSection(true)} >
                    <AddIcon/>
                  </Fab>
                    
        </Toolbar>
      
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table" component={"table"}>
        <TableHead >
          <TableRow component={"tr"}>
            <TableCell />
            <TableCell>Section</TableCell>
            <TableCell align="right">Code section</TableCell>
            <TableCell align="right">Date d'enregistrement</TableCell>
            <TableCell align="right">Ajouter une option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody component="tbody">
          {RowSection && 
          filterFn.fn(RowSection).map((row) => (
            <Row key={row._id} row={row} />
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <Popup openPopup={openSection} setOpenPopup={setOpenSection} title="Aouter la section">
          <Section/>
      </Popup>
    </Div>
    </Paper>
  );
}
const Div = styled.div`
  padding:"20px";
  position:"absolute";
  height: 100%;

    @media screen and (min-width: 320px) and (max-width: 1080px){
        width: 80%;
        height: max-content;
        margin : 2rem 0; 
    }
    
`;
