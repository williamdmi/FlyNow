import React from 'react';
import '../Styles/Main.scss';
import FlightContainer from './FlightContainer';
import Filters from './Filters';

class Main extends React.Component {
    state = {
        clean_data: [],
        filtered_data: [],
        flightContainers: [],
        filterOptions: [[], [], [], []]
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
        const [minMaxPriceFilter, airlineNamesFilter, connectionsNumberFilter , waysFilter] = this.state.filterOptions;    
        const filtered_data: Array<any> = this.state.clean_data.filter((element: any) => {

            //Price filtering
            if (!this.filterPrice(minMaxPriceFilter, element)) {
                return false;
            }

            //Airline name filtering
            if (airlineNamesFilter.length > 0) {
                if (!this.filterAirlineName(airlineNamesFilter, element)) {
                    return false;
                }
            }

            //Filter RT/OW
            if (waysFilter.length > 0) {
                if (!this.filterWays(waysFilter, element)) {
                    return false;
                }
            }

            //Number of connections filtering 
            if (connectionsNumberFilter.length > 0) {
                if (!this.filterConnections(connectionsNumberFilter, element)) {
                    return false;
                }
            }

            return true;
        })
        this.setState({ filtered_data: filtered_data, flightContainers: this.createFlightContainers(filtered_data) });

    }

    //Return true if the given element is between the seleced price range
    filterPrice(minMaxPriceFilter: Array<Number>, element: any): boolean {
        if ((element["AveragePrice"] > Number(minMaxPriceFilter[0]) && element["AveragePrice"] < Number(minMaxPriceFilter[1]))) {
            return true;
        }
        return false;
    }

    //Return true if the given element is matching one of the selected airlines
    filterAirlineName(airlineNamesFilter: Array<string>, element: any): boolean {
        if (airlineNamesFilter.some((name: string) => {
            return element["Segments"].some((segment: any) => {
                return segment["Legs"].some((leg: any) => {
                    return leg["AirlineName"] === name;
                })
            })
        })) {
            return true;
        }
        return false;
    }

    //Return true if the given element is matching one of the selected ways
    filterWays(waysFilter: Array<string>, element: any): boolean {
        if (waysFilter.some((name: string) => {
            if (name === "One way") {
                if (element["Segments"].length === 1) {
                    return true;
                }
            }
            else if (element["Segments"].length === 2) {
                return true;
            }
            return false;
        })) {
            return true;
        }
        return false;
    }

    //Return true if the given element is matching one of the selected connections number
    filterConnections(connectionsNumberFilter: Array<number>, element: any): boolean {
        if (connectionsNumberFilter.some((connectionsNumberFilter: number) => {
            return element["Segments"].reduce((count: number, segment: any) => count + segment["Legs"].length, 0) === Number(connectionsNumberFilter);
        })) {
            return true;
        }
        return false;
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
