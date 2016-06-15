var ListService = {
	
	list: [],
	
	getList: function() {
		ListService.getFromLocalStorage();
		return ListService.list;
	},
	
	add: function(produto) {
		ListService.list.push(produto);
		ListService.saveToLocalStorage();
	},
	
	findIndex: function(price) {
		var 
			list = ListService.list,
			indexFound = null;
		
		list.some(function(produto, index){
			if(price === produto.price) {
				indexFound = index;
				return true;
			}
		});
		
		return indexFound;
	},
	
	remove: function(price) {
		var index = ListService.findIndex(price);
		if(index !== null && confirm("Do you want to remove [" + price +"]?")) {
			ListService.list.splice(index, 1);
			ListService.saveToLocalStorage();
			return true;
		}
		return false;
	},
   
	
	saveToLocalStorage: function() {
		var jsonText = JSON.stringify(ListService.list);
		window.localStorage.setItem('produto-list', jsonText);
	},
	
	getFromLocalStorage: function() {
		var jsonText = window.localStorage.getItem('produto-list');
		if(jsonText) {
			ListService.list = JSON.parse(jsonText);
		}
	}
	
};