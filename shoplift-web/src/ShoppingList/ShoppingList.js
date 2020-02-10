import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './ShoppingList.css';
import withEvents from "../EventBus/withEvents";
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            items:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    async handleChange(e) {
        await this.setState({newItem: e.target.value});
    }

    async onSubmit() {
        await this.setState({ items: [...this.state.items, this.state.newItem]});
        this.props.EventBus.dispatchEvent(new CustomEvent("GIVE_ITEMS",
                                                          {detail: {items: this.state.items}}));
    }

    async onDelete(value) {
        const copy = [...this.state.items];
        copy.splice(this.state.items.indexOf(value),1);
        await this.setState({ items: copy });
        this.props.EventBus.dispatchEvent(new CustomEvent("GIVE_ITEMS",
                                                          {detail: {items: this.state.items}}));
    }

    render() {
        if (this.props.isVisible) {
            return (
                <div className="root">
                    <h3>Let's start selecting your groceries</h3>
                    <p className="paragraph">Add food items you plan on purchasing, and when you're done, we'll find some more sustainable alternatives</p>
                    <span value={this.state.newItem} onChange={this.handleChange}>
                        <TextField className="input" id="standard-basic" label="Enter your item">
                            <input id="my-input" aria-describedby="my-helper-text"/>
                            <label htmlFor="my-input">Enter your item</label>
                        </TextField>
                    </span>
                    <Button className="input inputButton" variant="contained" color="primary" type="button" onClick={this.onSubmit}>
                        Add to list
                    </Button>
                    <Typography variant="h6" className="title">
                        Shopping List
                    </Typography>
                    <List className="list">
                        {this.state.items.map(value => (
                            <ListItem className="listRow" key={value}>
                                <ListItemText primary={value}/>
                                <ListItemSecondaryAction>
                                    <div>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => this.onDelete(value)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            );
        } else {
            return null;
        }

    }

}

ShoppingList.propTypes = {
    EventBus: PropTypes.object
}

export default withEvents(ShoppingList);
