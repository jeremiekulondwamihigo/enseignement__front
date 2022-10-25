
module.exports = {

 fonctionLog  : (data)=>{
   
    const nationale = [
        {id: 1, value:"province", label:"Province"},

    ]
    const province = [
        {id: 1, value:"proved", label:"Proved"},
        {id : 2, value:"etablissement", label:"Etablissement"},
    ]
    const proved = [
        {id : 1, value:"etablissement", label:"Etablissement"},
        {id: 2, value:'Enseignant', label:'Enseignant'},
        {id: 3, value:"tuteur", label: "Tuteur"}
    ]
    const etablissement = [
        {id: 1, value:'Enseignant', label:'Enseignant'},
        {id: 2, value:"tuteur", label: "Tuteur"}
    ]
    if(data == "nationale"){
        return nationale
    }
    if(data == "province"){
        return province
    }
    if(data == "proved"){
        return proved
    }
    if(data == "etablissement"){
        return etablissement
    }
}
}