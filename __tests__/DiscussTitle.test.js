import React from 'react';
import {mount} from "enzyme";
import DiscussTitle from "../src/Pages/Home/DiscussHome/Components/DiscussTitle";

let discuss = {
    commentNum: 1,
    content: "this is a test discuss",
    dislikeNum: 0,
    hasDislike: false,
    hasLike: false,
    hasStar: false,
    id: 1,
    likeNum: 2,
    starNum: 0,
    tabList: [],
    time: "2020-07-16T08:07:23.000+00:00",
    title: "test",
    user: {
        id: 1,
        username: "user1",
        icon: ""
    }
};

describe('A test in discuss detail page', function () {
    it('should not show comment when user state is not 0', function () {
        sessionStorage.setItem('userState','0');
        let wrapper = mount(<DiscussTitle discuss={discuss}/>);
        expect(wrapper.find('#add_comment').exists()).toBe(true);
        sessionStorage.setItem('userState','1');
        let wrapper1 = mount(<DiscussTitle discuss={discuss}/>);
        expect(wrapper1.find('#add_comment').exists()).toBe(false);
    });
    it('should call comment now when click comment', function () {
        let commentNow=jest.fn();
        sessionStorage.setItem('userState','0');
        let wrapper = mount(<DiscussTitle discuss={discuss} commentNow={commentNow}/>);
        wrapper.find('#add_comment').simulate('click');
        expect(commentNow).toBeCalled();
    });
});
