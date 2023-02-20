import React from 'react';
import '../Styles/Main.scss';
import '../Styles/FlightContainer.scss';


class FlightBody extends React.Component<{ open: boolean, flightInfo: any }, {}> {

    //Get departure items and return jsx element with the city and date
    getFlightInfoAndDate(departureInfo: any): JSX.Element {
        const city: string = departureInfo["City"];
        let date: string = departureInfo["DateTime"].replaceAll("-", "/").replace("T", " - ");
        date = date.substring(0, date.length - 3);
        return (<> <div className='city'>{city}</div>
            <div className='date'>{date}</div>
        </>);
    }

    //Create the table body and return the jsx array
    createTableBody(): JSX.Element {
        //Create new row for each leg
        return this.props.flightInfo["Segments"]["Legs"].map((element: any) => {
            const departureInfo: any = element["DeparturePoint"];
            const arrrivalInfo: any = element["ArrivalPoint"];
            //Create the row with all the needed information 
            let row: Array<JSX.Element> = [];
            row.push(<td key={Math.random() * 10000000}></td>)
            row.push(<td key={Math.random() * 10000000}>טיסה : {element["FlightNumber"]}# </td>)
            row.push(<td key={Math.random() * 10000000}>{element["AirlineName"]} </td>)
            row.push(<td key={Math.random() * 10000000}>{this.getFlightInfoAndDate(arrrivalInfo)} </td>)
            row.push(<td key={Math.random() * 10000000}>{this.getFlightInfoAndDate(departureInfo)} </td>)
            return (<tr key={Math.random() * 10000000}>{row}</tr>);
        });
    }

    render(): JSX.Element {
        //If the button is closed, no need to render the body
        if (this.props.open === false) {
            return (<></>);
        }
        //Button is open so we create the table body
        return (
            <>
                {this.createTableBody()}
            </>
        );
    }
}

export default FlightBody;
