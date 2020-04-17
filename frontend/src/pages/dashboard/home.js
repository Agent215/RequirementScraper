import React from "react";
import LoadingState from "../../reducers/loadingState";
import {Alert, Col, Container, Jumbotron, Row, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import {fetchStatistics} from "../../actions/statistics";
import {ResponsivePie} from "@nivo/pie";
import {ResponsiveBar} from "@nivo/bar";
import {Themes} from "../../reducers/theme";

class Courses extends React.Component {

    componentDidMount() {
        if (this.props.statistics.loaded === LoadingState.NOT_LOADED)
            this.props.fetchStatistics(this.props.user.user_id);
    }

    render() {
        if (this.props.statistics.loaded === LoadingState.NOT_LOADED) return this.loading();
        if (this.props.statistics.loaded === LoadingState.LOADING) return this.loading();
        if (this.props.statistics.loaded === LoadingState.LOADED) return this.loaded();
        if (this.props.statistics.loaded === LoadingState.ERRORED) return this.error();
    }

    loading() {
        return <div id="loading">
            <div id="loading-inner" className="text-center">
                <Spinner id="spinner" animation="border"/>
                <h2>Fetching your statistics...</h2>
                <p>
                    If you have two factor authentication enabled on your Temple account, you may either get
                    a push notification, phone call, or text message. Make sure to complete this verification step
                    or else we cannot retrieve your data.
                </p>
            </div>
        </div>
    }

    loaded() {
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        const statistics = this.props.statistics.statistics;
        const textColor = this.props.theme.dark ? "#EEEEEE" : "#333333";
        const background = this.props.theme.dark ? "#333333" : "#EEEEEE";
        const color = this.props.theme.primary === Themes.Cherry ? "#9e1b34" : "#006270";
        return <>
            <Jumbotron className={bg}>
                <h1>Dashboard</h1>
                <p>
                    Welcome to your GRAV (Graduation Review Auditor Visualizer) dashboard where you can view your
                    progress toward your degree in a clean, user-friendly interface. Below you can view statistics
                    related to your progress toward your degree. Up at the top menu you can find links to your course
                    list, requirements, and a way to edit your GRAV profile including updating your password and deleting
                    your data.
                </p>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col style={{height: 500}}>
                        <ResponsiveBar
                            data={statistics.gpa}
                            indexBy={"index"}
                            keys={['GPA']}
                            margin={{top: 50, right: 130, bottom: 50, left: 60}}
                            padding={0.3}
                            colors={[color]}
                            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                            axisTop={null}
                            axisRight={null}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'GPA',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            theme={{
                                "axis": {
                                    "domain": {"line": {"strokeWidth": 0, "stroke": textColor}},
                                    "ticks": {
                                        "line": {"strokeWidth": 1, "stroke": textColor},
                                        "text": {"fill": textColor, "fontSize": 11}
                                    },
                                    "legend": {"text": {"fill": textColor, "fontSize": 13, "fontWeight": 500}}
                                },
                                "grid": {"line": {"stroke": textColor}},
                                "legends": {"text": {"fontSize": 12, "fill": textColor}},
                                "tooltip": {
                                    "container": {
                                        "fontSize": "13px",
                                        "background": background,
                                        "color": textColor
                                    }
                                },
                                "labels": {"text": {"fill": textColor, "fontSize": 12, "fontWeight": 500}},
                                "dots": {"text": {"fill": textColor, "fontSize": 12}},
                                "annotations": {
                                    "text": {
                                        "fill": textColor,
                                        "outlineWidth": 3,
                                        "outlineColor": "#0e1317"
                                    },
                                    "link": {"stroke": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"},
                                    "outline": {"stroke": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"},
                                    "symbol": {"fill": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"}
                                }
                            }}
                            minValue={0}
                            maxValue={4}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor="#ffffff"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </Col>
                    <Col style={{height: 500}}>
                        <ResponsivePie
                            data={statistics.requirements}
                            margin={{top: 40, right: 80, bottom: 80, left: 80}}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colors={["#28a745", "#17a2b8", "#dc3545"]}
                            borderWidth={1}
                            borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                            radialLabel="label"
                            radialLabelsSkipAngle={10}
                            radialLabelsTextXOffset={6}
                            radialLabelsTextColor={textColor}
                            radialLabelsLinkOffset={0}
                            radialLabelsLinkDiagonalLength={16}
                            radialLabelsLinkHorizontalLength={24}
                            radialLabelsLinkStrokeWidth={1}
                            radialLabelsLinkColor={{from: 'color'}}
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#333333"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            theme={{
                                "axis": {
                                    "domain": {"line": {"strokeWidth": 0, "stroke": textColor}},
                                    "ticks": {
                                        "line": {"strokeWidth": 1, "stroke": textColor},
                                        "text": {"fill": textColor, "fontSize": 11}
                                    },
                                    "legend": {"text": {"fill": textColor, "fontSize": 13, "fontWeight": 500}}
                                },
                                "grid": {"line": {"stroke": textColor}},
                                "legends": {"text": {"fontSize": 12, "fill": textColor}},
                                "tooltip": {
                                    "container": {
                                        "fontSize": "13px",
                                        "background": background,
                                        "color": textColor
                                    }
                                },
                                "labels": {"text": {"fill": textColor, "fontSize": 12, "fontWeight": 500}},
                                "dots": {"text": {"fill": textColor, "fontSize": 12}},
                                "annotations": {
                                    "text": {
                                        "fill": textColor,
                                        "outlineWidth": 3,
                                        "outlineColor": "#0e1317"
                                    },
                                    "link": {"stroke": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"},
                                    "outline": {"stroke": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"},
                                    "symbol": {"fill": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"}
                                }
                            }}
                            defs={[
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                },
                                {
                                    id: 'squares',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    stagger: true
                                }
                            ]}
                            fill={[
                                {
                                    match: {
                                        id: 'inProgress'
                                    },
                                    id: 'square'
                                },
                                {
                                    match: {
                                        id: 'incomplete'
                                    },
                                    id: 'lines'
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    translateY: 56,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </Col>
                    <Col style={{height: 500}}>
                        <ResponsivePie
                            data={statistics.credits}
                            margin={{top: 40, right: 80, bottom: 80, left: 80}}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            colors={["#28a745", "#17a2b8", "#dc3545"]}
                            borderWidth={1}
                            borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                            radialLabel="label"
                            radialLabelsSkipAngle={10}
                            radialLabelsTextXOffset={6}
                            radialLabelsTextColor={textColor}
                            radialLabelsLinkOffset={0}
                            radialLabelsLinkDiagonalLength={16}
                            radialLabelsLinkHorizontalLength={24}
                            radialLabelsLinkStrokeWidth={1}
                            radialLabelsLinkColor={{from: 'color'}}
                            slicesLabelsSkipAngle={10}
                            slicesLabelsTextColor="#333333"
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                            theme={{
                                "axis": {
                                    "domain": {"line": {"strokeWidth": 0, "stroke": textColor}},
                                    "ticks": {
                                        "line": {"strokeWidth": 1, "stroke": textColor},
                                        "text": {"fill": textColor, "fontSize": 11}
                                    },
                                    "legend": {"text": {"fill": textColor, "fontSize": 13, "fontWeight": 500}}
                                },
                                "grid": {"line": {"stroke": textColor}},
                                "legends": {"text": {"fontSize": 12, "fill": textColor}},
                                "tooltip": {
                                    "container": {
                                        "fontSize": "13px",
                                        "background": background,
                                        "color": textColor
                                    }
                                },
                                "labels": {"text": {"fill": textColor, "fontSize": 12, "fontWeight": 500}},
                                "dots": {"text": {"fill": textColor, "fontSize": 12}},
                                "annotations": {
                                    "text": {
                                        "fill": textColor,
                                        "outlineWidth": 3,
                                        "outlineColor": "#0e1317"
                                    },
                                    "link": {"stroke": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"},
                                    "outline": {"stroke": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"},
                                    "symbol": {"fill": textColor, "outlineWidth": 2, "outlineColor": "#0e1317"}
                                }
                            }}
                            defs={[
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                },
                                {
                                    id: 'squares',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    stagger: true
                                }
                            ]}
                            fill={[
                                {
                                    match: {
                                        id: 'registered'
                                    },
                                    id: 'square'
                                },
                                {
                                    match: {
                                        id: 'remaining'
                                    },
                                    id: 'lines'
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    translateY: 56,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    data: 'label',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    }

    error() {
        return <Alert variant="danger">
            <Alert.Heading>Oh no!</Alert.Heading>
            <p>
                Failed to fetch your degree statistics
            </p>
        </Alert>
    }
}

export default connect(({user, statistics, theme}) => ({user, statistics, theme}), {fetchStatistics})(Courses);