import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'



const PUBLIC_KEY = 'pk_live_rCwaeID0oBi4FAFCmkzkskXp'
const stripeTestPromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer() {




  return (
    <Elements stripe={stripeTestPromise}>
    <h2>Payment</h2>
    <PaymentForm />
    </Elements>
  )
}
