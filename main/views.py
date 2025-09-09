from django.shortcuts import render

# Create your views here.
def show_main(request):
    context = {
        'app_name' : 'main',
        'my_name': 'Mei Ching',
        'my_class': 'PBP C'
    }

    return render(request, "main.html", context)

