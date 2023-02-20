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

    //On component mount fetch the data from the server and save it in the clean_data state
    async componentDidMount() {
        const json: Array<any> = await (await fetch(`http://127.0.0.1:4000/api/flight/search`)).json() as Array<any>;
        this.setState({ clean_data: json, flightContainers: this.createFlightContainers(json) })
    }

    //After component update check if the filter options state changed, if it did call the filderData function
    componentDidUpdate(prevProps: any, prevState: any): void {
        if (prevState.filterOptions !== this.state.filterOptions) {
            this.filterData();
        }
    }

    //TODO: make more efficient
    //Call to all the filtering functions and update the filtered_data, flightContainers states
    filterData() {
        let filtered_data: Array<any> = [...this.state.clean_data];
        filtered_data = this.filterPrice(filtered_data, this.state.filterOptions[0]);
        filtered_data = this.filterAirlineName(filtered_data, this.state.filterOptions[1]);
        filtered_data = this.filterConnections(filtered_data, this.state.filterOptions[2]);
        //Create new flight containers with the filtered data
        this.setState({ filtered_data: filtered_data, flightContainers: this.createFlightContainers(filtered_data) });
    }

    //Filter an array by price and return the filtered array
    filterPrice(arrayToFilter: Array<any>, minMaxArr: Array<any>): Array<any> {
        return arrayToFilter.filter(element => {
            return element["AveragePrice"] > Number(minMaxArr[0]) && element["AveragePrice"] < Number(minMaxArr[1]);
        });
    }

    //Filter an array by airline names and return the filtered array
    filterAirlineName(arrayToFilter: Array<any>, airlineNamesArr: Array<any>): Array<any> {
        let filteredArray: Array<any> = [];
        //Only filter if more than one checkbox is selected
        if (airlineNamesArr.length > 0) {
            airlineNamesArr.forEach(filterOption => {
                filteredArray = filteredArray.concat(arrayToFilter.filter(element => {
                    return filterOption === element["Segments"]["Legs"][0]["AirlineName"];
                }));
            })
            return filteredArray;
        }
        return arrayToFilter;
    }

    //Filter an array by number of connections and return the filtered array
    filterConnections(arrayToFilter: Array<any>, numberOfConnectionsArr: Array<any>): Array<any> {
        let filteredArray: Array<any> = [];
        //Only filter if more than one checkbox is selected
        if (numberOfConnectionsArr.length > 0) {
            numberOfConnectionsArr.forEach(filterOption => {
                filteredArray = filteredArray.concat(arrayToFilter.filter((element: any) => {
                    return filterOption == element["Segments"]["Legs"].length;
                }));
            })
            return filteredArray;
        }
        return arrayToFilter;
    }

    //Iterate through the filtered data and create a FlightContainer component array. Returns the FlightContainer array
    createFlightContainers(filtered_data: Array<any>) {
        return filtered_data.map((element: any) => {
            return (<FlightContainer flightInfo={element} />);
        });
    }

    //Sets the filter options state
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
