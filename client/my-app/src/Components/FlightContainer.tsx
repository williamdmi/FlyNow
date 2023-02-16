import React from 'react';
import '../Styles/Main.scss';
import '../Styles/FlightContainer.scss';

class FlightContainer extends React.Component<{ flightInfo:object}, {}> {
    state = {};
    async componentDidMount() {

    }
    render() {
        return (
            <table className='data-table'>
            <thead>
                <tr>
                    <th>tlv 23/12</th>
                    <th>NYC בתאריך Y</th>
                    <th>חברת תעופה AF</th>
                    <th>מחיר לנוסע  </th>
                    <th>הצג \ הסתר מסלול</th>
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
