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
Object.defineProperty(exports, "__esModule", { value: true });
var data_science_lab_core_1 = require("data-science-lab-core");
var WordCloud = /** @class */ (function (_super) {
    __extends(WordCloud, _super);
    function WordCloud() {
        var _this = _super.call(this) || this;
        _this.inputs = new WordCloudInputs(_this);
        _this.options = new WordCloudOptions(_this);
        _this.data = {};
        return _this;
    }
    WordCloud.prototype.getOptions = function () {
        return this.options;
    };
    WordCloud.prototype.getInputs = function () {
        return this.inputs;
    };
    WordCloud.prototype.createWords = function () {
        var _a;
        var _this = this;
        var words = {};
        (_a = []).concat.apply(_a, this.data.texts.map(function (value) { return value.split(_this.data.seperator); })).map(function (value) {
            if (!!words[value]) {
                words[value]++;
            }
            else {
                words[value] = 1;
            }
        });
        return Object.entries(words).map(function (_a) {
            var text = _a[0], size = _a[1];
            return ({ text: text, size: size });
        });
    };
    WordCloud.prototype.visualization = function () {
        var words = this.createWords();
        return "\n        <!DOCTYPE html>\n<html>\n\n<head>\n    <meta charset=\"utf-8\">\n    <script src=\"https://d3js.org/d3.v4.js\"></script>\n    <script src=\"https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js\"></script>\n\n    <style>\n        body {\n            overflow: hidden;\n        }\n    </style>\n</head>\n\n<body>\n    <div id=\"chart\"></div>\n    <script type=\"text/javascript\">\n        var id = '#chart';\n        var myWords = " + JSON.stringify(words) + "\n\n        var margin = { top: 10, right: 10, bottom: 10, left: 10 },\n            width = 450 - margin.left - margin.right,\n            height = 450 - margin.top - margin.bottom;\n\n        // append the svg object to the body of the page\n        var svg = d3.select(id).append(\"svg\")\n            .attr('width', '100vw')\n            .attr('height', '100vh')\n            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))\n            .attr('preserveAspectRatio', 'xMidYMid meet')\n            .append(\"g\")\n            .attr(\"transform\",\n                \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n        var layout = d3.layout.cloud()\n            .size([width, height])\n            .words(myWords)\n            .padding(5)        \n            .fontSize(function (d) { return d.size; })      \n            .on(\"end\", draw);\n        layout.start();\n\n        function draw(words) {\n            svg\n                .append(\"g\")\n                .attr(\"transform\", \"translate(\" + layout.size()[0] / 2 + \",\" + layout.size()[1] / 2 + \")\")\n                .selectAll(\"text\")\n                .data(words)\n                .enter().append(\"text\")\n                .style(\"font-size\", function (d) { return d.size; })\n                .style(\"fill\", \"#69b3a2\")\n                .attr(\"text-anchor\", \"middle\")\n                .style(\"font-family\", \"Impact\")\n                .attr(\"transform\", function (d) {\n                    return \"translate(\" + [d.x, d.y] + \") rotate(\" + d.rotate + \")\";\n                })\n                .text(function (d) { return d.text; });\n        }\n    </script>\n</body>";
    };
    WordCloud.prototype.setTexts = function (texts) {
        this.data.texts = texts;
    };
    WordCloud.prototype.setSeperator = function (seperator) {
        this.data.seperator = seperator;
    };
    return WordCloud;
}(data_science_lab_core_1.VisualizationPlugin));
exports.WordCloud = WordCloud;
var WordCloudInputs = /** @class */ (function (_super) {
    __extends(WordCloudInputs, _super);
    function WordCloudInputs(wordCloud) {
        var _this = _super.call(this) || this;
        _this.wordCloud = wordCloud;
        return _this;
    }
    WordCloudInputs.prototype.submit = function (inputs) {
        if (!inputs['texts']) {
            throw new Error("Word Cloud submit expecting plugin data with texts");
        }
        this.wordCloud.setTexts(inputs['texts'].examples.map(function (value) { return value[0]; }));
    };
    WordCloudInputs.prototype.inputs = function () {
        return [
            {
                id: 'texts',
                label: 'Words',
                min: 1,
                max: 1,
                type: 'string'
            }
        ];
    };
    return WordCloudInputs;
}(data_science_lab_core_1.PluginInputs));
var WordCloudOptions = /** @class */ (function (_super) {
    __extends(WordCloudOptions, _super);
    function WordCloudOptions(wordCloud) {
        var _this = _super.call(this) || this;
        _this.wordCloud = wordCloud;
        _this.state = 1;
        return _this;
    }
    WordCloudOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.TextOption({ id: 'seperator', label: 'Type a seperator or space will be used.', min: 0 })
        ];
    };
    WordCloudOptions.prototype.submit = function (inputs) {
        if (!inputs['seperator']) {
            this.wordCloud.setSeperator(' ');
        }
        else {
            this.wordCloud.setSeperator(inputs['seperator']);
        }
        this.state = 2;
    };
    WordCloudOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return WordCloudOptions;
}(data_science_lab_core_1.PluginOptions));
