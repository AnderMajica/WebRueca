
import { AiFillCheckCircle } from "react-icons/ai";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioPago from './tabla';
import Volver from '../assets/cerca.png';
import { BsFillBagCheckFill } from "react-icons/bs";
import { useSubmit } from 'react-router-dom';
import Modal_usuarioNoLogueado from './modal_UsuarioNoLogueado'
import toast from "react-hot-toast";
import ModalPaypal from "./ModalPaypal";
import PaypalTrimestral from "../Checkout/PaypalTrimestral";
import PaypalMensual from "../Checkout/PaypalMensual";

const Modal = ({ id, nombreSala, piso, disponibilidad, verModal, volver, usuario, pintarSalasOcupadas,
             setVerModal, setVolver, setId, descripcion, precio1, precio2, cambiarPrecioSeleccionado, }) => {

    //ESTADOS---
    const array = [];
    const [checkAgregado, setCheckAgregado] = useState(false);
    const [check, setcheck] = useState("");
    const [precio, setPrecio] = useState("");
    const [errorr, setError] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [frecuencia, setFrecuencia] = useState("mensual");
    const [boleano, setboleano] = useState(false);
    const [mostrarTabla, setMostratTabla] = useState(true);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [contadorCompra, setContadorCompra] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (usuario > 0) {
            carritoCompra();
        }
    }, [id, usuario,]);

    const handleModal = (check) => {
        toggleModal();
        if (frecuencia == "mensual") {navigate}
    }

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    //CONSULTA DATOS DEL CARRITO
    const carritoCompra = async () => {
        //Se obtiene los datos del Carrito de compras
        const response = await axios.get("http://localhost:8000/api/pago?usuario=" + usuario);
        const carritoCompra = response.data.reverse();
        setCarrito(carritoCompra);
        setContadorCompra(carritoCompra.length);
        setFrecuencia("mensual");
        setboleano(false);
    }


    //AGREGAR AL CARRITO ( VALIDACIONES )
    const agregarAlCarrito = async ()=>
    {  
        document.querySelector(".botonAgregar").classList.add("button__loader");
        const response = await axios.get("http://localhost:8000/api/pago?usuario=" + usuario);
        const carrito = response.data;
        //Si el usuario ya esta logueado se agrega a la lista de compra (carrito)
        if(usuario > 0){
            // Si el registro aun no existe en la base de datos, lo agrego.
            if (carrito.findIndex(element => element.sala_pagos == id) < 0){
               agregoAlCarrito_dom();
               
            }
            //Si el registro ya existe en la base de datos, se edita el precio.
            else {
                editar(carrito);
                carritoCompra();
                checkVerifiqued();
            }
            toast.success("Suscripcion añadida al carrito");
        }
        else {
            Alerta_usuarioNoLogueado();
            document.querySelector(".botonAgregar").classList.remove("button__loader");
        }
    }

    //AGREGAR EN LA TABLA ( CARRITO )
    const agregoAlCarrito_dom = () => {
        const dataSala = {
            'usuario': usuario,
            'pagado': "false",
            'precio_pagos': precio1,
            'piso_pagos': piso,
            'sala_pagos': id,
            'mes_pago': frecuencia == 'mensual' ? 'mensual' : 'trimestral'
        }

        // setCarrito([...carrito, dataSala]);
        setCarrito([...carrito, dataSala]);
        agregoAlCarrito_BD(dataSala);
        estadoSala("Ocupado", id);
        setError(false);
        setFrecuencia("mensual");
        checkVerifiqued();
        setContadorCompra(contadorCompra + 1);
        pintarSalasOcupadas();
    }


    //AGREGAR AL CARRITO EN LA BASE DE DATOS
    const agregoAlCarrito_BD = (dataSala) => {
        axios.post('http://localhost:8000/api/pago', dataSala);
    }

    //EDITAR (BD)
    const editar = (sala) => {
        //optengo el id de la sala que se va a editar
        const idSalaUpdate = sala.find(element => element.sala_pagos == id).id
        axios.put("http://localhost:8000/api/pago/" + idSalaUpdate+"?pago=''", {
            'precio': precio,
            'pagado': false
        });
    }

   
    //ELIMINAR ( DOM / BD )
    const eliminar =  (idSalaDelete) =>
    {  
        const salaDelete = carrito.filter(element => element.sala_pagos !== idSalaDelete)
        setCarrito(salaDelete);
        axios.delete("http://localhost:8000/api/pago/" + idSalaDelete);
        estadoSala("Disponible", idSalaDelete);
        pintarSalasOcupadas();
        setContadorCompra(contadorCompra - 1);
    }

    //FUNCION PARA CAMBIAR EL ESTADO DE LA SALA ( Disponible / Ocupado )
    const estadoSala = (disponibilidad, id) => {
        axios.put("http://localhost:8000/api/sala/" + id + "?update=estado", {
            "activo": disponibilidad,
        });
        pintarSalasOcupadas();
    }

    //Mostrar un check en el boton de agregar al ser agregado a lista de compra.
    const checkVerifiqued = () => {
        setTimeout(function () {
            setCheckAgregado(true);
            document.querySelector(".botonAgregar").classList.remove("button__loader");
        }, 0);

        setTimeout(function () {
            checkFalse();
        }, 2000);

        const checkFalse = () => {
            setCheckAgregado(false);
        };
    }

 
    const cambiaFrecuenciaPago = (parametroFrecuencia)=>{
        setFrecuencia(parametroFrecuencia);
        if(parametroFrecuencia === "mensual" ){
            carritoCompra();
            
        } else{
            if(parametroFrecuencia !== frecuencia){
                setCarrito(array);
                carrito.forEach(element => {
                    const precio = parseInt(element.precio_pagos)
                    let precio_mes = 0;
                    parametroFrecuencia === "trimestral" ? precio_mes = (precio / 2) + (precio + precio) : precio_mes = 0;
                    const obj = {
                        'usuario': element.usuario,
                        'pagado': element.pagado,
                        'precio_pagos': precio_mes,
                        'piso_pagos': element.piso_pagos,
                        'sala_pagos': element.sala_pagos,
                        'mes_pago': element.mes_pago
                    };
                    array.push(obj);
                });
            }
        }
    }

    //BOTON DE VOLVER
    const volverBtn1 = () => {
        setVolver(false);
        setVerModal(false);
        document.querySelector(".botonesPisos").classList.remove("displayFlex");
        document.querySelector(".containerMapaGrande").classList.remove("paddingBottom");
    }


    //MOSTRAR LA TABLA DE COMPRA
    const mostratTablaCompra = () => {
        setMostratTabla(false);
    }
    //OCULTAR LA TABLA DE COMPRA
    const ocultarTablaPagar = () => {
        setMostratTabla(true);
    }

    //MOSTRAR ALERTA DE USUARIO NO LOGUEADO
    const Alerta_usuarioNoLogueado =  ()=>{
        setMostrarAlerta(true); 
    }

    //OCULTAR ALERTE DE USUARIO NO LOGUEADO
    const ocultarAlerta = () => {
        setMostrarAlerta(false);
    }

    return (
        <div>
            <div className='divContadorCompra'>
                <p className='contadorCompra'>
                    {contadorCompra}
                </p>
                <button
                    onClick={mostratTablaCompra}
                    className='btnMostrarTabla'>
                    <BsFillBagCheckFill />
                </button>
            </div>
            <div
                className={volver ? 'volver2 volver2V' : 'volver2'}
                onClick={() => volverBtn1()}>
                <img src={Volver} />
            </div>
            <div className={verModal ? 'modal modalVisible' : 'modal'}>
                <div
                    className='volver'
                    onClick={() => volverBtn1()}>
                    <img src={Volver} />
                </div>
                <div className='containerModal'>
                    <div className='containerModalHijo'>
                        <div className='headerModal'>
                            <div className='numPiso'>
                                <h1>
                                    Sala
                                </h1>
                                <h1
                                    style={{ opacity: id != "" ? "1" : "0" }}>
                                    {nombreSala}
                                </h1>
                                <h3 className={ disponibilidad == "Disponible" ? "piso" : "none"}>Piso {piso}</h3>
                            </div>
                            <h1
                                className={ disponibilidad == "Ocupado" ? "disponibilidad" : "none"}
                                style={{ color: disponibilidad == "Disponible" ? "#afffad" : "red"  }}>
                                { disponibilidad }
                            </h1>
                        </div>
                        <div className={
                            disponibilidad == "Disponible" ? "descripcionMapa none" : "descripcionMapa"   } >
                            <p
                                className='descripcionSala'>
                                {descripcion}
                            </p>
                        </div>
                        <div className={
                            disponibilidad == "Disponible" ? "descripcionModal" : "descripcionModal none" } >
                            <div className='preciosModal'>
                                <p className="precioMensual"><span style={{ opacity: id != "" ? "1" : ".2" }}>{id == "" ? "00" : precio1}€ </span><span className="pMensual">mensual</span></p>
                                <p className="precioTrimestral"> Si activas el pago trimestral esta sala te saldria por un precio de <span className="pTrimestral" style={{ opacity: id != "" ? "1" : ".2" }}s>{id == "" ? "00 " : precio2}€</span> los 3 meses</p>  
                            </div>
                        </div>
                        <button
                            className={disponibilidad === "Ocupado" ? "botonAgregarNone" : "botonAgregar" }
                            id={id}
                            onClick={agregarAlCarrito}>
                            {/* AÑADIR A LA COMPRA */}
                            <span className={checkAgregado === true ? 'checkVisible' : 'check'}><AiFillCheckCircle /></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={mostrarTabla === true ? 'tablaCompra' : 'tablaCompra MostrartablaCompra'}>
                <FormularioPago
                    datos={carrito}
                    eliminar={eliminar}
                    setId={setId}
                    ocultarTablaPagar={ocultarTablaPagar}
                    cambiarPrecioSeleccionado={cambiarPrecioSeleccionado}
                    cambiaFrecuenciaPago ={cambiaFrecuenciaPago }
                    frecuencia={frecuencia}
                    check={check}
                    handleModal={handleModal}
                    // check={check}
                    // handleModal={handleModal}
                />
            </div>
            <div className={mostrarAlerta === true ? 'Modal_usuarioNoLogueadoVisible' : 'Modal_usuarioNoLogueado'}>
                <Modal_usuarioNoLogueado ocultarAlerta={ocultarAlerta} />
            </div>
            <ModalPaypal open={openModal} onClose={toggleModal}>
                {frecuencia == "mensual" ? <PaypalMensual data={carrito} /> : <PaypalTrimestral data={carrito} />}
            </ModalPaypal>
        </div>
    )
}

export default Modal;

