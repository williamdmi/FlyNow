import React from 'react';
import '../Styles/Main.scss';
import FlightContainer from './FlightContainer';
import Filters from './Filters';

class Main extends React.Component {
    state = {
        clean_data: [],
        flightContainers: [],
        filterOptions: []
    };

    async componentDidMount() {
        const json = await (await fetch(`http://127.0.0.1:4000/api/flight/search`)).json() as Array<any>;
        this.setState({ clean_data: { json }, flightContainers: this.createFlightContainers(json) })
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log(this.state.filterOptions);
    }

    createFlightContainers(clean_data: Array<any>) {
        const result = clean_data.map((element: any) => {
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
