from base.models import Product
from base.serializers import ProductSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response


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
