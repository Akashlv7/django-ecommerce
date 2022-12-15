from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer


class ProductsViewset(viewsets.ViewSet):

    PRODUCTS_PER_PAGE = 3
    TOP_PRODUCT_RATING = 2

    def get_permissions(self):
        permission_classes = self.permission_classes.copy()

        if self.action in ['delete', 'update', 'create']:
            permission_classes +=  [IsAdminUser, IsAuthenticated]
        elif self.action in ['list', 'retrieve']:
            permission_classes += []

        return [permission() for permission in permission_classes]

    def list(self, request):

        query = request.query_params.get('keyword')
        
        if query == None:
            query = ''

        queryset = Product.objects.filter(name__icontains=query)

        page = request.query_params.get('page')
        paginator = Paginator(queryset, self.PRODUCTS_PER_PAGE)

        try:
            queryset = paginator.page(page)
        except PageNotAnInteger:
            queryset = paginator.page(1)
        except EmptyPage:
            queryset = paginator.page(paginator.num_pages)

        if page in (None, ''):
            page = 1
        page = int(page)

        serializer = ProductSerializer(queryset, many=True)
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

    
    @action(detail=False, methods=['GET'], url_path='top')
    def getTopProducts(self, request):
        products = Product.objects.filter(rating__gte=self.TOP_PRODUCT_RATING).order_by('-rating')[0:5]

        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    
    def create(self, request):

        user = request.user

        product = Product.objects.create(
            user=user,
            name="Sample Name",
            price=0,
            brand="Sample Brand",
            countInStock=0,
            category="Sample Category",
            description=""
        )

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)


    def update(self, request, pk=None):

        data = request.data

        product = Product.objects.get(pk=pk)

        product.name = data["name"]
        product.price = data["price"]
        product.brand = data["brand"]
        product.category = data["category"]
        product.countInStock = data["countInStock"]
        product.description = data["description"]

        product.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)


    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)


    def delete(self, request, pk=None):
        productToBeDeleted = Product.objects.get(pk=pk)

        productToBeDeleted.delete()

        return Response("Product deleted successfully")

    
    @action(detail=False, methods=['post'], url_path="upload")
    def uploadImage(self, request):
        data = request.data

        product_id = data["product_id"]
        product = Product.objects.get(pk=product_id)

        product.image = request.FILES.get('image')
        product.save()

        return Response("Image uploaded successfully")


    @action(detail=False, methods=['post'], url_path="review", permission_classes=[IsAuthenticated])
    def createProductReview(self, request):
        user = request.user
        data = request.data

        product = Product.objects.get(_id=data["product_id"])

        # If review already exists

        reviewExists = product.review_set.filter(user=user).exists()

        if reviewExists:
            message = {'detail': 'Product already reviewed'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        # No or Zero rating

        elif data["rating"] == 0:
            message = {'detail': 'Please select the rating'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        else:
            # Create review

            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data["rating"],
                comment=data["comment"]
            )

            reviews = product.review_set.all()

            product.numReviews = len(reviews)

            totalRating = 0

            for i in reviews:
                totalRating += i.rating
            
            product.rating = totalRating / len(reviews)

            product.save()

            return Response("Review added successfully")
