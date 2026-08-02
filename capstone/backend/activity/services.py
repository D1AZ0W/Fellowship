from .models import Activity


def create_activity(group, done_by, activity_type, description):
	Activity.objects.create(
		group=group,
		done_by=done_by,
		activity_type=activity_type,
		description=description,
	)
