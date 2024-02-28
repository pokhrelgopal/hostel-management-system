from django.contrib import admin
from .models import Room, Staff, Student, Guardian, FeeCard

admin.site.register(Room)
admin.site.register(Staff)
admin.site.register(Student)
admin.site.register(Guardian)
admin.site.register(FeeCard)
