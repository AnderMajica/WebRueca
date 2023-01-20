import { Link, useLocation } from "react-router-dom"

const Modal_usuarioNoLogueado = ({ocultarAlerta}) => {

   return(
    <div className="usuarioNoLogueado_Container">
       <p>Para poder comprar las salas debes <b>iniciar sesion</b> </p>
       <div className='botones'>
            <button 
                className='volverAMapa' 
                onClick={ocultarAlerta}>
                Volver
            </button>
            <Link to="/" className="linkIniciarSesion">
                <button 
                    className='modal_iniciarSesion' 
                    onClick={ocultarAlerta}>
                    Iniciar Sesion
                </button>
            </Link>
       </div>
    </div>
   )
}

export default Modal_usuarioNoLogueado;