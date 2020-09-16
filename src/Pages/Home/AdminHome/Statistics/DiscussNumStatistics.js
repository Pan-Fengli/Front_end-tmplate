import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {postFetch} from "../../../../Functions/fetchRequest";

class DiscussNumStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeData: [],
            numData: [],
            loading: true,
            updated: false,
        };
    }

    fetchData() {
        postFetch('/admin/discussNum', {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
        }, (rsp) => {
            let myChart = echarts.init(document.getElementById('chartOfDiscuss'));
            let list1 = [], list2 = [];
            for (let i = 0; i < rsp.length; i++) {
                list1.push(rsp[i].num);
                list2.push(rsp[i].time.slice(0, 10));
            }
            this.setState({
                timeData: list2,
                numData: list1,
                loading: false,
            });
            if (!this.state.updated) {
                myChart.setOption({
                    title: {text: '日讨论数'},
                    tooltip: {},
                    xAxis: {
                        type: "category",
                        data: this.state.timeData
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: [{
                        name: '数量',
                        type: 'line',
                        data: this.state.numData
                    }]
                });
                this.setState({updated: true});
            }
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.startTime !== prevProps.startTime || this.props.endTime !== prevProps.endTime) {
            this.setState({
                timeData: [],
                numData: [],
                loading: true,
                updated: false,
            });
            this.fetchData();
        }
    }


    render() {
        return (
            <div id="chartOfDiscuss" style={{width: "90%", height: 600}}/>
        );
    }
}

export default DiscussNumStatistics;
