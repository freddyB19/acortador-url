from django.urls import path

from . import views

app_name = "acortador"


urlpatterns = [
	path('', 
		views.AcortadorBasicURLTemplateView.as_view(), 
		name = "acortador"
	),
	path('acortador/basic/', 
		views.AcortadorBasicURLAPIView.as_view(), 
	),
	path('index/', 
		views.AcortadorUserTemplateView.as_view(), 
		name = "acortador-login"
	),
	
	
	path('acortador/', 
		views.AcortadorUserURLAPIView.as_view(), 
	),
	path('acortador/<id>/detail/', 
		views.AcortadorUserURLAPIView.as_view(), 
	),
	path('acortador/<id>/delete/', 
		views.AcortadorUserURLAPIView.as_view(), 
	),


	path('acortador/list/', 
		views.AcortadorUserURLLitAPIView.as_view(), 
	),
	path('acortador/list/all/',
		views.AcortadorUserURLListView.as_view(),
		name = 'acortador-list-all'
	),
	
	path('acortador-delete/<int:pk>/',
		views.AcortadorUserURLDeleteView.as_view(),
		name = 'acortador-delete'
	),
	path('acortador/deatil/<int:pk>/',
		views.AcortadorUserURLDetailView.as_view(),
		name = 'acortador-detail'
	),

]
