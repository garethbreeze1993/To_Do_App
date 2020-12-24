from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


class TaskList(APIView):
    """
    List all Tasks, or create a new Task.
    """
    def get(self, request, format=None):
        Tasks = Task.objects.filter(owner=self.request.user)
        serializer = TaskSerializer(Tasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class TaskDetail(APIView):
    """
    Retrieve, update or delete a Task instance.
    """
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Task = self.get_object(pk)
        serializer = TaskSerializer(Task)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Task = self.get_object(pk)
        serializer = TaskSerializer(Task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Task = self.get_object(pk)
        Task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




