//检测组件是否可见

export default function checkVisible(node) {
    if (!(node.offsetHeight || node.offsetWidth || node.getClientRects().length)) {
        return false;
    }
    // 获取元素的高度和元素顶部相对视口的距离
    const {height, top} = node.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight || window.innerHeight;
    // 只需要确定元素顶部相对视口左上角的垂直距离小于视口的高度且元素底部相对视口左上角的垂直距离
    // 大于0
    return (top < windowHeight) && (top + height > 0)
}
