from rest_framework.viewsets import ModelViewSet
from api.permissions import IsAdminOrReadOnly

from api.serializers import (
    FeeCardSerializer,
    GuardianSerializer,
    RoomSerializer,
    StaffSerializer,
    StudentSerializer,
)
from .models import *


class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    # permission_classes = [IsAdminOrReadOnly]


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes = [IsAdminOrReadOnly]


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [IsAdminOrReadOnly]


class GuardianViewSet(ModelViewSet):
    queryset = Guardian.objects.all()
    serializer_class = GuardianSerializer
    # permission_classes = [IsAdminOrReadOnly]


class FeecardViewSet(ModelViewSet):
    queryset = FeeCard.objects.all()
    serializer_class = FeeCardSerializer
    # permission_classes = [IsAdminOrReadOnly]
