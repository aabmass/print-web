from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'prints', views.PrintJobViewSet, base_name='prints')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
        namespace='rest_framework')),

    url(r'^auth/login$', obtain_jwt_token),
    url(r'^auth/refresh$', refresh_jwt_token),
]
