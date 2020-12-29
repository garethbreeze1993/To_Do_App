from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from datetime import datetime


CHOICES_FIELDS = (
    ('W', 'Work'),
    ('P', 'Personal Projects'),
    ('F', 'Fitness'),
    ('S', 'Social'),
    ('M', 'Miscellaneous')
)


class Task(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='entries', on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    deadline = models.DateField()
    overdue = models.BooleanField(default=False)
    choices = models.CharField(choices=CHOICES_FIELDS, max_length=1)

    def __str__(self):
        return self.title

    def is_overdue(self):
        if self.completed:
            return False
        return self.deadline < datetime.date(datetime.now())

    def complete_task(self):
        self.completed = True
        self.save()

    def check_overdue(self):
        if self.is_overdue():
            self.overdue = True
            self.save()
        else:
            self.overdue = False
            self.save()





