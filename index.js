const Hand = require('pokersolver').Hand;
const getPoints = require('./helper').getPoints;
const compareHands = require('./helper').compareHands;
const isFous = require('./helper').isFouls;
const makeHand = require('./helper').makeHand;

exports.makeHand = makeHand;

exports.solve = function (cards) {
    return Hand.solve(cards);
};

exports.isFouls = isFous;

exports.calculate = function (hands) {
    let result = [];
    if (hands.length < 2) {
        throw "Not enough hands to calculate, expect 2 or 3"
    }

    if (hands.length > 3) {
        throw "Too many hands to calculate, expect 2 or 3"
    }

    hands.forEach((hand) => {
        hand = makeHand(hand);
    });

    result = compareHands(hands);

    if (hands.length === 2) {
        result = [result[0], result[1]];
    }
    return result;
};

exports.getPoints = getPoints;
