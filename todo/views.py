from django.shortcuts import render
from django.http import Http404, HttpResponseForbidden
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer, RegisterSerializer, UserSerializer


class TaskList(APIView):
    """
    List all Tasks, or create a new Task.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if self.request.user is not None:
            Tasks = Task.objects.filter(owner=self.request.user)
        else:
            Tasks = []
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

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404
        else:
            if task.owner == self.request.user:
                return task
            else:
                raise PermissionDenied

    def get(self, request, pk, format=None):
        Task = self.get_object(pk)
        serializer = TaskSerializer(Task)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Task = self.get_object(pk)
        serializer = TaskSerializer(Task, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Task = self.get_object(pk)
        Task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Register API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })
