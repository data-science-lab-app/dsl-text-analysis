"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var word_lollipop_1 = require("./word-lollipop");
describe('Word Lollipop Tests', function () {
    var lollipop;
    var testingInput = {
        'texts': {
            features: ['text'],
            examples: [['one'], ['two'], ['one two'], ['three\'s four five, six']]
        }
    };
    beforeEach(function () {
        lollipop = new word_lollipop_1.WordLollipop();
    });
    it('inputs should return 1', function () {
        expect(lollipop.getInputs().inputs().length).toBe(1);
    });
    it('submit should throw for no texts', function () {
        expect(function () {
            lollipop.getInputs().submit({});
        }).toThrowError();
    });
    describe('after submit inputs', function () {
        beforeEach(function () {
            lollipop.getInputs().submit(testingInput);
        });
        it('no more to return false', function () {
            expect(lollipop.getOptions().noMore()).toBeFalsy();
        });
        it('options should return one text option', function () {
            expect(lollipop.getOptions().options().length).toBe(1);
        });
        it('option submit top', function () {
            lollipop.getOptions().submit({
                'top': 1
            });
            expect(lollipop.data.top).toBe(1);
            expect(lollipop.getOptions().noMore()).toBe(true);
        });
        it('top 6 should return words', function () {
            lollipop.getOptions().submit({
                'top': 6
            });
            var words = lollipop.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2 },
                { text: 'two', size: 2 },
                { text: 'three\'s', size: 1 },
                { text: 'four', size: 1 },
                { text: 'five', size: 1 },
                { text: 'six', size: 1 },
            ]);
        });
        it('top 2 should return words', function () {
            lollipop.getOptions().submit({
                'top': 2
            });
            var words = lollipop.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2 },
                { text: 'two', size: 2 },
            ]);
        });
        it('visualization should return string', function () {
            lollipop.getOptions().submit({
                'top': 1
            });
            expect(lollipop.visualization()).toBeDefined();
        });
    });
});
