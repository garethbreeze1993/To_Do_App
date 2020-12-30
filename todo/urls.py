from django.urls import path
from .views import TaskList, TaskDetail, RegisterApi

urlpatterns = [
    path('tasks/', TaskList.as_view()),
    path('task/<int:pk>/', TaskDetail.as_view()),
    path('register/', RegisterApi.as_view()),
]

