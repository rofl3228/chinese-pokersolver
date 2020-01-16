const Hand = require('pokersolver').Hand;

let getPoints = function (hand, type) {
    switch (type) {
        case 'top':
            if (hand.descr.indexOf("Pair") > -1) {
                if (hand.descr.indexOf("6\'s") > -1) {
                    return 1;
                } else if (hand.descr.indexOf("7\'s") > -1) {
                    return 2;
                } else if (hand.descr.indexOf("8\'s") > -1) {
                    return 3;
                } else if (hand.descr.indexOf("9\'s") > -1) {
                    return 4;
                } else if (hand.descr.indexOf("10\'s") > -1) {
                    return 5;
                }else if (hand.descr.indexOf("J\'s") > -1) {
                    return 6;
                } else if (hand.descr.indexOf("Q\'s") > -1) {
                    return 7;
                }else if (hand.descr.indexOf("K\'s") > -1) {
                    return 8;
                } else if (hand.descr.indexOf("A\'s") > -1) {
                    return 9;
                } else return 0;
            } else if (hand.descr.indexOf("Three") > -1) {
                if (hand.descr.indexOf("2\'s") > -1) {
                    return 10;
                } else if (hand.descr.indexOf("3\'s") > -1) {
                    return 11;
                } else if (hand.descr.indexOf("4\'s") > -1) {
                    return 12;
                } else if (hand.descr.indexOf("5\'s") > -1) {
                    return 13;
                } else if (hand.descr.indexOf("6\'s") > -1) {
                    return 14;
                } else if (hand.descr.indexOf("7\'s") > -1) {
                    return 15;
                } else if (hand.descr.indexOf("8\'s") > -1) {
                    return 16;
                } else if (hand.descr.indexOf("9\'s") > -1) {
                    return 17;
                } else if (hand.descr.indexOf("10\'s") > -1) {
                    return 18;
                } else if (hand.descr.indexOf("J\'s") > -1) {
                    return 19;
                } else if (hand.descr.indexOf("Q\'s") > -1) {
                    return 20;
                } else if (hand.descr.indexOf("K\'s") > -1) {
                    return 21;
                } else if (hand.descr.indexOf("A\'s") > -1) {
                    return 22;
                } else return 0;
            } else return 0;
        case 'middle':
            if (hand.descr.indexOf("Three") > -1) {
                return 2;
            } else if (hand.descr.indexOf("Straight") > -1) {
                return 4;
            } else if (hand.descr.indexOf("Flush") > -1) {
                return 8;
            } else if (hand.descr.indexOf("Full House") > -1){
                return 12;
            } else if (hand.descr.indexOf("Four of") > -1) {
                return 20;
            } else if (hand.descr.indexOf("Straight Flush") > -1) {
                return 30;
            } else if (hand.descr.indexOf("Royal Flush") > -1) {
                return 50;
            } else return 0;
        case 'bottom':
            if (hand.descr.indexOf("Straight") > -1) {
                return 2;
            } else if (hand.descr.indexOf("Flush") > -1) {
                return 4;
            } else if (hand.descr.indexOf("Full House") > -1){
                return 6;
            } else if (hand.descr.indexOf("Four of") > -1) {
                return 10;
            } else if (hand.descr.indexOf("Straight Flush") > -1) {
                return 15;
            } else if (hand.descr.indexOf("Royal Flush") > -1) {
                return 25;
            } else return 0;
        default:
            throw `Has no hand lines type: ${type}`;
    }
};

let makeHand = function (cards) {
    ['top', 'middle', 'bottom'].forEach((key) => {
        if(!cards.hasOwnProperty(key)) {
            throw `Missing ${key} hand.`
        } else {
            cards[key] = Hand.solve(cards[key]);
        }
    });
    return cards;
};

let isFouls = function (cards) {
    let topMid = Hand.winners([cards.top, cards.middle]);
    let topBot = Hand.winners([cards.top, cards.bottom]);
    let midBot = Hand.winners([cards.middle, cards.bottom]);

    if (topMid.length === 1 && topMid[0] === cards.top || topBot.length === 1 && topBot[0] === cards.top) {
        return true;
    } else if (midBot.length === 1 && midBot[0] === cards.middle) {
        return true;
    } else {
        return false;
    }
};

