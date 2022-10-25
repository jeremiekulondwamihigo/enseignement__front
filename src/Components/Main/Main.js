import React, {useEffect, useState} from 'react'
import SideBar from '../SideBar/SideBar'
import {Provider} from "react-redux"
import {store} from "../../store"
import axios from "axios"
import {lien_read} from "../Static/Liens"
import MainNationale from './Nationale'
import MainEtablissement from './Etablissement'
import MainProvince from './Province'

function Main() {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
    }
    const [dataLog, setDataLog] = useState()

    const loading = async () => {
        const response = await axios.get(`${lien_read}/user`, config)

        if (response.data.success === false) {
            localStorage.removeItem("authToken");
            window.location.replace("/sign")
        } else {
            setDataLog(response.data)
        }
    }
    useEffect(() => {
        loading()
    }, [])

    return (
        <Provider store={store}>
            {
            dataLog ? <div className='container'>
                <SideBar donner={
                    dataLog.fonction
                }/> {
                dataLog.fonction === "nationale" ? <MainNationale/>: dataLog.fonction === "province" ? <MainProvince dataLog={dataLog}/> : dataLog.fonction === "etablissement" ? <MainEtablissement dataLog={dataLog}/> : null
            } </div> : <div className="loader">

                <div></div>
            </div>
        } </Provider>
    )
}

export default Main
