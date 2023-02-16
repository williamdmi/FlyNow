import React from 'react';
import '../Styles/Main.scss';

class Main extends React.Component {
    state = {clean_data: []};
    async componentDidMount() {
        const json = await (await fetch(`http://127.0.0.1:4000/api/flight/search`)).json() as Array<any>;
        this.setState({ clean_data: { json }})
        console.log(this.state.clean_data); 
    }
    render() {
        return (
            <div className="main">
                
            </div>
        );
    }
}

export default Main;
