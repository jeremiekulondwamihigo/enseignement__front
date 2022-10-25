import React from 'react'
import { Provider } from "react-redux"
import { store } from "../../store"
import image1 from "../Images/team-2.jpg";
import image2 from "../Images/team-3.jpg";
import image3 from "../Images/team-5.jpg";
import { useSelector } from "react-redux";
import { isEmpty, lien_image_admin } from "../Static/Liens"
import ProtoType from "prop-types"

function MainEtablissement({ dataLog }) {

    const { etablissement, nom } = dataLog.data[0]
    const { filename } = dataLog.data[0].agent[0]

    
    const yearSelect = useSelector(state => state.annee.items)

    const logOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        window.location.replace("/sign");
    }
 
  return (
    <Provider store={store}>
        {
            dataLog ? 
            <div className='container'>
        <main>
            <h1>{etablissement}</h1>
            <div className="date">
                <input type="date"/>
            </div>
            <div className="insights">
                <div className="sales">
                    <span className="material-icons-sharp">analytics</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Diplômes</h3>
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
                            <h3>Effectif</h3>
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
                    <small className="text-muted">Effectif de l'année active</small>
                </div>
                <div className="income">
                    <span className="material-icons-sharp">stacked_line_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Options organiées</h3>
                            <h1>004</h1>
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
            </div>
            <div className="recent-order">
                <h2>Classes organisées</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Niveau</th>
                            <th>Title</th>
                            <th>Enseignant</th>
                            <th>Effectif</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                      
                                    <tr >
                                        <td>7</td>
                                        <td>Education de base</td>
                                        {/* <td className="warning">Pending</td> */}
                                        <td className="primary">10</td>
                                        <td className="primary">10</td>
                                    </tr>
                                    <tr >
                                        <td>1</td>
                                        <td>TECHNIQUE/SOCIALE</td>
                                        {/* <td className="warning">Pending</td> */}
                                        <td className="primary">15</td>
                                        <td className="secondary">10</td>
                                    </tr>
                                
                        
                        
                    </tbody>
                </table>
                
                
            </div>
        </main>
        <div className="right">
            <div className="top">
                <button id="menu-btn">
                    <span className="material-icons-sharp">menu</span>
                </button>
                <div className="theme-toggler">
                    <span className="material-icons-sharp active">light_mode</span>
                    <span className="material-icons-sharp">dark_mode</span>
                </div>
               
                    <div className="profile">
                        <div className="info">
                            <p>Hey, <b>{nom}</b></p>
                            <small className="text-muted">{!isEmpty(yearSelect.year_actif) && yearSelect.year_actif.annee}</small>
                        </div>
                        <div className="profile-photo">
                            {
                                filename &&
                                <img src={`${lien_image_admin}/${filename}`} alt="" onClick={(e)=>logOut(e)}/>
                            }
                        </div>
                    </div>
                
                
            </div>
            <div className="recent-updates">
                <h2>Elèves bloqués</h2>
                <div className="updates">
                    <div className="update">
                        <div className="profile-photo">
                            <img src={image2} alt="Second"/>
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
                            <img src={image3} alt="Second"/>
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
                <div className="item add-product" style={{cursor:"pointer"}}>
                    <div>
                        <span className="material-icons-sharp">add</span>
                        <h3>Ajouter tuteur</h3>
                    </div>

                </div>
            </div>
        </div>

    </div>
    : 
        <div className="loader">
            
        <div>
        
        </div>
        </div>
     
        }
    
    </Provider>
  )
}

MainEtablissement.ProtoType = {
    yearSelect : ProtoType.object,
    logOut : ProtoType.func.isRequired,
    dataLog : ProtoType.object.isRequired

}

export default MainEtablissement