import React, { useEffect, useState } from 'react';
import axios from "axios";
import { lien_create, lien_read, lien_update } from "../../Static/Liens"
import Autocompletion from '../../Utils/AutoComplete';
import { Button, Grid, Stack, Alert } from "@mui/material"
import { Add } from "@mui/icons-material"
import ProtoType from "prop-types"


function AffecterOption({ dataLog, lookOption }) {

    const [option, setOption] = useState([])
    const [value, setValue] = useState("")

    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
    }

    const readOptionEtablissement = ()=>{
        axios.get(`${lien_read}/option`, config).then(response =>{
            
            if(response){
                let tableau = []
                for(let i=0; i<response.data.length; i++){
                    tableau.push({
                        "id" : response.data[i].code_Option, "title" : response.data[i].option
                    })
                }
                lookOption()
                setOption(tableau)
            }
        })
    }
    useEffect(()=>{
        readOptionEtablissement()
    }, [])

    
    const [message, setMessage] = useState()

    const addOption = (e)=>{
        e.preventDefault()
        axios.put(`${lien_update}/attribution`, {
            codeEtablissement : dataLog, code_option : value.id 
        }, config).then(response =>{
            setMessage(response.data)
        })
    }
        
    return (
    <Grid style={{width:"25rem"}}>
        {
          message && 
          <Stack sx={{ width: '100%', marginBottom:"15px" }} spacing={2}>
            <Alert variant="filled" severity={message.error === false ? "success" : "warning"}>
              <h3>{message.message}</h3>
            </Alert>
          </Stack>
        }
        <Autocompletion sx={{ marginBottom:"10px"}}  value={value} setValue={setValue} items={option} label="Option"/>
        
        <Button variant="contained" endIcon={<Add/>} color="primary" onClick={(e)=>addOption(e)}>
            Affecter
        </Button>
    </Grid>
  )
}

AffecterOption.ProtoType = {
    dataLog : ProtoType.object.isRequired,
    lookOption : ProtoType.func.isRequired,
    option : ProtoType.array,
    value : ProtoType.string,
    config : ProtoType.object.isRequired,
    readOptionEtablissement : ProtoType.func.isRequired,
    lien_read : ProtoType.string.isRequired,
    message : ProtoType.any,
    addOption : ProtoType.func.isRequired,
}
export default AffecterOption
