import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

import { startRazorPay } from '../actions/orderActions'

function RazorPayComponent({orderAmount, order_id}) {

  const dispatch = useDispatch();

  const addRazorPayScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {}
    document.body.appendChild(script)
  } 

  const paymentHandler = () => {

    const payScript = addRazorPayScript();

    dispatch(startRazorPay({
      "order_id": order_id,
      "amount": orderAmount
    }
    ))
  }

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: '/api/razorpay/payment/success/',
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK! && Payment Successfull");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  

  const showRazorpay = async () => {
    const res = await addRazorPayScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", orderAmount.split('.')[0]);
    bodyData.append("order_id", order_id);

    const data = await axios({
      url: '/api/razorpay/pay/',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: process.env.REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "Angadi",
      description: "Test transaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        email: data.data.order.user.email,
        contact: "00000",
        phone: "00000"
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#474747",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="container" style={{ marginTop: "20vh" }}>
      <button onClick={showRazorpay} className="btn btn-primary btn-block">
        Pay with razorpay
      </button>
    </div>
  );
}

export default RazorPayComponent
