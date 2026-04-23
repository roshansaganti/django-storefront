from django_seed import Seed
from store.models import (
    Customer,
    Address,
    Category,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Payment,
    Shipping,
)

# Initialize the seeder
seeder = Seed.seeder()


# Seed data for each model
seeder.add_entity(
    Customer,
    5,
    {
        "name": lambda x: seeder.faker.name(),
        "email": lambda x: seeder.faker.email(),
        "password": lambda x: seeder.faker.password(),
        "phone_number": lambda x: seeder.faker.phone_number(),
        "date_registered": lambda x: seeder.faker.date_time_this_year(),
    },
)
seeder.add_entity(
    Address,
    5,
    {
        "customer": lambda x: Customer.objects.order_by("?").first(),
        "house_no": lambda x: seeder.faker.building_number(),
        "street_block": lambda x: seeder.faker.street_name(),
        "area": lambda x: seeder.faker.city_suffix(),
        "city": lambda x: seeder.faker.city(),
        "province": lambda x: seeder.faker.state(),
        "postal_code": lambda x: seeder.faker.postcode(),
        "country": lambda x: seeder.faker.country(),
    },
)
seeder.add_entity(
    Category,
    5,
    {
        "category_name": lambda x: seeder.faker.word().capitalize(),
        "description": lambda x: seeder.faker.sentence(),
    },
)
seeder.add_entity(
    Product,
    5,
    {
        "name": lambda x: seeder.faker.word().capitalize(),
        "description": lambda x: seeder.faker.sentence(),
        "price": lambda x: round(
            seeder.faker.random_number(digits=5) / 100, 2
        ),
        "quantity": lambda x: seeder.faker.random_int(min=0, max=100),
        "category": lambda x: Category.objects.order_by("?").first(),
    },
)
seeder.add_entity(
    Cart,
    5,
    {
        "customer": lambda x: Customer.objects.order_by("?").first(),
        "created_at": lambda x: seeder.faker.date_time_this_year(),
        "updated_at": lambda x: seeder.faker.date_time_this_year(),
    },
)
seeder.add_entity(
    Order,
    5,
    {
        "customer": lambda x: Customer.objects.order_by("?").first(),
        "order_date": lambda x: seeder.faker.date_time_this_year(),
        "total_amount": lambda x: round(
            seeder.faker.random_number(digits=5) / 100, 2
        ),
        "order_status": lambda x: seeder.faker.random_element(
            elements=Order.OrderStatus.values
        ),
    },
)
seeder.add_entity(
    OrderItem,
    5,
    {
        "order": lambda x: Order.objects.order_by("?").first(),
        "product": lambda x: Product.objects.order_by("?").first(),
        "quantity": lambda x: seeder.faker.random_int(min=1, max=5),
        "price_at_purchase": lambda x: round(
            seeder.faker.random_number(digits=5) / 100, 2
        ),
    },
)
seeder.add_entity(
    Payment,
    5,
    {
        "order": lambda x: Order.objects.order_by("?").first(),
        "customer": lambda x: Customer.objects.order_by("?").first(),
        "payment_date": lambda x: seeder.faker.date_time_this_year(),
        "payment_method": lambda x: seeder.faker.random_element(
            elements=Payment.PaymentMethod.values
        ),
        "amount": lambda x: round(
            seeder.faker.random_number(digits=5) / 100, 2
        ),
        "payment_status": lambda x: seeder.faker.random_element(
            elements=Payment.PaymentStatus.values
        ),
    },
)
seeder.add_entity(
    Shipping,
    5,
    {
        "order": lambda x: Order.objects.order_by("?").first(),
        "address": lambda x: Address.objects.order_by("?").first(),
        "shipping_date": lambda x: seeder.faker.date_this_year(),
        "delivery_date": lambda x: seeder.faker.date_this_year(),
        "shipping_status": lambda x: seeder.faker.random_element(
            elements=Shipping.ShippingStatus.values
        ),
        "shipping_method": lambda x: seeder.faker.random_element(
            elements=Shipping.ShippingMethod.values
        ),
    },
)

# Execute the seeding process
inserted_pks = seeder.execute()
