from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from base.models import Address
from base.serializers import AddressSerializer, UserSerializer


class AddressViewset(viewsets.ModelViewSet):

    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def list(self, request):
        user = UserSerializer(request.user).data["_id"]
        queryset = Address.objects.filter(user=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)