import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Usuario from '../assets/usu2.jpg';

export default function Header() {

    const [panel, setPanel] = useState(false)
    const [images, setImages] = useState("")
    const [noUser, setNoUser] = useState(false)
    const location = useLocation();

    useEffect(() => {
        location.pathname === "/" ? setPanel(false) : setImages(Usuario)
    }, [location.pathname])

    const panelUser = () => {
        setPanel(panel === false ? true : false)
        //setPanel(true)
        // location.pathname === "/" ? setPanel(false) : setPanel(panel === false ? true : false)
        console.log(panel);
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user'))) {
            setImages(JSON.parse(localStorage.getItem('user')).image);
        }
    }, [])

    const panelUs = () => {
        setPanel(false)
        axios.get("http://127.0.0.1:8000/api/logout", { headers: { "Autorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
            console.log(res)
        })
            .catch(err => {
                console.log(err)
            })
        localStorage.clear();
    }

    return (
        <div className="header">
            <div>
                <div className={noUser ? "display: none" : "image-icon-user"}>
                    {location.pathname === "/" ? <></> : <img src={images} alt="hola" onClick={panelUser} />}
                    <Link to="/">
                        <div className={panel ? "content-closeSesion-v" : "content-closeSesion"}>
                            <p onClick={panelUs}>Cerrar Sesion</p>
                        </div>
                    </Link>
                </div>
            </div>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/map">Mapas</Link></li>
            </ul>
        </div>
    )
}
