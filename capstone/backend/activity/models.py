from django.conf import settings
from django.db import models

from groups.models import Groups


# Create your models here.
class Activity(models.Model):
	ACTIVITY_CHOICES = [
		('GC', 'Group Created'),
		('GU', 'Group Updated'),
		('MA', 'Member Added'),
		('MR', 'Member Removed'),
		('ML', 'Member Left'),
		('EC', 'Expense Created'),
		('EU', 'Expense Updated'),
		('ED', 'Expense Deleted'),
		('SC', 'Settlement Created'),
		('TO', 'Transfer Ownership'),
	]
	group = models.ForeignKey(
		Groups,
		on_delete=models.CASCADE,
		related_name='activities',
	)
	done_by = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='activities',
	)
	activity_type = models.CharField(
		max_length=30,
		choices=ACTIVITY_CHOICES,
	)
	description = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']
