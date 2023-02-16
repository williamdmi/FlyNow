import React from 'react';
import '../Styles/Main.scss';
import '../Styles/FlightContainer.scss';

class FlightContainer extends React.Component<{ flightInfo:any}, {}> {
    state = {};
    async componentDidMount() {

    }
    getDeparturePointAndDate() {
        const city = this.props.flightInfo["Segments"]["Legs"][0]["DeparturePoint"]["City"];
        const date = this.props.flightInfo["Segments"]["Legs"][0]["DeparturePoint"]["DateTime"];
        return(<> <div className='city'>{city}</div>
                  <div className='date'>{date}</div> </>);
    }
    getDestinationAndDate() {
        const lastLeg = this.props.flightInfo["Segments"]["Legs"].slice(-1)[0];
        const city = lastLeg["ArrivalPoint"]["City"];
        const date = lastLeg["ArrivalPoint"]["DateTime"];
        return(<> <div className='city'>{city}</div>
                  <div className='date'>{date}</div> </>);
    }
    getAF() {
        const airline = this.props.flightInfo["Segments"]["Legs"][0]["AirlineName"];
        return(<div className='airline'>{airline}</div>)
    }
    getPrice() {
        const averagePrice = this.props.flightInfo["AveragePrice"];
        const currencySymbol = this.props.flightInfo["CurrencySymbol"];
        return(<div className='airline'>{averagePrice}{currencySymbol}</div>)
    }
    render() {
        return (
            <table className='data-table'>
            <thead>
                <tr>
                    <th>{this.getDeparturePointAndDate()}</th>
                    <th>{this.getDestinationAndDate()}</th>
                    <th>חברת תעופה{this.getAF()}</th>
                    <th>מחיר לנוסע  {this.getPrice()}</th>
                    <th>הצג \ הסתר מסלול{}</th>
                </tr>
            </thead>
            <tbody>
                {}
            </tbody>
        </table>
        );
    }
}

export default FlightContainer;
