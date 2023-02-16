import React from 'react';
import '../Styles/Main.scss';

class FlightContainer extends React.Component<{ flightInfo:object}, {}> {
    state = {};
    async componentDidMount() {

    }
    render() {
        return (
            <div key={Math.random() *10000000} className="flight-container">
                
            </div>
        );
    }
}

export default FlightContainer;
