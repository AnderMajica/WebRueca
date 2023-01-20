import React, { useState } from 'react'
import PaypalMensual from './PaypalMensual'
import PaypalTrimestral from './PaypalTrimestral';
import Paypal from '../assets/CheckOutNow/paypal.png';
import Card from '../assets/CheckOutNow/tarjeta.png';
import { BsArrowRight } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';
import Header from '../Header/header';

export const CheckoutNow = () => {

	const [mostrar, setMostrar] = useState(false)
	const [ocultar, setOcultar] = useState(false)

	const SignupButton = () => {
		setMostrar(true)
	}

	const LoginButton = () => {
		setMostrar(false)
	}

	return (
		<section className='section_checkout'>
			<Header />
			<div class="user_options-container">
				<div class="user_options-text">
					<div class="user_options-unregistered">
						<img src={Paypal} alt="Paypal" className='LogoPaypal-icon' />
						<button class="user_unregistered-signup" id="signup-button" onClick={SignupButton}>pay with card <BsArrowRight className='arrowIcon' /></button>
					</div>
					<div class="user_options-registered">
						<img src={Card} alt="Card" className='LogoPaypal-icon' />
						<button class="user_registered-login" id="login-button" onClick={LoginButton}><BsArrowLeft className='arrowIcon' /> Pay with Paypal </button>
					</div>
				</div>
				<div class="user_options-forms" className={mostrar ? "user_options-forms bounceLeft" : "user_options-forms bounceRight"} id="user_options-forms">
					<div class="user_forms-login">
						<PaypalMensual /><PaypalTrimestral />
					</div>
					<div class="user_forms-signup">
					</div>
				</div>
			</div>
		</section>
	)
}
