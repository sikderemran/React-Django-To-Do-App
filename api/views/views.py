from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.task import Task
from ..serializer import TaskSerializer

@api_view(['GET'])
def apiOverview(request):
     return render(request, 'index.html')

@api_view(['GET'])
def taskList(request,id):
    task=Task.objects.get(id=id)
    serializer=TaskSerializer(task,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    serializer=TaskSerializer(data=request.data)
    #serializer=TaskSerializer(instance=task,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
