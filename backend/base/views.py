from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProductSerializer


# Create your views here.
def getRoutes(request):
    return JsonResponse('Hello', safe=False)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, product_id):
    product = Product.objects.get(_id=product_id)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)
