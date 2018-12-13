import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';

import SwipeableViews from 'react-swipeable-views';

import { Avatar, Divider, List, ListItem, ListItemText } from '@material-ui/core';

import { IconButton, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import * as React from 'react';
import '../../styles/account/index.css';

class Account extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 2,
            anchorEl: null,
            data: [
                { label: 'Lithium', autor: 'Nirvana', count: 2, img: 'https://images-eu.ssl-images-amazon.com/images/I/513renRKckL._SS500.jpg' },
                { label: 'War Zone', autor: 'Slayer', count: 2, img: 'https://cdn.europosters.eu/image/750/textile-posterslayer-black-eagle-i56938.jpg' },
                { label: 'Cryomancer', autor: 'Defiler', count: 2, img: 'http://2.bp.blogspot.com/_hWEufXuXSVM/TQyLnplJ5qI/AAAAAAAAAro/Dzydf-dXBGc/s320/43.jpg' }
            ]
        };
    }

    public handleChange = (event: any, value: any) => {
        this.setState({ value });
    };

    public handleChangeIndex = (index: any) => {
        this.setState({ value: index });
    };

    public handleClick = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    public handleClose = () => {
        this.setState({ anchorEl: null });
    };

    public render() {

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div >
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="account-tabs"
                        indicatorColor="secondary"
                        textColor="secondary"
                        fullWidth={true}
                        classes={{ indicator: 'indicator-color' }}
                    >
                        <Tab label="PROFILE" className="account-tab" />
                        <Tab label="MY REQUESTS" className="account-tab" />
                        <Tab label="ACCOUNT" className="account-tab" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <Typography component="div" dir={'0'} style={{ padding: 8 * 3 }}>
                        test
                    </Typography>
                    <Typography component="div" dir={'1'} style={{ padding: 8 * 3 }}>
                        test2
                    </Typography>
                    <Typography component="div" dir={'2'}>
                        <div>
                            <List>
                            <div className="playList-name-group account">Payed To Play Tracks</div>
                                {this.state.data.map((el: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <ListItem>
                                                <Avatar>
                                                    <img className="img-cover" src={el.img} />
                                                </Avatar>
                                                <ListItemText primary={el.label} secondary={el.autor} />
                                                <div className="list-group-button-count">
                                                    <IconButton
                                                        aria-label="More"
                                                        aria-owns={open ? 'long-menu' : ''}
                                                        aria-haspopup="true"
                                                        onClick={this.handleClick}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="long-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={this.handleClose}
                                                    >

                                                        <MenuItem onClick={this.handleClose}>
                                                            {'zzcxcz'}
                                                        </MenuItem>

                                                    </Menu>
                                                    <span className="count"> ${el.count}</span>
                                                </div>
                                            </ListItem>
                                            {index === this.state.data.length -1 ? '' :
                                                <li>
                                                    <Divider inset={true} />
                                                </li>
                                            }
                                        </div>
                                    )
                                })}
                                <div className="stoper-block" />
                            </List>
                        </div>
                    </Typography>

                </SwipeableViews>
            </div>
        )
    }
}

export default Account;