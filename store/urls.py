from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="home"),
    path("cart/", views.cart, name="cart"),
    # Cart CRUD operations
    path("cart/add/<int:product_id>/", views.add_to_cart, name="add_to_cart"),
    path(
        "cart/update/<int:product_id>/",
        views.update_cart_item,
        name="update_cart_item",
    ),
    path(
        "cart/remove/<int:product_id>/",
        views.remove_from_cart,
        name="remove_from_cart",
    ),
    path("checkout/", views.checkout, name="checkout"),
    path("products/", views.products, name="products"),
    path("contact/", views.contact, name="contact"),
]
