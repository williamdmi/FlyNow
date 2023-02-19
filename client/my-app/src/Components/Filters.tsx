import React from 'react';
import '../Styles/Filters.scss';
import CheckList from './CheckList';

class Filters extends React.Component<{ setFilterOptions: any }, {}> {
    state = {
        priceRanges: ["0-500", "500-1000", "1000-1500", "1500-3000"],
        selectedPriceRange: [],
        afNames: [],
        selectedAFNames: [],
        stops: [],
        selectedStops: []
    };

    async componentDidMount() {
        const filterOptions: Array<any> = await (await fetch(`http://127.0.0.1:4000/api/filterOptions`)).json() as Array<any>;
        this.setState({
            afNames: filterOptions[2],
            stops: filterOptions[3]
        })
    }

    async componentDidUpdate(prevProps: any, prevState: any) {      
        if(prevState !== this.state){
            this.props.setFilterOptions([this.state.selectedPriceRange, this.state.selectedAFNames, this.state.selectedStops]);
        }
    }

    setSelectedAFNames = (selectedAFNames: Array<any>) => {
        this.setState({ selectedAFNames: selectedAFNames });
    }
    setSelectedStops = (selectedStops: Array<any>) => {
        this.setState({ selectedStops: selectedStops });
    }
    setSelectedPriceRange = (selectedPriceRange: Array<any>) => {
        this.setState({ selectedPriceRange: selectedPriceRange });
    }

    render() {
        return (
            <div className="filter-container">
                <CheckList checkList={this.state.afNames} setSelected={this.setSelectedAFNames} nameOfList="Airline:" />
                <CheckList checkList={this.state.stops} setSelected={this.setSelectedStops} nameOfList="Number of stops:" />
                <CheckList checkList={this.state.priceRanges} setSelected={this.setSelectedPriceRange} nameOfList="Price ranges:" />
            </div>
        );
    }
}



export default Filters;
