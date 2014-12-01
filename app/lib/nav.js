var parentWindow,
	appName,
	titleCenterView,
	androidDrawer,
	iphoneDrawer,
	currentCenterView;

// exports.setAppName - Define o nome do aplicativo para ser utilizado quando o usuário abrir o menu
exports.setAppName = function(name){
	appName = name;
};

// setActionBarTitle - Alterar o titulo da actionbar
var setActionBarTitle = function(title){
	if(parentWindow){
		var activity = parentWindow.getActivity();
		if(activity){
			var actionBar = activity.getActionBar();
			actionBar.title = title;
		}
	}
};

// onChangeDrawer - Escuta eventos de abertura e fechamento do menu para alternar entre appName e titleCenterView
var onChangeDrawer = function(){
	androidDrawer.addEventListener('draweropen', function(e){
		appName && setActionBarTitle(appName);
	});
	androidDrawer.addEventListener('drawerclose', function(e){
		titleCenterView && setActionBarTitle(titleCenterView);
	});
};

// setAndroidDrawer - Seta o drawer do android
exports.setAndroidDrawer = function(drawer){
	androidDrawer = drawer;
	onChangeDrawer();
};

// setIphoneDrawer - Seta o drawer do iphone
exports.setIphoneDrawer = function(drawer){
	iphoneDrawer = drawer;
};

// setParentWindow - Seta o parent window
exports.setParentWindow = function(win){
	parentWindow = win;
};

// exports.openCenter - Abre uma view no centro do drawer
exports.openCenter = function(title, controllerName, toogleMenu){
	
	var view = Alloy.createController(controllerName).getView();

	if(OS_ANDROID && androidDrawer){
		titleCenterView = title;
		androidDrawer.setCenterView(view);
		if(toogleMenu) androidDrawer.toggleLeftWindow();
	}
	else if(OS_IOS && iphoneDrawer && parentWindow){
		if(currentCenterView){
			parentWindow.remove(currentCenterView);
		}
		currentCenterView = view;
		parentWindow.add(currentCenterView);
		parentWindow.setTitle(title);
		iphoneDrawer.toggleLeftView();
	}
};

// exports.init - Inicia a aplicação
exports.init = function(){
	if(OS_ANDROID && parentWindow){
		if(androidDrawer){
			parentWindow.add(androidDrawer);
		}
		parentWindow.open();
	}
	else if(OS_IOS && iphoneDrawer){
		iphoneDrawer.open();
		iphoneDrawer.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");
	}
};