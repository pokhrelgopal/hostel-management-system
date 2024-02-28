from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

from .views import (
    StaffViewSet,
    RoomViewSet,
    StudentViewSet,
    FeecardViewSet,
    GuardianViewSet,
)

router = DefaultRouter()
router.register("staff", StaffViewSet, basename="staff")
router.register("room", RoomViewSet, basename="room")
router.register("guardian", GuardianViewSet, basename="guardian")
router.register("student", StudentViewSet, basename="student")
router.register("feecard", FeecardViewSet, basename="feecard")


urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
]
urlpatterns += router.urls
