from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ("shoes", "Shoes"),
        ("clothing", "Clothing"),
        ("equipment", "Equipment"),
        ("accessories", "Accessories"),
    ]
    
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='clothing')
    is_featured = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - ({self.category}) : Rp{self.price:,}" + (" [Featured]" if self.is_featured else "")