from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import action
from datetime import datetime
from django.conf import settings

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer

import razorpay

class OderViewset(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def list(self, request):
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            order = self.get_object()

            if request.user.is_staff or request.user == order.user:
                serializer = self.get_serializer(order, many=False)
                return Response(serializer.data)
            else:
                return Response({"detail": "Not authorized to view this order"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    
    def create(self, request, *args, **kwargs):

        client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))

        payment = client.order.create({"amount": int(request.data["totalPrice"]) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

        orderItems = request.data["orderItems"]

        if not orderItems and len(orderItems) == 0 :
            return Response({'detail': 'No Order Items'})

        # create Order
        order = Order.objects.create(
            user=request.user,
            paymentMethod=request.data["paymentMethod"],
            shippingPrice=request.data["shippingPrice"],
            taxPrice=request.data["taxPrice"],
            totalPrice=request.data["totalPrice"],
            order_payment_id = payment['id'],
        )

        # create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=request.data["shippingAddress"]["address"],
            city=request.data["shippingAddress"]["city"],
            zipcode=request.data["shippingAddress"]["zipcode"],
            country=request.data["shippingAddress"]["country"],
        )

        # create order items set order => order item relation
        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=product.price,
                image=product.image.url
            )


            # update the product stocks
            product.countInStock -= item.qty
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
    @action(detail=True, methods=['put'], permission_classes=[IsAuthenticated])
    def pay(self, request, pk=None):
        
        order = Order.objects.get(_id=pk)

        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response("Payment Successful")

    
    @action(detail=True, methods=['put'], permission_classes=[IsAuthenticated, IsAdminUser])
    def delivered(self, request, pk=None):
        
        order = Order.objects.get(_id=pk)

        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()

        return Response("Order delivered Successfully")


    @action(detail=False, methods=['get'], url_path="allorders", permission_classes=[IsAuthenticated, IsAdminUser])
    def allOrders(self, request):
        
        orders = Order.objects.all()

        serializer = OrderSerializer(orders, many=True)

        return Response(serializer.data)
