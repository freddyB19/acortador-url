from django import forms

from . import models

class AcortadorUserLoginForm(forms.ModelForm):
	class Meta:
		model = models.Acortador
		fields = (
			'nombre',
			'url',
			'descripcion'
		)

		widgets = {
			'nombre': forms.TextInput(
				attrs = {
					"class": 'form-control rounded-3'
				}
			),
			'url': forms.URLInput(
				attrs = {
					"class": 'form-control rounded-3'
				}
			),
			'descripcion': forms.Textarea(
				attrs = {
					"class": 'form-control rounded-3 form-control form-control-lg',
					'style': "height: 129px"
				}
			),

		}

