import React, { useEffect, useState } from 'react'
import { Box, Select, Button, MenuItem } from "@mui/material"
import { lien_create, lien_read } from '../../Static/Liens'
import axios from "axios"
import { useLocation } from "react-router-dom"



function Periode(props) {

    const { data } = props

    const location = useLocation()

    const [dataYear, setDataYear] = useState([])
    const [anneeSelect, setAnneeSelect] = useState("")

    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }

    const years = ()=>{
        axios.get(`${lien_read}/read_year`, config).then(response =>{
            setDataYear(response.data.all_year)
        })
    }
    useEffect(()=>{
        years()
    }, [])

    const id = new Date()

    const submitData =(e)=>{
        e.preventDefault()
        const datas = new FormData();
        
        datas.append("code_secteur", data[0].code_secteur)
        datas.append("code_Annee", anneeSelect)
        datas.append("id", id)

        console.log(data)

        axios.post(`${lien_create}/add_periode_secteur`,  { 
            "code_secteur": data[0].code_secteur,
            "code_Annee": anneeSelect,
            "id":id
         }, config).then(response =>{
            
        })
    }

    
  return (
    <div>
        <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          marginTop:"30px",
          marginBottom: "20px"
        }}
        component={'div'}
        >
           <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={anneeSelect}
            label="Selectionner l'année"
            onChange={(e)=>setAnneeSelect(e.target.value)}
            name="anneeSelect"
            sx={{
                width:500,
                marginBottom : "10px"
            }}
            >
                {
                    dataYear &&
                    dataYear.map((index,key)=>{
                        return <MenuItem key={key} value={index.code_Annee} >{index.annee}</MenuItem>
                    })
                }
                
            </Select>
            
        </Box>
        <Button variant="contained" color="primary" onClick={(e)=>submitData(e)} >Enregistrer</Button>
    </div>
  )
}

export default Periode