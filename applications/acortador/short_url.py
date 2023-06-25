import pyshorteners as ps

import contextlib

try:
	from urllib.parse import urlencode		

except ImportError:
	from urllib import urlencode
try:
	from urllib.request import urlopen

except ImportError:
	from urllib2 import urlopen


def make_tiny(url):
	request_url = ('http://tinyurl.com/api-create.php?' + urlencode({'url':url}))
	with contextlib.closing(urlopen(request_url)) as response:					
		return response.read().decode('utf-8 ')									


def make_tiny_2(url):
	return ps.Shortener().tinyurl.short(url)


class CreateShortURLBasic:
	def __init__(self):
		self.short_url = ps.Shortener()

	def create(self, url = None):
		if url == None:
			raise ValueError(f'Debe ingresar una url')
		response = self.short_url.tinyurl.short(url)
		return response

	def large(self, url = None):
		if url == None:
			raise ValueError(f'Debe ingresar una url')
		if(hasattr(self.short_url, 'expand')):
			return self.short_url.expand(url)
		raise ValueError('Este acortador no posee esta propiedad.')



