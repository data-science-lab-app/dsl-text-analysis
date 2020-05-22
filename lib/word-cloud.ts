import { VisualizationPlugin, PluginInputs, PluginOptions, PluginDataInput, PluginData, Option, NumberOption, TextOption } from 'data-science-lab-core';


interface WordCloudData {
    texts: string[];
    top: number;
}

export class WordCloud extends VisualizationPlugin {
    options: WordCloudOptions;
    inputs: WordCloudInputs;

    data: WordCloudData;

    constructor() {
        super();

        this.inputs = new WordCloudInputs(this);
        this.options = new WordCloudOptions(this);

        this.data = {} as WordCloudData;
    }

    getOptions(): PluginOptions {
        return this.options;
    }
    getInputs(): PluginInputs {
        return this.inputs;
    }

    createWords(): { text: string, size: number }[] {
        const words: { [word: string]: number } = {};
        this.data.texts.map((value) => value.match(/[a-z0-9']+/g)).forEach((value) => {
            if (value) {
                value.forEach((match) => {
                    if (!!words[match]) {
                        words[match]++;
                    } else {
                        words[match] = 1;
                    }
                })
            }
        });
        return Object.entries(words).map(([text, size]) => ({ text, size })).sort((a, b) => b.size - a.size).slice(0, this.data.top);
    }

    visualization(): string {
        const words = this.createWords();
        return `
        <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <script src="https://d3js.org/d3.v4.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js"></script>

    <style>
        body {
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div id="chart"></div>
    <script type="text/javascript">
        var id = '#chart';
        var myWords = ${JSON.stringify(words)}

        var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 450 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(id).append("svg")
            .attr('width', '100vw')
            .attr('height', '100vh')
            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var layout = d3.layout.cloud()
            .size([width, height])
            .words(myWords)
            .padding(5)        
            .fontSize(function (d) { return d.size; })      
            .on("end", draw);
        layout.start();

        function draw(words) {
            svg
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) { return d.size; })
                .style("fill", "#69b3a2")
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
                })
                .text(function (d) { return d.text; });
        }
    </script>
</body>`;
    }

    setTexts(texts: string[]) {
        this.data.texts = texts;
    }

    setTop(top: number) {
        this.data.top = top;
    }
}

class WordCloudInputs extends PluginInputs {
    constructor(public wordCloud: WordCloud) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (!inputs['texts']) {
            throw new Error(`Word Cloud submit expecting plugin data with texts`);
        }
        this.wordCloud.setTexts(inputs['texts'].examples.map(value => value[0]));
    }

    inputs(): PluginDataInput[] {
        return [
            {
                id: 'texts',
                label: 'Words',
                min: 1,
                max: 1,
                type: 'string'
            }
        ];
    }


}

class WordCloudOptions extends PluginOptions {
    state: number;

    constructor(public wordCloud: WordCloud) {
        super();
        this.state = 1;
    }

    options(): Option[] {
        return [
            new NumberOption({id: 'top', label: 'Show only the top X number of occurances (Enter for X).', min: 1})
        ];
    }

    submit(inputs: { [id: string]: any; }): void {
        this.wordCloud.setTop(inputs['top']);
        this.state = 2;
    }

    noMore() {
        return this.state === 2;
    }

}

