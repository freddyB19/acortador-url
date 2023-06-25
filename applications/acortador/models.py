from django.db import models

from applications.user.models import User

#Create your models here.
class Acortador(models.Model):
	nombre = models.CharField(max_length = 60, help_text = 'Puedes agregar un nombre para tu url', blank = True, null=True)	
	url = models.URLField(max_length=100)
	url_principal = models.URLField(max_length=200, blank = True, null = True)
	descripcion = models.TextField(help_text = 'Puedes agregar una descripción para saber sobre está url', max_length = 100, blank = True, null=True)
	creado = models.DateField(auto_now_add=True)
	user = models.ForeignKey(User, 
		related_name = 'useracortador',
		on_delete = models.CASCADE,
		blank=True,
		null=True
	)
	
	def __str__(self):
		return f"{self.nombre}"

	class Meta:
		verbose_name = "Acortador"
		verbose_name_plural = "Acortadores"