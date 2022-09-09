sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function () {
	"use strict";

	var oModel = null;
	return {
		init: function (oDataModel) {
			oModel = oDataModel;
			oModel.setCountSupported(false);
		},

		getRFList: function (successCallBack, errorCallBack) {
			var sPath = "REFUND_DATASet(IvAction='31',IvGet='')";
			oModel.read(sPath, null, null, true, function (success) {
				successCallBack(success);
			}, function (error) {
				errorCallBack(error);
			});
		},

		getRF: function (oObject, sucessCallback, errorCallback) {
			var oJson = JSON.stringify(oObject);
			var sPath = "Refund_createDataSet";
			var oContext = {
				"IvAction": "32",
				"IvGet": oJson
			};
			oModel.create(sPath, oContext, null,
				function (objResponse) {
					sucessCallback(objResponse);
				},
				function (objResponse) {
					errorCallback(objResponse);
				});

			/*			var oJson = JSON.stringify(id);
						var sPath = "REFUND_DATASet(IvAction='32',IvGet='" + oJson + "')";
						oModel.read(sPath, null, null, true, function (success) {
							successCallBack(success);
						}, function (error) {
							errorCallBack(error);
						});*/
		},

		/*		getRFData: function (path, id, successCallBack, errorCallBack) {
					var sPath = "REFUND_DATASet(IvAction='05',IvGet='" + id + "')";
					oModel.read(sPath, null, null, true, function (success) {
						successCallBack(success);
					}, function (error) {
						errorCallBack(error);
					});
				},

				getRFAppr1: function (path, id, successCallBack, errorCallBack) {
					var sPath = "REFUND_DATASet(IvAction='06',IvGet='" + id + "')";
					oModel.read(sPath, null, null, true, function (success) {
						successCallBack(success);
					}, function (error) {
						errorCallBack(error);
					});
				},

				getRFAppr2: function (path, id, successCallBack, errorCallBack) {
					var sPath = "REFUND_DATASet(IvAction='07',IvGet='" + id + "')";
					oModel.read(sPath, null, null, true, function (success) {
						successCallBack(success);
					}, function (error) {
						errorCallBack(error);
					});
				},

				getRFRGO: function (path, id, successCallBack, errorCallBack) {
					var sPath = "REFUND_DATASet(IvAction='09',IvGet='" + id + "')";
					oModel.read(sPath, null, null, true, function (success) {
						successCallBack(success);
					}, function (error) {
						errorCallBack(error);
					});
				},

				getRFFIN: function (path, id, successCallBack, errorCallBack) {
					var sPath = "REFUND_DATASet(IvAction='10',IvGet='" + id + "')";
					oModel.read(sPath, null, null, true, function (success) {
						successCallBack(success);
					}, function (error) {
						errorCallBack(error);
					});
				},*/

		refreshProp: function (oObject, sucessCallback, errorCallback) {
			var oJson = JSON.stringify(oObject);
			var sPath = "Refund_createDataSet";
			var oContext = {
				"IvAction": "11",
				"IvGet": oJson
			};
			oModel.create(sPath, oContext, null,
				function (objResponse) {
					sucessCallback(objResponse);
				},
				function (objResponse) {
					errorCallback(objResponse);
				});
		},

		calHours: function (oObject, sucessCallback, errorCallback) {
			var sPath = "Refund_createDataSet";
			var oJson = JSON.stringify(oObject);
			this.postData(sPath, {
					"IvAction": "22",
					"IvGet": oJson
				},
				function (objResponse) {
					sucessCallback(objResponse);
				},
				function (objResponse) {
					errorCallback(objResponse);
				});
		},

		postData: function (sPath, oContext, sucessCallback, errorCallback) {
			oModel.create(sPath, oContext, null, sucessCallback, errorCallback);
		},
		postRFApproval: function (oObject, sucessCallback, errorCallback) {
				var sPath = "Refund_createDataSet";
				var oJson = JSON.stringify(oObject);
				this.postData(sPath, {
						"IvAction": "33",
						"IvGet": oJson
					},
					function (objResponse) {
						sucessCallback(objResponse);
					},
					function (objResponse) {
						errorCallback(objResponse);
					});
			}
			//
	};
});