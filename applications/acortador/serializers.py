from rest_framework import serializers

from . import models

class AcortadorSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Acortador
		fields = ['url', 'nombre', 'descripcion']


class AcortadorSerializerBasic(serializers.Serializer):
	url = serializers.URLField(required=False)


class AcortadorUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Acortador
		fields = '__all__'


class AcortadorUserSerializer2(serializers.BaseSerializer):
	def to_representation(self, instance):
		return {
					'user': {
						'id': instance.user.pk,
						'username': instance.user.username,
						'email': instance.user.email
					},
					'url_principal': instance.url_principal,
					'url': instance.url,
					'nombre': instance.nombre,
					'descripcion': instance.descripcion,
		}

