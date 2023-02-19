import React from 'react';
import '../Styles/Main.scss';
import '../Styles/FlightContainer.scss';


class FlightBody extends React.Component<{ open: boolean, flightInfo: any }, {}> {
    state = {};
    async componentDidMount() {

    }

    getFlightInfoAndDate(departureInfo: any) {
        const city = departureInfo["City"];
        let date = departureInfo["DateTime"].replace("T", " ");
        date = date.substring(0, date.length - 3);
        return (<> <div className='city'>{city}</div>
            <div className='date'>{date}</div>
        </>);
    }

    createTableBody() {
        const result = this.props.flightInfo["Segments"]["Legs"].map((element: any) => {
            const departureInfo = element["DeparturePoint"];
            const arrrivalInfo = element["ArrivalPoint"];
            let row = [];
            row.push(<td key={Math.random() * 10000000}>{this.getFlightInfoAndDate(departureInfo)} </td>)
            row.push(<td key={Math.random() * 10000000}>{this.getFlightInfoAndDate(arrrivalInfo)} </td>)
            row.push(<td key={Math.random() * 10000000}>{element["AirlineName"]} </td>)
            row.push(<td key={Math.random() * 10000000}>Flight Number: {element["FlightNumber"]} </td>)
            return (<tr key={Math.random() * 10000000}>{row}</tr>);
        });
        return result;
    }

    render() {
        if (this.props.open === false) {
            return (<></>);
        }
        return (
            <>
                {this.createTableBody()}
            </>
        );
    }
}

export default FlightBody;
