from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls',
        namespace='rest_framework')),

    url(r'^auth/login$', obtain_jwt_token),
    url(r'^auth/refresh$', refresh_jwt_token),
]
