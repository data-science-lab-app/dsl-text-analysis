import { WordLollipop } from "./word-lollipop";
import { PluginData } from "data-science-lab-core";


describe('Word Lollipop Tests', () => {
    let lollipop: WordLollipop;

    const testingInput: {[id: string]: PluginData} = {
        'texts': {
            features: ['text'],
            examples: [['one'], ['two'], ['one two'], ['three\'s four five, six']]
        }
    };

    beforeEach(() => {
        lollipop = new WordLollipop();
    });

    it('inputs should return 1', () => {
        expect(lollipop.getInputs().inputs().length).toBe(1);
    });

    it('submit should throw for no texts', () => {
        expect(() => {
            lollipop.getInputs().submit({
            });
        }).toThrowError();
    });

    describe('after submit inputs', () => {
        beforeEach(() => {
            lollipop.getInputs().submit(testingInput);
        });

        it('no more to return false', () => {
            expect(lollipop.getOptions().noMore()).toBeFalsy();
        }); 

        it('options should return one text option', () => {
            expect(lollipop.getOptions().options().length).toBe(1);
        });

        it('option submit top', () => {
            lollipop.getOptions().submit({
                'top': 1
            });
            expect(lollipop.data.top).toBe(1);
            expect(lollipop.getOptions().noMore()).toBe(true);
        });


        it('top 6 should return words', () => {
            lollipop.getOptions().submit({
                'top': 6
            });
            const words = lollipop.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2},
                { text: 'two', size: 2},
                { text: 'three\'s', size: 1},
                { text: 'four', size: 1},
                { text: 'five', size: 1},
                { text: 'six', size: 1},
            ])
        });
        
        it('top 2 should return words', () => {
            lollipop.getOptions().submit({
                'top': 2
            });
            const words = lollipop.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2},
                { text: 'two', size: 2},
            ])
        });
        
        it('visualization should return string', () => {
            lollipop.getOptions().submit({
                'top': 1
            });
            expect(lollipop.visualization()).toBeDefined();
        });


    });


});