from django_seed import Seed
from store.models import (
    Customer,
    Address,
    Category,
    Product,
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
seeder.add_entity(Order, 5)
seeder.add_entity(OrderItem, 5)
seeder.add_entity(Payment, 5)
seeder.add_entity(Shipping, 5)

# Execute the seeding process
inserted_pks = seeder.execute()
