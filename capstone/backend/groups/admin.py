from django.contrib import admin

from .models import GroupMembers, Groups

# Register your models here.
admin.site.register(Groups)
admin.site.register(GroupMembers)
