from django.urls import path
from .views import views

urlpatterns = [
    path('', views.apiOverview,name='apiOverview'),
    path('task-list/<str:id>', views.taskList,name='taskList'),
    path('task-create', views.taskCreate,name='taskCreate'),
    
]
