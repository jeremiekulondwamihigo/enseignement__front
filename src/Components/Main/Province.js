import React, { useState} from 'react'
import image1 from "../Images/team-2.jpg"
import FormAgent from "../Nationale/Parameter/Form_Parameter/Agent"
import Popup from '../Static/Popup'

function MainProvince({dataLog}) {
    const { data  } = dataLog

    const logout =()=>{
        localStorage.removeItem("authToken");
        window.location.reload("/sign")
    }

    const [openPopupDivision, setOpenPopupDivision] = useState(false)
    

  return (
   <>
        <main>
            <h1>{data[0].denomination}</h1>
            <div className="date">
                <input type="date"/>
            </div>
            <div className="insights">
                <div className="sales">
                    <span className="material-icons-sharp">analytics</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Elève</h3>  {/* L'effectif total selon l'année en cours */}
                            <h1>5000</h1>
                        </div>
                        <div className="progress">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="number">
                                <p>81%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">Toutes les années confondues</small>
                </div>  
                <div className="expenses">
                    <span className="material-icons-sharp">bar_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Enseignant</h3>
                            <h1>2000</h1>
                        </div>
                        <div className="progress">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="number">
                                <p>62%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">Nombre d'enseignant 100</small>
                </div>
                <div className="income">
                    <span className="material-icons-sharp">stacked_line_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Options</h3>
                            <h1>003</h1>
                        </div>
                        <div className="progress">
                            <svg >
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="number">
                                <p>44%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">Nombre des sections 25 </small>
                </div>
                {/* AUTRE */}
                <div className="income">
                    <span className="material-icons-sharp">stacked_line_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Options</h3>
                            <h1>003</h1>
                        </div>
                        <div className="progress">
                            <svg >
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="number">
                                <p>44%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">Tout les sections 24</small>
                </div>
                {/* FIN */}
                {/* AUTRE */}
                <div className="income">
                    <span className="material-icons-sharp">stacked_line_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Options</h3>
                            <h1>003</h1>
                        </div>
                        <div className="progress">
                            <svg >
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="number">
                                <p>44%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">Last 24 Hours</small>
                </div>
                {/* FIN */}
                {/* AUTRE */}
                <div className="income">
                    <span className="material-icons-sharp">stacked_line_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Options</h3>
                            <h1>003</h1>
                        </div>
                        <div className="progress">
                            <svg >
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="number">
                                <p>44%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">Last 24 Hours</small>
                </div>
                {/* FIN */}
                
            </div>
            
        </main>
        {/* =================================================RIGHT================================================ */}
        
        <div className="right">
            <div className="top">
                <button id="menu-btn">
                    <span class="material-icons-sharp">menu</span>
                </button>
                <div class="theme-toggler">
                    <span class="material-icons-sharp active">light_mode</span>
                    <span class="material-icons-sharp">dark_mode</span>
                </div>
                
                <div className="profile">
                    <div className="info">
                        <p>Hey, <b>JEREMIE</b></p>
                        <small className="text-muted">ANNEE SCOLAIRE </small>
                    </div>
                    <div className="profile-photo">
                        <img src={image1} alt="" onClick={()=>logout()} /> 
                    </div>
                </div>
            </div>
        <div className="recent-updates">
            <h2>Ecoles bloquées</h2>
            <div className="updates">
                <div className="update">
                    <div className="profile-photo">
                        <img src={image1} alt="Second"/>
                    </div>
                    <div className="message">
                        <p><b>Judith Batumike</b> Je suis un élève de l'Inst Kyeshero</p>
                        <small className="text-muted">10 janvier 2022</small>
                    </div>
                </div>
                <div className="update">
                    <div className="profile-photo">
                        <img src={image1} alt="Second"/>
                    </div>
                    <div className="message">
                        <p><b>Juliette Mihigo</b> Je suis un élève de l'EP KASIKA</p>
                        <small className="text-muted">13 janvier 2022</small>
                    </div>
                </div>
                <div className="update">
                    <div className="profile-photo">
                        <img src={image1} alt="Second"/>
                    </div>
                    <div className="message">
                        <p><b>Charmante Dosa</b> Je suis un élève de L'Inst. MWANGA</p>
                        <small className="text-muted">10 décembre 2022</small>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="sales-analytics">
            <h2>Statistique de l'année passée</h2>
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
            <div className="item add-product" style={{cursor:"pointer"}} onClick={()=>setOpenPopupDivision(true)}>
                <div>
                    <span className="material-icons-sharp">add</span>
                    <h3>Ajouter un enseignant</h3>
                </div>

            </div>
        </div>
        <Popup openPopup={openPopupDivision} setOpenPopup={setOpenPopupDivision} title="Ajouter un agent">
            <FormAgent agentConnect={dataLog}/>
        </Popup>
    </div>
    
    </>
  )
}

export default MainProvince