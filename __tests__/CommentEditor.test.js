import React from 'react';
import {mount} from "enzyme";
import CommentEditor from "../src/Pages/Home/DiscussHome/Components/CommentEditor";

describe('A test for comment editor', function () {
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
    it('should ', function () {
        const wrapper = mount(<CommentEditor/>);
        wrapper.find('#comment_input').at(0).simulate('change', {target:{value:"a comment"}});
        // expect(wrapper.state('commentState')).toEqual('a comment');
    });
    it('should ', function () {
        let addComment = jest.fn();
        const wrapper = mount(<CommentEditor addComment={addComment}/>);
        wrapper.find("#submit_button").at(0).simulate('click');
        expect(addComment).toBeCalledTimes(0);
        // wrapper.setState({commentState: "<p>a comment</p>"});
        // wrapper.find("#submit_button").at(0).simulate('click');
        // expect(addComment).toBeCalled();
    });
});
