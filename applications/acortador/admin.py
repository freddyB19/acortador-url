from django.contrib import admin
from .models import Acortador

# Register your models here.

class AcortadorAdmin(admin.ModelAdmin):
	ordering = ['id']
	
	list_display = [
		'id',
		'url'
	]


admin.site.register(Acortador, AcortadorAdmin)