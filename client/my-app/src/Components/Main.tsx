import React from 'react';
import '../Styles/Main.scss';
import FlightContainer from './FlightContainer';

class Main extends React.Component {
    state = {clean_data: [], flightContainers: []};
    async componentDidMount() {
        const json = await (await fetch(`http://127.0.0.1:4000/api/flight/search`)).json() as Array<any>;
        this.setState({ clean_data: { json }, flightContainers: this.createFlightContainers(json)})
    }

    createFlightContainers(clean_data: Array<any>) {
        const result = clean_data.map((element: any) => {
            return (<FlightContainer flightInfo={element}/>);
        });
        return result;
    }

    render() {
        return (
            <div className="main">
                {this.state.flightContainers}
            </div>
        );
    }
}

export default Main;
