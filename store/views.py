from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def index(request):
    # return HttpResponse("Welcome to the Storefront!")

    context = {
        "message": "Welcome to the Storefront!",
    }

    return render(request, "index.html", context)


def products(request):
    # return HttpResponse("Here are our products!")

    context = {
        "message": "Here are our products!",
    }

    return render(request, "products.html", context)


def contact(request):
    # return HttpResponse("Contact us at contact@example.com")

    context = {
        "message": "Contact us at contact@example.com",
    }

    return render(request, "contact.html", context)
