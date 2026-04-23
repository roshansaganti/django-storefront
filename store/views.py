from django.shortcuts import render


# Create your views here.
def index(request):
    context = {
        "title": "Welcome to the Storefront!",
        "tagline": "Discover our amazing products and offers!",
    }

    return render(request, "index.html", context)


def products(request):
    context = {
        "title": "Products",
        "tagline": "Explore our wide range of products and find what you need!",  # noqa
    }

    return render(request, "products.html", context)


def contact(request):
    context = {
        "title": "Contact Us",
        "tagline": "Have questions? We're here to help! Reach out to us anytime.",  # noqa
    }

    return render(request, "contact.html", context)
