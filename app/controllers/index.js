/*

------
	IOS
------

*/
if(OS_IOS){

	// NappSlideMenu
	var NappSlideMenu = require('dk.napp.slidemenu');
	var drawerIphone = NappSlideMenu.createSlideMenuWindow({
		centerWindow: $.navWindow,
		leftWindow: Alloy.createController('menu').getView(),
		leftLedge: 50
	});

	// Configure navigation and init app
	Alloy.Globals.nav.setIphoneDrawer(drawerIphone);
	Alloy.Globals.nav.setParentWindow($.firstWindow);
	Alloy.Globals.nav.openCenter('Feed', 'feed', false);
	Alloy.Globals.nav.init();

	function openMenu(){
		drawerIphone.toggleLeftView();
	}

}

/*

------
	ANDROID
------

*/
else if(OS_ANDROID){

	// Ti.DrawerLayout
	var TiDrawerLayout = require('com.tripvi.drawerlayout');
	var drawer = TiDrawerLayout.createDrawer({
		leftView: Alloy.createController('menu').getView(),
		leftDrawerWidth: "280dp",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});

	// Configure navigation and init app
	Alloy.Globals.nav.setAppName('My App Name');
	Alloy.Globals.nav.setAndroidDrawer(drawer);
	Alloy.Globals.nav.setParentWindow($.index);
	Alloy.Globals.nav.openCenter('Feed', 'feed', false);
	Alloy.Globals.nav.init();

}