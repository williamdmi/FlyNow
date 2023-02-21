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

    //Filter the data according to the selected filters. Update the filtered_data, flightContainers states
    filterData(): void {
        const [minMaxPriceFilter, airlineNamesFilter, connectionsNumberFilter] = this.state.filterOptions;
        const filtered_data: Array<any> = this.state.clean_data.filter((element: any) => {

            //Price filtering
            if (!(element["AveragePrice"] > Number(minMaxPriceFilter[0]) && element["AveragePrice"] < Number(minMaxPriceFilter[1]))) {
                return false;
            }

            //Airline name filtering
            if (airlineNamesFilter.length > 0) {
                if (!airlineNamesFilter.some((name: string) => {
                    return element["Segments"].some((segment: any) => {
                        return segment["Legs"].some((leg: any) => {
                            return leg["AirlineName"] === name;
                        })
                    })
                })) {
                    return false;
                }
            }

            //Number of connections filtering 
            if (connectionsNumberFilter.length > 0) {
                if (!connectionsNumberFilter.some((connectionsNumberFilter: number) => {
                    return element["Segments"].reduce((count: number, segment: any) => count + segment["Legs"].length, 0) == connectionsNumberFilter;
                })) {
                    return false;
                }
            }

            return true;
        })
        this.setState({ filtered_data: filtered_data, flightContainers: this.createFlightContainers(filtered_data) });

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
