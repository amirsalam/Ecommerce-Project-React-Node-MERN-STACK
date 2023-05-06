import DropIn from 'braintree-web-drop-in-react';
import React,{useState,useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom';
import {emptyCart} from './../auth/helpers'
import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "./../auth/helpers";
import { createOrder, getBraintreeToken, processPayment } from './ApiCore';

const  Checkout = ({products}) => {
    const [data,setData] = useState({
        braintreeToken : null,
        error : null,
        instance:{},
        address : ''

    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    useEffect(() =>{
      
        getBraintreeToken(userId,token)
        .then(res => setData({...data,braintreeToken : res.token}))
        .catch(err => setData({...data,error : err}))

    },[])

    const totalToCheckout = (products) =>{

        return products.reduce((total,product) => total + (product.count * product.price),0)

    }

    const dropIn = () => (
        <div>
            {data.braintreeToken !== null && products.length > 0 && (
            <DropIn options={{
                authorization : data.braintreeToken,
                paypal:{
                    flow:"vault"
                }
            }}
            onInstance={instance => data.instance = instance }
            />
            )}
        </div>
    )

    const buy = () =>{

        const deliveryAddress = data.address

        data.instance.requestPaymentMethod()
                     .then(data => {

                        let paymentData = {
                            amount : totalToCheckout(products),
                            paymentMethodNonce : data.nonce
                        }

                        processPayment(userId,token,paymentData)
                        .then(res => {
                            console.log(res)
                            let orderData = {
                                products,
                                transaction_id : res.transaction.id,
                                amount : res.transaction.amount,
                                address : deliveryAddress

                            }
                        
                            createOrder(userId,token,orderData)
                            .then(res => console.log(res))
                            .catch(err => console.error(err))

                            emptyCart(() =>{
                            
                                toastr.success('Valid', 'Payment was Successfully', {
                                    positionClass: "toast-top-left",
                             })

                            })
                        })

                        toastr.success('Valid', "All is Ok !", {
                            positionClass: "toast-top-left",
                     })
                    })
                     .catch(err => {
                        toastr.error('inValid', err.message, {
                            positionClass: "toast-top-left",
                        
                     })
                    })
    
}
    const handleInput = (e) => {
        setData({...data,address : e.target.value})

    }

    const showBtnToCheckout = () =>{
        if(isAuthenticated()) {
            return (
                <Fragment>
                    {dropIn()}
                    <button onClick={buy} type="button" name="" id="" className="btn btn-raised btn-success">Pay</button>
                </Fragment>
            )

        }

        return (
        
            <Link to="/signin">
            <button type="button" name="" id="" className="btn btn-raised btn-warning">Sign In To Pay</button>
            </Link>
            
        )
    }

  return (
    <div>
      <h2 className='text-center'>Total : <span className='badge badge-success'>{totalToCheckout(products)}</span></h2>
     <label htmlFor="address">Delivery Address</label>
      <textarea id='address' className='form-control' onChange={handleInput} rows="2"></textarea>
      {showBtnToCheckout()}
    </div>
  )
}

export default Checkout
