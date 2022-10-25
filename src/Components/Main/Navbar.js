import React from 'react'
import { isEmpty, lien_image_admin } from '../Static/Liens'
import { useSelector } from "react-redux"

function Navbar({ donner }) {
    const { fonction, data } = donner

    const yearSelect = useSelector(state => state.annee.items)

    const logOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        window.location.replace("/sign");
    }

  return (
    <>
   
               
   <div className='right'>
        {
            fonction === "etablissement" &&
             <>
                <button className="menu-btn">
                    <span className="material-icons-sharp">menu</span>
                </button>
                <div className="theme-toggler">
                    <span className="material-icons-sharp active">light_mode</span>
                    <span className="material-icons-sharp">dark_mode</span>
                </div>
                <div className='top'>
                <div className="profile">
                    <div className="info">
                        <p>Hey, <b>{data.agent[0].nom}</b></p>
                        <small className="text-muted">{!isEmpty(yearSelect.year_actif) && yearSelect.year_actif.annee}</small>
                    </div>
                    <div className="profile-photo">
                        <img src={`${lien_image_admin}/${data.agent[0].filename}`} alt={data.agent[0].nom} onClick={(e)=>logOut(e)}/>
                    </div>
                </div>
                

             </div>
             </>
                
        }
        </div>
    </>
  )
}

export default Navbar