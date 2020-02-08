import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    }

    handleChange(e) {
        console.log(e);
        this.setState({newItem: e.target.value});
    }

    onSubmit() {
        if (this.state.newItem) {
            this.state.items.push(this.state.newItem);
            this.setState({
                              newItem: undefined
                          })
        }
    }

    render() {
        return (
            <div className="root">
                <form className="form" noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField className="input" id="standard-basic" label="Enter your item">
                        <input id="my-input" aria-describedby="my-helper-text" value={this.state.newItem} onChange={this.handleChange}/>
                        <label htmlFor="my-input">Enter your item</label>
                    </TextField>
                    <Button className="input" variant="contained" color="primary" type="submit">
                        Add to list
                    </Button>
                </form>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className="title">
                            Shopping List
                        </Typography>
                        <div className="demo">
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