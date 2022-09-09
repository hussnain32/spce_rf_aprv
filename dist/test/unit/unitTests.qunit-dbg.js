/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZSPCE_RF_APRV/ZSPCE_RF_APRV/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});