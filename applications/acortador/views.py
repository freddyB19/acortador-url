from django.http import HttpResponseRedirect
from django.urls import reverse, reverse_lazy

from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin


from rest_framework import (response, status, views)
from rest_framework import generics

from applications.user.forms import LoginUserForm
from . import forms, models, short_url, serializers, paginations

# Create your views here.


class AcortadorUserTemplateView(LoginRequiredMixin, generic.TemplateView):
	template_name = 'acortador/new_url.html'
	login_url = reverse_lazy('user:login') 

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['acortador_form'] = forms.AcortadorUserLoginForm
		context['list_url'] = models.Acortador.objects.filter(user_id = self.request.user.pk)
		return context


class AcortadorUserURLAPIView(LoginRequiredMixin, views.APIView):
	login_url = reverse_lazy('user:login')

	
	def get(self, request, format = None):
		try:
			user_url = models.Acortador.objects.get(id = request.kwargs.get('id'), user_id = request.user.pk)
		except models.Acortador.DoesNotExist as e:
			return response.Response({'response': {'message': 'No existe registro con este usuario', 'code': f"{e}"}}, status = status.HTTP_404_NOT_FOUND)
		
		serializer = serializers.AcortadorUserSerializer(user_url)

		return response.Response(data = serializer.data, status = status.HTTP_200_OK)


	def post(self, request, format = None):
		serializer_data = serializers.AcortadorSerializer(data = request.data)
		if serializer_data.is_valid():
			try:
				
				url = short_url.CreateShortURLBasic()
				shorURL = url.create(serializer_data.data.get('url'))
				
				acortador = models.Acortador(
					user = request.user,
					url = shorURL,
					nombre = serializer_data.data['nombre'],
					descripcion = serializer_data.data['descripcion'],
				)


				try:
					acortador.url_principal = url.large(serializer_data.data.get('url'))
				except Exception as e:
					acortador.url_principal = shorURL
					# acortador.url_principal = serializer_data.data.get('url')

				
				acortador.save()
				
				acortador_serializer = serializers.AcortadorUserSerializer2(acortador)

			except Exception as e:
				print(e)
				serializer_url = {'response': {'message': f'{e}', 'code': "404"}}
				return  response.Response(data = serializer_url, status = status.HTTP_408_REQUEST_TIMEOUT) 

			return response.Response(acortador_serializer.data, status = status.HTTP_200_OK)
		
		return response.Response(data = serializer_data.errors, status = status.HTTP_406_NOT_ACCEPTABLE)


	def delete(self, request, id = None, format = None):
		try:
			acortador = models.Acortador.objects.get(id = id, user_id = request.user.pk)
		except models.Acortador.DoesNotExist as e:
			serializer_url = {'response': {'message': f'{e}', 'code': "404"}}
			return response.Response(data = serializer_url, status = status.HTTP_404_NOT_FOUND)
		
		acortador.delete()

		
		return response.Response(status = status.HTTP_204_NO_CONTENT)




class AcortadorUserURLLitAPIView(LoginRequiredMixin, generics.ListAPIView):
	login_url = reverse_lazy('user:login') 
	serializer_class = serializers.AcortadorUserSerializer

	def get_queryset(self):
		try:
			acortador = models.Acortador.objects.filter(user_id = self.request.user.pk)[:6]
		except models.Acortador.DoesNotExist as e:
			return response.Response({'response': {'message': 'No existe registros con este usuario', 'code': f"{e}"}}, status = status.HTTP_404_NOT_FOUND)
		
		return acortador



class AcortadorUserURLListView(LoginRequiredMixin, generic.ListView):
	login_url = reverse_lazy('user:login')
	template_name = 'acortador/list_url.html'
	context_object_name = 'objects'
	
	def get_queryset(self):
		return models.Acortador.objects.filter(user_id = self.request.user.pk)

class AcortadorUserURLDeleteView(LoginRequiredMixin, generic.DeleteView):
	template_name = 'acortador/delete_url.html'
	login_url = reverse_lazy('user:login')
	success_url = reverse_lazy('acortador:acortador-list-all')
	model = models.Acortador


class AcortadorUserURLDetailView(LoginRequiredMixin, generic.DetailView):
	template_name = 'acortador/detail_url.html'
	login_url = reverse_lazy('user:login')
	model = models.Acortador



class AcortadorBasicURLTemplateView(generic.TemplateView):
	template_name = 'acortador/index.html'

	def get(self, request, *args, **kwargs):
		if(request.user.is_authenticated):
			return HttpResponseRedirect(
				reverse('acortador:acortador-login')
			)
		return super().get(request, *args, **kwargs)

	def get_context_data(self, **kwargs):
	    context = super().get_context_data(**kwargs)
	    context['form_login'] = LoginUserForm
	    
	    return context


class AcortadorBasicURLAPIView(views.APIView):
	def post(self, request, format = None):
		serializer_data = serializers.AcortadorSerializerBasic(data = request.data)
		if serializer_data.is_valid():
			try:
				url = short_url.CreateShortURLBasic()
				shorURL = url.create(serializer_data.data.get('url'))
				serializer_url = serializers.AcortadorSerializerBasic(data = shorURL).initial_data
				print(serializer_url)
			except Exception as e:
				print(e)
				serializer_url = {'response': {'message': f'{e}', 'code': "404"}}
				return  response.Response(data = serializer_url, status = status.HTTP_408_REQUEST_TIMEOUT) 

			
			return  response.Response(data = {'url': serializer_url}, status = status.HTTP_200_OK) 
		return response.Response(serializer_data.errors, status = status.HTTP_406_NOT_ACCEPTABLE)


