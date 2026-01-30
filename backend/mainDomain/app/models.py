from django.db import models

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    employee_id = models.CharField(max_length=20, unique=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            self.employee_id = f"EMP{self.pk:03d}"
            super().save(update_fields=["employee_id"])
        else:
            super().save(*args, **kwargs)

class Attendance(models.Model):
    class Status(models.IntegerChoices):
        ABSENT = 0, "Absent"
        PRESENT = 1, "Present"

    employee = models.ForeignKey("Employee", on_delete=models.CASCADE, related_name="attendances")
    date = models.DateField()
    status = models.PositiveSmallIntegerField(choices=Status.choices, default=Status.ABSENT)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("employee", "date")
        indexes = [
            models.Index(fields=["employee", "date"]),
        ]
    def __str__(self):
        return f"{self.employee} - {self.date} - {self.get_status_display()}"


