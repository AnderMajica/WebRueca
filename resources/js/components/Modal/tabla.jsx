import { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import PaypalMensual from "../Checkout/PaypalMensual";
import ModalPaypal from "./ModalPaypal";

export default function FormularioPago({ datos, eliminar, cambiaFrecuenciaPago, frecuencia, setId, ocultarTablaPagar, cambiarPrecioSeleccionado, check, handleModal }) {

    //VARIABLES DE ESTADO
    const [openModal, setOpenModal] = useState(false)

    //ALMACENO TODOS LOS PRECIOS EN UN ARRAY
    let precios = [];
    let idSala = [];
    const [mensual, setMensual] = useState(true);
    const [trimestral, setTrimestral] = useState(false);

    //RECORRO EL ARRAY DE PRECIOS
    datos.forEach(element => {
        precios.push(parseInt(element.precio_pagos));
    });

    datos.forEach(el => {
        idSala.push(parseInt(el.sala_pagos));
    })

    //SUMO TODOS LOS PRECIOS DE ARRAY
    let total = precios.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    


    //REDIRECCIONAR A PAGAR

    const [seconds, setSeconds] = useState(2)
    const [minutes, setMinutes] = useState(0)
    const [primerAlerta, setPrimerAlerta] = useState("")
    const conteoPrecios = precios.length;
    const navigate = useNavigate()

    useEffect(() => {

        if (conteoPrecios >= 1) {

            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
                if (seconds === 0) {
                    setMinutes(minutes => minutes - 1);
                    setSeconds(59);
                }
            }, 1000);

            if (minutes === 9 && seconds === 59) {
                toast('Tiene menos de 10 minutos para reservar la sala.',
                    {
                        icon: '💨',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            };
            if (minutes === 4 && seconds === 59) {
                toast('Tiene menos de 5 minutos para reservar la sala.',
                    {
                        icon: '😔',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            };
            if (minutes === 0 && seconds === 0) {
                toast('Ha consumido el tiempo para almacenar la reserva, intente de nuevo',
                    {
                        icon: '😑',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
                eliminar(idSala[0])
                idSala = []
                precios = []
                clearInterval(interval)
            };

            return () => clearInterval(interval)

        } else {
            setSeconds(59)
            setMinutes(14)
        }
    }, [conteoPrecios, seconds]);

    const comprobarUsuario = () => {
        handleModal
            (localStorage.getItem('user') && localStorage.getItem('token')) === null ?
            alert("Debe iniciar sesión para realizar la reserva") :
            axios.get('http://127.0.0.1:8000/api/verified-middleware-example', {
                headers:
                    { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
            }).then()
                .catch(err => {
                    enviarEmail();
                })
    }

    const enviarEmail = () => {
        toast.error('Tienes que verificar tu correo primero');
        axios.post('http://127.0.0.1:8000/api/email/verification-notification', {}, {
            headers:
                { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }

        }).then(res => console.log(res))
            .catch(err => {
                toast.error('Hubo un problema. Intenta más tarde.');
            })
    }

    return (
        <div className='containerPadrePagar'>
            <Toaster
                position="top" />
            <div
                onClick={ocultarTablaPagar}
                className="ocultarTablaPagar">
                <div className="oTabla"><GrClose /></div>
                <div className="divTimer">   <p className={precios.length >= 1 ? "timer" : "display : none"}>Tiempo de Reserva: {seconds < 10 ? `${minutes}:0${seconds}` : minutes + ":" + seconds}</p></div>
                
            </div>
            <div className='containerPagar'>
                
                <table className='tablaPagar' >
                    <tbody>
                        <tr className="tr">
                            <th>SALA</th>
                            <th>PISO</th>
                            <th>PRECIO</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                    {datos.map((ar, indx) => {
                        return (
                            <tbody key={indx}>
                                <tr className="tr2">
                                    <td
                                        className="nSala"
                                        id={ar.sala_pagos}
                                        onClick={() => cambiarPrecioSeleccionado(ar.sala_pagos)}>
                                        {ar.sala_pagos}
                                    </td>
                                    <td
                                        className="nPiso"
                                        id={ar.sala_pagos}
                                        onClick={() => cambiarPrecioSeleccionado(ar.sala_pagos)}>
                                        {ar.piso_pagos}
                                    </td>
                                    <td
                                        className="precio"
                                        id={ar.sala_pagos}
                                        onClick={() => cambiarPrecioSeleccionado(ar.sala_pagos)}>
                                        {ar.precio_pagos}€
                                    </td>
                                    <td
                                        className="borrar"
                                        onClick={() => eliminar(ar.sala_pagos)}>
                                        <TiDelete />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            <div className="divTotal">
                <p className={precios.length >= 1 ? "timer" : "display : none"}>Tiempo de Reserva: {seconds < 10 ? `${minutes}:0${seconds}` : minutes + ":" + seconds}</p>

                {/* <Link to={check == 1 ? "/paypalMensual" : "/paypalTrimestral"} ><button className='botonPagarr' onClick={comprobarUsuario}>Pagar</button></Link> */}
                <button className='botonPagarr' onClick={comprobarUsuario}>Pagar</button>
                <p className='total'>
                    Total : {total}€
                </p>
                <button className='botonPagarr' onClick={comprobarUsuario}>Pagar</button>
            </div>
            <div className="divTotal">
            <p className="pFrecuencia">Frecuencia de pago</p>
                <div className="divFrecuencia">
                    <button className={ frecuencia === "mensual" ? "pagarMensual pagarMensualActivo" : "pagarMensual"} onClick={()=>cambiaFrecuenciaPago ("mensual")}>Mensual <span className={ frecuencia === "mensual" ? "checkFrecuencia" : "none"}><AiFillCheckCircle/></span></button>
                    <button className={frecuencia === "trimestral" ? "pagarTrimestral pagarTrimestralActivo" : "pagarTrimestral"} onClick={()=>cambiaFrecuenciaPago ("trimestral")}>Trimestral <span className={ frecuencia === "trimestral" ? "checkFrecuencia" : "none"}><AiFillCheckCircle/></span></button>
                </div>
               
                {/* <Link to={check == 1 ? "/paypalMensual" : "/paypalTrimestral"} ><button className='botonPagarr' onClick={comprobarUsuario}>Pagar</button></Link> */}
                <button className='botonPagarr' onClick={comprobarUsuario}>Pagar</button>

                <p className='total'>
                    Total : {total}€
                </p>
                
            </div>
        </div>
      
    )
}






