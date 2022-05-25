import React from 'react';
import Chart from 'react-apexcharts';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ReactLoading from "react-loading";
import {Card, CardBody, CardText, CardTitle} from 'reactstrap';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class Analytics extends React.Component {
	componentDidMount() {
			this.fetchBarChartData();
			this.fetchLineChartData();
		}
	constructor(props) {
		super(props);
		this.fetchBarChartData = this.fetchBarChartData.bind(this);
		this.fetchLineChartData = this.fetchLineChartData.bind(this);

        this.state = {
	        loading : true,
			barMonths:[],
			barData:[],
			lineMonths: [],
			lineData:[],
			scatterData:[],
			chart : null,
			doughnatChartData : [],
            
			
			
        }
    }
	fetchBarChartData() {
        axios({
          method: "GET",
          url: `students/day`,
        }).then((res) => {
			console.log(res)
			
			this.setState({barMonths: res.data.months, barData:res.data.no_conversation})
        });
      };
	  fetchLineChartData() {
        axios({
          method: "GET",
          url: `/students/branch`,
        }).then((res) => {
			console.log(res)
			
			this.setState({lineMonths: res.data.months, lineData:res.data.no_conversation, loading: false})
        });
      };
	  
    render() {
		const {loading} = this.state;
		this.columnChart =  {
			options: {
				chart: {
					height: 350,
					width : 100,
					type: 'bar'
				},
				title: {
					text: 'Number of Students per Day',
					align: 'center'
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'rounded'	
					},
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				colors: ['#47E1BC', '#4DFFDF', '#888888'],
				xaxis: {
					categories:  this.state.barMonths,
					axisBorder: {
						show: true,
						color: 'rgba(182, 194, 201, 0.5)',
						height: 1,
						width: '100%',
						offsetX: 0,
						offsetY: -1
					},
					axisTicks: {
						show: true,
						borderType: 'solid',
						color: '#b6c2c9',
						height: 6,
						offsetX: 0,
						offsetY: 0
					}
				},
				yaxis: {
					title: {
						text: 'Number of Students'
					}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return "$ " + val + " thousands"
						}
					}
				}
			},
			series: [{
				name: 'Conversations',
				data: this.state.barData
			}]
		};
		this.lineChart = {
			data: {
				labels: this.state.lineMonths,
				datasets: [{
						label: 'City 1',
						borderColor: '#4DFFDF',
						pointBackgroundColor: '#4DFFDF',
						pointRadius: 4,
						borderWidth: 2,
						backgroundColor: 'rgba(52, 143, 226, .0)',
						data: this.state.lineData,
				}]
			},
			options: {
				
				animation: {
					duration: 0
				},
				responsive: true, 
				maintainAspectRatio: false,
				hover: {
					mode: 'nearest',
					intersect: true
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				chart:{
					yaxis: {
						title: {
							text: 'Number of conversations'
						}
					},
				}
			}
		};
		return (
			<div>
				{loading ?
				<div style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>  
                <ReactLoading width={100} type={"spinningBubbles"} color="#0083ca"/>
                </div> :
					<div  style = {{margin: '100px 30px 30px 30px', justifyContent: 'center'}}>
						
						<div className = "row">
						<div className = "col-6">
						<Card>
							<CardBody>
							<Chart type="bar" options={this.columnChart.options} series={this.columnChart.series} height="335"/>
							</CardBody>
						</Card>
						</div>
						<div className = "col-6">
						<Card>
							<CardTitle className="text-center pt-3" style= {{color: '#373d3f', fontSize: '14px', fontWeight:'bold', fontFamily:'Helvetica'}}>
							
							Number of Students per Branch
								
							</CardTitle>
							<CardBody>
							
							<Line data={this.lineChart.data} options={this.lineChart.options} height="300"/>
							</CardBody>
						</Card>
						</div>
						</div>
					</div>}
            </div>
        )

    }
}

export default Analytics;