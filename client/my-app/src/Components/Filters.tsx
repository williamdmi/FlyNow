import React from 'react';
import '../Styles/Filters.scss';
import CheckList from './CheckList';

class Filters extends React.Component {
    state = {
        minPrice: 0,
        maxPrice: 0,
        afNames: [],
        selectedAFNames: [],
        stops: [],
        selectedStops:[]
    };

    async componentDidMount() {
        const filterOptions: Array<any> = await (await fetch(`http://127.0.0.1:4000/api/filterOptions`)).json() as Array<any>;
        this.setState({
            minPrice: filterOptions[0],
            maxPrice: filterOptions[1],
            afNames: filterOptions[2],
            stops: filterOptions[3]
        })
    }

    setSelectedAFNames = (selectedAFNames: Array<any>) =>{
        this.setState({selectedAFNames : selectedAFNames});
    }
    setSelectedStops = (selectedStops: Array<any>) =>{
        this.setState({selectedStops : selectedStops});
    }

    render() {
        return (
            <div className="filter-container">
                <CheckList checkList={this.state.afNames} setSelected={this.setSelectedAFNames} nameOfList="Airline:"/>
                <CheckList checkList={this.state.stops} setSelected={this.setSelectedStops} nameOfList="Number Of Stops:"/>
                <div> </div>
            </div>
        );
    }
}



export default Filters;
