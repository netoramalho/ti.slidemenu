// openItem - Abre um item do menu
var openItem = function(item){
	setActiveItem(item.view);
	Alloy.Globals.nav.openCenter(item.itemTitle, item.controller, true);
};

// resetActiveItens - Reseta status
var resetActiveItens = function(){
	itensMenu.forEach(function(item){
		if(item.view){
			var childrens = item.view.getChildren();
			childrens.forEach(function(children){
				children.setColor('#5c96a0');
			});
		}
	});
};

// setActiveItem - Ativa um item do menu
var setActiveItem = function(itemView){
	resetActiveItens();
	var childrens = itemView.getChildren();
	childrens.forEach(function(children){
		children.setColor('#ebb273');
	});
};

// addItemMenu - Adiciona um novo item no menu
var addItemMenu = function(data){

	// Elementos
	var icon = $.UI.create("Label", {classes: 'icon menu-icon '+data.icon});
	var title = $.UI.create("Label", {text: data.itemTitle, classes: 'label-menu'});
	var seta = $.UI.create("Label", {classes: 'icon seta icon-next'});
	var item = $.UI.create("View", {classes: 'item-menu'});
	item.add(icon);
	item.add(title);
	item.add(seta);
	$.itens.add(item);

	// Referencia a view no array de itens
	data.view = item;

	// Ao clicam no item ativa openItem
	item.addEventListener('click', function(e){
		openItem(data);
	});

	// Vetifica se o item inicia ativo
	if(data.startActive){
		setActiveItem(item);
	}

};

// itensMenu - Array com itens do menu
var itensMenu = [
	{
		controller: 'feed',
		icon: 'icon-msg',
		itemTitle: 'Feed',
		startActive: true
	},
	{
		controller: 'favoritos',
		icon: 'icon-favoritos',
		itemTitle: 'Favoritos'
	}
];

// Insere itens do array no menu
itensMenu.forEach(function(item){
	addItemMenu(item);
});