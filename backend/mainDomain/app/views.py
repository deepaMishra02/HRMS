from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json
from .models import Employee, Attendance
from datetime import datetime
from django.db import IntegrityError

@method_decorator(csrf_exempt, name='dispatch')
class EmployeeAPI(View):

    def get(self, request):
        employees = list(
            Employee.objects.values(
                "id",
                "employee_id",
                "name",
                "email",
                "department"
            )
        )

        return JsonResponse({
            "status": True,
            "data": employees
        })


    def post(self, request):
        data = json.loads(request.body)
        try:
            employee = Employee.objects.create(
                name=data.get("name"),
                email=data.get("email"),
                department=data.get("department")
            )
        except IntegrityError:
            return JsonResponse({"error": "Email already exists"}, status=400)
        
        return JsonResponse({
            "status": True,
            "message": "Employee created",
            "id": employee.id
        }, status=200)
    
@method_decorator(csrf_exempt, name='dispatch')
class EmployeeDetailAPI(View):

    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return None


    def get(self, request, pk):

        employee = self.get_object(pk)

        if not employee:
            return JsonResponse({"error": "Not found"}, status=404)

        data = {
            "id": employee.id,
            "employee_id": employee.employee_id,
            "name": employee.name,
            "email": employee.email,
            "department": employee.department,
        }

        return JsonResponse(data)

    def put(self, request, pk):

        employee = self.get_object(pk)

        if not employee:
            return JsonResponse({"error": "Not found"}, status=404)

        data = json.loads(request.body)

        employee.name = data.get("name", employee.name)
        employee.email = data.get("email", employee.email)
        employee.department = data.get("department", employee.department)

        employee.save()

        return JsonResponse({"message": "Updated"}, status=200)


    def delete(self, request, pk):

        employee = self.get_object(pk)

        if not employee:
            return JsonResponse({"error": "Not found"}, status=404)

        employee.delete()

        return JsonResponse({"message": "Deleted"}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class AttendanceAPI(View):

    def post(self, request):
        try:
            data = json.loads(request.body)
            emp_id = data.get("employee_id")
            date_str = data.get("date")
            status = data.get("status") 
            try:
                employee = Employee.objects.get(employee_id=emp_id)
            except Employee.DoesNotExist:
                return JsonResponse({"error": "Employee not found"}, status=404)

            try:
                date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                return JsonResponse({"error": "Invalid date format, use YYYY-MM-DD"}, status=400)

            try:
                attendance = Attendance.objects.create(
                    employee=employee,
                    date=date_obj,
                    status=status
                )
            except IntegrityError:
                return JsonResponse({"error": "Attendance for this date already exists"}, status=400)

            return JsonResponse({"status": True, "message": "Attendance added"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    def get(self, request):
        emp_id = request.GET.get("employee_id")
        if not emp_id:
            return JsonResponse({"error": "employee_id query param required"}, status=400)

        try:
            employee = Employee.objects.get(employee_id=emp_id)
        except Employee.DoesNotExist:
            return JsonResponse({"error": "Employee not found"}, status=404)

        records = Attendance.objects.filter(employee=employee).order_by("-date")

        data = [
            {
                "date": rec.date.strftime("%Y-%m-%d"),
                "status": rec.get_status_display()  # returns "Present" or "Absent"
            }
            for rec in records
        ]

        return JsonResponse({"status": True, "attendance": data})

    def put(self, request):
        try:
            data = json.loads(request.body)
            emp_id = data.get("employee_id")
            date_str = data.get("date")
            status = data.get("status")

            if status not in [0, 1]:
                return JsonResponse({"error": "Status must be 0 (Absent) or 1 (Present)"}, status=400)

            try:
                employee = Employee.objects.get(employee_id=emp_id)
            except Employee.DoesNotExist:
                return JsonResponse({"error": "Employee not found"}, status=404)

            try:
                date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                return JsonResponse({"error": "Invalid date format, use YYYY-MM-DD"}, status=400)

            try:
                attendance = Attendance.objects.get(employee=employee, date=date_obj)
                attendance.status = status
                attendance.save()
                return JsonResponse({"status": True, "message": "Attendance updated"})
            except Attendance.DoesNotExist:
                return JsonResponse({"error": "Attendance not found for this date"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)