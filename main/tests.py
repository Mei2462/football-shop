from django.test import TestCase, Client
from .models import Product
from django.urls import reverse

# Create your tests here.
class MainTests(TestCase):
    def test_main_url_is_exist(self):
        response = Client().get('')
        self.assertEqual(response.status_code, 200)
    
    def test_main_using_main_template(self):
        response = Client().get('')
        self.assertTemplateUsed(response, 'main.html')

    def test_nonexistent_page(self):
        response = Client().get('/this-page-does-not-exist/')
        self.assertEqual(response.status_code, 404)

    def test_show_main_context_data(self):
        response = self.client.get(reverse('main:show_main'))
        self.assertContains(response, "main")
        self.assertContains(response, "Mei Ching")
        self.assertContains(response, "PBP C")

    def test_create_product(self):
        Product.objects.create(
            name="Alpha Choice Elite Shoes",
            price=395000000,
            description="Premium football shoes for elite players.",
            thumbnail="http://example.com/image.jpg",
            category="shoes",
            is_featured=True,
            stock=10
        )
        self.assertEqual(Product.objects.first().name, "Alpha Choice Elite Shoes")
        self.assertEqual(Product.objects.first().price, 395000000)
        self.assertEqual(Product.objects.first().description, "Premium football shoes for elite players.")
        self.assertEqual(Product.objects.first().thumbnail, "http://example.com/image.jpg")
        self.assertEqual(Product.objects.first().category, "shoes")
        self.assertTrue(Product.objects.first().is_featured)
        self.assertEqual(Product.objects.first().stock, 10)

    def test_default_product_values(self):
        Product.objects.create(
            name="Football shoes",
        )
        self.assertEqual(Product.objects.first().name, "Football shoes")
        self.assertEqual(Product.objects.first().price, 0)
        self.assertIsNone(Product.objects.first().description)
        self.assertIsNone(Product.objects.first().thumbnail)
        self.assertEqual(Product.objects.first().category, "clothing")
        self.assertFalse(Product.objects.first().is_featured)
        self.assertEqual(Product.objects.first().stock, 0)

    def test_show_main_view(self):
        response = self.client.get(reverse('main:show_main'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "main")
        self.assertContains(response, "My Name:")
        self.assertContains(response, "My Class:")