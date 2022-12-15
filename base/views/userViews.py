from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.serializers  import UserSerializer, UserSerializerWithToken

from base.models import Order


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegisterView(viewsets.ViewSet):

    def create(self, request):
        try:
            user = User.objects.create(
                first_name = request.data['name'],
                email = request.data['email'],
                password = make_password(request.data['password'])
            )
            serializer = UserSerializerWithToken(user, many=False)
            print(serializer.data)

            return Response(serializer.data)
        except Exception as err:
            message = {'detail': 'User with the email already exists. ' + str(err)}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



class UserProfileView(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    # def get_permissions(self):
    #     permission_classes = self.permission_classes.copy()

    #     if self.action in ['getUsers', 'destroy']:
    #         permission_classes +=  [IsAdminUser, IsAuthenticated]
    #     elif self.action in ['list', 'update']:
    #         permission_classes += [IsAuthenticated]

    #     return [permission() for permission in permission_classes]


    def list(self, request):

        user = User.objects.get(email=request.user)

        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)


    def update(self, request):
        user = request.user

        data = request.data

        user.first_name = data['name']
        user.email = data['email']

        if data['password']:
            user.password = make_password(data['password'])

        user.save()

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)


class AdminUserView(viewsets.ViewSet):
    permission_classes = [IsAdminUser, IsAuthenticated]
    
    def list(self, request):
        users = User.objects.all()

        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


    def retrive(self, request, pk=None):
        try:
            users = User.objects.get(pk=pk)

            serializer = UserSerializer(users, many=False)

            return Response(serializer.data)
        except Exception as err:
            message = {'detail': "User doesn't exist. " + str(err)}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk=None):
        user = User.objects.get(pk=pk)

        user_orders = Order.objects.filter(user=user)
        
        if not user_orders:
            user.delete()
            return Response('User deleted successfully')
        else:
            message = {'detail': "Unable to delete user. User has active orders."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk=None):
        user = User.objects.get(pk=pk)

        data = request.data

        user.first_name = data['name']
        user.email = data['email']
        user.username = data['email']
        user.is_staff = data["isAdmin"]

        user.save()

        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)