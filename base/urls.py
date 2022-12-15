from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import userViews, productViews, addressViews, order_views, razorpay_views

router = DefaultRouter()
router.register(r'address', addressViews.AddressViewset, basename="address")
router.register(r'products', productViews.ProductsViewset, basename="product")
router.register(r'order', order_views.OderViewset, basename="order")

urlpatterns = [
    path('users/register/', userViews.UserRegisterView.as_view({'post': 'create'}), name='user_register'),

    path('users/login/', userViews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('users/profile/', userViews.UserProfileView.as_view({
        'get': 'list',
        'put': 'update'
    }), name='user_profile'),

    path('users/', userViews.AdminUserView.as_view({'get': 'list'}), name='users-list'),
    path('users/<str:pk>/', userViews.AdminUserView.as_view({'get': 'retrive'}), name='user'),
    path('users/delete/<str:pk>/', userViews.AdminUserView.as_view({'delete': 'destroy'}), name='user-delete'),
    path('users/update/<str:pk>/', userViews.AdminUserView.as_view({'put': 'update'}), name='user-update'),

    path('razorpay/pay/', razorpay_views.start_payment, name='razorPay'),
    path('razorpay/payment/success/', razorpay_views.handle_payment_success, name='razorPay')

]

urlpatterns += router.urls