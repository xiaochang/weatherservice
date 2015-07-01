from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'weatherservice.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'tools.views.index', name='home'),
    url(r'^search/','tools.views.search', name='search'),

    url(r'^admin/', include(admin.site.urls)),
)
