import React from 'react'
import PrivateRoute from './Components/routing/PrivateRoute'
import LoginScreen from './Components/screens/LoginScreen'
import Main from './Components/Main/Main'
import Parameters from './Components/Nationale/Parameter/Parameters'
import './App.css'
import Tab_Ecole from './Components/Pages/Ecole/Tab_Ecole'
import Index_Detail from './Components/Pages/Detail/Index'
import Parameters_Secteur from './Components/Pages/Parametre_Secteur/Parameter'
import EnsEnseignant from './Components/Etablissement/Tab/EnsEnseignant'
import PageEleve from './Components/Etablissement/Pages/Eleve'

import IndexDivision from './Components/Division/Pages/Index'
import DetailEcole from './Components/Division/Pages/DetailEcole'
import ParametreDivision from './Components/Division/Pages/ParametreDivision'
import Essaie from './Essaie'
import { Switch, Route } from 'react-router-dom'
import Etablissement from './Components/Province/Pages/Etablissement'

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/essaie" component={Essaie} />
        <Route path="/sign" component={LoginScreen} />
        <PrivateRoute path="/" exact component={Main} />
        <PrivateRoute path="/parametre" exact component={Parameters} />
        <PrivateRoute path="/ecole" exact component={Tab_Ecole} />
        <PrivateRoute path="/detail" exact component={Index_Detail} />
        {/* SECTEUR */}
        <PrivateRoute
          path="/parametre_secteur"
          exact
          component={Parameters_Secteur}
        />{' '}
        {/* ETABLISSEMENT */}
        <PrivateRoute path="/enseignant" exact component={EnsEnseignant} />
        <PrivateRoute path="/eleve" exact component={PageEleve} />{' '}
        {/* DIVISION */}
        <PrivateRoute path="/ecoledivision" exact component={IndexDivision} />
        <PrivateRoute path="/information" exact component={DetailEcole} />
        <PrivateRoute path="/ecoleProvince" exact component={Etablissement} />
        <PrivateRoute
          path="/parametredivision"
          exact
          component={ParametreDivision}
        />
      </Switch>
    </React.Fragment>
  )
}
