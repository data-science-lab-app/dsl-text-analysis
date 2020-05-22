import { VisualizationPlugin, PluginInputs, PluginOptions, PluginDataInput, PluginData, Option } from 'data-science-lab-core';
interface WordCloudData {
    texts: string[];
    top: number;
}
export declare class WordCloud extends VisualizationPlugin {
    options: WordCloudOptions;
    inputs: WordCloudInputs;
    data: WordCloudData;
    constructor();
    getOptions(): PluginOptions;
    getInputs(): PluginInputs;
    createWords(): {
        text: string;
        size: number;
    }[];
    visualization(): string;
    setTexts(texts: string[]): void;
    setTop(top: number): void;
}
declare class WordCloudInputs extends PluginInputs {
    wordCloud: WordCloud;
    constructor(wordCloud: WordCloud);
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
    inputs(): PluginDataInput[];
}
declare class WordCloudOptions extends PluginOptions {
    wordCloud: WordCloud;
    state: number;
    constructor(wordCloud: WordCloud);
    options(): Option[];
    submit(inputs: {
        [id: string]: any;
    }): void;
    noMore(): boolean;
}
export {};
