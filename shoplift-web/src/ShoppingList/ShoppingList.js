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

/*const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    },
    input: {
        height: 50
    }

}));*/

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: undefined,
            items: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleChange(e) {
        console.log(`change`);
        this.setState({newItem: e.target.value});
    }

    onSubmit() {
        console.log(`submit`);
        if (this.state.newItem) {
            this.state.items.push(this.state.newItem);
            this.setState({
                              newItem: undefined
                          })
        }
    }

    onDelete(value) {
        console.log(`delete`);
        //this.state.items.splice(this.state.items.indexOf(value),1);
    }

    render() {
        return (
            <div className="root">
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
                        <ListItem className="listRow">
                            <ListItemText primary={value}/>
                            <ListItemSecondaryAction>
                                <div key={value}>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={this.onDelete(value)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }

}

export default ShoppingList;

/*export default function ShoppingList() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField className={classes.input} id="standard-basic" label="Enter your item">
                    <input id="my-input" aria-describedby="my-helper-text"/>
                    <label htmlFor="my-input">Enter your item</label>
                </TextField>
                <Button className={classes.input} variant="contained" color="primary" type="submit" onClick={(data) =>
                    console.log("hi")}>
                    Add to list
                </Button>
            </form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Shopping List
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Single-line item"
                                />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}*/