module.exports.compareHands = function(hands) {
    //common points
    let commonWin = [//self win                 //with p2, p3 or p1, p3 or p1, p2
        [{top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}], //p1
        [{top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}], //p2
        [{top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}], //p3
    ];

    hands.forEach((self_hand, i) => {
        let other_hands = hands.filter((o_hand, j) => { return i !== j; });

        let handFail = other_hands.map((hand) => { return isFouls(hand)});

        // console.log(handFail, i);

        other_hands.forEach((other_hand, n) => {
            ['top', 'middle', 'bottom'].forEach((key) => {
                let winner = Hand.winners([self_hand[key], other_hand[key]]);
                if (winner.length < 2) {
                    if (winner[0] === self_hand[key] && !isFouls(self_hand) || isFouls(other_hand)) {
                        // console.log(`hand ${i+1}, other hand ${n+1}, up`);
                        commonWin[i][0][key] += 1;
                        commonWin[i][n + 1][key] -= 1;
                    }
                    if (winner[0] === other_hand[key] && !isFouls(other_hand) || isFouls(self_hand)) {
                        // console.log(`hand ${i+1}, other hand ${n+1}, down`);
                        commonWin[i][0][key] -= 1;
                        commonWin[i][n + 1][key] += 1;
                    }
                }
            });
        });
    });

    // console.log('common Win \n', commonWin);

    let scupWin = [
        [0, 0, 0], //p1 win scup
        [0, 0, 0],
        [0, 0, 0]
    ];

    commonWin.forEach((player, i) => {
        [1, 2].forEach((o_index) => {
            if (player[o_index].top < 0 && player[o_index].middle < 0 && player[o_index].bottom < 0) {
                scupWin[i][0] += 3;
                scupWin[i][o_index] -= 3;
            }
            if (player[o_index].top > 0 && player[o_index].middle > 0 && player[o_index].bottom > 0) {
                scupWin[i][0] -= 3;
                scupWin[i][o_index] += 3;
            }
        });
    });

    // console.log(scupWin);

    let bonusWin = [//self win                 //with p2, p3 or p1, p3 or p1, p2
        [{top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}], //p1
        [{top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}], //p2
        [{top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}, {top: 0, middle: 0, bottom: 0}], //p3
    ];

    hands.forEach((self_hand, i) => {
        let other_hands = hands.filter((o_hand, j) => { return i !== j; });
        other_hands.forEach((o_hand, n) => {
            ['top', 'middle', 'bottom'].forEach((key) => {
                let winner = Hand.winners([self_hand[key], o_hand[key]]);

                if (winner.length < 2) {
                    if (winner[0] === self_hand[key] && !isFouls(self_hand) || (isFouls(o_hand) && !isFouls(self_hand))) {
                        // console.log(`bonus hand ${i+1}, other hand ${n+1}, up for line ${key}`);
                        if (isFouls(o_hand)) {
                            bonusWin[i][0][key] += (getPoints(self_hand[key], key));
                            bonusWin[i][n + 1][key] -= (getPoints(self_hand[key], key));
                        } else {
                            bonusWin[i][0][key] += (getPoints(self_hand[key], key) - getPoints(o_hand[key], key));
                            bonusWin[i][n + 1][key] -= (getPoints(self_hand[key], key) - getPoints(o_hand[key], key));
                        }

                    }
                    if ((winner[0] === o_hand[key] && !isFouls(o_hand)) || (isFouls(self_hand) && !isFouls(o_hand))) {
                        // console.log(`bonus hand ${i+1}, other hand ${n+1}, down`);
                        if (isFouls(self_hand)) {
                            bonusWin[i][0][key] -= (getPoints(o_hand[key], key));
                            bonusWin[i][n + 1][key] += (getPoints(o_hand[key], key));
                        } else {
                            bonusWin[i][0][key] -= (getPoints(o_hand[key], key) - getPoints(self_hand[key], key));
                            bonusWin[i][n + 1][key] += (getPoints(o_hand[key], key) - getPoints(self_hand[key], key));
                        }

                    }
                }
            });
        })
    });

    // console.log('bonus matrix\n', bonusWin);

    let result = [];

    commonWin.forEach((player, i) => {
        let resq = {
            total: commonWin[i][0].top + commonWin[i][0].middle + commonWin[i][0].bottom + scupWin[i][0] + bonusWin[i][0].top + bonusWin[i][0].middle + bonusWin[i][0].bottom,
            top: commonWin[i][0].top + bonusWin[i][0].top,
            middle: commonWin[i][0].middle + bonusWin[i][0].middle,
            bottom: commonWin[i][0].bottom + bonusWin[i][0].bottom,
            bonus: scupWin[i][0]
        };

        result.push(resq);
    });

    return result;
};

module.exports.getPoints = getPoints;
module.exports.isFouls = isFouls;
module.exports.makeHand = makeHand;