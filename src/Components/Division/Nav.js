import React from 'react';
import image1 from "../Images/team-2.jpg";
import image2 from "../Images/team-3.jpg";
import image3 from "../Images/team-5.jpg";
import { useSelector } from "react-redux";
import { isEmpty, lien_image_admin } from "../Static/Liens"
import ProtoType from "prop-types"


function Nav({ dataLog }) {

    const { data } = dataLog
     const { nom , filename} = data[0].agent[0]

    const logOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        window.location.replace("/sign");
    }
    const yearSelect = useSelector(state => state.annee.items)

  return (
    <div className="right navDivision">
            <div className="top">
                <button id="menu-btn">
                    <span class="material-icons-sharp">menu</span>
                </button>
                <div class="theme-toggler" id='theme-toggler'>
                    <span class="material-icons-sharp active">light_mode</span>
                    <span class="material-icons-sharp">dark_mode</span>
                </div>
              
                    <div className="profile">
                        <div className="info">
                            <p>Hey, <b>{nom && nom}</b></p>
                            <small className="text-muted">{!isEmpty(yearSelect.year_actif) && yearSelect.year_actif.annee}</small>
                        </div>
                        <div className="profile-photo">
                            <img src={`${lien_image_admin}/${filename}`} alt="" onClick={(e)=>logOut(e)}/>
                        </div>
                    </div>
                
                
            </div>
            <div className="recent-updates">
                <h2>Etablissement suspendues</h2>
                <div className="updates">
                    <div className="update">
                        <div className="profile-photo">
                            <img src={image2} alt="Second"/>
                        </div>
                        <div className="message">
                            <p><b>Judith Batumike</b> Je suis un ??l??ve de l'Inst Kyeshero</p>
                            <small className="text-muted">10 janvier 2022</small>
                        </div>
                    </div>
                    <div className="update">
                        <div className="profile-photo">
                            <img src={image1} alt="Second"/>
                        </div>
                        <div className="message">
                            <p><b>Juliette Mihigo</b> Je suis un ??l??ve de l'EP KASIKA</p>
                            <small className="text-muted">13 janvier 2022</small>
                        </div>
                    </div>
                    <div className="update">
                        <div className="profile-photo">
                            <img src={image3} alt="Second"/>
                        </div>
                        <div className="message">
                            <p><b>Charmante Dosa</b> Je suis un ??l??ve de L'Inst. MWANGA</p>
                            <small className="text-muted">10 d??cembre 2022</small>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="sales-analytics">
                <h2>Statistique de l'ann??e pass??e</h2>
                <div className="item offline">
                     <div className="icon">
                        <span className="material-icons-sharp">local_mall</span>
                     </div>
                     <div className="right">
                         <div className="info">
                             <h3>ELEVE ECHOUES</h3>
                             <small className="text-muted">2019 - 2020</small>
                         </div>
                         <h5 className="danger">17%</h5>
                         <h3>50</h3>
                     </div>
                </div>
                <div className="item customers">
                     <div className="icon">
                        <span className="material-icons-sharp">person</span>
                     </div>
                     <div className="right">
                         <div className="info">
                             <h3>ELEVES REUSSIT</h3>
                             <small className="text-muted">2019 - 2020</small>
                         </div>
                         <h5 className="success">25%</h5>
                         <h3>400</h3>
                     </div>
                </div>
                <div className="item add-product" style={{cursor:"pointer"}}>
                    <div>
                        <span className="material-icons-sharp">add</span>
                        <h3>Ajouter une ??cole</h3>
                    </div>

                </div>
            </div>
        </div>
  )
}

Nav.ProtoType = {
    dataLog : ProtoType.object.isRequired,
    data : ProtoType.array.isRequired,
    nom : ProtoType.string.isRequired,
    filename :  ProtoType.string.isRequired,
    logout : ProtoType.func.isRequired,
    yearSelect : ProtoType.object
}
export default Nav