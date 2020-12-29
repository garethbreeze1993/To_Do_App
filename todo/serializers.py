from rest_framework import serializers
from .models import Task


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
