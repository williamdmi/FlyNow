import React from 'react';
import '../Styles/Filters.scss';
import CheckList from './CheckList';
import MultiRangeSlider from './MultiRangeSlider';

class Filters extends React.Component<{ setFilterOptions: any }, {}> {
    state = {
        priceRanges: [0, 0],
        selectedPriceRange: [],
        airlinesNames: [],
        selectedAFNames: [],
        stops: [],
        selectedStops: []
    };

    //On component mount, fetch the filter options from the server and set them in states
    async componentDidMount() {
        const filterOptions: Array<any> = await (await fetch(`http://127.0.0.1:4000/api/filterOptions`)).json() as Array<any>;
        this.setState({
            airlinesNames: filterOptions[2],
            stops: filterOptions[3]
        })
    }

    //Every component update check if states changed, if they did update the filter options in the parent
    async componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState !== this.state) {
            this.props.setFilterOptions([this.state.selectedPriceRange, this.state.selectedAFNames, this.state.selectedStops]);
        }
    }

    //Set state to selected airelines
    setSelectedAFNames = (selectedAFNames: Array<any>) => {
        this.setState({ selectedAFNames: selectedAFNames });
    }

    //Set state to selected numvber of stops
    setSelectedStops = (selectedStops: Array<any>) => {
        this.setState({ selectedStops: selectedStops });
    }

    //Set state to price range
    setSelectedPriceRange = (min: any, max: any) => {
        if (!(this.state.selectedPriceRange[0] == min && this.state.selectedPriceRange[1] == max)) {
            this.setState({ selectedPriceRange: [min, max] });
        }
    }

    render() {
        return (
            <div className="filter-container">
                <CheckList checkList={this.state.airlinesNames} setSelected={this.setSelectedAFNames} nameOfList="Airline:" />
                <CheckList checkList={this.state.stops} setSelected={this.setSelectedStops} nameOfList="Number of stops:" />
                <MultiRangeSlider min={0} max={3000} onChange={({ min, max }) => this.setSelectedPriceRange(min, max)} />
            </div>
        );
    }
}

export default Filters;
