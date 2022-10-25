import React from 'react'
import logo from "../Images/drapeau.png"
import {data} from "./data"
import {Link} from "react-router-dom"


function SideBar({donner}) {

    const dataSide = data(donner)


    return (
        <aside>
            <div className="top">
                <Link to="/">
                    <div className="logo">
                        <img src={logo}
                            alt="Logo"
                            className="App-logo"/>
                        <h2>BULLET<span className="danger">IN</span>
                        </h2>
                    </div>
                </Link>

                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">close</span>
                </div>
            </div>
            <div className="sidebar">
                {
                dataSide.map((index, key) => {
                    return (

                        <Link to={
                                index.link
                            }
                            key={key}>
                            <span className="material-icons-sharp">
                                {
                                index.icon
                            }</span>
                            <h3>{
                                index.title
                            }</h3>
                        </Link>
                    )
                })
            } </div>
        </aside>
    )
}

export default SideBar
