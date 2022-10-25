import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { lien_read, isEmpty } from "../../../Static/Liens"
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import "./style_Tab.css"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import MenuListComposition from './Utils/Menu'
import Popup from '../../../Static/Popup';
import Domaine from '../Form_Parameter/Domaine';
import Add_Cours from '../Form_Parameter/Add_Cours';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


function Tab_Cours() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    
    const [row, setRowSection] = useState()
    const config = {
        headers : {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+localStorage.getItem('authToken')
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
      }, [row])

      const classes = [
        {id:7, title : "e"},
        {id:8, title : "e"},
        {id:1, title : "e"},
        {id:2, title : "e"},
        {id:3, title : "e"},
        {id:4, title : "e"}
      ]
      

      const [optionSelect, setOptionSelect] = useState("");
      const [classeSelect, setClasseSelect] = useState("");
      const [coursAndOption, setCoursAndOption] = useState([])
      
      const [openPopupDomaine, setOpenPopupDomaine] = useState(false)
      const [openPopupCours, setOpenPopupCours] = useState(false)

      const getItem = (item)=>{
        if(item === 1){
          setOpenPopupDomaine(true)
        }
        if(item === 2){
          setOpenPopupCours(true)
        }
      }

      const items = [
        {id:1, title : "Ajouter un domaine", },
        {id:2, title : "Ajouter un Cours", },
      ]
      
      const selectClasse =(item)=>{
        if(item.id > 5){
          setOptionSelect(undefined)
          setClasseSelect(item.id)
        }else{
          setClasseSelect(item.id)
        }
        
      }

      const loadCours =()=>{
        axios.get(`${lien_read}/readcours/${optionSelect}/${classeSelect}`, config).then(response=>{
          setCoursAndOption(response.data)
        })
      }
      useEffect(()=>{
        if(!isEmpty(optionSelect) && !isEmpty(classeSelect)){
          loadCours()
        }
      }, [optionSelect, classeSelect])

  return (
        <div className='divContainer'>
            <Paper elevation={3} className="papier" >
                {
                    row && row.map((index, key)=>{
                        return(
                            <Accordion expanded={expanded === `panel${key + 1}`} onChange={handleChange(`panel${key + 1}`)} key={key}>
                                <AccordionSummary aria-controls={`${`panel${key + 1}d-content`}`} id={`${`panel${key + 1}d-header`}`}>
                                <Typography component={'span'}>{index.section}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        index.option.length > 0 ? index.option.map((item, cle)=>{
                                            return (
                                                <div className='div' onClick={()=>setOptionSelect(item.code_Option)} key={cle}>
                                                    <span className='span1'>
                                                      <Avatar sx={{ bgcolor: cle % 2 !== 1 ? deepPurple[500] : deepOrange[500] }}>{item.option.substr(0, 1)}</Avatar>
                                                      <p>{item.option}</p>
                                                    </span>
                                                    
                                                </div>
                                            )
                                        }) : <p style={{textAlign:"center", color:"red"}}>Aucune option</p>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </Paper>
            <Paper elevation={3} className="papier2">
                <div>
                <Stack direction="row" spacing={1}>
                    {
                        classes.map((index, key)=>{
                          return (
                            <div className='div' key={key} onClick={()=>selectClasse(index)}>
                              <span className='span2'>
                              <MenuListComposition item={items}  icon={`${index.id} ${index.title}`} change={getItem} />
                            </span>
                            </div>
                            )
                        })
                    }
                    
                </Stack>
                <div style={{marginTop:"15px"}} className="container-option">
                  <div className="affiche_option">
                    <p> code_option : {optionSelect}</p>
                    <p> Niveau : {classeSelect}</p>
                     
                  </div>
                </div>
                <div className='container-option'>
                  <table>
                    <thead>
                      <tr>
                        <td>Cours</td>
                        <td>Maxima</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        coursAndOption.map((cours, key)=>{
                          return(
                            <div key={key}>
                            <h6 className="domaine">{cours.domaine}</h6>
                            {
                              cours.cours.map((cour, index)=>{
                                <tr key={index}>
                                  <td>{cour.cours}</td>
                              <td>{cour.maxima}</td>
                                </tr>
                              })
                            }
                            <tr  key={key}>
                              
                              <td colSpan={2} >{cours.cours} :</td>
                              <td></td>
                            </tr>
                            </div>
                          )
                        })
                      }
                      
                    </tbody>
                  </table>

                </div>
                
                </div>
                <Popup openPopup={openPopupDomaine} setOpenPopup={setOpenPopupDomaine} title="Domaine">
                  <Domaine niveau={classeSelect} option={optionSelect} />
                </Popup>
                <Popup openPopup={openPopupCours} setOpenPopup={setOpenPopupCours} title="Cours">
                  <Add_Cours code_option={optionSelect} niveau={classeSelect}/>
                </Popup>
              </Paper>
            
        </div>
  )
}

export default React.memo(Tab_Cours)