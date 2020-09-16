import React from 'react'
import RegisterPage from "../src/Pages/RegisterPage";
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

test("email input test", () => {
    let app = mount(<RegisterPage/>);
    expect(app.state("email")).toEqual('');
    let input = app.find('#emailInput').at(2);
    input.simulate('change', {target: {value: "niujunhui@sjtu.edu.cn"}});
    expect(app.state("email")).toEqual('niujunhui@sjtu.edu.cn');
});

test("phone number input test", () => {
    let app = mount(<RegisterPage/>);
    expect(app.state("phonenumber")).toEqual('');
    let input = app.find('#numberInput').at(2);
    input.simulate('change', {target: {value: "18621600626"}});
    expect(app.state("phonenumber")).toEqual('18621600626');
});

test("nickname input test", () => {
    let app = mount(<RegisterPage/>);
    expect(app.state("nickname")).toEqual('');
    let input = app.find('#nameInput').at(2);
    input.simulate('change', {target: {value: "niujunhui"}});
    expect(app.state("nickname")).toEqual('niujunhui');
});


test("pw input test4", () => {
    let app = mount(<RegisterPage/>);
    expect(app.state("PW")).toEqual('');
    let input1 = app.find('#pw1').at(3);
    let input2 = app.find('#pw2').at(3);
    input1.simulate('change', {target: {value: "123456"}});
    expect(app.state("PW")).toEqual('');
    input2.simulate('change', {target: {value: "123456"}});
    expect(app.state("PW")).toEqual("123456");
});

