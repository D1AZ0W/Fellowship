from django.contrib import admin

from .models import Settlement, SettlementImage

# Register your models here.
admin.site.register(Settlement)
admin.site.register(SettlementImage)
