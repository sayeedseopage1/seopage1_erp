import React from "react";
import GridLayout from "react-grid-layout";
import ConversionGraph from "./ConversionGraph";

import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
    { i: "blue-eyes-dragon", x: 0, y: 0, w: 20, h: 20 },
    { i: "dark-magician", x: 20, y: 0, w: 20, h: 20 },
    { i: "kuriboh", x: 46, y: 0, w: 20, h: 20 },
    { i: "spell-caster", x: 3, y: 0, w: 1, h: 1 },
    { i: "summoned-skull", x: 4, y: 0, w: 1, h: 1 },
];

class DashboardGridLayout extends React.Component {
    render() {
        return (
            <div className="" style={{ overflow: "hidden" }}>
                <ResponsiveGridLayout
                    className="layout"
                    width={1000}
                    breakpoints={{
                        lg: 1200,
                        md: 996,
                        sm: 768,
                        xs: 480,
                        xxs: 0,
                    }}
                    cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
                    rowHeight={300}
                    layouts={layout}
                >
                    <ConversionGraph key="blue-eyes-dragon" />
                    <ConversionGraph key="dark-magician" />
                    <ConversionGraph key="kuriboh" />
                    <ConversionGraph key="spell-caster" />
                    <ConversionGraph key="summoned-skull" />
                </ResponsiveGridLayout>
            </div>
        );
    }
}

export default DashboardGridLayout;
