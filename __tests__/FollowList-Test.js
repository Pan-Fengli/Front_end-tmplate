import React from 'react'
import Followlist from "../src/Pages/Home/MyHomeHome/Followlist";
import {mount, shallow} from "enzyme";

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
        json: () => Promise.resolve()
    }));


test("follow list test", () => {
    let match = {
        params: {
            uid: "1"
        }
    }
    let data = [
        {
            "id": 1,
            "username": "user1",
            "icon": null,
            "intro": null,
            "email": "5@qq.com"
        },
        {
            "id": 2,
            "username": "user2",
            "icon": null,
            "intro": null,
            "email": "5@qq.com"
        }
    ];
    let app = mount(<Followlist match={match}/>);
    expect(app.find('Item').length).toEqual(0);
    app.setState({data: data});
    expect(app.find('Item').length).toEqual(2);
});
