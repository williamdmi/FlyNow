import React from 'react';
import '../Styles/Main.scss';
import '../Styles/FlightContainer.scss';
import FlightBody from './FlightBody';

class FlightContainer extends React.Component<{ flightInfo: any }, {}> {
    state = { open: false };

    //Returns a jsx element with the info about the departure point
    getDeparturePointAndDate() {
        const city = this.props.flightInfo["Segments"]["Legs"][0]["DeparturePoint"]["City"];
        let date = this.props.flightInfo["Segments"]["Legs"][0]["DeparturePoint"]["DateTime"].replaceAll("-","/").replace("T", " - ");
        date = date.substring(0, date.length - 3);
        return (<> <div className='city'>{city}</div>
            <div className='date'>{date}</div> </>);
    }

    //Returns a jsx element with the info about the destination point
    getDestinationAndDate() {
        const lastLeg = this.props.flightInfo["Segments"]["Legs"].slice(-1)[0];
        const city = lastLeg["ArrivalPoint"]["City"];
        let date = lastLeg["ArrivalPoint"]["DateTime"].replaceAll("-","/").replace("T", " - ");
        date = date.substring(0, date.length - 3);
        return (<> <div className='city'>{city}</div>
            <div className='date'>{date}</div> </>);
    }

    //Returns a jsx element with the airline name
    getAirline() {
        const airline = this.props.flightInfo["Segments"]["Legs"][0]["AirlineName"];
        return (<div className='airline'>{airline}</div>)
    }

    //Returns a jsx element with the price and currency symbol
    getPrice() {
        const averagePrice = this.props.flightInfo["AveragePrice"];
        const currencySymbol = this.props.flightInfo["CurrencySymbol"];
        return (<div className='price'>{averagePrice}{currencySymbol}</div>)
    }

    //Sets the open state to true/false
    setOpenState() {
        this.setState({ open: !this.state.open })
    }
    render() {
        return (
            <table className='data-table'>
                <thead>
                    <tr>
                        <th className="show-button" onClick={() => this.setOpenState()}>הצג \ הסתר מסלול{ }</th>
                        <th>מחיר לנוסע  {this.getPrice()}</th>
                        <th>חברת תעופה{this.getAirline()}</th>
                        <th>{this.getDestinationAndDate()}</th>
                        <th>{this.getDeparturePointAndDate()}</th>
                    </tr>
                </thead>
                <tbody>
                    <FlightBody open={this.state.open} flightInfo={this.props.flightInfo} />
                </tbody>
            </table>
        );
    }
}

export default FlightContainer;
