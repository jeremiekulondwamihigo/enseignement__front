
import { ChatBubble, ShoppingCart, Settings,
     AddIcCall, Percent,  School, FileCopy, 
     SubdirectoryArrowLeft, People, PersonAdd, DataObject, SafetyDivider } from "@mui/icons-material"

export function data(data){
  
    const donner = [
        //NATIONALE
        
        {
            id: 1,
            title : "Elèves", //Les élèves inscrit dans chaque province et quelques details
            link : "eleves",
            icon : <People/>,
            auth : "nationale"
        },
        {
            id: 2,
            title : "Marge", //Le début de la reussite pour chaque option
            link : "marge", // et le pourcentage et cours que l'élève doit obtenir pour qu'il soit délibérer
            icon : <Percent/>,
            auth : "nationale"
        },
        {
            id: 3,
            title : "Résultat", //Les forts dans chaque province 
            link : "resultat",
            icon : <DataObject/>,
            auth : "nationale"
        },
        {
            id: 4,
            title : "Communication", //Les forts dans chaque province 
            link : "communication",
            icon : <AddIcCall/>,
            auth : "nationale"
        },
        {
            id: 5,
            title : "Ecole",
            link : "ecole",
            icon : <School/>,
            auth : "nationale"
        },
        {
            id: 6,
            title : "Parametre",
            link : "parametre",
            icon : <Settings/>,
            auth : "nationale"
        },
        //FIN NATIONALE=============================================================================

        //PROVINCE
        {
            id: 1,
            title : "Elève",
            link : "eleveProvince",
            icon : <People/>,
            auth : "province"
        },
        {
            id: 2,
            title : "Ecoles",
            link : "ecoleProvince",
            icon : <School/>,
            auth : "province"
        },
        {
            id: 3,
            title : "Division", //Ici le programme affiche le detail pour chaque division (proved)
            link : "divisionProvince",
            icon : <SafetyDivider/>,
            auth : "province"
        },
        {
            id: 4,
            title : "Communication",
            link : "communication",
            icon : <AddIcCall/>,
            auth : "province"
        },
        {
            id: 5,
            title : "Parametre",
            link : "parametreProvince",
            icon : <Settings/>,
            auth : "province"
        },
        
        //FIN PROVINCE====================================================================================

        //DIVISION
        {
            id : 1,
            title : "Ecole",
            link : "ecoledivision",
            icon : <School/>,
            auth : "proved"
        },
        {
            id : 2,
            title : "Elève",
            link : "elevedivision",
            icon : <People/>,
            auth : "proved"
        },
        {
            id : 3,
            title : "Parametre",
            link : "parametredivision",
            icon : <Settings/>,
            auth : "proved"
        },
        {
            id : 4,
            title : "Communication",
            link : "communicationdroved",
            icon : <AddIcCall/>,
            auth : "proved"
        },
        //FIN DIVISION===========================================================================================
        //UTILISATEUR CHEF D'ETABLISSEMENT
        {
            id : 1,
            title : "Enseignants",
            link : "enseignant",
            icon : <PersonAdd/>,
            auth : "etablissement"
        },
        {
            id : 2,
            title : "Elèves",
            link : "eleve",
            icon : <People/>,
            auth : "etablissement"
        },
        {
            id : 3,
            title : "Affectation",
            link : "affectation",
            icon : <SubdirectoryArrowLeft/>,
            auth : "etablissement"
        },
        {
            id : 4,
            title : "Bulletin",
            link : "bulletin",
            icon : <FileCopy/>,
            auth : "etablissement"
        },
        {
            id : 5,
            title : "Parametrage",
            link : "parametres",
            icon : <Settings/>,
            auth : "etablissement"
        },
        {
            id : 6,
            title : "Communication",
            link : "communication",
            icon : <ChatBubble/>,
            auth : "etablissement"
        },

        //FIN INTERFACE UTILISATEUR (CHEF D'ETABLISSEMENT) ======================================================


        //ADMINISTRATEUR
        
    ]

    const table = []
    for(let i=0; i < donner.length; i++){
        if(donner[i].auth === data){
            table.push(donner[i])
        }
    }
    return table
} 

    
