from django.db import models


class Staff(models.Model):
    name = models.CharField(max_length=150)
    work = models.CharField(max_length=150)
    salary = models.IntegerField()
    phone = models.CharField(max_length=10)
    address = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Room(models.Model):
    block = models.CharField(max_length=10)
    room_no = models.IntegerField()
    room_capacity = models.IntegerField()
    attached_tb = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.block} - {self.room_no}"

    @property
    def is_full(self):
        return self.students.count() >= self.room_capacity


class Student(models.Model):
    name = models.CharField(max_length=150)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=150)
    phone = models.CharField(max_length=15)
    college = models.CharField(max_length=150)
    room = models.ForeignKey(
        Room,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="students",
    )
    joining_date = models.DateField()
    is_staying = models.BooleanField(default=True)
    image = models.ImageField(upload_to="images", blank=True, null=True)
    description = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.name


class Guardian(models.Model):
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=150)
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    description = models.CharField(max_length=150, blank=True, null=True)


class FeeCard(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    month = models.CharField(max_length=10)
    date = models.DateField()
    monthly_fee = models.IntegerField()
    extra_fee = models.IntegerField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.name} - {self.month}"
