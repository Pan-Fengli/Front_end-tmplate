import React from 'react';
import {mount} from "enzyme";
import DiscussComment from "../src/Pages/Home/DiscussHome/Components/DiscussComment";

const comment = {
    content: "this is a test comment",
    dislikeNum: 0,
    hasDislike: false,
    hasLike: false,
    id: 1,
    likeNum: 2,
    time: "2020-07-15T09:07:23.000+00:00",
    user: {
        id: 1,
        username: "user1",
        icon: ""
    }
};
const reply = {
    content: "a test reply",
    id: 1,
    time: "2020-07-18T10:08:23.000+00:00",
    user: {
        icon: null,
        id: 2,
        username: "user2"
    },
    toUser: {
        icon: null,
        id: 1,
        username: "user1"
    }
};
let like = jest.fn();
describe('A test in comment component', function () {
    afterEach(function () {
        sessionStorage.clear();
    });
    beforeEach(() => {
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
    it('should show delete comment when user is admin or publisher', function () {
        sessionStorage.setItem('userRoot', '1');
        sessionStorage.setItem('userId', '2');
        const wrapper = mount(<DiscussComment comment={comment}/>);
        expect(wrapper.find('#delete_comment').exists()).toBe(true);
        sessionStorage.setItem('userRoot', '0');
        const wrapper2 = mount(<DiscussComment comment={comment}/>);
        expect(wrapper2.find('#delete_comment').exists()).toBe(false);
    });
    it('should call like function in props with proper param', function () {
        const wrapper = mount(<DiscussComment comment={comment} like={like} index={1}/>);
        wrapper.find('#like_comment').simulate('click');
        expect(like).toBeCalled();
        expect(like).toHaveBeenCalledWith(1, true);
        wrapper.find('#dislike_comment').simulate('click');
        expect(like).toBeCalled();
        expect(like).toHaveBeenCalledWith(1, false);
    });
    it('should show replies when click show reply', function () {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([reply])
            }));
        let wrapper = mount(<DiscussComment comment={comment}/>);
        wrapper.find('#show_replies').simulate('click');
        expect(global.fetch).toBeCalled();
        global.fetch.mockClear();
    });
    it('should show editor when click write Reply', function () {
        sessionStorage.setItem('userState', 0);
        let wrapper = mount(<DiscussComment comment={comment}/>);
        expect(wrapper.find('#reply_editor').exists()).toBe(false);
        wrapper.setState({writeReply: true});
        expect(wrapper.find('#reply_editor').exists()).toBe(true);
    });
});
