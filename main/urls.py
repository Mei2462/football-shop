from django.urls import path
from main.views import (
    show_main, create_product, show_product,
    show_xml, show_xml_by_id,
    products_json, product_json_by_id,
    product_create_ajax, product_update_ajax, product_delete_ajax,
    register, login_user, logout_user,
    register_ajax, login_ajax, logout_ajax,
    edit_product, delete_product,
    proxy_image, create_product_flutter
)

app_name = 'main'

urlpatterns = [
    path('', show_main, name='show_main'),

    # Pages (fallback)
    path('create-product/', create_product, name='create_product'),
    path('product/<uuid:id>/', show_product, name='show_product'),
    path('product/<uuid:id>/edit', edit_product, name='edit_product'),
    path('product/<uuid:id>/delete', delete_product, name='delete_product'),

    # Legacy data formats
    path('xml/', show_xml, name='show_xml'),
    path('xml/<uuid:product_id>/', show_xml_by_id, name='show_xml_by_id'),

    # AJAX Product
    path('api/products/', products_json, name='products_json'),
    path('api/products/<uuid:product_id>/', product_json_by_id, name='product_json_by_id'),
    path('api/products/create/', product_create_ajax, name='product_create_ajax'),
    path('api/products/<uuid:product_id>/update/', product_update_ajax, name='product_update_ajax'),
    path('api/products/<uuid:product_id>/delete/', product_delete_ajax, name='product_delete_ajax'),

    # Auth pages (fallback)
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),

    # Auth AJAX
    path('api/auth/register/', register_ajax, name='register_ajax'),
    path('api/auth/login/', login_ajax, name='login_ajax'),
    path('api/auth/logout/', logout_ajax, name='logout_ajax'),

    #flutter integration
    path('proxy-image/', proxy_image, name='proxy_image'),
    path('create-flutter/', create_product_flutter, name='create_product_flutter'),
]
