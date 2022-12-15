import json
from django.conf import settings
from datetime import datetime
from rest_framework.permissions import IsAuthenticated, IsAdminUser

import razorpay
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from base.models import Order
from base.serializers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_payment(request):

    amount = request.data['amount']
    order_id = request.data['order_id']

    # setup razorpay client this is the client to whome user is paying money that's you
    client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))

    # create razorpay order
    # the amount will come in 'paise' So, we will 
    # mumtiply it by 100.
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})


    order = Order.objects.get(_id=order_id)

    order.order_payment_id = payment['id']
    order.save()

    serializer = OrderSerializer(order)

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)


@api_view(['POST'])
def handle_payment_success(request):
    res = json.loads(request.data["response"])

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = Order.objects.get(order_payment_id=ord_id)

    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)

    print('check', check)

    if not check:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})

    # if payment is successful that means check is None then we will turn isPaid=True
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    res_data = {
        'message': 'payment successfully received!'
    }

    print(res_data)

    return Response(res_data)
