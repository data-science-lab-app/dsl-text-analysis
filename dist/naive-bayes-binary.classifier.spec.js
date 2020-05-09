"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var naive_bayes_binary_classifier_1 = require("./naive-bayes-binary.classifier");
describe('Naive Bayes Binary Classifier Tests', function () {
    var classifier;
    var testingInput = {
        'input': {
            features: ['text'],
            examples: [['spam rules'], ['ham rules'], ['hello ham']]
        },
        'label': {
            features: ['is spam'],
            examples: [[1], [0], [0]]
        },
    };
    beforeEach(function () {
        classifier = new naive_bayes_binary_classifier_1.NaiveBayesBinaryClassifier();
    });
    it('inputs will return two inputs', function () {
        var inputs = classifier.getInputs().inputs();
        expect(inputs.length).toBe(2);
    });
    it('inputs should throw for no input', function () {
        expect(function () {
            classifier.getInputs().submit({
                'label': {
                    features: [],
                    examples: []
                }
            });
        }).toThrowError();
    });
    it('inputs should throw for no label', function () {
        expect(function () {
            classifier.getInputs().submit({
                'input': {
                    features: [],
                    examples: []
                }
            });
        }).toThrowError();
    });
    it('options should return one option', function () {
        expect(classifier.getOptions().options().length).toBe(1);
    });
    it('options should return false', function () {
        expect(classifier.getOptions().noMore()).toBeFalsy();
    });
    it('options should be done for submit', function () {
        var _a;
        classifier.getOptions().submit((_a = {}, _a['smooth'] = 0.5, _a));
        expect(classifier.getOptions().noMore()).toBeTruthy();
    });
    describe('after setup', function () {
        beforeEach(function () {
            var _a;
            classifier.getInputs().submit(testingInput);
            classifier.getOptions().submit((_a = {}, _a['smooth'] = 0.5, _a));
            classifier.initialize();
        });
        it('classifier should be finish trining', function () {
            classifier.finishTraining();
        });
        it('tokenizes should split text', function () {
            var set = classifier.tokenize("abc   word's temp another's. things.");
            expect(Array.from(set)).toEqual(['abc', 'word\'s', "temp", "another's", "things"]);
        });
        it('after initial should have the correct data', function () {
            expect(classifier.data.smoothFactor).toBe(0.5);
            expect(classifier.data.positiveTokens).toEqual({
                'spam': 1, 'rules': 1
            });
            expect(classifier.data.positiveTest).toBe(1);
            expect(classifier.data.negativeTokens).toEqual({
                'ham': 2, 'rules': 1, 'hello': 1
            });
            expect(classifier.data.negativeTest).toBe(2);
        });
        it('hello spam should return positive', function () {
            var outcome = classifier.test({
                'input': ['hello spam']
            });
            expect(outcome).toEqual({
                'output': [1]
            });
        });
        it('spam rules should return positive', function () {
            var outcome = classifier.test({
                'input': ['spam rules']
            });
            expect(outcome).toEqual({
                'output': [1]
            });
        });
        it('ham rules should return negative', function () {
            var outcome = classifier.test({
                'input': ['ham rules']
            });
            expect(outcome).toEqual({
                'output': [0]
            });
        });
        it('hello ham should return negative', function () {
            var outcome = classifier.test({
                'input': ['hello ham']
            });
            expect(outcome).toEqual({
                'output': [0]
            });
        });
    });
});
