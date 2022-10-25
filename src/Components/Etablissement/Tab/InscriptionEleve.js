import React, {useEffect, useState} from 'react';
import axios from "axios";
import {lien_read, isEmpty, lien_image_eleve} from '../../Static/Liens';
import {Grid} from "@mui/material"
import ProtoType from "prop-types"
import InscriptionForm from '../Form/Inscription';
import Popup from '../../Static/Popup';
import {Person, Add} from "@mui/icons-material"
import {Avatar, Fab} from '@mui/material';
import {deepPurple} from '@mui/material/colors';
// import Rechart from '../../Chart/Rechart';
import BarChart from '../../Chart/BarChart';
// import Radars from './Chart/Radars';


function InscriptionEleveTable({dataLog}) {

    const {data} = dataLog
    const {codeEtablissement} = data[0]

    const [openPopupInscription, setOpenPopupInscription] = useState(false)


    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
    }

    const [eleve, setEleve] = useState([])
    const loadingEleve = () => {

        if (dataLog) {

            axios.get(`${lien_read}/singlerecherche/${codeEtablissement}`, config).then(response => {
                setEleve(response.data)
            })

        }

    }
    const [dataGraphique, setDataGraphique] = useState()
    const graphique = async () => {
        const response = await axios.get(`${lien_read}/readGraphique/${codeEtablissement}`, config)
        setDataGraphique(response.data)

    }
    useEffect(() => {
        graphique()
    }, [codeEtablissement])

    useEffect(() => {
        loadingEleve()
    }, [codeEtablissement])

    return (
        <>
            <Grid container>
                <Grid item
                    lg={3}
                    md={12}
                    sm={12}>
                    <div className='positionnement'
                        onClick={
                            () => setOpenPopupInscription(true)
                    }>
                        <Fab color="primary">
                            <Add/>
                        </Fab>
                    </div>
                    <div className="ecole_eleve_image">
                        <div className='rechercheInput'>
                            <div className="date">
                                <input type="text" placeholder='Chercher un élève'/>
                            </div>
                        </div>
                        {
                        !isEmpty(eleve) && eleve.map((index, key) => {
                            return (
                                <div className='image_eleve'
                                    key={key}>

                                    <div className='container_image'>
                                        <Avatar sx={
                                            {bgcolor: deepPurple[500]}
                                        }>
                                            {
                                            !isEmpty(index.eleve[0].filename) ? <img src={
                                                    `${lien_image_eleve}/${
                                                        index.eleve[0].filename
                                                    }`
                                                }
                                                alt={
                                                    `${key}`
                                                }/> : <Person/>
                                        } </Avatar>
                                    </div>
                                    <div className='informationEleve_image'>
                                        <div>
                                            <h4>{
                                                `${
                                                    index.eleve[0].nom
                                                } ${
                                                    index.eleve[0].postNom
                                                } ${
                                                    index.eleve[0].prenom
                                                }`
                                            }</h4>
                                            <p>Classe : {
                                                index.niveau
                                            }
                                                <sup>e</sup>
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    } </div>
                </Grid>
                <Grid item
                    lg={9}
                    md={12}
                    sm={12}
                    style={
                        {overflow: "auto"}
                }>
                    <Grid container>

                        <Grid item
                            lg={12}
                            md={12}
                            sm={12}>
                            {
                            !isEmpty(dataGraphique) && <BarChart data={dataGraphique}
                                title="classe"/>
                            }
                        } </Grid>

                    </Grid>

                </Grid>
            </Grid>

            <Popup openPopup={openPopupInscription}
                setOpenPopup={setOpenPopupInscription}
                title="Inscription">
                <InscriptionForm dataLog={dataLog}
                    loadingEleve={loadingEleve}
                    graphique={graphique}/>

            </Popup>
        </>
    )
}

InscriptionEleveTable.ProtoType = {
    config: ProtoType.object.isRequired,
    data: ProtoType.object.isRequired,
    codeEtablissement: ProtoType.string.isRequired,
    loadingEleve: ProtoType.func.isRequired,
    dataLog: ProtoType.object.isRequired,
    InscriptionForm: ProtoType.any.isRequired,
    Popup: ProtoType.any.isRequired,
    openPopupInscription: ProtoType.bool.isRequired,
    eleve: ProtoType.array
}

export default React.memo(InscriptionEleveTable)
