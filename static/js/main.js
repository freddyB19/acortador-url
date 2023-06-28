

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


		if(response.status !== 200)
			return {response_result: null, response: responseToJson}

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
}

class ClassShowData {
	static showGet = (response) =>{

		const mount = document.querySelector('#mount-response-get');
		mount.innerHTML = '';

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


class MessagessErrorDOMAlert {
	static create = () => {
		const body = document.querySelector('body');

		const div_show = document.createElement("div");
		div_show.className = "modal-backdrop fade show";
		body.appendChild(div_show);

		body.setAttribute('style', 'overflow: hidden; padding-right: 29px;')
		body.classList.add('modal-open')
	}
}

class MessagessErrorAlert {
	static create = (data) => {
		const div = document.createElement('div');
		div.innerHTML = `
			<div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" style="display: block;" aria-modal="true" role="dialog">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h1 class="modal-title fs-5" id="staticBackdropLabel">Error ${data.response.code}</h1>
			        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="modal-btn-close-1"></button>
			      </div>
			      <div class="modal-body">
			        ${data.response.message}
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" id="modal-btn-close-2" data-bs-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		`;
			

		document.querySelector('#modal-messages-error').appendChild(div);
	}

}



class RemoveMessagesErrorAlert {
	static remove = () => {
		document.querySelector("#modal-messages-error").innerHTML = ``;
		const body = document.querySelector("body");
		
		if(document.querySelector(".modal-backdrop"))
			body.removeChild(
				document.querySelector(".modal-backdrop")
  			)

		body.classList.remove("modal-open");
		body.removeAttribute("style");
	}
}

class AddEventDOMMessagesErrorAlert{
	static set = () => {
		document.getElementById('modal-messages-error').addEventListener('click', (e) => {
			if(e.target.id === "modal-btn-close-1" || e.target.id === "modal-btn-close-2")
				RemoveMessagesErrorAlert.remove()
		});
	}
}

class ModalMessagessError {
	static create = (data) => {
		MessagessErrorDOMAlert.create();
		MessagessErrorAlert.create(data);
		AddEventDOMMessagesErrorAlert.set();
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
		document.getElementById('copiar').setAttribute('disabled', true);
		

		document.getElementById('btn-url').classList.add('alig-item-center')
		document.getElementById('btn-url').innerHTML = `
			<div class="spinner-grow text-success" role="status">
          		<span class="visually-hidden">Loading...</span>
        	</div>
	        
		`;
		document.getElementById('btn-url').setAttribute('disabled', true);

		
		
		const values_from_form = get_form()
		const rest = await ResponseMethods.method_post({...values_from_form, token:csrftoken.getToken()});
		
		document.getElementById('btn-url').removeAttribute('disabled');
		document.getElementById('btn-url').innerHTML = `Generar`
		
		if(rest.response_result !== null){
			ClassShowData.showPost(rest)
			document.getElementById('copiar').removeAttribute('disabled');


			
			if(document.querySelector('#form').dataset.url === 'acortador'){
				rest_get = await ResponseMethods.method_get()
				ClassShowData.showGet(rest_get)

				if(document.querySelector('#table-body').children.length != 0)
					document.querySelector('#list-all-url').childNodes[1].classList.remove('disabled');

				document.getElementById('control').addEventListener('click', async (e) => {
					e.preventDefault();
					if(e.target.value == "delete"){

						e.target.innerHTML = `
							<div class="spinner-border text-danger" role="status">
	          					<span class="visually-hidden">Loading...</span>
	        				</div>
						`;
						
						const response = await ResponseMethods.method_delete({token: csrftoken.getToken(), id:e.target.parentElement.parentElement.dataset.id})
						e.target.parentElement.parentElement.remove()
						ClassShowData.showDeletet()
						e.target.innerHTML = `
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
						  		<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
							</svg>
						    Eliminar`;

						if(document.querySelector('#table-body').children.length === 0){
							document.querySelector('#mount-response-get').innerHTML = '';
							document.querySelector('#list-all-url').childNodes[1].classList.add('disabled')

						}
						
						
					}

				});


		}
			

		}else if(rest.response_result == null )
			ModalMessagessError.create(rest.response)

		
		clean_form()
		
	
	});

	document.getElementById('copiar').addEventListener('click', (e) => {
		e.target.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
			  <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
			  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
			  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
			</svg>
            Copiado
		`;
		
		let aux = document.createElement("input");
		aux.setAttribute("value", document.getElementById('result').innerHTML);
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		document.body.removeChild(aux);

		setTimeout(() => {
			e.target.innerHTML = `Copiar`;
		}, 600)
		
	})


	
	if(document.querySelector('#form').dataset.url === 'acortador'){
		clean_form()
		rest_get = await ResponseMethods.method_get()
		ClassShowData.showGet(rest_get)
		

		if(document.getElementById('control') !== null)
			document.getElementById('control').addEventListener('click', async (e) => {
				e.preventDefault();
				if(e.target.value == "delete"){


					e.target.innerHTML = `
						<div class="spinner-border text-danger" role="status">
          					<span class="visually-hidden">Loading...</span>
        				</div>
					`;
					
					const response = await ResponseMethods.method_delete({token: csrftoken.getToken(), id:e.target.parentElement.parentElement.dataset.id})
					e.target.parentElement.parentElement.remove()
					ClassShowData.showDeletet()
					

					if(document.querySelector('#table-body').children.length === 0){
						document.querySelector('#mount-response-get').innerHTML = '';
						document.querySelector('#list-all-url').childNodes[1].classList.add('disabled')


					}
				}

			});
	}
	
});



