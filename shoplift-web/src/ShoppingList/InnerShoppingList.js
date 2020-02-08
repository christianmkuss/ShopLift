import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React from "react";

export default function InnerShoppingList(items) {
    function onDelete(value) {

    }

    return (
        <div>
            <Typography variant="h6" className="title">
                Shopping List
            </Typography>
            <List className="demo">
                {items.map(value => (
                    <div>
                        <ListItem>
                            <ListItemText primary={value}/>
                            <ListItemSecondaryAction>
                                <div>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={this.onDelete(value)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    );
}