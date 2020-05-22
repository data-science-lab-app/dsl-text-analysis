import { AlgorithmPlugin, PluginInputs, PluginOptions, Option, PluginData, PluginDataInput, NumberOption } from "data-science-lab-core";

interface NaiveBayesBinaryClassifierInput {
    examples: string[];
    labels: number[];
    smoothFactor: number;
    positiveTest: number;
    negativeTest: number;
    tokens: string[];
    positiveTokens: { [token: string]: number };
    negativeTokens: { [token: string]: number };
}

export class NaiveBayesBinaryClassifier extends AlgorithmPlugin {
    options: NaiveBayesBinaryClassifierOptions;
    inputs: NaiveBayesBinaryClassifierInputs;

    data: NaiveBayesBinaryClassifierInput;

    constructor() {
        super();

        this.options = new NaiveBayesBinaryClassifierOptions(this);
        this.inputs = new NaiveBayesBinaryClassifierInputs(this);

        this.data = {} as NaiveBayesBinaryClassifierInput;
    }

    getInputs() {
        return this.inputs;
    }

    getOptions() {
        return this.options;
    }

    async export(): Promise<string> {
        return JSON.stringify({
            smoothFactor: this.data.smoothFactor,
            positiveTest: this.data.positiveTest,
            negativeTest: this.data.negativeTest,
            tokens: this.data.tokens,
            positiveTokens: this.data.positiveTokens,
            negativeTokens: this.data.negativeTokens
        });
    }

    async import(json: string, _: boolean) {
        const data = JSON.parse(json);
        this.data.smoothFactor = data.smoothFactor;
        this.data.positiveTest = data.positiveTest;
        this.data.negativeTest = data.negativeTest;
        this.data.tokens = data.tokens;
        this.data.positiveTokens = data.positiveTokens;
        this.data.negativeTokens = data.negativeTokens;
        return this;
    }

    async step() {
        throw new Error(`Naive Bayes doesn't need to train.`);
    }

    tokenize(text: string): Set<string> {
        text = text.toLowerCase();
        const tokens = text.match(/[a-z0-9']+/g)?.map((value) => value);
        if (tokens) {
            return new Set(tokens);
        }
        return new Set();
    }

    initialize() {
        this.data.positiveTest = 0;
        this.data.negativeTest = 0;
        this.data.positiveTokens = {};
        this.data.negativeTokens = {};
        
        const allTokens = new Set<string>();

        for (let i = 0; i < this.data.labels.length; ++i) {
            const tokens = this.tokenize(this.data.examples[i]);
            if (this.data.labels[i] === 1) {
                this.data.positiveTest += 1;
                tokens.forEach((token) => {
                    allTokens.add(token);
                    this.data.positiveTokens[token] = this.data.positiveTokens[token] + 1 || 1;
                });
            } else {
                this.data.negativeTest += 1;
                tokens.forEach((token) => {
                    allTokens.add(token);
                    this.data.negativeTokens[token] = this.data.negativeTokens[token] + 1 || 1;
                });
            }
        }

        this.data.tokens = Array.from(allTokens);
    }

    probabilities(token: string): { positive: number, negative: number } {
        const positive = this.data.positiveTokens[token] || 0;
        const negative = this.data.negativeTokens[token] || 0;

        const p_token_positive = (positive + this.data.smoothFactor) / (this.data.positiveTest + 2 * this.data.smoothFactor);
        const p_token_negative = (negative + this.data.smoothFactor) / (this.data.negativeTest + 2 * this.data.smoothFactor);

        return { positive: p_token_positive, negative: p_token_negative };
    }

    test(argument: {
        [id: string]: any[];
    }): { [id: string]: any[] } {
        const argumentInput = argument['input'] as string[];
        const text_tokens = this.tokenize(argumentInput[0]);

        let log_prob_if_pos = 0;
        let log_prob_if_neg = 0;

        for (const token of this.data.tokens) {
            const { positive: prob_if_pos, negative: prob_if_neg } = this.probabilities(token);

            if (text_tokens.has(token)) {
                log_prob_if_pos += Math.log(prob_if_pos);
                log_prob_if_neg += Math.log(prob_if_neg);
            } else {
                log_prob_if_pos += Math.log(1.0 - prob_if_pos);
                log_prob_if_neg += Math.log(1.0 - prob_if_neg);
            }
        }

        let prob_if_pos = Math.exp(log_prob_if_pos);
        let prob_if_neg = Math.exp(log_prob_if_neg);
        
        const prediction = (prob_if_pos / (prob_if_pos + prob_if_neg)) > 0.5 ? 1.0 : 0.0;

        return {
            'label': [prediction]
        };
    }

    getTestingInputs(): { input: PluginDataInput[], output?: PluginDataInput[] } {
        return {
            input: [
                {
                    id: 'input',
                    label: 'Text Input',
                    min: 1,
                    max: 1,
                    type: 'string'
                }
            ],
            output: [
                {
                    id: 'label',
                    label: 'Binary Label (0 or 1)',
                    type: 'number',
                    min: 1,
                    max: 1
                }
            ]
        }
    }

    finishTraining(): boolean {
        return true;
    }

    setSmoothFactor(factor: number) {
        this.data.smoothFactor = factor;
    }

    setInput(examples: string[]) {
        this.data.examples = examples;
    }

    setOutput(labels: number[]) {
        this.data.labels = labels;
    }
}

class NaiveBayesBinaryClassifierInputs extends PluginInputs {

    constructor(public classifier: NaiveBayesBinaryClassifier) {
        super();
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'input',
                label: 'Text Input',
                min: 1,
                max: 1,
                type: 'string'
            },
            {
                id: 'label',
                label: 'Binary Label (0 or 1)',
                type: 'number',
                min: 1,
                max: 1
            }
        ];
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (inputs['input'] === undefined) {
            throw new Error(`Naive Bayes Binary Classification's submit expecting plugin data with key input`);
        } else {
            this.classifier.setInput(inputs['input'].examples.map((value) => value[0]));
        }
        if (inputs['label'] === undefined) {
            throw new Error(`Naive Bayes Binary Classification's submit expecting plugin data with key label`);
        } else {
            this.classifier.setOutput(inputs['label'].examples.map((value) => value[0]));
        }
    }

}

class NaiveBayesBinaryClassifierOptions extends PluginOptions {
    state: number;

    constructor(public classifier: NaiveBayesBinaryClassifier) {
        super();
        this.state = 1;
    }

    options(): Option[] {
        return [
            new NumberOption({
                id: 'smooth',
                label: 'Smooth Factor (Recommend is 0.5)',
                min: 0,
                max: 1,
                step: 0.1
            })
        ];
    }

    submit(inputs: { [id: string]: any; }): void {
        this.classifier.setSmoothFactor(inputs['smooth']);
        this.state = 2;
    }

    noMore() {
        return this.state === 2;
    }
}




