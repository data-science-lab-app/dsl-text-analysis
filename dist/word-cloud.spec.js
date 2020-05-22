"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var word_cloud_1 = require("./word-cloud");
describe('Word Cloud Tests', function () {
    var cloud;
    var testingInput = {
        'texts': {
            features: ['text'],
            examples: [['one'], ['two'], ['one two'], ['three\'s four five, six']]
        }
    };
    beforeEach(function () {
        cloud = new word_cloud_1.WordCloud();
    });
    it('inputs should return 1', function () {
        expect(cloud.getInputs().inputs().length).toBe(1);
    });
    it('submit should throw for no texts', function () {
        expect(function () {
            cloud.getInputs().submit({});
        }).toThrowError();
    });
    describe('after submit inputs', function () {
        beforeEach(function () {
            cloud.getInputs().submit(testingInput);
        });
        it('no more to return false', function () {
            expect(cloud.getOptions().noMore()).toBeFalsy();
        });
        it('options should return one text option', function () {
            expect(cloud.getOptions().options().length).toBe(1);
        });
        it('option submit top', function () {
            cloud.getOptions().submit({
                'top': 1
            });
            expect(cloud.data.top).toBe(1);
            expect(cloud.getOptions().noMore()).toBe(true);
        });
        it('top 6 should return words', function () {
            cloud.getOptions().submit({
                'top': 6
            });
            var words = cloud.createWords();
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
            cloud.getOptions().submit({
                'top': 2
            });
            var words = cloud.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2 },
                { text: 'two', size: 2 },
            ]);
        });
        it('visualization should return string', function () {
            cloud.getOptions().submit({
                'top': 1
            });
            expect(cloud.visualization()).toBeDefined();
        });
    });
});
