sap.ui.define(["sap/ui/test/Opa5"],function(e){"use strict";var s="Master";e.createPageObjects({onTheAppPage:{actions:{},assertions:{iShouldSeeTheApp:function(){return this.waitFor({id:"app",viewName:s,success:function(){e.assert.ok(true,"The Master view is displayed")},errorMessage:"Did not find the Master view"})}}}})});