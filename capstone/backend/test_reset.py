import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
u = User.objects.first()
print("First user:", u.username, u.email)
print("Check old password 'accessbydjango123':", u.check_password('accessbydjango123'))
