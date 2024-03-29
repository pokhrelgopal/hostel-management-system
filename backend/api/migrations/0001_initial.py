# Generated by Django 4.2.4 on 2023-08-19 16:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Guardian",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=150)),
                ("phone", models.CharField(max_length=15)),
                ("address", models.CharField(max_length=150)),
                (
                    "description",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Room",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("block", models.CharField(max_length=10)),
                ("room_no", models.IntegerField()),
                ("room_capacity", models.IntegerField()),
                ("attached_tb", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Staff",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=150)),
                ("work", models.CharField(max_length=150)),
                ("salary", models.IntegerField()),
                ("phone", models.CharField(max_length=10)),
                ("address", models.CharField(max_length=150)),
                (
                    "description",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Student",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=150)),
                ("date_of_birth", models.DateField()),
                ("address", models.CharField(max_length=150)),
                ("phone", models.CharField(max_length=15)),
                ("college", models.CharField(max_length=150)),
                ("joining_date", models.DateField()),
                ("is_staying", models.BooleanField(default=True)),
                ("image", models.ImageField(blank=True, null=True, upload_to="images")),
                (
                    "description",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                (
                    "guardian",
                    models.OneToOneField(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.guardian",
                    ),
                ),
                (
                    "room",
                    models.OneToOneField(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.room",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="FeeCard",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("month", models.CharField(max_length=10)),
                ("date", models.DateField()),
                ("monthly_fee", models.IntegerField()),
                ("extra_fee", models.IntegerField(blank=True, null=True)),
                ("is_paid", models.BooleanField(default=False)),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.student"
                    ),
                ),
            ],
        ),
    ]
