from django.conf import settings
from django.db import models

# Create your models here.


class Groups(models.Model):
	name = models.CharField(255)
	image = models.ImageField(
		upload_to='media/groups/',
		blank=True,
		null=True,
	)
	TYPE_CHOICES = [
		('Trip', 'Trip'),
		('Home', 'Home'),
		('Couple', 'Couple'),
		('Other', 'Other'),
	]
	type = models.CharField(
		max_length=6, choices=TYPE_CHOICES, default='Other'
	)
	created_at = models.DateTimeField(auto_now_add=True)
	edited_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return self.name


class GroupMembers(models.Model):
	ROLES_CHOICES = [('Owner', 'Owner'), ('Member', 'Member')]
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='groups_joined',
	)
	group = models.ForeignKey(
		Groups, on_delete=models.CASCADE, related_name='members'
	)
	joined_date = models.DateTimeField(auto_now_add=True)
	role = models.CharField(
		max_length=7,
		choices=ROLES_CHOICES,
		default='Member',
	)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['user', 'group'],
				name='unique_group_member',
			)
		]

	def __str__(self):
		return f'{self.user} + of group  + {self.group}'
