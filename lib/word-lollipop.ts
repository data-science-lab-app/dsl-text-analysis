import { VisualizationPlugin, PluginInputs, PluginOptions, PluginDataInput, PluginData, Option, NumberOption, TextOption } from 'data-science-lab-core';


interface WordLollipopData {
    texts: string[];
    seperator: string;
}

export class WordLollipop extends VisualizationPlugin {
    options: WordLollipopOptions;
    inputs: WordLollipopInputs;

    data: WordLollipopData;

    constructor() {
        super();

        this.inputs = new WordLollipopInputs(this);
        this.options = new WordLollipopOptions(this);

        this.data = {} as WordLollipopData;
    }

    getOptions(): PluginOptions {
        return this.options;
    }
    getInputs(): PluginInputs {
        return this.inputs;
    }

    createWords(): { text: string, size: number }[] {
        const words: { [word: string]: number } = {};
        ([] as string[]).concat(...this.data.texts.map((value) => value.split(this.data.seperator))).map((value) => {
            if (!!words[value]) {
                words[value]++;
            } else {
                words[value] = 1;
            }
        });
        return Object.entries(words).map(([text, size]) => ({ text, size }));
    }

    visualization(): string {
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
        var data = ${JSON.stringify(this.createWords())}

        var margin = { top: 10, right: 30, bottom: 40, left: 100 },
            width = 460 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select(id)
            .append("svg")
            .attr('width', '100vw') 
            .attr('height', '100vh')
            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        data.sort(function (b, a) {
            return a.size - b.size;
        });

        var x = d3.scaleLinear()
            .domain([0, data[0].size + 1])
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.text; }))
            .padding(1);

        svg.append("g")
            .call(d3.axisLeft(y))

        svg.selectAll("myline")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", function (d) { return x(d.size); })
            .attr("x2", x(0))
            .attr("y1", function (d) { return y(d.text); })
            .attr("y2", function (d) { return y(d.text); })
            .attr("stroke", "grey")

        svg.selectAll("mycircle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.size); })
            .attr("cy", function (d) { return y(d.text); })
            .attr("r", "7")
            .style("fill", "#69b3a2")
            .attr("stroke", "black")

    </script>

</body>`;
    }

    setTexts(texts: string[]) {
        this.data.texts = texts;
    }

    setSeperator(seperator: string) {
        this.data.seperator = seperator;
    }
}

class WordLollipopInputs extends PluginInputs {
    constructor(public WordLollipop: WordLollipop) {
        super();
    }

    submit(inputs: { [id: string]: PluginData; }): void {
        if (!inputs['texts']) {
            throw new Error(`Word Cloud submit expecting plugin data with texts`);
        }
        this.WordLollipop.setTexts(inputs['texts'].examples.map(value => value[0]));
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

class WordLollipopOptions extends PluginOptions {
    state: number;

    constructor(public WordLollipop: WordLollipop) {
        super();
        this.state = 1;
    }

    options(): Option[] {
        return [
            new TextOption({ id: 'seperator', label: 'Type a seperator or space will be used.', min: 0 })
        ];
    }

    submit(inputs: { [id: string]: any; }): void {
        if (!inputs['seperator']) {
            this.WordLollipop.setSeperator(' ');
        } else {
            this.WordLollipop.setSeperator(inputs['seperator']);
        }
        this.state = 2;
    }

    noMore() {
        return this.state === 2;
    }

}

