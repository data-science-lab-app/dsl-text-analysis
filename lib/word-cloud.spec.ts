import { WordCloud } from "./word-cloud";
import { PluginData } from "data-science-lab-core";



describe('Word Cloud Tests', () => {
    let cloud: WordCloud;

    const testingInput: {[id: string]: PluginData} = {
        'texts': {
            features: ['text'],
            examples: [['one'], ['two'], ['one two'], ['three,four']]
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

        it('option submit seperator', () => {
            cloud.getOptions().submit({
                'seperator': ','
            });
            expect(cloud.data.seperator).toBe(',');
            expect(cloud.getOptions().noMore()).toBe(true);
        });

        it('option without seperator should be space', () => {
            cloud.getOptions().submit({
            });
            expect(cloud.data.seperator).toBe(' ');
            expect(cloud.getOptions().noMore()).toBe(true);
        });

        it('space seperartor should return words', () => {
            cloud.getOptions().submit({
            });
            const words = cloud.createWords();
            expect(words).toEqual([
                { text: 'one', size: 2},
                { text: 'two', size: 2},
                { text: 'three,four', size: 1},
            ])
        });
        
        it('comma seperartor should return words', () => {
            cloud.getOptions().submit({
                'seperator': ','
            });
            const words = cloud.createWords();
            expect(words).toEqual([
                { text: 'one', size: 1},
                { text: 'two', size: 1},
                { text: 'one two', size: 1},
                { text: 'three', size: 1},
                { text: 'four', size: 1},
            ])
        });

        it('visualization should return string', () => {
            cloud.getOptions().submit({
                'seperator': ','
            });
            expect(cloud.visualization()).toBeDefined();
        });


    });


});