import React from 'react'
import {mount} from "enzyme";
import InterestList from "../src/Pages/Home/MyHomeHome/InterestList";


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

test('interest list test', () => {
    let match = {
        params: {
            uid: "1"
        }
    };
    window.sessionStorage.setItem("userId", 1);
    let app = mount(<InterestList match={match}/>);
    app.setState({loading:false});
    expect(app.find('#submitButton').length).toEqual(2);
});

test('interest list test', () => {
    let match = {
        params: {
            uid: "2"
        }
    };
    window.sessionStorage.setItem("userId", 1);
    let app = mount(<InterestList match={match}/>);
    app.setState({loading:false});
    expect(app.find('#submitButton').length).toEqual(0);
});
