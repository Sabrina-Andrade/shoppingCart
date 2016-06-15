var Controller = {
	
	init: function() {
		Controller.setForm();
		Controller.listProdutos();
	},
	
	setForm: function() {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			Controller.addProduto(form);
			Controller.clearForm(form);
			event.preventDefault();
		});
	},
	
	addProduto: function(form) {
		var produto = {
			name: form.name.value,
			price: form.price.value
		};
		ListService.add(produto);
		Controller.addProdutoToHTML(produto);
	},
	
	clearForm: function(form) {
		form.reset();
	},
	
	listProdutos: function() {
		var produtos = ListService.getList();
		produtos.forEach(function(produto) {
			Controller.addProdutoToHTML(produto);
		});
	},
	
	addProdutoToHTML: function(produto) {
		var
			section = document.getElementById('produtoLista'),
			dl = document.createElement('dl'),
			dt = Controller.createDT(produto),
			ddName = Controller.createDDName(produto),
			ddPrice = Controller.createDD(produto.price, 'price');
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddPrice);
		
		section.appendChild(dl);
	},
	
	createImage: function(location) {
		var img = document.createElement('img');
		
		img.src = location;
		
		return img;
	},
	
	createDT: function(produto) {
		var dt = document.createElement('dt');
		
		dt.className = 'im';
		dt.appendChild(Controller.createImage('img/product.png'));
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.className = className;
		dd.innerHTML = value;
		
		return dd;
	},
	
	createDDName: function(produto) {
		var 
			dd = Controller.createDD(produto.name, 'name');
		  img = Controller.createImage('imagens/delete.png');
		
		img.setAttribute('data-price', produto.price);
		img.addEventListener('click', function() {
			Controller.removeProduto(this);
		});
		
		dd.appendChild(img);
		
		return dd;
	},

	
	removeProduto: function(image) {
		if(ListService.remove(image.dataset.price)) {
			var dl = image.parentNode.parentNode;
			dl.parentNode.removeChild(dl);
		}
	}
 };

//initialization
Controller.init();