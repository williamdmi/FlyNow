import React from 'react';
import '../Styles/Main.scss';
import FlightContainer from './FlightContainer';
import Filters from './Filters';

class Main extends React.Component {
    state = {
        clean_data: [],
        filtered_data: [],
        flightContainers: [],
        filterOptions: [[], [], []]
    };

    async componentDidMount() {
        const json: Array<any> = await (await fetch(`http://127.0.0.1:4000/api/flight/search`)).json() as Array<any>;
        this.setState({ clean_data: json, flightContainers: this.createFlightContainers(json) })
    }

    componentDidUpdate(prevProps: any, prevState: any): void {
        if (prevState.filterOptions !== this.state.filterOptions) {
            this.filterData();
        }
    }

    filterData() {
        let filtered_data: Array<any> = [...this.state.clean_data];
        filtered_data = this.filterPrice(filtered_data, this.state.filterOptions[0]);
        filtered_data = this.filterAirlineName(filtered_data, this.state.filterOptions[1]);
        filtered_data = this.filterConnections(filtered_data, this.state.filterOptions[2]);
        this.setState({ filtered_data: filtered_data, flightContainers: this.createFlightContainers(filtered_data) });
    }

    filterPrice(arrayToFilter: Array<any>, filterOptions: Array<any>): Array<any> {
        return arrayToFilter.filter(element =>{
            return element["AveragePrice"] > Number(filterOptions[0]) && element["AveragePrice"] < Number(filterOptions[1]);
        });
    }

    filterAirlineName(arrayToFilter: Array<any>, filterOptions: Array<any>): Array<any> {
        let filteredArray: Array<any> = [];
        if (filterOptions.length > 0) {
            filterOptions.forEach(filterOption => {
                filteredArray = filteredArray.concat(arrayToFilter.filter(element => {
                    return filterOption === element["Segments"]["Legs"][0]["AirlineName"];
                }));
            })
            return filteredArray;
        }
        return arrayToFilter;
    }

    filterConnections(arrayToFilter: Array<any>, filterOptions: Array<any>): Array<any> {
        let filteredArray: Array<any> = [];
        if (filterOptions.length > 0) {
            filterOptions.forEach(filterOption => {
                filteredArray = filteredArray.concat(arrayToFilter.filter((element: any) => {
                    return filterOption == element["Segments"]["Legs"].length;
                }));
            })
            return filteredArray;
        }
        return arrayToFilter;
    }

    createFlightContainers(filtered_data: Array<any>) {
        const result = filtered_data.map((element: any) => {
            return (<FlightContainer flightInfo={element} />);
        });
        return result;
    }

    setFilterOptions = (filterOptions: Array<any>) => {
        this.setState({ filterOptions: filterOptions });
    }

    render() {
        return (
            <div className="main">
                <Filters setFilterOptions={this.setFilterOptions} />
                {this.state.flightContainers}
            </div>
        );
    }
}

export default Main;
