import React from 'react';
import {mount} from "enzyme";
import ReplyEditor from "../src/Pages/Home/DiscussHome/Components/ReplyEditor";

describe('test reply editor componnent', function () {
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
    it('should set state when input text is change', function () {
        let wrapper = mount(<ReplyEditor/>);
        let textArea = wrapper.find('#reply_input');
        textArea.at(0).simulate('change', {target: {value: "a reply"}});
        expect(wrapper.state("replyText")).toEqual("a reply");
    });
    it('should submit the reply when click the button', function () {
        let addReply = jest.fn();
        let wrapper = mount(<ReplyEditor addReply={addReply}/>);
        wrapper.find('#submit_button').at(0).simulate('click');
        expect(addReply).toBeCalledTimes(0);
        wrapper.setState({replyText:"a reply"});
        wrapper.find('#submit_button').at(0).simulate('click');
        expect(addReply).toBeCalled();
    });
});
