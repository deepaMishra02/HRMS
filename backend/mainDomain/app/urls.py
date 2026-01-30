from django.urls import path
from .views import EmployeeAPI, EmployeeDetailAPI, AttendanceAPI

urlpatterns = [
    path("employees/", EmployeeAPI.as_view()),
    path("employees/<int:pk>/", EmployeeDetailAPI.as_view()),
    path("attendance/", AttendanceAPI.as_view()),
]
