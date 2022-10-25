import React from 'react';
import image1 from "../../Images/team-2.jpg";
import image2 from "../../Images/team-3.jpg";
import image3 from "../../Images/team-5.jpg";
import "./style.css"

function RightParameters() {

    const logOut = (e)=>{
        e.preventDefault();
        localStorage.removeItem("authToken");
        window.location.replace("/sign");
    }
  return (
    <>
    <div className="right rightParameter">
            <div className="top">
                <button className="menu-btn">
                    <span className="material-icons-sharp">menu</span>
                </button>
                <div className="theme-toggler">
                    <span className="material-icons-sharp active">light_mode</span>
                    <span className="material-icons-sharp">dark_mode</span>
                </div>
                <div className="profile">
                    <div className="info">
                        <p>Hey, <b>Inst. SEBYERA</b></p>
                        <small className="text-muted">2020 - 2021</small>
                    </div>
                    <div className="profile-photo">
                        <img src={image1} alt="Profile" onClick={(e)=>logOut(e)}/>
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
                <div className="item add-product">
                    <div>
                        <span className="material-icons-sharp">add</span>
                        <h3>Add Product</h3>
                    </div>

                </div>
            </div>
        </div>
        </>
  )
}

export default RightParameters