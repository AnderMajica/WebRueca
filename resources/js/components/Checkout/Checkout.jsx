import React from 'react'
import PaypalMensual from './PaypalMensual'
import PaypalTrimestral from './PaypalTrimestral'

const Checkout = () => {
    return (
        <div className='container-checkout'>
            <div className='checkout-mensual'>
                <p>Suscripcion Mensual</p>
                <PaypalMensual/>
            </div>
            <div className='checkout-trimestral'>
                <p>Suscripcion Trimestral</p>
                {/* <PaypalTrimestral /> */}
            </div>
        </div>
    )
}

export default Checkout