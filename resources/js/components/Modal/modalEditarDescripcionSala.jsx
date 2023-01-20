import { CgClose } from "react-icons/cg";
import { BsPencilSquare} from "react-icons/bs";

import { useEffect, useState  } from "react";


export default function ModalEditarDescripcion ({updateDescripcion,datasala,ocultarModalDescripcion}) {
 
    const [descripcion, setDescripcion] = useState("");
    const [nombreSala, setNombreSala] = useState("");

    useEffect(() =>
    {
        setDatos(datasala);
    }, [datasala]);

    
    //OBTENGO LOS DATOS DE LA SALA
    const setDatos = (datasala)=>
    {
        const descripcionSala = datasala.descripcion_sala;
        const nombreDeLaSala = datasala.nombre_sala;
        
        if(descripcionSala !== undefined && nombreDeLaSala !== undefined){
            setDescripcion(descripcionSala);
            setNombreSala(nombreDeLaSala);
        } else{
            setDescripcion("");
            setNombreSala("");
        }
    }


    //OBTENGO EL VALOR DEL INPUT NOMBRE
    const setNombre =(e)=>
    { 
        setNombreSala(e.target.value);
    }

    //OBTENGO EL VALOR DEL INPUT DESCRIPCION
    const setDescripcionSala =(e)=>
    {
        setDescripcion(e.target.value);
    }

    //EDITO LA DESCRIPCION EN LA BASE DE DATOS Y LOS ESTADOS DE NOMBRE Y DESCRIPCIONSALA
    const update = (e) =>
    {    
        const inputNombre = document.querySelector(".inputNombre").value;
        const inputDescripcion = document.querySelector(".inputDescripcion").value;
        //Valido que los inputs no esten vacios
        if(inputNombre != "" && inputDescripcion != ""){
            //Lo edito en la base de datos
             axios.put("http://localhost:8000/api/sala/"+datasala.sala_pagos+"?update=descripcion" , {
                'nombre_sala':nombreSala,
                'descripcion_sala': descripcion
            });
            //Edito el ESTADO de nombre y descripcion
            updateDescripcion(nombreSala,descripcion)
        } 
        else{
            alert("Debe rellenar los dos campos")
        }
    }
    

    return(
        <div className="containerModalEditarDescripcion">
                <button className="btnVolver" onClick={ocultarModalDescripcion} ><CgClose/></button>
                <label htmlFor="nombreSala" className="inputs1" value="">
                    <p> Nombre De La Sala: </p>
                    <input 
                        type="text" 
                        id="nombreSala" 
                        value={nombreSala}
                        onChange={setNombre}
                        className="inputNombre"
                    />
                </label>
        
                    <p className="pDescripcion">Descripción De La Sala:</p>   
                    <textarea 
                        type="text" 
                        id="descripcionSala" 
                        value={descripcion} 
                        onChange={setDescripcionSala}
                        className="inputDescripcion"
                    />
                <button  
                    className="botonEditarDescripcion" 
                    id={datasala.id} 
                    ype="button" 
                    onClick={update}
                    
                    >
                    <p>Editar</p> <BsPencilSquare/>
                </button>
           
        </div>
    )
    }