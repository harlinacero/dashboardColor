
import { GANTT_CHART_ICON } from "./icon";
import { GanttChartItem } from "./gantt-viewer";
import { GANTT_CHART_EXTENSION_NAME, ganttChartMeta } from './meta';

export class GantChartItemExtension {
    name = GANTT_CHART_EXTENSION_NAME;
    metaData = ganttChartMeta;
    // icon = '<svg id="funnelChartItemIcon" viewBox="0 0 24 24"><path stroke="#ffffff" fill="#f442ae" d="M12 2 L2 22 L22 22 Z" /></svg>';
    constructor(dashboardControl) {
        dashboardControl.registerIcon(GANTT_CHART_ICON);
    }

    createViewerItem(model, element, content) {
        return new GanttChartItem(model, element, content);
    }
}