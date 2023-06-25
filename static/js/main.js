id_url

class ResponseMethods {
	static method_get = async () =>{

		const header = new Headers();
		header.append('Content-Type', 'application/json');


		const peticion = {
			method: 'GET',
			headers: header,
			credentials: 'same-origin',
		}

		const response = await fetch('../acortador/list/', peticion);
		const responseToJson = await response.json()

		if(response.status !== 200){
			alert(responseToJson.response.message)
			return null
		}
		
		return responseToJson;

	}
	static method_post = async ({url, token, nombre = null, descripcion = null}) =>{

		let info = {url, nombre, descripcion, token}
		
		if(info.nombre === null && info.descripcion === null){
			info = {
				token: info.token,
				url: info.url,
			}
		}

		let route = {
			'basic': 'acortador/basic/',
			'acortador': '../acortador/'
		}
		
		let ruta = route[document.querySelector("#form").dataset.url];

		const header = new Headers()
		header.append("X-CSRFToken", info.token)
		header.append("Content-Type", 'application/json')


		const response = await fetch(ruta, {
			headers: header,
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify(info)
		})


		const responseToJson = await response.json()

		if(response.status !== 200){
			console.log(responseToJson)
			return null
		}

		return responseToJson;
	}



	static method_delete = async ({token, id}) =>{
		let info = {token, id}

		
		const header = new Headers()
		header.append("X-CSRFToken", info.token)
		header.append("Content-Type", 'application/json')


		const response = await fetch(`../acortador/${info.id}/delete/`, {
			headers: header,
			method: 'DELETE',
			credentials: 'same-origin',
			body: JSON.stringify(info)
		})


		if(response.status !== 204){
			const responseToJson = await response.json()
			alert(responseToJson.response.message)
			return null
		}

		return true;
	}

	static method_get_detail = async ({id}) =>{
		let info = {id}

		const header = new Headers()
		header.append("Content-Type", 'application/json')


		const response = await fetch(`../acortador/${info.id}/detail/`, {
			headers: header,
			method: 'GET',
		})


		const responseToJson = await response.json()

		if(response.status !== 200){
			alert(responseToJson.response.message)
			return null
		}

		return responseToJson;

	}
	static method_get_pagination = async ({url}) =>{
		let info = {url}

		const header = new Headers()
		header.append("Content-Type", 'application/json')

		const response = await fetch(info.url, {
			headers: header,
			method: 'GET',
		})


		const responseToJson = await response.json()

		if(response.status !== 200){
			alert(responseToJson.response.message)
			return null
		}

		return responseToJson;

	}
}

class ClassShowData {
	static showGet = (response) =>{

		const mount = document.querySelector('#mount-response-get');
		mount.innerHTML = '';
		console.log(response)

		if(response.length != 0){
			mount.innerHTML = `
				<table class="table my-5" id="control">
				  <thead class="table-light">
				    <tr>
				      <th scope="col">Identificador de la url</th>
				      <th scope="col">URL</th>
				      <th scope="col">Eliminar registro</th>
				    </tr>
				  </thead>
				  <tbody id="table-body">
				  ${response.map( data => 
				  	`<tr data-id=" ${data.id} ">
					  	<td>${data.nombre}</td>
					  	<td>${data.url}</td>
					  	<td>
						  	<button type="button" class="btn btn-outline-danger" value="delete">
							   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
							  	<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
								</svg>
							    Eliminar
							</button>
					  		
					  	</td>
				  	</tr>`
				  ).join('')}
				   
				  </tbody>
				</table>

			`

		} else {
			mount.innerHTML = `
				<p>No contiene urls almacenadas.</p>
			`
			document.querySelector('#list-all-url').childNodes[1].classList.add('disabled')
		}
		
	}
	

	static showPost = (response) =>{
		const mount = document.getElementById('mount');
		mount.innerHTML = ``;

		let div = document.createElement('div');
		div.innerHTML = `
			<div class="modal-content rounded-4 shadow">
			    <div class="modal-header border-bottom-0">
			        <h1 class="modal-title fs-5">Tu nueva URL:</h1>
			      </div>
			    <div class="modal-body py-0" >
			        <p><span id='result'>${response.url}</span></p>
			      </div>
			</div>
		`;
		mount.appendChild(div)
	}

	static showDeletet = () =>{
		const body = document.getElementById('alert-messages');
		let div = document.createElement('div');

		div.innerHTML = `
			<div class="alert alert-warning alert-dismissible fade show" role="alert">
			  <strong>¡Eliminado!</strong> El elemento fue eliminado con exito.
			  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		`;
		body.appendChild(div);

	}

}


class GetcsrToken {
	constructor(){
		this.token = document.querySelector('[name="csrfmiddlewaretoken"]').value
	}
	getToken(){
		return this.token;
	}
}


const clean_form = () => {
	const form = document.getElementById('form');

	for (let i = 0; i < form.length; i++) {
		form[i].value = "";
	}
}


const get_form = () => {
	const form = document.getElementById('form');
	if(form.dataset.url === 'acortador')
		return {
			nombre: form.querySelector("#id_nombre").value,
			url: form.querySelector("#id_url").value,
			descripcion: form.querySelector("#id_descripcion").value
		};
	return {
		url: form.querySelector("#id_url").value,
	}
}



window.addEventListener('load', async (e) => {
	const csrftoken = new GetcsrToken()
	let rest_get = null;

	document.getElementById('btn-url').addEventListener('click', async (e) =>{
		e.preventDefault()
		
		const values_from_form = get_form()
		const rest = await ResponseMethods.method_post({...values_from_form, token:csrftoken.getToken()});
		if(rest !== null){
			ClassShowData.showPost(rest)
			document.getElementById('copiar').removeAttribute('disabled');
			
			if(document.querySelector('#list-all-url').children.length != 0)
				document.querySelector('#list-all-url').childNodes[1].classList.remove('disabled')
		}
		
		clean_form()
		
		if(document.querySelector('#form').dataset.url === 'acortador'){
			rest_get = await ResponseMethods.method_get()
			ClassShowData.showGet(rest_get)

			document.getElementById('control').addEventListener('click', async (e) => {
				e.preventDefault();
				if(e.target.value == "delete"){
					
					const response = await ResponseMethods.method_delete({token: csrftoken.getToken(), id:e.target.parentElement.parentElement.dataset.id})
					e.target.parentElement.parentElement.remove()
					ClassShowData.showDeletet()
					

					if(document.querySelector('#table-body').children.length === 0){
						document.querySelector('#mount-response-get').innerHTML = '';
						document.querySelector('#list-all-url').innerHTML = '';

					}
				}

			});


		}
	
	});

	document.getElementById('copiar').addEventListener('click', (e) => {
		let aux = document.createElement("input");
		aux.setAttribute("value", document.getElementById('result').innerHTML);
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);
	})


	
	if(document.querySelector('#form').dataset.url === 'acortador'){
		clean_form()
		rest_get = await ResponseMethods.method_get()
		ClassShowData.showGet(rest_get)
		

		if(document.getElementById('control') !== null)
			document.getElementById('control').addEventListener('click', async (e) => {
				e.preventDefault();
				if(e.target.value == "delete"){
					
					const response = await ResponseMethods.method_delete({token: csrftoken.getToken(), id:e.target.parentElement.parentElement.dataset.id})
					e.target.parentElement.parentElement.remove()
					ClassShowData.showDeletet()
					

					if(document.querySelector('#table-body').children.length === 0){
						document.querySelector('#mount-response-get').innerHTML = '';
						document.querySelector('#list-all-url').innerHTML = '';

					}
				}

			});
	}
	
});



