from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.task import Task
from ..serializer import TaskSerializer

@api_view(['GET'])
def apiOverview(request):
    return Response("API BASE POINT")

@api_view(['GET'])
def taskList(request,id):
    task=Task.objects.get(id=id)
    serializer=TaskSerializer(task,many=False)
    return Response(serializer.data)