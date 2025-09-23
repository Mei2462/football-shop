import uuid
from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    CATEGORY_CHOICES = [
        ("shoes", "Shoes"),
        ("clothing", "Clothing"),
        ("equipment", "Equipment"),
        ("accessories", "Accessories"),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='clothing')
    is_featured = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    def get_price_display(self):
        return f"Rp {self.price:,}"

    def get_stock_display(self):
        return f"{self.stock} pcs"