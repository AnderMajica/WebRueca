import React, { useState } from 'react';
// import Usuario from '../assets/usu2.jpg';
// import Logo from '../assets/Logo.png'
// // import LogoMJ from '../assets/LogoMj.png'
// import LogoMJ from '../assets/LogoMJ.png'
import LogoVm from '../assets/Nueva carpeta - copia/LogoVm.png'
import axios from "axios";


export const ForgotPass = () => {

    const [sign, setSign] = useState(false);
    const [email, setEmail] = useState("");
    const [mostratModalMensaje , setMostrarModalMensaje] = useState(false);
    const forgotPass= (e) => {
        e.preventDefault();
        let correoUser = e.target.correo.value;
        axios.post(`http://127.0.0.1:8000/api/forgot-password`,
            {
                email: correoUser
            }
        ).then(res => {
            // console.log(res);
            // console.log(res.data.errors);
            // console.log(res);
            setEmail("Correo enviado")
            setMostrarModalMensaje(true)
        }).catch(errors => {
            console.log(errors.response.data.errors);
            if (errors.response.data.errors) {
                setMostrarModalMensaje(true)
                setEmail("Introduce un correo valido")
            }
        })
    }



    return (
        <div>
            <div className={sign ? "container sign-up-mode" : "container"}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form
                            action=""
                            className="sign-in-form formulario__login"
                            method=""
                            onSubmit={forgotPass}
                        >
                            {/* <img src={LogoMJ} className="image" alt="Majica" /> */}
                            <h2 className="title">¿Olvidaste tu contraseña?</h2>
                            <div className="content-input">
                                <div className="input-field">
                                    <input
                                        name="correo"
                                        type="text"
                                        placeholder="Email"
                                        required

                                    />
                        
                                </div>
                                <div className="btn-register">
                                    {/* <input
                                        type=""
                                        value="Crear Cuenta"
                                        className="btn solid"
                                        onClick={Sign_in_btn}
                                        preventDefault=""
                                    /> */}

                                    <input
                                        type="submit"
                                        value="Enviar Correo"
                                        className="btn solid"

                                    />

                                </div>
                            </div>
                        </form>

                        {/*  <form
                            action=""
                            className="sign-up-form formulario__login"
                            method=""
                            encType=""
                        ></form> */}

                        {/* <form
                            action=""
                            className="sign-up-form formulario__login"
                            method=""
                            encType=""
                            onSubmit={Sign_up}
                        >
                            <h2 className="title">Registrarse</h2>

                            <div className="foto">
                                <img
                                    className="preliminar"
                                    src={Usuario}
                                    id="file"
                                    alt=""
                                />
                            </div>




                            <div className="content-input">
                                <input
                                    id="file-arch"
                                    type="file"
                                    encType="multipart/form-data"
                                    name="src-file1"
                                    aria-label="Archivo"
                                    className='input-file-doc'
                                />
                                <div className="container-inputs">
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area1" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="nombre"
                                            className="nombre"
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                        />
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area2" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="apellidos"
                                            type="text"
                                            placeholder="Apellidos"
                                            required
                                        />
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area3" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <input
                                            name="telefono"
                                            type="text"
                                            placeholder="Teléfono"
                                            required
                                        />
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area4" }}
                                    >
                                        <i className="fas fa-lock"></i>
                                        <input
                                            name="dirección"
                                            type="text"
                                            placeholder="Dirección"
                                        />
                                    </div>
                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area5" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <select name="tipo_de_artista" id="type_of_artist">
                                            <option value="Artista" disabled selected>Artista</option>
                                            <option value="dibujante">dibujante</option>
                                            <option value="fotografo">fotografo</option>
                                        </select>
                                    </div>

                                    <div
                                        className="input-field"
                                        style={{ gridArea: "area6" }}
                                    >
                                        <i className="fas fa-envelope"></i>
                                        <select name="tipo_de_arte" id="type_of_art">
                                            <option value="Arte" disabled selected>Arte</option>
                                            <option value="abstracto">Abstracto</option>
                                            <option value="realismo">Realismo</option>
                                        </select>
                                    </div>

                                    <div
                                        className="input-field-tx input-field-textarea"
                                        style={{ gridArea: "area7" }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <textarea id="descripción" name="descripción" rows="4" cols="50" placeholder="Descripción" required></textarea>
                                    </div>
                                </div>

                                <div className="btn-register">
                                    <input
                                        type=""
                                        className="btn"
                                        value="Iniciar Sesión"
                                        onClick={Sing_up_btn}
                                    />

                                    <input
                                        type="submit"
                                        className="btn"
                                        value="Registrarse"
                                    />

                                </div>
                            </div>
                            <div className="social-media"></div>
                        </form> */}
                    </div>
                    <img
                        src="img/fondo.svg"
                        className={
                            sign ? "image fondo-img-none" : "image fondo-img"
                        }
                        alt=""
                    />
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <img
                                src={LogoVm}
                                className="LogoPreliminar"
                                alt="logoMajica"
                            />
                            {/* <div className="text-panel">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Neque, accusamus animi
                                    distinctio blanditiis dignissimos doloremque
                                    corrupti ad. Sed, porro accusamus incidunt
                                    odio provident quod rem beatae nobis, quam,
                                    nulla perferendis?
                                </p>
                                <a href="https://www.majica.es/programacion
                            ">
                                    <button
                                        className="btn transparent"
                                        id="sign-up-btn"
                                        onClick=""
                                    >
                                        Saber mas
                                    </button>
                                </a>
                            </div> */}

                            {/* <h3>¿Aún no tienes una cuenta?</h3>
                <p>
                  Regístrate para que puedas iniciar sesión
                </p>  */}
                            {/* <button className="btn transparent" id="sign-up-btn" onClick={Sign_in_btn}>
                  Registrate
                </button> */}
                        </div>
                        {/* <img src={Logo} className="image" alt="" /> */}
                        {/* </div> */}
                        <div className="panel right-panel">
                            {/* <div className="content">
                            <img src={LogoVm} className="image-second" alt="Majica" />
                        </div> */}
                            {/* <img src={Logo} className="image" alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={mostratModalMensaje  === true ? 'modalRegister modalRegisterVisible' : 'modalRegister' }>
                            <div className='containerModalRegister'>
                                <p>{email}</p>
                            </div>
            </div>
        </div>
    );
}