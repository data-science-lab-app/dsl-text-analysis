import { AlgorithmPlugin, PluginInputs, PluginOptions, Option, PluginData, PluginDataInput } from "data-science-lab-core";
interface NaiveBayesBinaryClassifierInput {
    examples: string[];
    labels: number[];
    smoothFactor: number;
    positiveTest: number;
    negativeTest: number;
    tokens: string[];
    positiveTokens: {
        [token: string]: number;
    };
    negativeTokens: {
        [token: string]: number;
    };
}
export declare class NaiveBayesBinaryClassifier extends AlgorithmPlugin {
    options: NaiveBayesBinaryClassifierOptions;
    inputs: NaiveBayesBinaryClassifierInputs;
    data: NaiveBayesBinaryClassifierInput;
    constructor();
    getInputs(): NaiveBayesBinaryClassifierInputs;
    getOptions(): NaiveBayesBinaryClassifierOptions;
    export(): Promise<string>;
    import(json: string, _: boolean): Promise<this>;
    step(): Promise<void>;
    tokenize(text: string): Set<string>;
    initialize(): void;
    probabilities(token: string): {
        positive: number;
        negative: number;
    };
    test(argument: {
        [id: string]: any[];
    }): {
        [id: string]: any[];
    };
    getTestingInputs(): {
        input: PluginDataInput[];
        output?: PluginDataInput[];
    };
    finishTraining(): boolean;
    setSmoothFactor(factor: number): void;
    setInput(examples: string[]): void;
    setOutput(labels: number[]): void;
}
declare class NaiveBayesBinaryClassifierInputs extends PluginInputs {
    classifier: NaiveBayesBinaryClassifier;
    constructor(classifier: NaiveBayesBinaryClassifier);
    inputs(): PluginDataInput[];
    submit(inputs: {
        [id: string]: PluginData;
    }): void;
}
declare class NaiveBayesBinaryClassifierOptions extends PluginOptions {
    classifier: NaiveBayesBinaryClassifier;
    state: number;
    constructor(classifier: NaiveBayesBinaryClassifier);
    options(): Option[];
    submit(inputs: {
        [id: string]: any;
    }): void;
    noMore(): boolean;
}
export {};
