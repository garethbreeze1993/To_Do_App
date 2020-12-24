from django.urls import path
from .views import TaskList, TaskDetail

urlpatterns = [
    path('tasks/', TaskList.as_view()),
    path('task/<int:pk>/', TaskDetail.as_view())
]

