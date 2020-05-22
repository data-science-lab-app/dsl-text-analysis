import { WordCloud } from "./word-cloud";
import { PluginData } from "data-science-lab-core";



describe('Word Cloud Tests', () => {
    let cloud: WordCloud;

    const testingInput: {[id: string]: PluginData} = {
        'texts': {
            features: ['text'],
            examples: [['one'], ['two'], ['one two'], ['three\'s four five, six']]
        }
    };

    beforeEach(() => {
        cloud = new WordCloud();
    });

    it('inputs should return 1', () => {
        expect(cloud.getInputs().inputs().length).toBe(1);
    });

    it('submit should throw for no texts', () => {
        expect(() => {
            cloud.getInputs().submit({
            });
        }).toThrowError();
    });

    describe('after submit inputs', () => {
        beforeEach(() => {
            cloud.getInputs().submit(testingInput);
        });

        it('no more to return false', () => {
            expect(cloud.getOptions().noMore()).toBeFalsy();
        }); 

        it('options should return one text option', () => {
            expect(cloud.getOptions().options().length).toBe(1);
        });

        it('option submit top', () => {
            cloud.getOptions().submit({
                'top': 1
            });
            expect(cloud.data.top).toBe(1);
            expect(cloud.getOptions().noMore()).toBe(true);
        });


        it('top 6 should return words', () => {
            cloud.getOptions().submit({
                'top': 6
            });
            const words = cloud.createWords();
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
            cloud.getOptions().submit({
                'top': 2
            });
            const words = cloud.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2},
                { text: 'two', size: 2},
            ])
        });
        
        it('visualization should return string', () => {
            cloud.getOptions().submit({
                'top': 1
            });
            expect(cloud.visualization()).toBeDefined();
        });


    });


});