// import React, { useState } from 'react';
// import Usuario from '../assets/usu2.jpg';
// import Logo from '../assets/Logo.png'
// // import LogoMJ from '../assets/LogoMj.png'
// import LogoMJ from '../assets/LogoMJ.png'
// import LogoVm from '../assets/Nueva carpeta - copia/LogoVm.png'
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export const AlreadyVer = () => {

    let navigate = useNavigate();
    return (
        navigate('/map')
    );
}
