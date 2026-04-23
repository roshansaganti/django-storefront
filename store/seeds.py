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
seeder.add_entity(Customer, 5)
seeder.add_entity(Address, 5)
seeder.add_entity(Category, 5)
seeder.add_entity(Product, 5)
seeder.add_entity(Order, 5)
seeder.add_entity(OrderItem, 5)
seeder.add_entity(Payment, 5)
seeder.add_entity(Shipping, 5)

# Execute the seeding process
inserted_pks = seeder.execute()
