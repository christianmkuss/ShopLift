import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './ReplacementList.css';
import PropTypes from 'prop-types';
import withEvents from "../EventBus/withEvents";

class ReplacementList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.props.EventBus.addEventListener("GIVE_ITEMS", event => {
            this.setState({ items: event.detail.items });
        })
    }

    render() {
        if (this.props.isVisible) {
            return (
                <div className="root replacementList">
                    <h3>It's time to ShopLift!</h3>
                    <p>Click the dropdown menus to view potential, more sustainable food swaps!</p>
                    {this.state.items.map(value => (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className="heading">{value}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    stuff
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
            );
        } else {
            return null;
        }
    }
}

ReplacementList.propTypes = {
    EventBus: PropTypes.object
}

export default withEvents(ReplacementList);
