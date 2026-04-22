from django.shortcuts import render


# Create your views here.
def index(request):
    context = {
        "message": "Welcome to the Storefront!",
    }

    return render(request, "index.html", context)


def products(request):
    context = {
        "message": "Here are our products!",
    }

    return render(request, "products.html", context)


def contact(request):
    context = {
        "message": "Contact us at contact@example.com",
    }

    return render(request, "contact.html", context)
