const Hand = require('pokersolver').Hand;
const getPoints = require('./helper').getPoints;
const compareHands = require('./helper').compareHands;
const compareThreeHands = require('./helper').compareThreeHands;
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

    if (hands.length === 2) {
        result = compareHands(hands);
        return result;
    } else {
        result = compareThreeHands(hands);
        return result;
    }
};

exports.getPoints = getPoints;
