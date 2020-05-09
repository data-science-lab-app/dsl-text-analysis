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
var WordLollipop = /** @class */ (function (_super) {
    __extends(WordLollipop, _super);
    function WordLollipop() {
        var _this = _super.call(this) || this;
        _this.inputs = new WordLollipopInputs(_this);
        _this.options = new WordLollipopOptions(_this);
        _this.data = {};
        return _this;
    }
    WordLollipop.prototype.getOptions = function () {
        return this.options;
    };
    WordLollipop.prototype.getInputs = function () {
        return this.inputs;
    };
    WordLollipop.prototype.createWords = function () {
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
    WordLollipop.prototype.visualization = function () {
        return "\n        <!DOCTYPE html>\n<html>\n\n<head>\n    <meta charset=\"utf-8\">\n    <script src=\"https://d3js.org/d3.v4.js\"></script>\n    <script src=\"https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js\"></script>\n\n    <style>\n        body {\n            overflow: hidden;\n        }\n    </style>\n</head>\n\n<body>\n\n    <div id=\"chart\"></div>\n    <script type=\"text/javascript\">\n        var id = '#chart';\n        var data = " + JSON.stringify(this.createWords()) + "\n\n        var margin = { top: 10, right: 30, bottom: 40, left: 100 },\n            width = 460 - margin.left - margin.right,\n            height = 500 - margin.top - margin.bottom;\n\n        var svg = d3.select(id)\n            .append(\"svg\")\n            .attr('width', '100vw') \n            .attr('height', '100vh')\n            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))\n            .attr('preserveAspectRatio', 'xMidYMid meet')\n            .append(\"g\")\n            .attr(\"transform\",\n                \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n\n        data.sort(function (b, a) {\n            return a.size - b.size;\n        });\n\n        var x = d3.scaleLinear()\n            .domain([0, data[0].size + 1])\n            .range([0, width]);\n\n        svg.append(\"g\")\n            .attr(\"transform\", \"translate(0,\" + height + \")\")\n            .call(d3.axisBottom(x))\n            .selectAll(\"text\")\n            .attr(\"transform\", \"translate(-10,0)rotate(-45)\")\n            .style(\"text-anchor\", \"end\");\n\n        var y = d3.scaleBand()\n            .range([0, height])\n            .domain(data.map(function (d) { return d.text; }))\n            .padding(1);\n\n        svg.append(\"g\")\n            .call(d3.axisLeft(y))\n\n        svg.selectAll(\"myline\")\n            .data(data)\n            .enter()\n            .append(\"line\")\n            .attr(\"x1\", function (d) { return x(d.size); })\n            .attr(\"x2\", x(0))\n            .attr(\"y1\", function (d) { return y(d.text); })\n            .attr(\"y2\", function (d) { return y(d.text); })\n            .attr(\"stroke\", \"grey\")\n\n        svg.selectAll(\"mycircle\")\n            .data(data)\n            .enter()\n            .append(\"circle\")\n            .attr(\"cx\", function (d) { return x(d.size); })\n            .attr(\"cy\", function (d) { return y(d.text); })\n            .attr(\"r\", \"7\")\n            .style(\"fill\", \"#69b3a2\")\n            .attr(\"stroke\", \"black\")\n\n    </script>\n\n</body>";
    };
    WordLollipop.prototype.setTexts = function (texts) {
        this.data.texts = texts;
    };
    WordLollipop.prototype.setSeperator = function (seperator) {
        this.data.seperator = seperator;
    };
    return WordLollipop;
}(data_science_lab_core_1.VisualizationPlugin));
exports.WordLollipop = WordLollipop;
var WordLollipopInputs = /** @class */ (function (_super) {
    __extends(WordLollipopInputs, _super);
    function WordLollipopInputs(WordLollipop) {
        var _this = _super.call(this) || this;
        _this.WordLollipop = WordLollipop;
        return _this;
    }
    WordLollipopInputs.prototype.submit = function (inputs) {
        if (!inputs['texts']) {
            throw new Error("Word Cloud submit expecting plugin data with texts");
        }
        this.WordLollipop.setTexts(inputs['texts'].examples.map(function (value) { return value[0]; }));
    };
    WordLollipopInputs.prototype.inputs = function () {
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
    return WordLollipopInputs;
}(data_science_lab_core_1.PluginInputs));
var WordLollipopOptions = /** @class */ (function (_super) {
    __extends(WordLollipopOptions, _super);
    function WordLollipopOptions(WordLollipop) {
        var _this = _super.call(this) || this;
        _this.WordLollipop = WordLollipop;
        _this.state = 1;
        return _this;
    }
    WordLollipopOptions.prototype.options = function () {
        return [
            new data_science_lab_core_1.TextOption({ id: 'seperator', label: 'Type a seperator or space will be used.', min: 0 })
        ];
    };
    WordLollipopOptions.prototype.submit = function (inputs) {
        if (!inputs['seperator']) {
            this.WordLollipop.setSeperator(' ');
        }
        else {
            this.WordLollipop.setSeperator(inputs['seperator']);
        }
        this.state = 2;
    };
    WordLollipopOptions.prototype.noMore = function () {
        return this.state === 2;
    };
    return WordLollipopOptions;
}(data_science_lab_core_1.PluginOptions));
