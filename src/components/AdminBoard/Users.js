import React, {Component} from 'react';
import {cloneDeep} from 'lodash';
import {render} from 'react-dom';
import * as agCharts from 'ag-charts-community';
import {AgChartsReact} from 'ag-charts-react';
import UserService from "../../services/UserService";

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseData: [],
            options: {
                autoSize: true,
                data: [],
                title: {
                    text: 'Road fuel prices (2019)',
                    fontSize: 18,
                },
                subtitle: {
                    text: 'Source: Department for Business, Energy & Industrial Strategy',
                },
                series: [
                    {
                        type: 'line',
                        xKey: 'time',
                        yKey: 'users',
                        stroke: '#01c185',
                        marker: {
                            stroke: '#01c185',
                            fill: '#01c185',
                        },
                    },

                ],
                // axes: [
                //     {
                //         position: 'bottom',
                //         type: 'time',
                //         tick: {count: agCharts.time.month.every(2)},
                //         title: {text: 'Date'},
                //     },
                //     {
                //         position: 'left',
                //         type: 'number',
                //         title: {text: 'Price in pence'},
                //     },
                // ],
            },
        };
    }

    componentDidMount() {

        UserService.getNumberOfUser().then(
            response => {
                responseGl = response.data;
                while (this.state.responseData.length < 20) {
                            for (let i = 0; i < responseGl.length; i++) {
                                this.setState({
                                    responseData: [
                                        ...this.state.responseData,
                                        {
                                            time: new Date(responseGl[i].split(",")[0].split("-")[0], responseGl[i].split(",")[0].split("-")[1], responseGl[i].split(",")[0].split("-")[2]),
                                            users: responseGl[i].split(",")[1],
                                        }
                                    ]
                        })
                    }
                }
            },
        );
    }


    render() {

        console.log(this.state.responseData)
        return <AgChartsReact options={{...this.state.options, data: this.state.responseData}}/>;
    }
}

var data1 = [
    {date: new Date(2019, 0, 7), petrol: 120.27},
    {date: new Date(2019, 0, 14), petrol: 119.53},
    {date: new Date(2019, 0, 21), petrol: 119.12},
    {date: new Date(2019, 0, 28), petrol: 119.29},
    {date: new Date(2019, 1, 4), petrol: 119.13},
    {date: new Date(2019, 1, 11), petrol: 118.97},
    {date: new Date(2019, 1, 18), petrol: 119.05},
    {date: new Date(2019, 1, 25), petrol: 119.22},
    {date: new Date(2019, 2, 4), petrol: 119.72},
    {date: new Date(2019, 2, 11), petrol: 120.1},
    {date: new Date(2019, 2, 18), petrol: 120.48},
    {date: new Date(2019, 2, 25), petrol: 120.83},
    {date: new Date(2019, 3, 1), petrol: 121.7},
    {date: new Date(2019, 3, 8), petrol: 122.75},
    {date: new Date(2019, 3, 15), petrol: 124.06},
    {date: new Date(2019, 3, 22), petrol: 125.43},
    {date: new Date(2019, 3, 29), petrol: 126.36},
    {date: new Date(2019, 4, 6), petrol: 127.5},
    {date: new Date(2019, 4, 13), petrol: 127.97},
    {date: new Date(2019, 4, 20), petrol: 128.51},
    {date: new Date(2019, 4, 27), petrol: 129.14},
    {date: new Date(2019, 5, 3), petrol: 129.41},
    {date: new Date(2019, 5, 10), petrol: 128.89},
    {date: new Date(2019, 5, 17), petrol: 127.66},
    {date: new Date(2019, 5, 24), petrol: 126.66},
    {date: new Date(2019, 6, 1), petrol: 126.49},
    {date: new Date(2019, 6, 8), petrol: 126.86},
    {date: new Date(2019, 6, 15), petrol: 127.13},
    {date: new Date(2019, 6, 22), petrol: 127.81},
    {date: new Date(2019, 6, 29), petrol: 128.03},
    {date: new Date(2019, 7, 5), petrol: 128.37},
    {date: new Date(2019, 7, 12), petrol: 128.36},
    {date: new Date(2019, 7, 19), petrol: 128.17},
    {date: new Date(2019, 7, 26), petrol: 128.22},
    {date: new Date(2019, 8, 2), petrol: 127.86},
    {date: new Date(2019, 8, 9), petrol: 127.79},
    {date: new Date(2019, 8, 16), petrol: 126.92},
    {date: new Date(2019, 8, 23), petrol: 126.78},
    {date: new Date(2019, 8, 30), petrol: 126.92},
    {date: new Date(2019, 9, 7), petrol: 126.87},
    {date: new Date(2019, 9, 14), petrol: 126.91},
    {date: new Date(2019, 9, 21), petrol: 126.4},
    {date: new Date(2019, 9, 28), petrol: 125.77},
    {date: new Date(2019, 10, 4), petrol: 125.56},
    {date: new Date(2019, 10, 11), petrol: 125.59},
    {date: new Date(2019, 10, 18), petrol: 125.58},
    {date: new Date(2019, 10, 25), petrol: 125.32},
    {date: new Date(2019, 11, 2), petrol: 124.81},
    {date: new Date(2019, 11, 9), petrol: 124.75},
    {date: new Date(2019, 11, 16), petrol: 124.33},
    {date: new Date(2019, 11, 23), petrol: 124.16},
    {date: new Date(2019, 11, 30), petrol: 124.96},
];
let responseGl = [];
let data = [];

// render(<Users/>, document.querySelector('#root'));