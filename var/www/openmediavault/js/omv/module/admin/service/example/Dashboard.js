Ext.define('OMV.module.admin.service.example.Dashboard', {
    extend: 'OMV.workspace.form.Panel',
    
    // This path tells which RPC module and methods this panel will call to get 
    // and fetch its form values.
    rpcService: 'Example',
    rpcGetMethod: 'getDashboard',

    initComponent : function() {
        this.on("afterrender", function() {
            var me = this;
            var parent = this.up("tabpanel");

            if (!parent) {
                return;
            }

            var dashboardPanel = parent.down("panel[title=" + _("Dashboard") + "]");
            var examplePanel = parent.down("panel[title=" + _("Example") + "]");
            var checked = examplePanel.findField("enable").checked

            if(dashboardPanel){
                if(!checked){
                    parent.setActiveTab(examplePanel);
                }
            }

        }, this);

        this.callParent(arguments);
    },
    
    // getFormItems is a method which is automatically called in the 
    // instantiation of the panel. This method returns all fields for 
    // the panel.
    getFormItems: function() {
        return [{
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield. 
            xtype: 'fieldset',
            title: _('General'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [{
                xtype: 'checkbox',
                // The name option is sent together with is value to RPC
                // and is also used when fetching from the RPC.
                name: 'set',
                fieldLabel: _('Set'),
                // checked sets the default value of a checkbox.
                checked: false
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: "dashboard",
    path: "/service/example",
    text: _("Dashboard"),
    position: 10,
    className: "OMV.module.admin.service.example.Dashboard"
});