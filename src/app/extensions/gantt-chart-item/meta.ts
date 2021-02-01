import { ICustomItemMetaData, CustomItem } from 'devexpress-dashboard/model';
import { FormItemTemplates } from 'devexpress-dashboard/designer';

export const GANTT_CHART_EXTENSION_NAME = 'GanttChart';
export const ganttChartMeta: ICustomItemMetaData = {
    bindings: [{
        propertyName: 'Values',
        dataItemType: 'Measure',
        array: true,
        enableColoring: true,
        displayName: 'Valores',
        emptyPlaceholder: 'Añadir Valor',
        selectedPlaceholder: 'Configurar el Valor'
    }, {
        propertyName: 'Arguments',
        dataItemType: 'Dimension',
        array: true,
        enableInteractivity: true,
        enableColoring: true,
        displayName: 'Argumentos',
        emptyPlaceholder: 'Añadir Argumento',
        selectedPlaceholder: 'Configurar el Argumento'
    }],
    customProperties: [
        {
            ownerType: CustomItem,
            propertyName: 'scaleType',
            valueType: 'string',
            defaultValue: 'auto'
        },
        {
            ownerType: CustomItem,
            propertyName: 'inverted',
            valueType: 'boolean',
            defaultValue: false,
        }, {
            ownerType: CustomItem,
            propertyName: 'useSpiderWeb',
            valueType: 'boolean',
            defaultValue: false,
        }, {
            ownerType: CustomItem,
            propertyName: 'startAngle',
            valueType: 'number',
            defaultValue: 0,
        }, {
            ownerType: CustomItem,
            propertyName: 'tickInterval',
            valueType: 'number',
            defaultValue: 50,
        },
        {
            ownerType: CustomItem,
            propertyName: 'legendVisible',
            valueType: 'string',
            defaultValue: true,
        },
        {
            ownerType: CustomItem,
            propertyName: 'verticalAlignment',
            valueType: 'string',
            defaultValue: 'top',
        },
        {
            ownerType: CustomItem,
            propertyName: 'horizontalAlignment',
            valueType: 'string',
            defaultValue: 'center',
        }
    ],
    optionsPanelSections: [{
        title: 'Diseño',
        items: [
            {
                dataField: 'scaleType',
                label: {
                    text: 'Escala de Tiempo'
                },
                editorType: 'dxSelectBox',
                editorOptions: {
                    items: [
                        'auto',
                        'minutes',
                        'hours',
                        'days',
                        'weeks',
                        'months',
                        'quarters',
                        'years'
                    ]
                }
            }]
    }],
    interactivity: {
        filter: true,
        drillDown: true
    },
    icon: GANTT_CHART_EXTENSION_NAME,
    title: 'Gant Chart',
    index: 3
};
