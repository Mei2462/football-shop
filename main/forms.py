from django.forms import ModelForm
from django.utils.html import strip_tags
from main.models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ["name", "price", "description", "thumbnail", "category", "is_featured", "stock"]

    def clean_name(self):
        v = self.cleaned_data.get("name", "")
        return strip_tags(v)

    def clean_description(self):
        v = self.cleaned_data.get("description", "")
        return strip_tags(v)