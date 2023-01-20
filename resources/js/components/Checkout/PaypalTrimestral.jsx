import React from 'react'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import '../../../css/paypalcheckout.css'
import toast, { Toaster } from 'react-hot-toast';

const PaypalTrimestral = () => {
    

    const [paid, setPaid] = useState(false);

    const handleApprove = (orderId) => {
		setPaid(true)
	}

    const ButtonWrapper = ({ type }) => {
        const [{ options }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    intent: "subscription",
                },
            });
        }, [type]);

        return (
            <PayPalButtons
                createSubscription={ async (data, actions) => {
                    return await actions.subscription
                        .create({
                            plan_id: "P-9E958530YV012470JMOKRVAI",
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}

                onApprove={(data, actions) => {
                    handleApprove(data.orderID)
                    toast.success(`Se ha registrado su suscripcion, GRACIAS ARTISTA!`)
                }}

                onError={(error) => {
                    toast.error("Ha ocurrido un error, por favor intente nuevamente");
                }}

                onCancel={() => {
                    toast.error("Ha cancelado el proceso de suscripcion");
                }}

                style={{
                    label: "subscribe",
                }}
            />);
    }

    return (
        <div className='container_paypal'>
            <div className='sub-container-paypal'>
                <Toaster 
                    position='bottom-left' />
                <PayPalScriptProvider
                    options={{
                        "client-id": "AQy1c_FMYLca9qzw3wu7taJTS2YoQadl1Z8lml0kQdK7oKIfeJKzWA1nmZB2WIiF3is9__6Iv_hqNITo",
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                    }}>
                    <ButtonWrapper type="subscription" />
                </PayPalScriptProvider>
            </div>
        </div>
    );
}

export default PaypalTrimestral