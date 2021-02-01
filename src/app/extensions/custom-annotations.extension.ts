import * as Dashboard from 'devexpress-dashboard'
import * as Model from 'devexpress-dashboard/model'
import * as Designer from 'devexpress-dashboard/designer'
import dxForm, { dxFormOptions } from 'devextreme/ui/form';
import dxPopup from 'devextreme/ui/popup';
import dxButton from 'devextreme/ui/button';


// 1. Model
var ChartAnnotationsProperty: Model.CustomPropertyMetadata = {
    ownerType: Model.ChartItem,
    propertyName: 'ChartAnnotationsSettings',
    defaultValue: "",
    valueType: 'string'
};

Model.registerCustomProperty(ChartAnnotationsProperty);

// 2. Viewer
function onItemWidgetOptionsPrepared(args) {
    if (args.dashboardItem instanceof Model.ChartItem) {
        var customText = args.dashboardItem.customProperties.getValue(ChartAnnotationsProperty.propertyName);

        if (customText !== "") {
            args.options.tooltip = {
                enabled: true,
                contentTemplate: function (info, container) {
                    $(customText).appendTo(container);
                }
            }
        }

    }
}

// 3. Designer
function onCustomizeSections(args) {
    var chartItem = args.dashboardItem;
    if (chartItem instanceof Model.ChartItem) {
        args.addSection({
            title: "Información Adicional",
            items: [
                {
                    dataField: ChartAnnotationsProperty.propertyName,
                    template: function (args, element) {
                        var buttonContainer = document.createElement('div');
                        new dxButton(buttonContainer, {
                            text: 'Editar',
                            onClick: function () {
                                showPopup(chartItem)
                            }
                        })
                        return buttonContainer;
                    },
                    label: {
                        visible: false,
                    }
                }
            ]
        });
    }
}

function showPopup(chartItem) {
    var popupContainer = document.createElement('div');
    document.body.appendChild(popupContainer);
    var popupOptions = {
        width: '1040px',
        height: 'auto',
        closeOnOutsideClick: false,
        contentTemplate: function (contentContainer) {
            var formContainer = document.createElement('div');
            var formOptions = getFormOptions(chartItem);
            this._form = new dxForm(formContainer, formOptions);
            return formContainer;
        },
        onHidden: function () {
            document.body.removeChild(popupContainer)
        },
        title: 'Información Adicional',
    };
    var popup = new dxPopup(popupContainer, popupOptions);
    popup.show();
}

function getValue(chartItem) {
    return chartItem.customProperties.getValue(ChartAnnotationsProperty.propertyName)
}
function setValue(chartItem, value) {
    return chartItem.customProperties.setValue(ChartAnnotationsProperty.propertyName, value)
}


function getFormOptions(chartItem) {
    var updateFormState = function (form) {
        var valueEditor = form.getEditor('customEditor');
    };
    return <dxFormOptions>{
        formData: getValue(chartItem) || null,
        colCount: 1,
        labelLocation: 'top',
        items: [
            {
                dataField: 'customEditor',
                editorType: "dxHtmlEditor",
                label: {
                    text: 'Texto Enriquecido',
                },
                editorOptions: {
                    height: 350,
                    toolbar: {
                        items: [
                            "undo", "redo", "separator",
                            {
                                formatName: "size",
                                formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                            },
                            {
                                formatName: "font",
                                formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                            },
                            "separator", "bold", "italic", "underline", "separator",
                            "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                            "orderedList", "bulletList", "separator",
                            {
                                formatName: "header",
                                formatValues: [false, 1, 2, 3, 4, 5]
                            }, "separator",
                            "color", "background", "separator",
                            "link", "image", "separator",
                            "clear", "codeBlock", "blockquote"
                        ]
                    },
                    onValueChanged: function (e) {
                        setValue(chartItem, e.component.option("value"))
                        // $(".value-content").text(e.component.option("value"));
                    }
                }
            }
        ],
        onContentReady: function (e) { updateFormState(e.component) },
        onFieldDataChanged: function (e) {
            // var formData = e.component.option("formData");
            var constantLines = getValue(chartItem);
            setValue(chartItem, constantLines);
        },
    };
}

// 4. Event Subscription
export class ChartAnnotationsExtension {
    name = 'ChartAnnotations';

    constructor(private dashboardControl: Dashboard.DashboardControl) {
    }

    start() {
        var viewerApiExtension = <Dashboard.ViewerApiExtension>this.dashboardControl.findExtension('viewer-api');
        if (viewerApiExtension) {
            viewerApiExtension.on('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared)
        }
        var optionsPanelExtension = <Designer.OptionsPanelExtension>this.dashboardControl.findExtension("item-options-panel")
        if (optionsPanelExtension) {
            optionsPanelExtension.on('customizeSections', onCustomizeSections)
        }
    }
    stop() {
        var viewerApiExtension = <Dashboard.ViewerApiExtension>this.dashboardControl.findExtension('viewer-api');
        if (viewerApiExtension) {
            viewerApiExtension.off('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared)
        }
        var optionsPanelExtension = <Designer.OptionsPanelExtension>this.dashboardControl.findExtension("item-options-panel")
        if (optionsPanelExtension) {
            optionsPanelExtension.off('customizeSections', onCustomizeSections)
        }
    }
}