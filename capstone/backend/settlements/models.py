from django.conf import settings
from django.db import models

from groups.models import Groups


# Create your models here.
class Settlement(models.Model):
	group = models.ForeignKey(
		Groups, on_delete=models.CASCADE, related_name='settlements'
	)
	payer = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='settlements_paid',
	)
	recipient = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='settlements_received',
	)
	amount = models.DecimalField(max_digits=10, decimal_places=2)
	note = models.TextField(blank=True)
	created_by = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='settlement_created',
	)
	created_at = models.DateTimeField(auto_now_add=True)


class SettlementImage(models.Model):
	settlement = models.ForeignKey(
		Settlement, on_delete=models.CASCADE, related_name='images'
	)
	image = models.ImageField(upload_to='settlements/')
	created_at = models.DateTimeField(auto_now_add=True)
