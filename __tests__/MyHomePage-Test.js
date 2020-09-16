import React from 'react'
import {mount, shallow} from "enzyme";
import MyHome from "../src/Pages/Home/MyHomeHome/MyHome";

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        }
    };
};

function storageMock() {
    let storage = {};

    return {
        setItem: function (key, value) {
            storage[key] = value || '';
        },
        getItem: function (key) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function (key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function (i) {
            const keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

window.sessionStorage = storageMock();

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            result: true,
            username: "niujunhui",
        })
    }));

test("homePage test", () => {
    let match = {
        params: {
            uid: "1"
        }
    }
    window.sessionStorage.setItem("userId", 1);
    let app = shallow(<MyHome match={match}/>);
    expect(app.find('Button').text()).toEqual('修改资料');
    app.find('Button').simulate('click');
    expect(app.find('Button').text()).toEqual('提交修改');
});

test("homePage test 2", () => {
    let match = {
        params: {
            uid: "2"
        }
    }
    jest.mock('../src/Pages/Home/MyHomeHome/MyHome')
    window.sessionStorage.setItem("userId", 1);
    let app = mount(<MyHome match={match}/>);
    expect(app.find('Button').at(0).text()).toEqual("关 注");
    app.setState({follow: true});
    expect(app.find('Button').at(0).text()).toEqual('取消关注');
});

test('test fetch', () => {
    fetch('url', {}).then((rsp) => rsp.json().then(rsp => {
        console.log(rsp)
    }));
});
