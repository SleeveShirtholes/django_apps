from base.views import product_views as views
from django.urls import path

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('<str:product_id>/', views.getProduct, name="product"),
]
