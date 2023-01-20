import React, { useState } from 'react';
import Usuario from '../assets/usu2.jpg';
import Logo from '../assets/Logo.png'
// import LogoMJ from '../assets/LogoMj.png'
import { useNavigate } from "react-router-dom";
import LogoMJ from '../assets/LogoMJ.png'
import LogoVm from '../assets/Nueva carpeta - copia/LogoVm.png'
import axios from "axios";
import { Link } from "react-router-dom";

export const Main = () => {

    const [mensaje, setMensaje] = useState("");
    const [mostratModalMensaje , setMostrarModalMensaje] = useState(false);
    const [errorMail, setErrorMail] = useState(false)
    const [errorImagen, setErrorImagen] = useState(false)
    const [errorTelefono, setErrorTelefono] = useState(false)
    const [errorDireccion, setErrorDireccion] = useState(false)
    const [errorDescripcion, setErrorDescripcion] = useState(false)
    const [errorlast_name, setErrorlast_name] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errortype_of_art, setErrortype_of_art] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    

    //imagen
    const [title, setTitle] = useState('')

    const huevos = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            console.log(event.target.result)
        };
        reader.readAsText(file);
        setTitle(reader.readAsText(file))
    }

    let navigate = useNavigate();

    const [sign, setSign] = useState(false);

    const Sign_in_btn = () => {
        setSign(true)
    }
    const Sing_up_btn = () => {
        setSign(false)
    }

    const Sign_in = (e) => {
        e.preventDefault();
        let correoUser = e.target.correo.value;
        let passUser = e.target.clave.value;
        axios.post(`http://127.0.0.1:8000/api/login`,
            {
                email: correoUser,
                password: passUser
            }
        ).then(res => {
            if (res.data.message === 'success') {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return navigate('/map');
              
            }
        })
    }
    const handleImage = (e) => {
        setImg(e.target.files[0]);
    }


    const Sign_up = (e) => {
        e.preventDefault();
        const data = new FormData();
        const des = e.target.descripción.value;
        console.log(des)
        data.append('name', e.target.nombre.value);
        data.append('last_name', e.target.apellidos.value);
        data.append('email', e.target.email.value);
        data.append('password', e.target.password.value);
        data.append('telephone', e.target.telefono.value);
        data.append('address', e.target.dirección.value);
        data.append('artist', e.target.tipo_de_artista.value);
        data.append('type_of_art', e.target.tipo_de_arte.value);
        data.append('description_user', des);
        data.append('image', e.target.img.files[0]);
        axios.post("http://127.0.0.1:8000/api/register", data)
            .then(res => {
                if (res.data.message === 'success') {
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    setSign(false);
                    setMensaje("Registrado Correctamente");
                    setMostrarModalMensaje(true)
                    setTimeout(function () { setMostrarModalMensaje(false) }, 4000);
                    // setInterval(ocultarModalMensaje(), 5000)
                }

            }, (error) => {
                setMensaje("No se puede registrar por que ha ingresado datos incorrectos.");
                setMostrarModalMensaje(true)
                setTimeout(function () { setMostrarModalMensaje(false) }, 7000);
                const errores = error.response.data
            console.log((errores).errors)

            if (errores.errors.email) {
                setErrorMail(true)
            }else{
                setErrorMail(false)
            }
            if (errores.errors.image) {
                setErrorImagen(true)
            }else {
                setErrorImagen(false)
            }
            if (errores.errors.telephone) {
                setErrorTelefono(true)
            }else {
                setErrorTelefono(false)
            }
            if (errores.errors.address) {
                setErrorDireccion(true)
            }else {
                setErrorDireccion(false)
            }
            if (errores.errors.description_sala) {
                setErrorDescripcion(true)
            }else {
                setErrorDescripcion(false)
            }
            if (errores.errors.last_name) {
                setErrorlast_name(true)
            }else {
                setErrorlast_name(false)
            }
            if (errores.errors.name) {
                setErrorName(true)
            }else {
                setErrorName(false)
            }

            if (errores.errors.type_of_art) {
                setErrortype_of_art(true)
            }else {
                setErrortype_of_art(false)
            }
            if (errores.errors.password) {
                setErrorPassword(true)
            }else {
                setErrorPassword(false)
            }

        }, (error) => {
            setMensaje("No se puede registrar por que ha ingresado datos incorrectos.");
            setMostrarModalMensaje(true)
            setTimeout(function(){ setMostrarModalMensaje(false) }, 7000);
            // console.log(error.response.data);
            
            
            
        });
    
        

    }

    return (
        <div>
            <div className={sign ? "container sign-up-mode" : "container"}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form
                            className="sign-in-form formulario__login"
                            onSubmit={Sign_in}>
                            {/* <img src={LogoMJ} className="image" alt="Majica" /> */}
                            <h2 className="title">Iniciar sesion</h2>
                            <div className="content-input">
                                <div className="input-field">
                                    {/* <i className="fas fa-user"></i> */}
                                    <input
                                        name="correo"
                                        type="text"
                                        placeholder="Email" />
                                </div>
                                <div className="input-field">
                                    {/* <i className="fas fa-lock"></i> */}
                                    <input
                                        name="clave"
                                        type="password"
                                        placeholder="Contraseña" />
                                </div>
                                <div className="btn-register">
                                    <input
                                        type="submit"
                                        value="Entrar"
                                        className="btn solid" />
                                </div>
                                <div className="forgotPass">
                                    <p><Link to="/forgotPass">¿Olvidaste tu contraseña?</Link></p>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <div className="btn-register">
                                <input
                                        defaultValue="Crear Cuenta Nueva"
                                        className="btn-crearCuenta solid"
                                        onClick={Sign_in_btn} />
                                </div>
                            </div>
                        </form>
                        <form
                            className="sign-up-form formulario__login"
                        ></form>
                        <form
                            className="sign-up-form formulario__login"
                            encType="multipart/form-data"
                            onSubmit={Sign_up}>
                            <h2 className="title">Registrarse</h2>
                            <div className="foto">
                                <input
                                    type="file"
                                    encType="multipart/form-data"
                                    name="img"
                                    aria-label="Archivo"
                                    className='input-file-doc' />
                                { /* <img
                                    className="preliminar"
                                    src={Usuario}
                                    id="file"
                                    alt=""
                                /> */}
                                <p className='pinput' >FOTO</p>
                            </div>
                            <p className={errorImagen ? "pError-v" : "pError"}>Debes seleccionar una imagen para continuar</p>
                            <div className="content-input">
                                <div className="container-inputs">
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area1" }}>
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="nombre"
                                            className="nombre"
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                        />
                                        <p className={errorName ? "pError-v" : "pError"}>Ingresa tu nombre para continuar</p>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area2" }}>
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="apellidos"
                                            type="text"
                                            placeholder="Apellidos"
                                            required
                                        />
                                           <p className={errorlast_name ? "pError-v" : "pError"}>Ingresa tu apellido para continuar</p>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area3" }}>
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            required
                                        />
                                         <p className={errorMail ? "pError-v" : "pError"}>Ingresa un correo valido.</p>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area4" }}>
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="Contraseña"
                                            required
                                        />
                                        <p className={errorPassword ? "pError-v" : "pError"}>La contraseña debe tener 8 caracteres</p>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area5" }}>
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="telefono"
                                            type="text"
                                            placeholder="Teléfono"
                                            required
                                        />
                                      <p className={errorTelefono ? "pError-v" : "pError"}>Ingresa un telefono valido</p>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area6" }}>
                                        <i className="fas fa-lock"></i>
                                        <input
                                            name="dirección"
                                            type="text"
                                            placeholder="Dirección"
                                        />
                                        <p className={errorDireccion ? "pError-v" : "pError"}>Ingresa una dirección valida</p>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area7" }}>
                                        <i className="fas fa-user"></i>
                                        <select name="tipo_de_artista" id="type_of_artist">
                                            <option value="Artista" disabled>Artista</option>
                                            <option defaultValue="Dibujante">Dibujante</option>
                                            <option defaultValue="Fotografo">Fotografo</option>
                                        </select>
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area8" }}>
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            name="tipo_de_arte"
                                            type="text"
                                            placeholder="Tipo de arte"
                                            required
                                        />
                                        <p className={errortype_of_art ? "pError-v" : "pError"}>Ingresa tu tipo de arte.</p>  
                                    </div>
                                    <div
                                        className="input-field-tx input-field-textarea"
                                        style={{ gridArea: "area9" }}>
                                        <i className="fas fa-user"></i>
                                        <textarea id="descripción" name="descripción" rows="4" cols="50" placeholder="Descripción" required></textarea>

                                    </div>
                                    <div className='div-descripcion'>
                                    <p className={errorDescripcion ? "pError-v-descripcion" : "pError"}>Ingresa una descripción de 20 caracteres.</p>
                                    </div>
                                </div>
                                <div className="btn-register">
                                    <input
                                        type="submit"
                                        className="btn"
                                        value="Registrar" />
                                    <input
                                        className="btn-crearCuenta"
                                        defaultValue="Inicia Sesión"
                                        onClick={Sing_up_btn} />
                            </div>
                                </div>
                            <div className="social-media"></div>
                        </form>
                    </div>
                    <img
                        src="img/fondo.svg"
                        className={sign ? "image fondo-img-none" : "image fondo-img"} />
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <img
                                src={LogoVm}
                                className="LogoPreliminar"
                                alt="logoMajica" />
                            <div className="text-panel">
                                <p>
                                Virtual Museum es una plataforma donde los artistas pueden mostrar sus obras de forma digital. 

                                </p>
                                <a href="https://www.majica.es/programacion">
                                    <button
                                        className="btn transparent"
                                        id="sign-up-btn">
                                        Saber mas
                                    </button>
                                </a>
                            </div>
                            {/* <h3>¿Aún no tienes una cuenta?</h3>
                <p>
                  Regístrate para que puedas iniciar sesión
                </p>  */}
                            {/* <button className="btn transparent" id="sign-up-btn" onClick={Sign_in_btn}>
                  Registrate
                </button> */}
                        </div>
                        {/* <img src={Logo} className="image" alt="" /> */}
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <img src={LogoVm} className="image-second" alt="Majica" />
                        </div>
                        {/* <img src={Logo} className="image" alt="" /> */}
                    </div>
                </div>
            </div>
            <div className={mostratModalMensaje === true ? 'modalRegister modalRegisterVisible' : 'modalRegister'}>
                <div className='containerModalRegister'>
                    <p>{mensaje}</p>
                </div>
            </div>
        </div>
    );
}
