from django.http import JsonResponse
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

    # Calculate subtotal
    subtotal = sum(item.product.price * item.quantity for item in items)

    # Calculate tax (assuming a fixed tax rate of 10%)
    tax_rate = 0.1
    tax = float(subtotal) * tax_rate

    # Calculate total
    total = float(subtotal) + float(tax)

    context = {
        "title": "Your Shopping Cart",
        "tagline": "Review your selected items and proceed to checkout!",  # noqa
        "items": items,
        "subtotal": round(subtotal, 2),
        "tax": round(tax, 2),
        "total": round(total, 2),
    }

    return render(request, "cart.html", context)


# Cart CRUD operations
def add_to_cart(request, product_id):
    # Add product to cart
    item = CartItem.objects.create(
        cart_id=1, product_id=product_id, quantity=1
    )
    item.save()

    return JsonResponse(
        {
            "status": "success",
            "message": f"Product {product_id} added to cart.",
        }
    )


def update_cart_item(request, cart_item_id):
    return render(
        request, "update_cart_item.html", {"cart_item_id": cart_item_id}
    )


def remove_from_cart(request, product_id):
    # Remove item from cart
    item = CartItem.objects.get(id=product_id)
    item.delete()

    return JsonResponse(
        {
            "status": "success",
            "message": f"Product {product_id} removed from cart.",
        }
    )


def checkout(request):
    # Clear the cart (for simplicity, we just delete all items)
    CartItem.objects.all().delete()

    return JsonResponse(
        {
            "status": "success",
        }
    )


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
