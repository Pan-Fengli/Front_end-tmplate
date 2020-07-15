export function like(item) {
    if (item.hasLike) {
        item.likeNum--;
        item.hasLike = false;
    } else {
        if (item.hasDislike) {
            item.dislikeNum--;
            item.hasDislike = false;
        }
        item.likeNum++;
        item.hasLike = true;
    }
}

export function dislike(item) {
    if (item.hasDislike) {
        item.dislikeNum--;
        item.hasDislike = false;
    } else {
        if (item.hasLike) {
            item.likeNum--;
            item.hasLike = false;
        }
        item.dislikeNum++;
        item.hasDislike = true;
    }
}

export function star(item) {
    if (item.hasStar) {
        item.starNum--;
        item.hasStar = false;
    } else {
        item.starNum++;
        item.hasStar = true;
    }
}
