sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"ZSPCE_RF_APRV/ZSPCE_RF_APRV/utils/dataManager",
	"ZSPCE_RF_APRV/ZSPCE_RF_APRV/utils/formatter",
	"sap/m/IconTabFilter",
	"sap/m/Text",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/ColumnListItem',
	'sap/m/Input',
	'sap/m/ObjectNumber',
	'sap/m/Label',
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/richtexteditor/RichTextEditor",
	"sap/ui/richtexteditor/EditorType",
	"sap/ui/Device"
], function (Controller, JSONModel, dataManager, formatter, IconTabFilter, Text, MessageToast, Filter, FilterOperator, ColumnListItem,
	Input, ObjectNumber, Label, Dialog, Button, RichTextEditor, EditorType, Device) {
	"use strict";

	return Controller.extend("ZSPCE_RF_APRV.ZSPCE_RF_APRV.controller.Master", {
		arrReqList: [],
		arr_attachment: [],
		arr_attachment_oth: [],
		arr_proposal1: [],
		arr_proposal2: [],
		formatter: formatter,
		onInit: function () {
			var that = this;
			var oView = that.getView();

			var oBusy = new sap.m.BusyDialog();
			oBusy.open();

			// set device model
			var deviceModel = new JSONModel({
				isNoTouch: !Device.support.touch,
				isTouch: Device.support.touch
			});
			deviceModel.setDefaultBindingMode("OneWay");
			oView.setModel(deviceModel, "device");

			dataManager.getRFList(function (response) {
					var oData = JSON.parse(response.IvJson);
					var oReqList = new JSONModel(oData);
					var oShell = that.byId("shell");
					oShell.setModel(oReqList, "oReqList");
					that.arrReqList = oData;

					var oModel = {
						ReqList: oData.length
					};
					var oCount = new JSONModel(oModel);
					oShell.setModel(oCount, "oCount");
				},
				function (error) {
					console.log("error");
				});

			that.byId("DetailPageContent").setVisible(false);
			that.byId("DetailPageMessage").setVisible(true);
			that.byId("Save").setVisible(false);

			oBusy.close();
		},

		onListF5: function () {
			var that = this;
			var oBusy = new sap.m.BusyDialog();
			oBusy.open();

			dataManager.getRFList(function (response) {
					var oData = JSON.parse(response.IvJson);
					var oReqList = new JSONModel(oData);
					var oShell = that.byId("shell");
					oShell.setModel(oReqList, "oReqList");
					that.arrReqList = oData;

					var oModel = {
						ReqList: oData.length
					};
					var oCount = new JSONModel(oModel);
					oShell.setModel(oCount, "oCount");
				},
				function (error) {
					console.log("error");
				});

			that.byId("DetailPageContent").setVisible(false);
			that.byId("DetailPageMessage").setVisible(true);
			that.byId("Save").setVisible(false);

			oBusy.close();
		},

		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {

				aFilters = new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("student12", FilterOperator.Contains, sQuery),
						new sap.ui.model.Filter("name", FilterOperator.Contains, sQuery),
						new sap.ui.model.Filter("form_date", FilterOperator.Contains, sQuery)
					],
					and: false
				});

				// var filter = new Filter("student12", FilterOperator.Contains, sQuery);
				// aFilters.push(filter);
			}
			// update list binding
			var oList = this.byId("reqList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		reqShow: function (oEvent) {
			var that = this;

			var oBusy = new sap.m.BusyDialog();
			oBusy.open();

			var desc = oEvent.getParameters().listItem.mProperties.description;
			try {
				var id = desc.split(':');
				id = id[1];
			} catch (err) {
				console.log(err);
			}

			that.arrReqList.forEach(function (item, index) {
				if (item.form_id == id) {
					// that.byId("TabBar").setSelectedKey("1");
					// that.byId("ACMTabBar").setEnabled(false);
					// that.byId("FOTabBar").setEnabled(false);
					// that.byId("CashTabBar").setEnabled(false);
					// that.byId("FITabBar").setEnabled(false);

					// that.byId("appli_date1").setEditable(false);
					// that.byId("Apr1Remarks").setEditable(false);
					// that.byId("Apr2Remarks").setEditable(false);
					// that.byId("RORemarks").setEditable(false);
					// that.byId("FIRemarks").setEditable(false);
					// that.byId("CBRORegist").setEditable(false);
					// that.byId("CBFIAppr").setEditable(false);

					// that.byId("Approve").setVisible(false);
					// that.byId("Reject").setVisible(false);
					// that.byId("Save").setVisible(false);

					//call RF
					var oShell = that.byId("shell");
					switch (item.status) {
					case "":
					case undefined:
						var approver = "ACM";

						var oModel = {
							editable: false,
							visible: true
						};
						var obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab1");

						oModel = {
							editable: true,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab2");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab3");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab4");
						break;
					case "1":
						approver = "FIN";

						var oModel = {
							editable: false,
							visible: true
						};
						var obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab1");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab2");

						oModel = {
							editable: true,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab3");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab4");
						break;
					case "2":
						approver = "CAS";

						var oModel = {
							editable: false,
							visible: true
						};
						var obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab1");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab2");

						oModel = {
							editable: true,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab3");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab4");
						break;
					case "3":
						approver = "CAS";

						var oModel = {
							editable: false,
							visible: true
						};
						var obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab1");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab2");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab3");

						oModel = {
							editable: false,
							visible: true
						};
						obj = new JSONModel(oModel);
						oShell.setModel(obj, "oTab4");
						break;
					default:
						break;
					}
					debugger;
					var dataToPost = {
						"form_id": item.form_id,
						"approver": approver
					};

					dataManager.getRF(dataToPost, function (response) {
							var oSTHeaderData = JSON.parse(JSON.parse(response.IvJson).st_header);
							var oModel = new JSONModel(oSTHeaderData);
							sap.ui.getCore().byId("Master").setModel(oModel, 'oSTHeaderData');

							switch (oSTHeaderData.status) {
							case "":
								that.byId("ACMTabBar").setEnabled(true);
								that.byId("FOTabBar").setEnabled(false);
								that.byId("CashTabBar").setEnabled(false);

								that.byId("Save").setVisible(false);
								that.byId("Approve").setVisible(true);
								that.byId("Reject").setVisible(true);

								that.byId("TabBar").setSelectedKey("2");
								break;
							case "1":
								that.byId("ACMTabBar").setEnabled(true);
								that.byId("FOTabBar").setEnabled(true);
								that.byId("CashTabBar").setEnabled(false);

								that.byId("Save").setVisible(false);
								that.byId("Approve").setVisible(true);
								that.byId("Reject").setVisible(true);

								that.byId("TabBar").setSelectedKey("3");
								break;
							case "2":
								that.byId("ACMTabBar").setEnabled(true);
								that.byId("FOTabBar").setEnabled(true);
								that.byId("CashTabBar").setEnabled(true);

								that.byId("Save").setVisible(false);
								that.byId("Approve").setVisible(true);
								that.byId("Reject").setVisible(true);

								that.byId("TabBar").setSelectedKey("4");
								break;
							case "C":
								that.byId("ACMTabBar").setEnabled(true);
								that.byId("FOTabBar").setEnabled(true);
								that.byId("CashTabBar").setEnabled(true);

								that.byId("Approve").setVisible(false);
								that.byId("Reject").setVisible(false);
								that.byId("Save").setVisible(false);

								that.byId("TabBar").setSelectedKey("4");
								break;
							default:
								that.byId("TabBar").setSelectedKey("2");
								break;
							}

							switch (that.byId("TabBar").getSelectedKey()) {
							case "1":
								dataToPost = {
									"form_id": item.form_id,
									"approver": 'INI'
								};
								dataManager.getRF(dataToPost, function (response) {
										var oData = JSON.parse(response.IvJson);
										oModel = new JSONModel(oData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

										var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
										oModel = new JSONModel(oTabData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

										var oTable = that.byId("OutstandTab");
										var oTemplate = new ColumnListItem({
											cells: [
												new Text({
													design: "Bold",
													text: "{outstandDebtTab>course_code}",
													tooltip: "{outstandDebtTab>course_code}"
												}),
												new Text({
													text: "{outstandDebtTab>course_desc}",
													tooltip: "{outstandDebtTab>course_desc}"
												}),
												new Text({
													text: "{outstandDebtTab>intake_no}"
												}),
												new ObjectNumber({
													number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
													unit: "{outstandDebtTab>waers}",
													state: "Success"
												})
											]
										});
										oTable.bindItems({
											path: "outstandDebtTab>/",
											template: oTemplate,
											templateShareable: true,
											key: "course_code"
										}).setKeyboardMode("Navigation");
									},
									function (error) {
										console.log("error");
									});
								break;
							case "2":
								dataToPost = {
									"form_id": item.form_id,
									"approver": 'ACM'
								};
								dataManager.getRF(dataToPost, function (response) {
										var oData = JSON.parse(response.IvJson);
										var oModel = new JSONModel(oData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

										var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
										oModel = new JSONModel(oTabData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

										var oTable = that.byId("ACMOutstandTab");
										var oTemplate = new ColumnListItem({
											cells: [
												new Text({
													design: "Bold",
													text: "{outstandDebtTab>course_code}",
													tooltip: "{outstandDebtTab>course_code}"
												}),
												new Text({
													text: "{outstandDebtTab>course_desc}",
													tooltip: "{outstandDebtTab>course_desc}"
												}),
												new Text({
													text: "{outstandDebtTab>intake_no}"
												}),
												new ObjectNumber({
													number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
													unit: "{outstandDebtTab>waers}",
													state: "Success"
												})
											]
										});
										oTable.bindItems({
											path: "outstandDebtTab>/",
											template: oTemplate,
											templateShareable: true,
											key: "course_code"
										}).setKeyboardMode("Navigation");
									},
									function (error) {
										console.log("error");
									});
								break;
							case "3":
								dataToPost = {
									"form_id": item.form_id,
									"approver": 'FIN'
								};
								dataManager.getRF(dataToPost, function (response) {
										var oData = JSON.parse(response.IvJson);
										var oModel = new JSONModel(oData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

										var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
										oModel = new JSONModel(oTabData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

										var oTable = that.byId("FOOutstandTab");
										var oTemplate = new ColumnListItem({
											cells: [
												new Text({
													design: "Bold",
													text: "{outstandDebtTab>course_code}",
													tooltip: "{outstandDebtTab>course_code}"
												}),
												new Text({
													text: "{outstandDebtTab>course_desc}",
													tooltip: "{outstandDebtTab>course_desc}"
												}),
												new Text({
													text: "{outstandDebtTab>intake_no}"
												}),
												new ObjectNumber({
													number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
													unit: "{outstandDebtTab>waers}",
													state: "Success"
												})
											]
										});
										oTable.bindItems({
											path: "outstandDebtTab>/",
											template: oTemplate,
											templateShareable: true,
											key: "course_code"
										}).setKeyboardMode("Navigation");
									},
									function (error) {
										console.log("error");
									});
								break;
							case "4":
								dataToPost = {
									"form_id": item.form_id,
									"approver": 'CAS'
								};
								dataManager.getRF(dataToPost, function (response) {
										var oData = JSON.parse(response.IvJson);
										var oModel = new JSONModel(oData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

										var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
										oModel = new JSONModel(oTabData);
										sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

										var oTable = that.byId("CashOutstandTab");
										var oTemplate = new ColumnListItem({
											cells: [
												new Text({
													design: "Bold",
													text: "{outstandDebtTab>course_code}",
													tooltip: "{outstandDebtTab>course_code}"
												}),
												new Text({
													text: "{outstandDebtTab>course_desc}",
													tooltip: "{outstandDebtTab>course_desc}"
												}),
												new Text({
													text: "{outstandDebtTab>intake_no}"
												}),
												new ObjectNumber({
													number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
													unit: "{outstandDebtTab>waers}",
													state: "Success"
												})
											]
										});
										oTable.bindItems({
											path: "outstandDebtTab>/",
											template: oTemplate,
											templateShareable: true,
											key: "course_code"
										}).setKeyboardMode("Navigation");
									},
									function (error) {
										console.log("error");
									});
								break;
							default:
								break;
							}

							that.byId("DetailPageContent").setVisible(true);
							that.byId("DetailPageMessage").setVisible(false);

							var oSplitContainer = that.byId("SplitContainer");
							oSplitContainer.setShowSecondaryContent(false);
							// !oSplitContainer.getShowSecondaryContent()
						},
						function (error) {
							console.log("error");
						});
					that.byId("Approve").setEnabled(true);
					that.byId("Reject").setEnabled(true);
					that.byId("Save").setEnabled(false);
				}
			});

			oBusy.close();
		},

		onSelect: function (oEvent) {
			var that = this;
			var oBusy = new sap.m.BusyDialog();
			oBusy.open();
			var oHeader = sap.ui.getCore().byId("Master").getModel("oSTHeaderData").oData;

			switch (oEvent.mParameters.selectedKey) {
			case "1":
				that.byId("Approve").setEnabled(false);
				that.byId("Reject").setEnabled(false);
				that.byId("Save").setEnabled(false);

				var dataToPost = {
					"form_id": oHeader.form_id,
					"approver": 'INI'
				};
				dataManager.getRF(dataToPost, function (response) {
						var oData = JSON.parse(response.IvJson);
						var oModel = new JSONModel(oData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

						var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
						oModel = new JSONModel(oTabData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

						var oTable = that.byId("OutstandTab");
						var oTemplate = new ColumnListItem({
							cells: [
								new Text({
									design: "Bold",
									text: "{outstandDebtTab>course_code}",
									tooltip: "{outstandDebtTab>course_code}"
								}),
								new Text({
									text: "{outstandDebtTab>course_desc}",
									tooltip: "{outstandDebtTab>course_desc}"
								}),
								new Text({
									text: "{outstandDebtTab>intake_no}"
								}),
								new ObjectNumber({
									number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
									unit: "{outstandDebtTab>waers}",
									state: "Success"
								})
							]
						});
						oTable.bindItems({
							path: "outstandDebtTab>/",
							template: oTemplate,
							templateShareable: true,
							key: "course_code"
						}).setKeyboardMode("Navigation");
					},
					function (error) {
						console.log("error");
					});
				break;
			case "2":
				switch (oHeader.status) {
				case "":
					that.byId("Approve").setEnabled(true);
					that.byId("Reject").setEnabled(true);
					break;
				default:
					that.byId("Approve").setEnabled(false);
					that.byId("Reject").setEnabled(false);
					break;
				}
				dataToPost = {
					"form_id": oHeader.form_id,
					"approver": 'ACM'
				};
				dataManager.getRF(dataToPost, function (response) {
						var oData = JSON.parse(response.IvJson);
						var oModel = new JSONModel(oData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

						var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
						oModel = new JSONModel(oTabData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

						var oTable = that.byId("ACMOutstandTab");
						var oTemplate = new ColumnListItem({
							cells: [
								new Text({
									design: "Bold",
									text: "{outstandDebtTab>course_code}",
									tooltip: "{outstandDebtTab>course_code}"
								}),
								new Text({
									text: "{outstandDebtTab>course_desc}",
									tooltip: "{outstandDebtTab>course_desc}"
								}),
								new Text({
									text: "{outstandDebtTab>intake_no}"
								}),
								new ObjectNumber({
									number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
									unit: "{outstandDebtTab>waers}",
									state: "Success"
								})
							]
						});
						oTable.bindItems({
							path: "outstandDebtTab>/",
							template: oTemplate,
							templateShareable: true,
							key: "course_code"
						}).setKeyboardMode("Navigation");
					},
					function (error) {
						console.log("error");
					});
				break;
			case "3":
				switch (oHeader.status) {
				case "1":
					that.byId("Approve").setEnabled(true);
					that.byId("Reject").setEnabled(true);
					break;
				default:
					that.byId("Approve").setEnabled(false);
					that.byId("Reject").setEnabled(false);
					break;
				}
				dataToPost = {
					"form_id": oHeader.form_id,
					"approver": 'FIN'
				};
				dataManager.getRF(dataToPost, function (response) {
						var oData = JSON.parse(response.IvJson);
						var oModel = new JSONModel(oData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

						var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
						oModel = new JSONModel(oTabData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

						var oTable = that.byId("FOOutstandTab");
						var oTemplate = new ColumnListItem({
							cells: [
								new Text({
									design: "Bold",
									text: "{outstandDebtTab>course_code}",
									tooltip: "{outstandDebtTab>course_code}"
								}),
								new Text({
									text: "{outstandDebtTab>course_desc}",
									tooltip: "{outstandDebtTab>course_desc}"
								}),
								new Text({
									text: "{outstandDebtTab>intake_no}"
								}),
								new ObjectNumber({
									number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
									unit: "{outstandDebtTab>waers}",
									state: "Success"
								})
							]
						});
						oTable.bindItems({
							path: "outstandDebtTab>/",
							template: oTemplate,
							templateShareable: true,
							key: "course_code"
						}).setKeyboardMode("Navigation");
					},
					function (error) {
						console.log("error");
					});
				break;

			case "4":
				// that.byId("Approve").setVisible(false);
				// that.byId("Reject").setVisible(false);
				// that.byId("Save").setVisible(true);
				switch (oHeader.appr_lvl) {
				case "2":
					that.byId("Approve").setEnabled(false);
					that.byId("Reject").setEnabled(false);
					// that.byId("Save").setEnabled(true);
					break;
				default:
					that.byId("Approve").setEnabled(false);
					that.byId("Reject").setEnabled(false);
					that.byId("Save").setEnabled(false);
					break;
				}
				dataToPost = {
					"form_id": oHeader.form_id,
					"approver": 'CAS'
				};
				dataManager.getRF(dataToPost, function (response) {
						var oData = JSON.parse(response.IvJson);
						var oModel = new JSONModel(oData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');

						var oTabData = JSON.parse(JSON.parse(response.IvJson).outstand_debt);
						oModel = new JSONModel(oTabData);
						sap.ui.getCore().byId("Master").setModel(oModel, 'outstandDebtTab');

						var oTable = that.byId("CashOutstandTab");
						var oTemplate = new ColumnListItem({
							cells: [
								new Text({
									design: "Bold",
									text: "{outstandDebtTab>course_code}",
									tooltip: "{outstandDebtTab>course_code}"
								}),
								new Text({
									text: "{outstandDebtTab>course_desc}",
									tooltip: "{outstandDebtTab>course_desc}"
								}),
								new Text({
									text: "{outstandDebtTab>intake_no}"
								}),
								new ObjectNumber({
									number: "{ parts: [{ path: 'outstandDebtTab>betrw' }, { path: '' }], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: true } }",
									unit: "{outstandDebtTab>waers}",
									state: "Success"
								})
							]
						});
						oTable.bindItems({
							path: "outstandDebtTab>/",
							template: oTemplate,
							templateShareable: true,
							key: "course_code"
						}).setKeyboardMode("Navigation");
					},
					function (error) {
						console.log("error");
					});
				break;
			default:
				break;
			}

			oBusy.close();
		},

		handleToggleSecondaryContent: function (oEvent) {
			var oSplitContainer = this.byId("SplitContainer");
			oSplitContainer.setShowSecondaryContent(!oSplitContainer.getShowSecondaryContent());
		},

		b64toBlob: function (b64Data, contentType, sliceSize) {
			contentType = contentType || '';
			sliceSize = sliceSize || 512;
			var byteCharacters = atob(b64Data);
			var byteArrays = [];
			for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				var slice = byteCharacters.slice(offset, offset + sliceSize);
				var byteNumbers = new Array(slice.length);
				for (var i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}
				var byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			}
			var blob = new Blob(byteArrays, {
				type: contentType
			});
			return blob;
		},
		UploadedFileShow: function (oEvent) {
			var that = this;
			var selectedFile = oEvent.getParameters().listItem.mProperties.title;
			that.arr_attachment.forEach(function (item, index) {
				if (item.filename === selectedFile) {
					if (that.arr_attachment[index].mimetype.toLowerCase() === 'jpeg' || that.arr_attachment[index].mimetype.toLowerCase() ===
						'jpg') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'image/jpeg');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment[index].mimetype.toLowerCase() === 'pdf') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'application/pdf');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment[index].mimetype.toLowerCase() === 'png') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'image/png');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment[index].mimetype.toLowerCase() === 'xls' || that.arr_attachment[index].mimetype.toLowerCase() ===
						'xlsx') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'application/vnd.ms-excel');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment[index].mimetype.toLowerCase() === 'doc' || that.arr_attachment[index].mimetype.toLowerCase() ===
						'docx') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'application/msword');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment[index].mimetype.toLowerCase() === 'ppt') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'application/vnd.ms-powerpoint');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment[index].mimetype.toLowerCase() === 'txt') {
						var blob = that.b64toBlob(that.arr_attachment[index].value, 'text/plain');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					}
				}
			});
		},
		oth_UploadedFileShow: function (oEvent) {
			var that = this;
			var selectedFile = oEvent.getParameters().listItem.mProperties.title;
			that.arr_attachment_oth.forEach(function (item, index) {
				if (item.filename === selectedFile) {
					if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'jpeg' || that.arr_attachment_oth[index].mimetype.toLowerCase() ===
						'jpg') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'image/jpeg');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'pdf') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'application/pdf');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'png') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'image/png');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'xls' || that.arr_attachment_oth[index].mimetype.toLowerCase() ===
						'xlsx') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'application/vnd.ms-excel');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'doc' || that.arr_attachment_oth[index].mimetype.toLowerCase() ===
						'docx') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'application/msword');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'ppt') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'application/vnd.ms-powerpoint');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					} else if (that.arr_attachment_oth[index].mimetype.toLowerCase() === 'txt') {
						var blob = that.b64toBlob(that.arr_attachment_oth[index].value, 'text/plain');
						var blobUrl = URL.createObjectURL(blob);
						window.open(blobUrl);
					}
				}
			});
		},
		validateEventFeedbackForm: function (requiredTextarea) {
			var _self = this;
			var valid = true;

			requiredTextarea.forEach(function (textarea) {
				var sInput = _self.getView().byId(textarea);
				if (sInput.getValue() == "" || sInput.getValue() == undefined) {
					valid = false;
					sInput.setValueState("Warning");
				} else {
					sInput.setValueState("None");
				}
			});
			return valid;
		},
		onAction: function (oEvent) {
			var that = this;

			var oAction = oEvent.getSource();
			var btnID = oAction.getId();

			switch (btnID) {
			case "Master--Approve":
				var action = "Approve";
				var status = "X";
				break;
			case "Master--Reject":
				action = "Reject";
				status = "0";
				break;
			case "Master--Save":
				action = "Save";
				/*switch (that.byId("TabBar").getSelectedKey()) {
				case "4":
					switch (that.getView().byId("CBRORegist").getSelected()) {
					case true:
						status = "X";
						break;
					case false:
						status = "0";
						break;
					default:
						break;
					}
					break;
				case "5":
					switch (that.getView().byId("CBFIAppr").getSelected()) {
					case true:
						status = "X";
						break;
					case false:
						status = "0";
						break;
					default:
						break;
					}
					break;
				}*/
				break;
			default:
				break;
			}

			//var headerData = sap.ui.getCore().byId('Master').getModel('oSTHeaderData').oData;
			switch (that.byId("TabBar").getSelectedKey()) {
			case "2":
				var dataToPost = sap.ui.getCore().byId('Master').getModel('oWithdrawal').oData;
				break;
			case "3":
				dataToPost = sap.ui.getCore().byId('Master').getModel('oWithdrawal').oData;
				break;
			case "4":
				dataToPost = sap.ui.getCore().byId('Master').getModel('oWithdrawal').oData;
				break;
			default:
				break;
			}
			dataToPost.status = status;

			/*var passedValidation = that.validateEventFeedbackForm(requiredTextarea);
			if (passedValidation === false) {
				MessageToast.show("Remarks required.");
				return false;
			}*/

			var message = "Do you want to " + action + " Application?";
			debugger;
			var dialog = new Dialog({
				title: action + " SPCE Fee Refund",
				type: "Message",
				state: "Warning",
				content: [
					new Label({
						text: message
					})
				],
				beginButton: new Button({
					type: sap.m.ButtonType.Emphasized,
					text: "Yes",
					press: function () {
						var oBusy = new sap.m.BusyDialog();
						oBusy.open();

						dataManager.postRFApproval(dataToPost,
							function (response) {
								switch (JSON.parse(response.IvJson).msg_typ) {
								case "S":
									sap.m.MessageBox.show(JSON.parse(response.IvJson).msg, {
										icon: sap.m.MessageBox.Icon.SUCCESS,
										title: "Success",
										actions: [sap.m.MessageBox.Action.CLOSE],
										onClose: function (oAction) {}
									});

									dataManager.getRFList(function (response) {
											var oData = JSON.parse(response.IvJson);
											var oReqList = new JSONModel(oData);
											var oShell = that.byId("shell");
											oShell.setModel(oReqList, "oReqList");
											that.arrReqList = oData;

											var oModel = {
												ReqList: oData.length
											};
											var oCount = new JSONModel(oModel);
											oShell.setModel(oCount, "oCount");
										},
										function (error) {
											console.log("error");
										});

									that.byId("DetailPageContent").setVisible(false);
									that.byId("DetailPageMessage").setVisible(true);
									that.byId("Save").setVisible(false);

									var oSplitContainer = that.byId("SplitContainer");
									oSplitContainer.setShowSecondaryContent(true);

									break;
								case "E":
									sap.m.MessageBox.show(JSON.parse(response.IvJson).msg, {
										icon: sap.m.MessageBox.Icon.ERROR,
										title: "Error",
										actions: [sap.m.MessageBox.Action.CLOSE],
										onClose: function (oAction) {}
									});
									break;
								default:
									break;
								}
								oBusy.close();
							},
							function (response) {
								oBusy.close();
								// MessageToast.show('OData Failed!');
								sap.m.MessageBox.show(response.message, {
									icon: sap.m.MessageBox.Icon.ERROR,
									title: "Error",
									actions: [sap.m.MessageBox.Action.CLOSE],
									onClose: function (oAction) {}
								});

							});
						//
						dialog.close();
					}

				}),
				endButton: new Button({
					text: "No",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			dialog.open();

			// MessageToast.show("Pressed: " + btnID);
		},

		onCashDesk: function (oEvent) {
			window.open(
				"https://kurak.ucentralasia.org:8200/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled#CACashJournal-display",
				"_blank");
		},

		onSetEmail: function (oEvent) {
			var that = this;

			// that.byId("editor").setVisible(true);

			var HeaderData = sap.ui.getCore().byId("Master").getModel("RFHeader").oData;

			var sHtmlValue =
				"<p>Dear <i><b>" + HeaderData.st_name + "</b></i>,</p>" +
				"[Email content here!]<br><br>" +
				"<span>Regards,</span><br>" +
				"<span><b>UCA</b></span>";

			// sap.ui.getCore().byId("MailContent").setValue(sHtmlValue);
		},

		onF4RFType: function (oEvent) {
			window.helpinput = oEvent.getParameters().id;

			var oCols = function () {
				return [
					new sap.m.Column({
						hAlign: "Left",
						header: new sap.m.Label({
							text: "Type Code"
						})
					}),
					new sap.m.Column({
						hAlign: "Left",
						header: new sap.m.Label({
							text: "Type Name"
						})
					})
				];
			};

			var oTabDialog = new sap.m.TableSelectDialog("", {
				title: "Select Refund Type",
				noDataText: "No Records Found",
				contentWidth: "20%",
				contentHeight: "25%",
				draggable: true,
				growingThreshold: 5,
				search: function (oEvent) {
					var sValue = oEvent.mParameters.value;
					var oFilter = new sap.ui.model.Filter('type', sap.ui.model.FilterOperator.Contains, sValue);
					var oBinding = oEvent.getSource().getBinding("items");
					oBinding.filter([oFilter]);
					if (oBinding.aIndices.length == 0) {
						var oFilter = new sap.ui.model.Filter('type_t', sap.ui.model.FilterOperator.Contains, sValue);
						var oBinding = oEvent.getSource().getBinding("items");
						oBinding.filter([oFilter]);
					}
					if (sValue === "") {
						oBinding.filter([]);
					}
				},
				liveChange: function (oEvent) {
					var sValue = oEvent.mParameters.value;
					var oFilter = new sap.ui.model.Filter('type', sap.ui.model.FilterOperator.Contains, sValue);
					var oBinding = oEvent.getSource().getBinding("items");
					oBinding.filter([oFilter]);
					if (oBinding.aIndices.length == 0) {
						var oFilter = new sap.ui.model.Filter('type_t', sap.ui.model.FilterOperator.Contains, sValue);
						var oBinding = oEvent.getSource().getBinding("items");
						oBinding.filter([oFilter]);
					}
					if (sValue === "") {
						oBinding.filter([]);
					}
				},
				columns: [oCols()]
			});

			var oItemTemplate = new sap.m.ColumnListItem({
				type: "Active",
				unread: false,
				cells: [
					new sap.m.Label({
						text: "{type}"
					}),
					new sap.m.Label({
						text: "{type_t}"
					})
				]
			});

			var oModel = new sap.ui.model.json.JSONModel();
			var oData = [{
				"type": "1",
				"type_t": "Tuition Refund"
			}, {
				"type": "2",
				"type_t": "Exam Refund"
			}];

			oModel.setData(oData);
			oTabDialog.setModel(oModel);
			oTabDialog.bindAggregation("items", "/", oItemTemplate);

			// attach confirm listener
			oTabDialog.attachConfirm(function (oEvent) {
				var selectedItem = oEvent.getParameter("selectedItem");
				if (selectedItem) {
					//Get all the cells and pull back the first one which will be the name content
					var oCells = selectedItem.getCells();
					//Now update the input with the value
					sap.ui.getCore().byId(window.helpinput).setValue(oCells[0].getText());

					var oBusy = new sap.m.BusyDialog();
					oBusy.open();

					var dataToPost = sap.ui.getCore().byId('main').getModel('oWithdrawal').oData;
					dataManager.onRFType(dataToPost,
						function (response) {
							var oData = JSON.parse(response.IvJson);
							var oModel = new JSONModel(oData);
							sap.ui.getCore().byId("main").setModel(oModel, 'oWithdrawal');

							switch (oData.is_rf_entit) {
							case 'X':
								var oCntrl = sap.ui.getCore().byId("main").byId("stReq");
								oCntrl.setEnabled(true);
								break;
							default:
								var oCntrl = sap.ui.getCore().byId("main").byId("stReq");
								oCntrl.setEnabled(false);
								break;
							}
						},
						function (error) {
							console.log("error");
						});
					oBusy.close();
				}
			});
			oTabDialog.open();
		},

		onHoursCal: function (oEvent) {
				var oBusy = new sap.m.BusyDialog();
				oBusy.open();

				var dataToPost = sap.ui.getCore().byId('Master').getModel('oWithdrawal').oData;

				dataToPost.msg_typ = '';
				dataToPost.msg = '';

				dataManager.calHours(dataToPost,
					function (response) {
						var oData = JSON.parse(response.IvJson);
						switch (oData.msg_typ) {
						case "S":
							var oShell = sap.ui.getCore().byId('Shell');

							var oData = JSON.parse(response.IvJson);
							var oModel = new JSONModel(oData);
							sap.ui.getCore().byId("Master").setModel(oModel, 'oWithdrawal');
							break;
						default:
							break;
						}

					},
					function (error) {
						console.log("error");
					});
				oBusy.close();
			}
			//
	});
});