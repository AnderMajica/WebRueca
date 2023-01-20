import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../Modal/Modal';
import logo from '../assets/logo.png';
import PisoUno_Rojo_SVG from './pisoUno_Rojo_SVG';
import PisoDos_Verde_SVG from './pisoDos_verde_SVG';
import PisoTres_Azul_SVG from './pisoTres_Azul_SVG';
import MapaPequeno_piso1_SVG from './mapaPequeno_piso1_SVG';
import MapaPequeno_piso2_SVG from './mapaPequeno_piso2_SVG';
import MapaPequeno_piso3_SVG from './mapaPequeno_piso3_SVG';
import ModalEditarDescripcion from '../Modal/modalEditarDescripcionSala';
import { set } from 'lodash';

export default function Map() {

    const [piso, setPiso] = useState(null);
    const [usuario, setUsuario] = useState(0);
    const [precios, setPrecios] = useState([]);
    const [idSala, setIdsala] = useState(null);
    const [nombreSala, setNombresala] = useState(null);
    const [volver, setVolver] = useState(false);
    const [dataSala, setdataSala] = useState("");
    const [verPiso1, setVerPiso1] = useState(false);
    const [verPiso2, setVerPiso2] = useState(false);
    const [verPiso3, setVerPiso3] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [descripcion, setIDescripcion] = useState(false);
    const [disponibilidad, setIDisponibilidad] = useState("");
    const [verMapaGrande1, setVerMapaGrande1] = useState(true);
    const [verMapaGrande2, setVerMapaGrande2] = useState(false);
    const [verMapaGrande3, setVerMapaGrande3] = useState(false);
    const [EditarDescripcion, setEditarDescripcion] = useState(false);
    
    //SE OBTIENE LOS DATOS DEL USUARIO LOGUEADO DESDE EL LOCALSTORAGE
    const usuariaData = async ()=>{
        if(localStorage.getItem("user")){
            const user = JSON.parse(localStorage.getItem("user"));
            pintarSalasCompradas(user.id);
            setUsuario(user.id);
        } else{
            setUsuario("")
            pintarSalasCompradas("");
        }
        pintarSalasOcupadas(); 
    }
    


    //AL HACER CLICK EN UNA SALA SE OBTINEN EL ID DE LA SALA
    const setId =  (e) => {
        const id = parseInt(e.target.id);
        setBaseDeDatos(id);
        pintarSalasCompradas(usuario);
        setModal()
    }


    //CONSULTA A LA BASE DE DATOS
    const setBaseDeDatos = async (sala)=>{
        const response = await axios.get("http://localhost:8000/api/sala/"+sala+"?sala=sala");
        const responseData = response.data;
        setDatosSala(responseData);
        pintarSalasOcupadas();
        setData_ModalEditarDescripcion(sala);
        
    }
    
    
    //SE PINTAN LAS SALAS OCUPADAS
    const pintarSalasOcupadas  = async ()=>{
        const response = await axios.get("http://localhost:8000/api/sala");
        const salas = response.data;
        const pintar =  (min, max,)=>{
            for(let i = min; max > i; i++){
                if(salas.find(indice => indice.id === i).activo === "Ocupado"){
                    document.querySelector(".sala"+i).classList.add("ocupado");  
                }
                else{
                    document.querySelector(".sala"+i).classList.remove("ocupado");
                }
            }
        }
        pintar(101,129);
        pintar(201,229);
        pintar(301,329);
    }
    

    //PINTAR DE VERDE LAS SALAS COMPRADAS
    const pintarSalasCompradas = async (userId)=>{
        const pagados = await axios.get("http://127.0.0.1:8000/api/sala/usuario?id="+userId);//tabla relacional
        const pagado = pagados.data;
        pagado.forEach(element => {
            document.querySelector(".sala"+element.sala_pagos).classList.add("salaComprada");
        });
    }

    
    
    //SE OBTIENEN TODOS LOS DATOS DE LA SALA
    const setDatosSala = (sala)=>{
        let precio = parseInt(sala.precio_sala);
        const precioTrimestral = (precio / 2) + (precio + precio);
        // mostrarModalEditarDescripcion(sala);
        setIDisponibilidad(sala.activo);
        setdataSala(sala)
        setIdsala(sala.id);
        setNombresala(sala.nombre_sala);
        setPiso(sala.piso)
        setIDescripcion(sala.descripcion_sala);
        setPrecios({"precio1": precio, "precio2":precioTrimestral});
        
    }

    //EDITAR NOMBRE Y DESCRIPCION DE LA SALA
    const updateDescripcion = (nombreSala,descripcion) => {
        setNombresala(nombreSala);
        setIDescripcion(descripcion);
        ocultarModalDescripcion();
    }
    

    const cambiarPrecioSeleccionado = async (sala)=>{
        setModal();
        const response = await axios.get("http://localhost:8000/api/sala/"+sala+"?sala=sala");
        const responseData = response.data;
        let precio = parseInt(responseData.precio_sala);
        const precioTrimestral = (precio / 2) + (precio + precio);
        setIDisponibilidad("Disponible");
        setdataSala(responseData);
        setIdsala(responseData.id);
        setNombresala(responseData.nombre_sala);
        setPiso(responseData.piso)
        setIDescripcion(responseData.descripcion_sala);
        setPrecios({"precio1": precio, "precio2": precioTrimestral})
    }

    //MOSTAR MODAL CON LA DESCRIPCION Y LOS PRECIOS DE LA SALA
    const setModal = ()=>{
        setIdsala("");
        setVolver(true);//boton de volver
        setVerModal(true);
        setIDescripcion("");
        setPrecios([""])
        document.querySelector(".botonesPisos").classList.add("displayFlex");
        document.querySelector(".containerMapaGrande").classList.add("paddingBottom");
    }


     //SE OBTINENEN LOS DATOS PARA EL MODAL DE EDITAR DESCRIPCION
    const setData_ModalEditarDescripcion = async (sala)=>{
       //Si la sala esta pagada y le pertenece al usuario logueado.
       //al hacer click sobre ella se mostrara un modal que le permita editar la descripcion.
       const pagados = await axios.get("http://127.0.0.1:8000/api/sala/usuario?id="+usuario);
       const pagosData = pagados.data;
       const indice =  pagosData.findIndex( element => element.usuario === usuario && element.pagado === "true" && element.sala_pagos === sala );
       if(indice >= 0){
          const dataSala = pagosData[indice];
          mostrarModalEditarDescripcion();
          setDatosSala(dataSala);
          pintarSalasOcupadas();
       }
    }

    //MOSTAR EL MODAL DE EDITAR LA DESCRIPCION DE LA SALA
    const mostrarModalEditarDescripcion = ()=>{
            setEditarDescripcion(true);
    }

    const ocultarModalDescripcion =()=>{
        setEditarDescripcion(false);
    }


    //SE OCULTAN Y SE MUESTRAN LOS MAPAS GRANDES Y PEQUEÑOS
    const mostrarPiso1 = () => {
        setVerPiso2(false);
        setVerPiso3(false);
        setVerMapaGrande1(true)
        setVerMapaGrande2(false);
        setVerMapaGrande3(false);
    }

    const mostrarPiso2 = () => {
        setVerPiso2(true);
        setVerPiso3(false);
        setVerMapaGrande1(false);
        setVerMapaGrande2(true);
        setVerMapaGrande3(false);
    }

    const mostrarPiso3 = () => {
        setVerPiso1(true);
        setVerPiso2(true);
        setVerPiso3(true);
        setVerMapaGrande1(false);
        setVerMapaGrande2(false);
        setVerMapaGrande3(true);
    }

    useEffect( () =>
    {
        usuariaData();
       
    },[]);

    return (
        <section className='seccionMapas'>
            <div className='headerMovil'>
                <div className='botonesHeaderMovil'>
                    <button
                        onClick={() => mostrarPiso1()}
                        className="boton">Piso 1
                    </button>
                    <button
                        onClick={() => mostrarPiso2()}
                        className="boton">Piso 2
                    </button>
                    <button
                        onClick={() => mostrarPiso3()}
                        className="boton">Piso 3
                    </button>
                </div>
            </div>
            <Modal
                id={idSala}
                nombreSala={nombreSala}
                descripcion={descripcion}
                volver={volver}
                setId={setId}
                verModal={verModal}
                setVolver={setVolver}
                setVerModal={setVerModal}
                precio1={precios.precio1}
                precio2={precios.precio2}
                disponibilidad={disponibilidad}
                piso={piso}
                usuario={usuario}
                pintarSalasOcupadas={pintarSalasOcupadas}
                cambiarPrecioSeleccionado={cambiarPrecioSeleccionado}
            />
            <div className='container2'>
                <div className='containerMapaGrande'>
                    <div
                        className={verMapaGrande1 ? 'piso1MapaGrandeSVG' : 'piso1MapaGrandeSVG noneMapa'}>
                        <PisoUno_Rojo_SVG funcion={setId} />
                    </div>
                    <div
                        className={verMapaGrande2 ? 'piso2MapaGrandeSVG' : 'piso2MapaGrandeSVG noneMapa'}>
                        <PisoDos_Verde_SVG funcion={setId} />
                    </div>
                    <div
                        className={verMapaGrande3 ? 'piso3MapaGrandeSVG' : 'piso3MapaGrandeSVG noneMapa'}>
                        <PisoTres_Azul_SVG funcion={setId} />
                    </div>
                </div>
                <aside className='containerMapaPequeno'>

                    <div className='mapasPequenos'>
                        <div className={verPiso1 ? 'piso1' : 'piso1'}>
                            <MapaPequeno_piso1_SVG />
                        </div>
                        <div className={verPiso2 ? 'piso2' : 'piso2 none'}>
                            <MapaPequeno_piso2_SVG />
                        </div>
                        <div className={verPiso3 ? 'piso3' : 'piso3 none'}>
                            <MapaPequeno_piso3_SVG />
                        </div>
                    </div>
                    <div className='botonesPisos'>
                        <button
                            onClick={() => mostrarPiso1()}
                            className={verMapaGrande1 ? 'boton activoRed' : 'boton'}>Piso 1
                        </button>
                        <button
                            onClick={() => mostrarPiso2()}
                            className={verMapaGrande2 ? 'boton activoGren' : 'boton'}>Piso 2
                        </button>
                        <button
                            onClick={() => mostrarPiso3()}
                            className={verMapaGrande3 ? 'boton activoBlue' : 'boton'}>Piso 3
                        </button>
                    </div>
                    <img
                        src={logo}
                        alt="logo virtual museum"
                        className='logo' />
                </aside>
            </div>
            <div className={EditarDescripcion === true? 'modalEditarDescripcionVisible' : 'modalEditarDescripcion'}>
                <ModalEditarDescripcion  
                    id={idSala} 
                    datasala={dataSala} 
                    ocultarModalDescripcion={ocultarModalDescripcion}
                    // setDatosSala={setId}
                    updateDescripcion={updateDescripcion}
                    set={set}
                    />
            </div>
        </section>
    )
}
