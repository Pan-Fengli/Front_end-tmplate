import React from 'react'
import LogInPage from "../src/Pages/LogInPage";
import {mount} from "enzyme";

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        }
    };
};

test("password input test", () => {
    let app = mount(<LogInPage/>);
    expect(app.state("PW")).toEqual('');
    let input = app.find('#pwInput').at(2);
    input.simulate('change', {target: {value: "123456"}});
    expect(app.state("PW")).toEqual('123456');
});

test("email input test",()=>{
    let app = mount(<LogInPage/>);
    expect(app.state("email")).toEqual('');
    let input = app.find('#emailInput').at(2);
    input.simulate('change', {target: {value: "niujunhui@sjtu.edu.cn"}});
    expect(app.state("email")).toEqual('niujunhui@sjtu.edu.cn');
});
