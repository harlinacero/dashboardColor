var ChartCustomLabelExtension = (function () {
    var Model = DevExpress.Dashboard.Model;

    // 1. Model
    var customLabelProperty = {
        ownerType: Model.ChartItem,
        propertyName: 'CustomLabel',
        defaultValue: true,
        valueType: 'boolean'
    };

    Model.registerCustomProperty(customLabelProperty);

    // 2. Viewer
    function onItemWidgetOptionsPrepared(args) {
        if (args.dashboardItem instanceof Model.ChartItem) {
            var customLabel = args.dashboardItem.customProperties.getValue(customLabelProperty.propertyName);

            if (customLabel) {
                args.options.series.forEach((series, index) => {
                    series.label = {
                        visible: true,
                        customizeText: function (argument) {
                            return DevExpress.localization.formatNumber(argument.value, "currency");
                        }
                    };
                });
            }
        }
    };

    // 3. Designer
    function onCustomizeSections(args) {
        args.addSection({
            title: "Custom Label (Custom)",
            items: [
                {
                    dataField: customLabelProperty.propertyName,
                    editorType: "dxCheckBox",
                    label: {
                        visible: false
                    },
                    editorOptions: {
                        text: "Enable Custom Label"
                    },
                    template: function (data, element) {
                        var btn = $("<div/>");

                        btn.dxButton({
                            text: "Test",
                            onClick: function () {
                                var currentValue = args.dashboardItem.customProperties.getValue(customLabelProperty.propertyName);

                                args.dashboardItem.customProperties.setValue(customLabelProperty.propertyName, !currentValue);
                            }
                        });

                        btn.appendTo(element);
                    }
                }
            ]
        });
    };
    // 4. Event Subscription
    function ChartCustomLabelExtension(dashboardControl) {
        this.name = "CustomLabel",
        this.start = function () {
            var viewerApiExtension = dashboardControl.findExtension('viewer-api');
            if (viewerApiExtension) {
                viewerApiExtension.on('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
            }
            var optionsPanelExtension = dashboardControl.findExtension("item-options-panel");
            if (optionsPanelExtension) {
                optionsPanelExtension.on('customizeSections', onCustomizeSections);
            }
        },
        this.stop = function () {
            var viewerApiExtension = dashboardControl.findExtension('viewer-api');
            if (viewerApiExtension) {
                viewerApiExtension.off('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
            }
            var optionsPanelExtension = dashboardControl.findExtension("item-options-panel");
            if (optionsPanelExtension) {
                optionsPanelExtension.off('customizeSections', onCustomizeSections);
            }
        }
    }
    return ChartCustomLabelExtension;

}());


module.exports = {
    ChartCustomLabelExtension: ChartCustomLabelExtension
  };