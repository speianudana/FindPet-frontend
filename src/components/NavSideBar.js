import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme, fade} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import "../LOGO1.png";
import AuthService from "../services/AuthService";
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MmsIcon from '@material-ui/icons/Mms';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function NavSideBar(props) {
    const user = AuthService.getCurrentUser();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [currentUser] = React.useState(user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        AuthService.logout();
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(currentUser)
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}

            >
                <Toolbar>
                    {currentUser ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                        ):console.log("")}
                    <Link to={"/"} className="navbar-brand">
                        <img src="LOGO1.png"/>
                    </Link>
                    {/*<div className="navbar-nav mr-auto">*/}
                    <Typography variant="h6" color="white">
                        <Link to={"/home"}>
                            Acasă
                        </Link>
                    </Typography>

                    <Typography variant="h6" color="white">

                        <Link to={"/animale-pierdute"} className="nav-link">
                            Animale pierdute
                        </Link>
                    </Typography>
                    <Typography variant="h6" color="white">

                        <Link to={"/animale-găsite"} className="nav-link">
                            Animale găsite
                        </Link>
                    </Typography>
                    <Typography variant="h6" color="white">

                        <Link to={"/istorii-cu-succes"} className="nav-link">
                            Istorii de success
                        </Link>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    {/*</div>*/}
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                edge="end"
                            >
                                <Avatar src={currentUser.userPhoto}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open1}
                                onClose={handleClose}
                            >
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <MenuItem>
                                    <Link to={`/userDetails/${currentUser.id}`} className="nav-link">
                                        Profile</Link></MenuItem>
                                <MenuItem>
                                    <Link to="/login" className="nav-link" onClick={logOut}>Log Out</Link></MenuItem>
                            </Menu>
                        </div>

                    ) : (

                        <div className=" ml-auto">
                            <Typography variant="h6" color="white" style = {{display: 'inline-block'}}>
                            <Link to={"/login"} className="nav-link">
                                Log In
                            </Link>
                        </Typography>

                            <Typography variant="h6" color="white" style = {{display: 'inline-block'}}>
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </Typography>
                        </div>


                    )}
                </Toolbar>
            </AppBar>

            {currentUser && (
                < Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <h6>Meniul meu</h6>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
                        <List>


                            <ListItem button key={"Postările mele"}>
                                <ListItemIcon><DashboardIcon/></ListItemIcon>
                                <ListItemText>
                                    <Link to={"/admin"} >
                                       Dashboard
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        </List>
                    )}
                    <Divider/>
                    <List>
                        <ListItem button key={"Postările mele"}>
                            <ListItemIcon><MmsIcon/></ListItemIcon>
                            <ListItemText>
                                <Link to={"/myPosts"}>
                                    Postările mele
                                </Link> </ListItemText>
                        </ListItem>
                        <ListItem button key={"Crează o postare"}>
                            <ListItemIcon><PostAddIcon/></ListItemIcon>
                            <ListItemText>
                                <Link to={"/createPost"}>
                                    Crează o postare
                                </Link> </ListItemText>
                        </ListItem>

                        <ListItem button key={"Profilul meu"}>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText>
                                <Link to={`/userDetails/${currentUser.id}`}>
                                    Profilul meu
                                </Link> </ListItemText>
                        </ListItem>
                    </List>

                    <Divider/>
                </Drawer>
            )}
        </div>
    );
}