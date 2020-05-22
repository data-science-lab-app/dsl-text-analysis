"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var NaiveBayesBinaryClassifier = /** @class */ (function (_super) {
    __extends(NaiveBayesBinaryClassifier, _super);
    function NaiveBayesBinaryClassifier() {
        var _this = _super.call(this) || this;
        _this.options = new NaiveBayesBinaryClassifierOptions(_this);
        _this.inputs = new NaiveBayesBinaryClassifierInputs(_this);
        _this.data = {};
        return _this;
    }
    NaiveBayesBinaryClassifier.prototype.getInputs = function () {
        return this.inputs;
    };
    NaiveBayesBinaryClassifier.prototype.getOptions = function () {
        return this.options;
    };
    NaiveBayesBinaryClassifier.prototype.export = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, JSON.stringify({
                        smoothFactor: this.data.smoothFactor,
                        positiveTest: this.data.positiveTest,
                        negativeTest: this.data.negativeTest,
                        tokens: this.data.tokens,
                        positiveTokens: this.data.positiveTokens,
                        negativeTokens: this.data.negativeTokens
                    })];
            });
        });
    };
    NaiveBayesBinaryClassifier.prototype.import = function (json, _) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = JSON.parse(json);
                this.data.smoothFactor = data.smoothFactor;
                this.data.positiveTest = data.positiveTest;
                this.data.negativeTest = data.negativeTest;
                this.data.tokens = data.tokens;
                this.data.positiveTokens = data.positiveTokens;
                this.data.negativeTokens = data.negativeTokens;
                return [2 /*return*/, this];
            });
        });
    };
    NaiveBayesBinaryClassifier.prototype.step = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Naive Bayes doesn't need to train.");
            });
        });
    };
    NaiveBayesBinaryClassifier.prototype.tokenize = function (text) {
        var _a;
        text = text.toLowerCase();
        var tokens = (_a = text.match(/[a-z0-9']+/g)) === null || _a === void 0 ? void 0 : _a.map(function (value) { return value; });
        if (tokens) {
            return new Set(tokens);
        }
        return new Set();
    };
    NaiveBayesBinaryClassifier.prototype.initialize = function () {
        var _this = this;
        this.data.positiveTest = 0;
        this.data.negativeTest = 0;
        this.data.positiveTokens = {};
        this.data.negativeTokens = {};
        var allTokens = new Set();
        for (var i = 0; i < this.data.labels.length; ++i) {
            var tokens = this.tokenize(this.data.examples[i]);
            if (this.data.labels[i] === 1) {
                this.data.positiveTest += 1;
                tokens.forEach(function (token) {
                    allTokens.add(token);
                    _this.data.positiveTokens[token] = _this.data.positiveTokens[token] + 1 || 1;
                });
            }
            else {
                this.data.negativeTest += 1;
                tokens.forEach(function (token) {
                    allTokens.add(token);
                    _this.data.negativeTokens[token] = _this.data.negativeTokens[token] + 1 || 1;
                });
            }
        }
        this.data.tokens = Array.from(allTokens);
    };
    NaiveBayesBinaryClassifier.prototype.probabilities = function (token) {
        var positive = this.data.positiveTokens[token] || 0;
        var negative = this.data.negativeTokens[token] || 0;
        var p_token_positive = (positive + this.data.smoothFactor) / (this.data.positiveTest + 2 * this.data.smoothFactor);
        var p_token_negative = (negative + this.data.smoothFactor) / (this.data.negativeTest + 2 * this.data.smoothFactor);
        return { positive: p_token_positive, negative: p_token_negative };
    };
    NaiveBayesBinaryClassifier.prototype.test = function (argument) {
        var argumentInput = argument['input'];
        var text_tokens = this.tokenize(argumentInput[0]);
        var log_prob_if_pos = 0;
        var log_prob_if_neg = 0;
        for (var _i = 0, _a = this.data.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            var _b = this.probabilities(token), prob_if_pos_1 = _b.positive, prob_if_neg_1 = _b.negative;
            if (text_tokens.has(token)) {
                log_prob_if_pos += Math.log(prob_if_pos_1);
                log_prob_if_neg += Math.log(prob_if_neg_1);
            }
            else {
                log_prob_if_pos += Math.log(1.0 - prob_if_pos_1);
                log_prob_if_neg += Math.log(1.0 - prob_if_neg_1);
            }
        }
        var prob_if_pos = Math.exp(log_prob_if_pos);
        var prob_if_neg = Math.exp(log_prob_if_neg);
        var prediction = (prob_if_pos / (prob_if_pos + prob_if_neg)) > 0.5 ? 1.0 : 0.0;
        return {
            'label': [prediction]
        };
    };
    NaiveBayesBinaryClassifier.prototype.getTestingInputs = function () {
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
        };
    };
    NaiveBayesBinaryClassifier.prototype.finishTraining = function () {
        return true;
    };
    NaiveBayesBinaryClassifier.prototype.setSmoothFactor = function (factor) {
        this.data.smoothFactor = factor;
    };
    NaiveBayesBinaryClassifier.prototype.setInput = function (examples) {
        this.data.examples = examples;
    };
    NaiveBayesBinaryClassifier.prototype.setOutput = function (labels) {
        this.data.labels = labels;
    };
    return NaiveBayesBinaryClassifier;
}(data_science_lab_core_1.AlgorithmPlugin));
exports.NaiveBayesBinaryClassifier = NaiveBayesBinaryClassifier;
var NaiveBayesBinaryClassifierInputs = /** @class */ (function (_super) {
    __extends(NaiveBayesBinaryClassifierInputs, _super);
    function NaiveBayesBinaryClassifierInputs(classifier) {
        var _this = _super.call(this) || this;
        _this.classifier = classifier;
        return _this;
    }
    NaiveBayesBinaryClassifierInputs.prototype.inputs = function () {
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
    };
    NaiveBayesBinaryClassifierInputs.prototype.submit = function (inputs) {
        if (inputs['input'] === undefined) {
            throw new Error("Naive Bayes Binary Classification's submit expecting plugin data with key input");
        }
        else {
            this.classifier.setInput(inputs['input'].examples.map(function (value) { return value[0]; }));
        }
        if (inputs['label'] === undefined) {
            throw new Error("Naive Bayes Binary Classification's submit expecting plugin data with key label");
        }
        else {
            this.classifier.setOutput(inputs['label'].examples.map(function (value) { return value[0]; }));
        }
    };
    return NaiveBayesBinaryClassifierInputs;
}(data_science_lab_core_1.PluginInputs));
var NaiveBayesBinaryClassifierOptions = /** @class */ (function (_super) {
    __extends(NaiveBayesBinaryClassifierOptions, _super);
    function NaiveBayesBinaryClassifierOptions(classifier) {
        var _this = _super.call(this) || this;
        _this.classifier = classifier;
        _this.state = 1;
        return _this;
    }
    NaiveBayesBinaryClassifierOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.NumberOption({
                id: 'smooth',
                label: 'Smooth Factor (Recommend is 0.5)',
                min: 0,
                max: 1,
                step: 0.1
            })
        ];
    };
    NaiveBayesBinaryClassifierOptions.prototype.submit = function (inputs) {
        this.classifier.setSmoothFactor(inputs['smooth']);
        this.state = 2;
    };
    NaiveBayesBinaryClassifierOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return NaiveBayesBinaryClassifierOptions;
}(data_science_lab_core_1.PluginOptions));
