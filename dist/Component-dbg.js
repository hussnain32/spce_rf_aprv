sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZSPCE_RF_APRV/ZSPCE_RF_APRV/model/models",
	"ZSPCE_RF_APRV/ZSPCE_RF_APRV/utils/dataManager"
], function (UIComponent, Device, models, dataManager) {
	"use strict";

	return UIComponent.extend("ZSPCE_RF_APRV.ZSPCE_RF_APRV.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var sUrl = "/sap/opu/odata/sap/ZSLCM_REFUND_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
			dataManager.init(oModel);
		}
	});
});