import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

const MenuBtn = () => {

    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'left' || anchor === 'right',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            <Link to={`/exboard`}>
                <ListItem button> 
                  <ListItemIcon>🍴</ListItemIcon>          
                  <ListItemText primary="식단" />
                </ListItem>
            </Link>
            <Link to={`/ptList`}>
                <ListItem button> 
                  <ListItemIcon>👕</ListItemIcon>          
                  <ListItemText primary="스포츠웨어" />
                </ListItem>
            </Link>
            <Link to={`/`}>
                <ListItem button> 
                  <ListItemIcon>👨 🎓</ListItemIcon>          
                  <ListItemText primary="강의영상" />
                </ListItem>
            </Link>
            <Link to={`/`}>
                <ListItem button> 
                  <ListItemIcon>📃</ListItemIcon>          
                  <ListItemText primary="게시판" />
                </ListItem>
            </Link>

          </List>
        </div>
      );


    return (
        <div>
                <React.Fragment>
                <Button onClick={toggleDrawer("left", true)}><MenuIcon style={{color:"white"}}/></Button>
                <Drawer anchor="left" open={state.left} onClose={toggleDrawer("left", false)}>
                    {list("left")}
                </Drawer>
                </React.Fragment>
        </div>
    );
};

export default MenuBtn;