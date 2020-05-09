"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var word_lollipop_1 = require("./word-lollipop");
describe('Word Lollipop Tests', function () {
    var cloud;
    var testingInput = {
        'texts': {
            features: ['text'],
            examples: [['one'], ['two'], ['one two'], ['three,four']]
        }
    };
    beforeEach(function () {
        cloud = new word_lollipop_1.WordLollipop();
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
        it('option submit seperator', function () {
            cloud.getOptions().submit({
                'seperator': ','
            });
            expect(cloud.data.seperator).toBe(',');
            expect(cloud.getOptions().noMore()).toBe(true);
        });
        it('option without seperator should be space', function () {
            cloud.getOptions().submit({});
            expect(cloud.data.seperator).toBe(' ');
            expect(cloud.getOptions().noMore()).toBe(true);
        });
        it('space seperartor should return words', function () {
            cloud.getOptions().submit({});
            var words = cloud.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2 },
                { text: 'two', size: 2 },
                { text: 'three,four', size: 1 },
            ]);
        });
        it('comma seperartor should return words', function () {
            cloud.getOptions().submit({
                'seperator': ','
            });
            var words = cloud.createWords();
            expect(words).toEqual([
                { text: 'one', size: 1 },
                { text: 'two', size: 1 },
                { text: 'one two', size: 1 },
                { text: 'three', size: 1 },
                { text: 'four', size: 1 },
            ]);
        });
        it('visualization should return string', function () {
            cloud.getOptions().submit({
                'seperator': ','
            });
            expect(cloud.visualization()).toBeDefined();
        });
    });
});
