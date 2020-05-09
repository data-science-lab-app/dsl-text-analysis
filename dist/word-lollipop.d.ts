import { VisualizationPlugin, PluginInputs, PluginOptions, PluginDataInput, PluginData, Option } from 'data-science-lab-core';
interface WordLollipopData {
    texts: string[];
    seperator: string;
}
export declare class WordLollipop extends VisualizationPlugin {
    options: WordLollipopOptions;
    inputs: WordLollipopInputs;
    data: WordLollipopData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    createWords(): {
        text: string;
        size: number;
    }[];
    visualization(): string;
    setTexts(texts: string[]): void;
    setSeperator(seperator: string): void;
}
declare class WordLollipopInputs extends PluginInputs {
    WordLollipop: WordLollipop;
    constructor(WordLollipop: WordLollipop);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class WordLollipopOptions extends PluginOptions {
    WordLollipop: WordLollipop;
    state: number;
    constructor(WordLollipop: WordLollipop);
    options(): Option[];
    submit(inputs: {
        [id: string]: any;
    }): void;
    noMore(): boolean;
}
export {};
