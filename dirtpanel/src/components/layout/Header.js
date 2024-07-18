import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Links from './Links';

import RankBadge from '../badges/RankBadge';

const Header = (props) => {
    return (
        <div>
            <nav id="sidebar" aria-label="Main Navigation">
                <div className="bg-header-dark">
                    <div className="content-header bg-white-10">
                        <a className="link-fx font-w600 font-size-lg text-white" href="/">
                            <span className="smini-visible dirt">
                                <span className="text-white-75">DirtPanel</span>
                            </span>
                            <span className="smini-hidden dirt">
                                DirtPanel
                            </span>
                        </a>
                        <div>
                            <button type="button" className="d-lg-none text-white ml-2" data-toggle="layout" data-action="sidebar_close">
                                <i className="fa fa-times-circle" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content-side content-side-full">
                    {props.authenticated && <Links />}
                </div>
            </nav>
            <header id="page-header">
                <div className="content-header">
                    <div><button type="button" className="btn btn-dual mr-1" data-toggle="layout" data-action="sidebar_toggle">
                        <i className="fa fa-fw fa-bars"></i>
                    </button>

                    </div>
                    <ProfileIcon authenticated={props.authenticated} profilePicture={props.profilePicture} username={props.username} highestRank={props.highestRank} />
                </div>
            </header>
        </div>
    );
}

function ProfileIcon(props) {
    if (props.authenticated) {
        return (
            <div>
                <div className="dropdown d-inline-block">
                    <button type="button" className="btn btn-dual" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="img-avatar img-avatar32 img-avatar-thumb" id="user_avatar_top" src={props.profilePicture} alt="" />
                        <span className="d-none d-sm-inline ml-1">
                            {props.username}&nbsp;
                            <RankBadge type="badge" rank={props.highestRank} />
                        </span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right p-0" aria-labelledby="page-header-user-dropdown">
                        {/*--
                            <div className="bg-primary-darker rounded-top font-w600 text-white text-center p-3">
                                User Options
                            </div>
                            */}
                        <div className="p-2">
                            {/*
                                <a className="dropdown-item" href="/users/settings/">
                                    <i className="far fa-fw fa-building mr-1"></i> Settings
                                </a>
                                                            <div role="separator" className="dropdown-divider"></div>
                                */}
                            <a className="dropdown-item" href="/redirects/logout/">
                                <i className="far fa-fw fa-arrow-alt-circle-left mr-1"></i> Sign Out
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Fragment />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        username: state.auth.userData.username,
        profilePicture: state.auth.userData.profilePicture,
        highestRank: state.auth.highestRank
    }
}

export default connect(mapStateToProps)(Header);
