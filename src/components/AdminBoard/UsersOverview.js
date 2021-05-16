// import React, {Component} from 'react';
// import {cloneDeep} from 'lodash';
// import {render} from 'react-dom';
// import * as agCharts from 'ag-charts-community';
// import {AgChartsReact} from 'ag-charts-react';
// import UserService from "../../services/UserService";
// import {forEach} from "react-bootstrap/ElementChildren";
//
// export default class ChartExample extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             options: {
//                 autoSize: true,
//                 data: getData(),
//                 series: [
//                     {
//                         xKey: 'time',
//                         yKey: 'voltage',
//                         tooltipEnabled: false,
//                     },
//                 ],
//                 axes: [
//                     {
//                         type: 'time',
//                         position: 'bottom',
//                         tick: {count: agCharts.time.second.every(5)},
//                         label: {format: '%H:%M:%S'},
//                     },
//                     {
//                         type: 'number',
//                         position: 'left',
//                         label: {format: '#{1f}'},
//                     },
//                 ],
//                 title: {text: 'Core Voltage'},
//                 legend: {enabled: false},
//             },
//         };
//     }
//
//     componentDidMount() {
//     }
//
//     update = () => {
//         const options = cloneDeep(this.state.options);
//
//         options.data = getData();
//
//         this.setState({options});
//     };
//
//     startUpdates = () => {
//         if (updating) {
//             return;
//         }
//         updating = true;
//         this.update();
//         setInterval(this.update, 500);
//     };
//
//     render() {
//         return (
//             <div className="wrapper">
//                 <div id="toolPanel">
//                     <button onClick={() => this.startUpdates()}>Start Updates</button>
//                 </div>
//                 <AgChartsReact options={this.state.options}/>
//             </div>
//         );
//     }
// }
//
// var lastTime = new Date('07 Jan 2020 13:25:00 GMT').getTime();
// let data = [];
// var responseGl = [];
//
// function getData() {
//     // data.shift();
//
//     UserService.getNumberOfUser().then(
//         response => {
//             responseGl = response.data;
//             while (data.length < 20) {
//                 for (let i = 0; i < responseGl.length; i++) {
//                     data.push(
//                         {
//                             time: new Date(responseGl[i].split(",")[0].split("-")[0], responseGl[i].split(",")[0].split("-")[1], responseGl[i].split(",")[0].split("-")[2]),
//                             voltage: responseGl[i].split(",")[1],
//                         });
//                 }
//             }
//         },
//     );
//     console.log(data)
//     return data;
// }
//
// var updating = false;
//
// render(<ChartExample/>, document.querySelector('#root'));



import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import { render } from 'react-dom';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import UserService from "../../services/UserService";
export default class UsersOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                autoSize: true,
                data: [],
                title: {
                    text: 'Registered users',
                    fontSize: 18,
                },
                // subtitle: {
                //     text: 'Source: Department for Business, Energy & Industrial Strategy',
                // },
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
                axes: [
                    {
                        position: 'bottom',
                        type: 'time',
                        tick: { count: agCharts.time.month.every(2) },
                        title: { text: 'Date' },
                    },
                    {
                        position: 'left',
                        type: 'number',
                        title: { text: 'Nr of users' },
                    },
                ],
            },
        };
        console.log(this.state.options.data)
    }

    componentDidMount() {
        UserService.getNumberOfUser().then(
            response => {
                responseGl = response.data;
                while (data.length < 20) {
                    for (let i = 0; i < responseGl.length; i++) {
                        data.push(
                            {
                                time: new Date(responseGl[i].split(",")[0].split("-")[0], responseGl[i].split(",")[0].split("-")[1], responseGl[i].split(",")[0].split("-")[2]),
                                users: responseGl[i].split(",")[1],
                            });
                    }
                }
            },
        );
    }

    render() {
        return <AgChartsReact options={this.state.options} />;
    }
}

let data = [];
var responseGl = [];

function getData() {
    // data.shift();

    UserService.getNumberOfUser().then(
        response => {
            responseGl = response.data;
            while (data.length < 20) {
                for (let i = 0; i < responseGl.length; i++) {
                    data.push(
                        {
                            time: new Date(responseGl[i].split(",")[0].split("-")[0], responseGl[i].split(",")[0].split("-")[1], responseGl[i].split(",")[0].split("-")[2]),
                            users: responseGl[i].split(",")[1],
                        });
                }
            }
        },
    );
    return data;
}

// render(<UsersOverview />, document.querySelector('#root'));