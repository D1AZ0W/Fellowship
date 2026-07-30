from django.conf import settings
from django.db import models

from groups.models import Groups


# Create your models here.
class Expense(models.Model):
	title = models.CharField(255)
	image = models.ImageField(
		upload_to='media/expenses/', blank=True, null=True
	)
	amount = models.DecimalField(max_digits=10, decimal_places=2)
	CATEGORY_CHOICES = [
		('Entertainment', 'Entertainment'),
		('Food', 'Food'),
		('Transportation', 'Transportation'),
		('Utilities', 'Utilities'),
		('Services', 'Services'),
		('General', 'General'),
	]
	category = models.CharField(
		max_length=20, choices=CATEGORY_CHOICES, default='General'
	)

	SPLIT_CHOICES = [
		('Equal', 'Equal'),
		('Exact', 'Exact'),
		('Percentage', 'Percentage'),
	]
	split_type = models.CharField(
		max_length=12, choices=SPLIT_CHOICES, default='Equal'
	)
	expense_date = models.DateField()
	note = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	edited_at = models.DateTimeField(auto_now=True)
	paid_by = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='paid_by',
	)
	group = models.ForeignKey(
		Groups, on_delete=models.CASCADE, related_name='expenses'
	)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return f'{self.title} of {self.group}'


class ExpenseParticipants(models.Model):
	expense = models.ForeignKey(
		Expense, on_delete=models.CASCADE, related_name='participants'
	)
	amount_owed = models.DecimalField(max_digits=10, decimal_places=2)
	user = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name='expense',
	)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['user', 'expense'], name='unique_expense_participant'
			)
		]

	def __str__(self):
		return f'{self.user} in expense {self.expense}'


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
