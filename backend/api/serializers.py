from rest_framework import serializers
from .models import *


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = [
            "id",
            "block",
            "room_no",
            "room_capacity",
            "price",
            "attached_tb",
            "is_available",
        ]


class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = ["id", "name", "phone", "address", "student", "description"]


class FeeCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeCard
        fields = [
            "id",
            "student",
            "month",
            "date",
            "monthly_fee",
            "extra_fee",
            "is_paid",
        ]


class StudentSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)
    guardian = GuardianSerializer(read_only=True)
    fee_info = serializers.SerializerMethodField(read_only=True)
    room_id = serializers.PrimaryKeyRelatedField(
        queryset=Room.objects.all(),
        write_only=True,
        source="room",  # Map room_id to room field
        allow_null=True,  # Allow setting room to None (if student is not assigned to a room)
    )

    class Meta:
        model = Student
        fields = [
            "id",
            "name",
            "date_of_birth",
            "address",
            "phone",
            "college",
            "room",
            "room_id",
            "joining_date",
            "is_staying",
            "image",
            "description",
            "guardian",
            "fee_info",
        ]

    def get_fee_info(self, student):
        fee_cards = student.feecard_set.all()
        serializer = FeeCardSerializer(fee_cards, many=True)
        return serializer.data

    def create(self, validated_data):
        # Map 'room_id' to 'room' in the validated data
        room_id = validated_data.pop("room_id", None)
        if room_id is not None:
            validated_data["room"] = room_id

        student = Student.objects.create(**validated_data)
        return student
