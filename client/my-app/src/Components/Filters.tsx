import React from 'react';
import '../Styles/Filters.scss';
import CheckList from './CheckList';
import MultiRangeSlider from './MultiRangeSlider';

class Filters extends React.Component<{ setFilterOptions: any }, {}> {
    state = {
        priceRanges: [0, 0],
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
        if (prevState !== this.state) {
            this.props.setFilterOptions([this.state.selectedPriceRange, this.state.selectedAFNames, this.state.selectedStops]);
        }
    }

    setSelectedAFNames = (selectedAFNames: Array<any>) => {
        this.setState({ selectedAFNames: selectedAFNames });
    }
    setSelectedStops = (selectedStops: Array<any>) => {
        this.setState({ selectedStops: selectedStops });
    }
    setSelectedPriceRange = (min: any, max: any) => {
        if (!(this.state.selectedPriceRange[0] == min && this.state.selectedPriceRange[1] == max)) {
            this.setState({ selectedPriceRange: [min, max] });
        }
    }

    render() {
        return (
            <div className="filter-container">
                <CheckList checkList={this.state.afNames} setSelected={this.setSelectedAFNames} nameOfList="Airline:" />
                <CheckList checkList={this.state.stops} setSelected={this.setSelectedStops} nameOfList="Number of stops:" />
                <MultiRangeSlider
                    min={0}
                    max={3000}
                    onChange={({ min, max }) => this.setSelectedPriceRange(min, max)}
                />
            </div>
        );
    }
}



export default Filters;
