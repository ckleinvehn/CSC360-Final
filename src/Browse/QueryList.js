// React
import React from 'react';

// Material UI
import { Chip, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';


export default class QueryList extends React.Component {
    render() {
        const chip = {
            margin: '.5rem',
            backgroundColor: 'rgba(52, 105, 161, .2)'
        };

        return this.props.queries.length === 0 ? null :
        (
            <div style={{position: 'relative', backgroundColor: '#EAEAEA', width: 300, padding: '1rem'}}>
                <IconButton style={{position: 'absolute', top: -3, right: -3}} onClick={this.props.handleDeleteAll}><ClearIcon /></IconButton>
                { this.props.queries.map((e, i) => <Chip style={chip} label={e} onDelete={() => this.props.handleDelete(i)} key={i} />) }
            </div>
        );
    }
}
