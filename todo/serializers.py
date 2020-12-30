from rest_framework import serializers
from .models import Task
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    # completed = serializers.HiddenField(default=False)
    # overdue = serializers.HiddenField(default=False)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed', 'choices', 'overdue', 'owner', 'deadline')

    # def create(self, validated_data):
    #     for k, v in validated_data.items():
    #         print(k)
    #         print(v)
    #     Task.objects.create(**validated_data)
    #     return Task

    def update(self, instance, validated_data):
        fields = ['title', 'description', 'completed', 'choices', 'deadline']
        for k, v in validated_data.items():
            if k in fields:
                setattr(instance, k, v)
        instance.check_overdue()
        instance.save()
        return instance


# Register serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
        }

        def create(self, validated_data):
            user = User.objects.create_user(
                validated_data['username'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'])
            return user


# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
