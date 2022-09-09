sap.ui.jsview("ZSPCE_RF_APRV.ZSPCE_RF_APRV.view.App", {

	getControllerName: function () {
		return "ZSPCE_RF_APRV.ZSPCE_RF_APRV.controller.App";
	},

	createContent: function (oController) {

		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);

		// create app
		this.app = new sap.m.App();

		// load the master page
		var master = sap.ui.xmlview("Master", "ZSPCE_RF_APRV.ZSPCE_RF_APRV.view.Master");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);

		// load the empty page
		//var empty = sap.ui.xmlview("Empty", "WF_STAGE2.Z_FAF_WF_STAGE.view.Empty");
		//this.app.addPage(empty, false);

		// wrap app with shell
		return new sap.m.Shell("Shell", {
			title: "{i18n>title}",
			showLogout: false,
			app: this.app
		});
	}
});