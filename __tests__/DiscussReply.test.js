import React from 'react';
import DiscussReply from "../src/Pages/Home/DiscussHome/Components/DiscussReply";
import {mount} from "enzyme";

const reply = {
    content: "a test reply",
    id: 1,
    time: "2020-07-18T10:08:23.000+00:00",
    user: {
        icon: null,
        id: 1,
        username: "user1"
    },
    toUser: {
        icon: null,
        id: 2,
        username: "user2"
    }
};
let deleteReply = jest.fn();
describe('A test in reply component', function () {
    beforeEach(function () {
        window.matchMedia = window.matchMedia || function () {
            return {
                matches: false,
                addListener: function () {
                },
                removeListener: function () {
                }
            };
        };
    });
    afterEach(function () {
        sessionStorage.clear();
    });
    it('should show reply when user state is 0', function () {
        sessionStorage.setItem('userState', '0');
        const wrapper = mount(<DiscussReply reply={reply}/>);
        expect(wrapper.find('#reply_add').exists()).toBe(true);
    });
    it('should not show reply when user state is not 0', function () {
        sessionStorage.setItem('userState', '1');
        const wrapper = mount(<DiscussReply reply={reply}/>);
        expect(wrapper.find('#reply_add').exists()).toBe(false);
    });
    it('should flip the state replyNow when click reply', function () {
        sessionStorage.setItem('userState', '0');
        const wrapper = mount(<DiscussReply reply={reply}/>);
        wrapper.find('#reply_add').simulate('click');
        expect(wrapper.state('replyNow')).toBe(true);
        wrapper.find('#reply_add').simulate('click');
        expect(wrapper.state('replyNow')).toBe(false);
    });
    it('should not show delete when user is not admin or publisher of reply', function () {
        sessionStorage.setItem('userRoot', '1');
        sessionStorage.setItem('userId','2');
        let wrapper = mount(<DiscussReply reply={reply}/>);
        expect(wrapper.find('#reply_delete').exists()).toBe(true);
        sessionStorage.setItem('userRoot','0');
        wrapper = mount(<DiscussReply reply={reply}/>);
        expect(wrapper.find('#reply_delete').exists()).toBe(false);
        sessionStorage.setItem('userId','1');
        wrapper = mount(<DiscussReply reply={reply}/>);
        expect(wrapper.find('#reply_delete').exists()).toBe(true);
    });
    it('should use call back function replyDelete', function () {
        sessionStorage.setItem('userRoot', '1');
        const wrapper = mount(<DiscussReply reply={reply} deleteReply={deleteReply}/>);
        wrapper.find('#reply_delete').simulate('click');
        expect(deleteReply).toBeCalled();
    });
});
