import React from 'react';
import DiscussNumStatistics from "./Statistics/DiscussNumStatistics";
import UserRegisterStatistics from "./Statistics/UserRegisterStatistics";
import {DatePicker} from "antd";
import 'antd/dist/antd.css';
import "../../../Functions/date.format";

const {RangePicker} = DatePicker;


export default class DateSelector extends React.Component {
    constructor(props) {
        super(props);
        const day1 = new Date(), day2 = new Date();
        day1.setDate(day1.getDay() - 7);
        this.state = {
            content: null,
            startTime: day1.format('Y-m-d'),
            endTime: day2.format('Y-m-d'),
        };
    }

    timeChange = (date, time) => {
        this.setState({
            startTime: time[0].slice(0, 10),
            endTime: time[1].slice(0, 10)
        })
    };

    render() {
        let type = this.props.match.params.type;
        let startT = this.state.startTime.toString(), endT = this.state.endTime.toString();
        let subPage;
        switch (type) {
            case "discussStatistics":
                subPage = <DiscussNumStatistics startTime={startT} endTime={endT}/>
                break;
            case "registerStatistics":
                subPage = <UserRegisterStatistics startTime={startT} endTime={endT}/>
                break;
            default:
                return;
        }
        return (
            <div>
                <RangePicker onChange={this.timeChange}/>
                <br/>
                {subPage}
            </div>
        );
    }
}
