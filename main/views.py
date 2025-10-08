from urllib import request
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect, Http404
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.utils.html import strip_tags
import datetime
from main.forms import ProductForm
from main.models import Product

# ---------- PAGES ----------
@login_required(login_url='/login')
def show_main(request):
    return render(request, "main.html", {
        'app_name': 'main',
        'my_name': getattr(request.user, "username", ""),
        'my_class': 'PBP C',
        'last_login': request.COOKIES.get('last_login', 'Never')
    })

@login_required(login_url='/login')
def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    return render(request, "product_detail.html", {'product': product})

#XML/JSON (biarkan untuk kebutuhan tugas awal)
def show_xml(request):
    product_list = Product.objects.all()
    xml_data = serializers.serialize("xml", product_list)
    return HttpResponse(xml_data, content_type="application/xml")

def show_xml_by_id(request, product_id):
    product_item = Product.objects.filter(pk=product_id)
    if not product_item.exists():
        return HttpResponse(status=404)
    xml_data = serializers.serialize("xml", product_item)
    return HttpResponse(xml_data, content_type="application/xml")

# ---------- JSON for AJAX ----------
@login_required(login_url='/login')
def products_json(request):
    products = Product.objects.all().order_by('-id')
    data = [
        {
            'id': str(p.id),
            'name': p.name,
            'price': p.price,
            'stock': p.stock,
            'description': p.description or "",
            'thumbnail': p.thumbnail or "",
            'category': p.category,
            'is_featured': p.is_featured,
            'user_id': p.user_id,
            'created_at': None,  
        } for p in products
    ]
    return JsonResponse(data, safe=False)

@login_required(login_url='/login')
def product_json_by_id(request, product_id):
    try:
        p = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)
    data = {
        'id': str(p.id),
        'name': p.name,
        'price': p.price,
        'stock': p.stock,
        'description': p.description or "",
        'thumbnail': p.thumbnail or "",
        'category': p.category,
        'is_featured': p.is_featured,
        'user_id': p.user_id,
        'created_at': None,
    }
    return JsonResponse(data)

# ---------- AJAX CRUD ----------
@login_required(login_url='/login')
@require_POST
def product_create_ajax(request):
    #sanitize fields that are free text
    payload = request.POST.copy()
    payload['name'] = strip_tags(payload.get('name', ''))
    payload['description'] = strip_tags(payload.get('description', ''))

    form = ProductForm(payload)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        return JsonResponse({'status': 'ok', 'id': str(obj.id)})
    return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)

@login_required(login_url='/login')
@require_POST
def product_update_ajax(request, product_id):
    try:
        obj = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error', 'detail': 'Not found'}, status=404)
    #only owner can edit
    if obj.user_id and obj.user_id != request.user.id:
        return JsonResponse({'status': 'error', 'detail': 'Forbidden'}, status=403)

    payload = request.POST.copy()
    payload['name'] = strip_tags(payload.get('name', ''))
    payload['description'] = strip_tags(payload.get('description', ''))

    form = ProductForm(payload, instance=obj)
    if form.is_valid():
        form.save()
        return JsonResponse({'status': 'ok'})
    return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)

@login_required(login_url='/login')
@require_POST
def product_delete_ajax(request, product_id):
    try:
        obj = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error', 'detail': 'Not found'}, status=404)
    if obj.user_id and obj.user_id != request.user.id:
        return JsonResponse({'status': 'error', 'detail': 'Forbidden'}, status=403)
    obj.delete()
    return JsonResponse({'status': 'ok'})

# ---------- Non-AJAX fallback create/edit (boleh tetap ada untuk akses manual) ----------
def create_product(request):
    form = ProductForm(request.POST or None)
    if form.is_valid() and request.method == "POST":
        product_entry = form.save(commit=False)
        product_entry.user = request.user if request.user.is_authenticated else None
        product_entry.save()
        return redirect('main:show_main')
    return render(request, "create_product.html", {'form': form})

def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)
    form = ProductForm(request.POST or None, instance=product)
    if form.is_valid() and request.method == 'POST':
        form.save()
        return redirect('main:show_main')
    return render(request, "edit_product.html", {'form': form})

def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    product.delete()
    return HttpResponseRedirect(reverse('main:show_main'))

# ---------- Auth AJAX ----------
@require_POST
def login_ajax(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        resp = JsonResponse({'status': 'ok', 'user': {'id': user.id, 'username': user.username}})
        resp.set_cookie('last_login', str(datetime.datetime.now()))
        return resp
    return JsonResponse({'status': 'error', 'detail': 'Invalid credentials'}, status=400)

@require_POST
def register_ajax(request):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save()
        return JsonResponse({'status': 'ok', 'user': {'id': user.id, 'username': user.username}})
    return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)

@require_POST
def logout_ajax(request):
    logout(request)
    resp = JsonResponse({'status': 'ok'})
    resp.delete_cookie('last_login')
    return resp

# ---------- Non-AJAX pages (fallback) ----------
def register(request):
    form = UserCreationForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, 'Your account has been successfully created!')
        return redirect('main:login')
    return render(request, 'register.html', {'form': form})

def login_user(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            response = HttpResponseRedirect(reverse("main:show_main"))
            response.set_cookie('last_login', str(datetime.datetime.now()))
            return response
    else:
        form = AuthenticationForm(request)
    return render(request, 'login.html', {'form': form})

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response