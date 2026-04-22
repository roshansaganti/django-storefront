from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="home"),
    path("products/", views.products, name="products"),
    path("contact/", views.contact, name="contact"),
]
