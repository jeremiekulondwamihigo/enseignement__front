import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { lien_read, isEmpty } from '../../../Static/Liens'
import { Paper, Grid, Fab } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Edit } from '@mui/icons-material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import './style_Tab.css'
import Avatar from '@mui/material/Avatar'
import { deepOrange, deepPurple } from '@mui/material/colors'
import Popup from '../../../Static/Popup'
import Domaine from '../Form_Parameter/Domaine'
import AddCours from '../Form_Parameter/Add_Cours'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SousDomaine from '../Form_Parameter/SousDomaine'
import CoursEB from '../Form_Parameter/CoursEB'
import SnackFunction from '../../../Controls/Snack'
import PropType from 'prop-types'
import SimpleBackdrop from '../../../Controls/Backdrop'
import { Add } from '@mui/icons-material'
import ClasseForm from '../Form_Parameter/Classe'

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
}))

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
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

function TabCours() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const [row, setRowSection] = useState([])
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }

  const loadingSection = () => {
    axios.get(`${lien_read}/readsectionoption`, config).then((sectionFound) => {
      if (sectionFound.data.success === false) {
        localStorage.removeItem('authToken')
        window.location.replace('/sign')
      }
      if (sectionFound) {
        setRowSection(Array.from(sectionFound.data))
      }
    })
  }

  const classes = [
    { id: 1, title: 'ere' },
    { id: 2, title: 'e' },
    { id: 3, title: 'e' },
    { id: 4, title: 'e' },
  ]

  const tab_education = [
    { id: 7, title: 'e' },
    { id: 8, title: 'e' },
  ]

  const [optionSelect, setOptionSelect] = useState('')

  const [openPopupDomaine, setOpenPopupDomaine] = useState(false)
  const [openPopupCours, setOpenPopupCours] = useState(false)

  const [niveauSelect, setNiveauSelect] = useState('')

  const [coursOption, setCoursOption] = useState([])
  const selectOption = (data) => {
    setNiveauSelect(data.id.toString())
    setCoursOption(null)
  }

  useEffect(() => {
    loadingSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [modification, setModification] = useState(false)
  const [dataModif, setDataModif] = useState([])
  const editButton = (params) => {
    setDataModif(params)
    setModification(true)
  }
  const column = [
    { field: 'branche', headerName: 'Branche', width: 300 },
    { field: 'maxima', headerName: 'Maxima', width: 100 },
    {
      field: 'option',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        return (
          <Fab
            size="small"
            color="primary"
            onClick={() => editButton(params.row)}
          >
            <Edit />
          </Fab>
        )
      },
    },
  ]

  const chooseOption = (data) => {
    setOptionSelect(data)
    setNiveauSelect('')
  }

  const [messageE, setMessage] = useState({ message: '', opens: false })
  const { message, opens } = messageE

  const openFormCours = () => {
    if (
      isEmpty(niveauSelect) ||
      (isEmpty(optionSelect) && parseInt(niveauSelect) < 5)
    ) {
      setMessage({
        message: 'Veuillez selectionner le niveau ou option',
        opens: true,
      })
    } else {
      setOpenPopupCours(true)
    }

    handleClose()
  }

  const [openSousDomaine, setOpenSousDomaine] = useState(false)
  const [openCoursEB, setOpenCoursEB] = useState(false)

  const ClickDomaineSousDomaine = (hookss) => () => {
    if (isEmpty(niveauSelect) || parseInt(niveauSelect) < 7) {
      setMessage({
        message: 'Veuillez selectionner la classe',
        opens: true,
      })
    } else {
      hookss(true)
    }

    handleClose()
  }

  const loadingCours = () => {
    const option = isEmpty(optionSelect)
      ? 'Education de Base'
      : optionSelect.code_Option
    axios
      .get(`${lien_read}/coursimple/${niveauSelect}/${option}`, config)
      .then((response) => {
        setCoursOption(Array.from(response.data))
      })
  }
  useEffect(() => {
    if (niveauSelect) {
      loadingCours()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niveauSelect])
  const [openBack, setOpenBack] = useState(false)
  const [openClasse, setOpenClasse] = useState(false)
  const [dataClasse, setDataClasse] = useState()

  const ParametrerClasse = (e) => {
    let donn = isEmpty(optionSelect) ? 'Education de Base' : optionSelect
    setDataClasse({ classe: e.id, option: donn })
    setOpenClasse(true)
  }

  return (
    <div className="divContainer">
      {opens && <SnackFunction message={message} />}
      <Paper elevation={3} className="papier">
        <p className="educationBase" onClick={() => setOptionSelect('')}>
          Education de base
        </p>
        {row &&
          row.map((index, key) => {
            return (
              <Accordion
                expanded={expanded === `panel${key + 1}`}
                onChange={handleChange(`panel${key + 1}`)}
                key={key}
              >
                <AccordionSummary
                  aria-controls={`${`panel${key + 1}d-content`}`}
                  id={`${`panel${key + 1}d-header`}`}
                >
                  <Typography component={'span'}>{index.section}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {index.option.length > 0 ? (
                    index.option.map((item, cle) => {
                      return (
                        <div
                          className="div"
                          onClick={() => chooseOption(item)}
                          key={cle}
                        >
                          <span className="span1">
                            <Avatar
                              sx={{
                                bgcolor:
                                  cle % 2 !== 1
                                    ? deepPurple[500]
                                    : deepOrange[500],
                              }}
                            >
                              {item.option.substr(0, 1)}
                            </Avatar>
                            <p>{item.option}</p>
                          </span>
                        </div>
                      )
                    })
                  ) : (
                    <p style={{ textAlign: 'center', color: 'red' }}>
                      Aucune option
                    </p>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          })}
      </Paper>
      <Paper elevation={3} className="papier2">
        <Grid className="title__Option">
          {!isEmpty(optionSelect) ? (
            <h5>
              <Button onClick={handleClick}>{optionSelect.option}</Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClickCapture={() => openFormCours()}>
                  Ajouter un cours
                </MenuItem>
              </Menu>
            </h5>
          ) : (
            <h5>
              <div>
                <Button onClick={handleClick}>Education de Base</Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={ClickDomaineSousDomaine(setOpenPopupDomaine)}
                  >
                    Ajouter un domaine
                  </MenuItem>
                  <MenuItem
                    onClick={ClickDomaineSousDomaine(setOpenSousDomaine)}
                  >
                    Ajouter un sous domaine
                  </MenuItem>
                  <MenuItem onClick={ClickDomaineSousDomaine(setOpenCoursEB)}>
                    Ajouter un cours
                  </MenuItem>
                </Menu>
              </div>
            </h5>
          )}
          <div>
            {!isEmpty(niveauSelect) && <h4>Niveau : {niveauSelect}</h4>}
          </div>
        </Grid>
        <Grid container>
          <Grid item lg={3} sm={12} md={3} className="first__grid">
            {isEmpty(optionSelect)
              ? tab_education.map((index) => {
                  return (
                    <div
                      className="niveau"
                      key={index.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      onClick={() => selectOption(index)}
                    >
                      <div>
                        <p>
                          {index.id}
                          <sup>{index.title}</sup>
                        </p>
                      </div>
                      <div
                        className="btn-classe"
                        onClick={() => ParametrerClasse(index)}
                      >
                        <Add />
                      </div>
                    </div>
                  )
                })
              : classes.map((index) => {
                  return (
                    <div
                      className="niveau"
                      key={index.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        onClick={() => selectOption(index)}
                        style={{ width: '100%' }}
                      >
                        <p>
                          {index.id}
                          <sup>{index.title}</sup>
                        </p>
                      </div>

                      <div
                        className="btn-classe"
                        onClick={() => ParametrerClasse(index)}
                      >
                        <Add />
                      </div>
                    </div>
                  )
                })}
          </Grid>
          <Grid item lg={9} sm={12} md={9}>
            {isEmpty(optionSelect) && <div></div>}
            <div
              style={{
                width: '100%',
                height: 380,
                zIndex: 0,
                position: 'relative',
              }}
            >
              {isEmpty(coursOption) ? (
                <SimpleBackdrop
                  open={openBack}
                  setOpen={setOpenBack}
                  click={false}
                  couleur="#000"
                  back="#fff"
                  position="absolute"
                  title="Aucun cours enregistrer"
                />
              ) : (
                <DataGrid
                  rows={coursOption}
                  columns={column}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              )}
            </div>
          </Grid>
        </Grid>

        <Popup
          openPopup={openPopupDomaine}
          setOpenPopup={setOpenPopupDomaine}
          title="Domaine"
        >
          {!isEmpty(niveauSelect) && <Domaine niveau={niveauSelect} />}
        </Popup>

        <Popup
          openPopup={openPopupCours}
          setOpenPopup={setOpenPopupCours}
          title="Enregistrement cours"
        >
          {!isEmpty(niveauSelect) && !isEmpty(optionSelect) && (
            <AddCours
              code={optionSelect}
              niveau={niveauSelect}
              loadingCours={loadingCours}
            />
          )}
        </Popup>
        <Popup
          openPopup={modification}
          setOpenPopup={setModification}
          title="Modification"
        >
          <AddCours
            data={dataModif}
            branches={dataModif.branche}
            loadingCours={loadingCours}
          />
        </Popup>

        <Popup
          openPopup={openSousDomaine}
          setOpenPopup={setOpenSousDomaine}
          title="Sous domaine"
        >
          {!isEmpty(niveauSelect) && <SousDomaine niveau={niveauSelect} />}
        </Popup>

        <Popup
          openPopup={openCoursEB}
          setOpenPopup={setOpenCoursEB}
          title="cours Education de Base"
        >
          {!isEmpty(niveauSelect) && (
            <CoursEB niveau={niveauSelect} loadingCours={loadingCours} />
          )}
        </Popup>
        <Popup
          openPopup={openClasse}
          setOpenPopup={setOpenClasse}
          title="Paramtrage de la classe"
        >
          {!isEmpty(dataClasse) && <ClasseForm donner={dataClasse} />}
        </Popup>
      </Paper>
    </div>
  )
}

TabCours.PropType = {
  row: PropType.array,
  config: PropType.object.isRequired,
  loadingSection: PropType.func.isRequired,
  tab_education: PropType.array.isRequired,
  classes: PropType.array.isRequired,
  optionSelect:
    PropType.string.isRequired ||
    PropType.object.isRequired ||
    PropType.array.isRequired,
  openPopupCours: PropType.bool.isRequired,
  openPopupDomaine: PropType.bool.isRequired,
  niveauSelect: PropType.string,
  column: PropType.array.isRequired,
  chooseOption: PropType.func.isRequired,
  messageE: PropType.object.isRequired,
  message: PropType.string,
  opens: PropType.bool,
  openFormCours: PropType.func.isRequired,
  openSousDomaine: PropType.bool.isRequired,
  openCoursEB: PropType.bool.isRequired,
  ClickDomaineSousDomaine: PropType.func.isRequired,
  handleClose: PropType.func.isRequired,
}

export default React.memo(TabCours)
