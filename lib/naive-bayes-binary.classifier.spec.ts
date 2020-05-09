import { NaiveBayesBinaryClassifier } from './naive-bayes-binary.classifier';
import { PluginData } from 'data-science-lab-core';

describe('Naive Bayes Binary Classifier Tests', () => {
    let classifier: NaiveBayesBinaryClassifier;

    const testingInput: { [id: string]: PluginData } = {
        'input': {
            features: ['text'],
            examples: [['spam rules'], ['ham rules'], ['hello ham']]
        },
        'label': {
            features: ['is spam'],
            examples: [[1], [0], [0]]
        },
    }

    beforeEach(() => {
        classifier = new NaiveBayesBinaryClassifier();
    });

    it('inputs will return two inputs', () => {
        const inputs = classifier.getInputs().inputs();
        expect(inputs.length).toBe(2);
    });

    it('inputs should throw for no input', () => {
        expect(() => {
            classifier.getInputs().submit({
                'label': {
                    features: [],
                    examples: []
                }
            });
        }).toThrowError();
    });

    it('inputs should throw for no label', () => {
        expect(() => {
            classifier.getInputs().submit({
                'input': {
                    features: [],
                    examples: []
                }
            });
        }).toThrowError();
    });

    it('options should return one option', () => {
        expect(classifier.getOptions().options().length).toBe(1);
    });

    it('options should return false', () => {
        expect(classifier.getOptions().noMore()).toBeFalsy();
    });

    it('options should be done for submit', () => {
        classifier.getOptions().submit({ ['smooth']: 0.5 });
        expect(classifier.getOptions().noMore()).toBeTruthy();
    });

    describe('after setup', () => {
        beforeEach(() => {
            classifier.getInputs().submit(testingInput);
            classifier.getOptions().submit({ ['smooth']: 0.5 });
            classifier.initialize();
        });

        it('classifier should be finish trining', () => {
            classifier.finishTraining();
        });

        it('tokenizes should split text', () => {
            const set = classifier.tokenize("abc   word's temp another's. things.");
            expect(Array.from(set)).toEqual(['abc', 'word\'s', "temp", "another's", "things"]);
        });

        it('after initial should have the correct data', () => {
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

        it('hello spam should return positive', () => {
            const outcome = classifier.test({
                'input': ['hello spam']
            });
            expect(outcome).toEqual({
                'output': [1]
            })
        });
        

        it('spam rules should return positive', () => {
            const outcome = classifier.test({
                'input': ['spam rules']
            });
            expect(outcome).toEqual({
                'output': [1]
            })
        });
        

        it('ham rules should return negative', () => {
            const outcome = classifier.test({
                'input': ['ham rules']
            });
            expect(outcome).toEqual({
                'output': [0]
            })
        });
        

        it('hello ham should return negative', () => {
            const outcome = classifier.test({
                'input': ['hello ham']
            });
            expect(outcome).toEqual({
                'output': [0]
            })
        });
        

    });
});
