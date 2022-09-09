sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZSPCE_RF_APRV.ZSPCE_RF_APRV.controller.App", {
		to: function (pageId, context) {
			var app = this.getView().app;
			debugger;
			// load page on demand
			var master = (pageId === "Master");
			var page = null;
			if (app.getPage(pageId, master) === null) {
				page = sap.ui.view({
					id: pageId,
					viewName: "ZSPCE_RF_APRV.ZSPCE_RF_APRV.view." + pageId,
					type: "XML"
				});
				page.getController().nav = this;
				app.addPage(page, master);
				jQuery.sap.log.info("app controller > loaded page: " + pageId);
			}

			// show the page
			app.to(pageId);

			// set data context on the page
			if (context) {
				page = app.getPage(pageId);
				page.setBindingContext(context);
			}
		},

		/**
		 * Navigates back to a previous page
		 * @param {string} pageId The id of the next page
		 */
		back: function (pageId) {
			this.getView().app.backToPage(pageId);
		}
	});
});