import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {LoginContext} from "../contexts";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header({enableDrawer,setenableDrawer}) {
    const classes = useStyles();

    const {removeJwt}=useContext(LoginContext)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={()=>{setenableDrawer(!enableDrawer)}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon  />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        MarkDown List
                    </Typography>
                    <Button  color="inherit" >email id</Button>
                    <Button color="inherit" onClick={()=>{removeJwt()}}>LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
