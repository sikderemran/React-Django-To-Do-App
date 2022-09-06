from django.urls import path
from .views import views

urlpatterns = [
    path('', views.apiOverview,name='apiOverview'),
    path('task-list', views.allTaskList,name='allTaskList'),
    path('task-list/<str:id>', views.taskList,name='taskList'),
    path('task-create', views.taskCreate,name='taskCreate'),
    path('task-update/<str:id>/', views.taskUpdate, name="task-update"),
	path('task-delete/<str:id>/', views.taskDelete, name="task-delete"),
    
]
