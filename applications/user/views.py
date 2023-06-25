import os

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect

from django.views import generic
from django.views.generic import edit

# from django.db import models as db_models
from django.urls import reverse_lazy, reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin


from . import models, forms



# Create your views here.

class SettingsUserTemplateView(LoginRequiredMixin, generic.TemplateView):
	template_name = "user/settings.html"
	login_url = reverse_lazy('user:login')

	
	def get_context_data(self, **kwargs):
	    context = super().get_context_data(**kwargs)
	    return context


class CreateUserFormView(generic.FormView):
	form_class = forms.CreateUserForm
	model = models.User
	template_name = "user/create_user.html"
	success_url = reverse_lazy("user:login")

	def form_valid(self, form):
		if form.is_valid():

			user = models.User(
				email = form.cleaned_data["email"],
				username = form.cleaned_data["username"],
				first_name = form.cleaned_data["first_name"],
				last_name = form.cleaned_data["last_name"],
			)
			user.set_password(form.cleaned_data["password_1"])
			user.save()

			messages.add_message(self.request, messages.INFO, 'Usuario creado de manera exitosa.')
		return super().form_valid(form)



class LoginUserFormView(edit.FormView):
	form_class = forms.LoginUserForm
	template_name = "user/login.html"
	success_url = reverse_lazy("acortador:acortador-login")

	def get(self, request, *args, **kwargs):
		if self.request.user.is_authenticated:
			return HttpResponseRedirect(
				reverse(
					'acortador:acortador-login'
				)
			)
		return super().get( request, *args, **kwargs)

	def form_valid(self, form):
		if form.is_valid():
			user = authenticate(
				email = form.cleaned_data["email"], 
				password = form.cleaned_data["password"]
			)
			login(self.request, user)
		return super().form_valid(form)



class LogoutUserView(LoginRequiredMixin, generic.View):
	login_url = reverse_lazy('user:login')

	def get(self, request, *args, **kwargs):
		logout(request)
		return HttpResponseRedirect(
			reverse(
				'acortador:acortador'
			)
		)



class UpdatePasswordUser(LoginRequiredMixin, generic.FormView):
	form_class = forms.NewPasswordUserForm
	template_name = 'user/update_password.html'
	login_url = reverse_lazy('user:login')



	def get_form_kwargs(self):
		kwargs = super().get_form_kwargs()
		kwargs.update({
			'user_email': self.request.user.email
		})
		return kwargs

	def form_valid(self, form):
		if form.is_valid():

			messages.add_message(self.request, messages.INFO, 'La contraseña fue cambiada de manera exitosa.')
			
			try:
				user = get_object_or_404(models.User, pk = self.kwargs.get('pk'))
				
				new_password = form.cleaned_data['password_new_1']	
				user.set_password(new_password)
				user.save()
				
			except models.User.DoesNotExist as e:
				messages.add_message(self.request, messages.ERROR, 'Ha ocurrido un error durante el proceso, vuelve a intentarlo.')
			
			logout(self.request)
		return HttpResponseRedirect(
				reverse(
					'user:login', 
				)
			)


class UpdateUserEmailFormView(LoginRequiredMixin, edit.FormView):
	form_class = forms.UpdateUserEmailForm
	template_name = "user/update_email.html"
	login_url = reverse_lazy('user:login')


	def get_form_kwargs(self):
		kwargs = super().get_form_kwargs()
		kwargs.update({
			'email': self.request.user.email
		})
		return kwargs


	def form_valid(self, form):
		if form.is_valid():
			new_email = form.cleaned_data['email']

			data = f'Los cambios (Nuevo email: {new_email}) se realizaron correctamente.'
			messages.add_message(self.request, messages.INFO, data)
			
			try:
				user = get_object_or_404(models.User, pk = self.kwargs.get('pk'))
				
				user.email = new_email
				user.save()
				
			except models.User.DoesNotExist as e:
				messages.add_message(self.request, messages.ERROR, 'Ha ocurrido un error durante el proceso, vuelve a intentarlo.')

		return HttpResponseRedirect(
				reverse(
					'user:settings-user', 
					kwargs = {
						'pk': self.request.user.pk
					}
				)
			)


