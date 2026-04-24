from django.shortcuts import render

from store.models import Product, CartItem


# Create your views here.
def index(request):
    # Fetch all products from the database (placeholder for now)
    products = Product.objects.all()

    context = {
        "title": "Welcome to the Storefront!",
        "tagline": "Discover our amazing products and offers!",
        "products": products,
    }

    return render(request, "index.html", context)


def cart(request):
    # Fetch all cart items matching product ID and cart ID
    items = CartItem.objects.select_related("product").all()

    for item in items:
        print(f"CartItem: {item}, Product: {item.product}")

    context = {
        "title": "Your Shopping Cart",
        "tagline": "Review your selected items and proceed to checkout!",  # noqa
        "items": items,
    }

    return render(request, "cart.html", context)


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
