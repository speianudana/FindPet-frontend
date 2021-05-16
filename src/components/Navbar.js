import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink} from "shards-react";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
//------------------------------------------------------------------------------
      <Navbar className="color-nav">
        <Link to={"/"} className="navbar-brand">
          <img src="LOGO1.png"/>
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              <h6>Acasă</h6>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/animale-pierdute"} className="nav-link">
              <h6>Animale pierdute</h6>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/animale-găsite"} className="nav-link">
              <h6>Animale găsite</h6>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/istorii-cu-suces"} className="nav-link">
              <h6>Istorii de success</h6>
            </Link>
          </li>
          {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
          )}

          {currentUser && (
              <li className="nav-item">
                <Link to={"/myPosts"} className="nav-link">
                  <h6>Postările mele</h6>
                </Link>
              </li>
          )}
          {currentUser && (
              <li className="nav-item">
                <Link to={"/createPost"} className="nav-link">
                  <h6>Creează o postare</h6>
                </Link>
              </li>
          )}

        </div>

        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
              </form>
              {/*<li className="nav-item">*/}
              {/*    <Link to={"/profile"} className="nav-link">*/}
              {/*        {currentUser.username}*/}
              {/*    </Link>*/}
              {/*</li>*/}
              //------------
              {/*<List>*/}
              {/*    */}
              {/*    <Link to={"/myPosts"} className="nav-link">*/}
              {/*        <h6>Postările mele</h6>*/}
              {/*    </Link>*/}

              {/*    <Link to={"/createPost"} className="nav-link">*/}
              {/*        <h6>Creează o postare</h6>*/}
              {/*    </Link>*/}
              {/*</List>*/}
              <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                  <img
                      className="user-avatar rounded-circle mr-2"
                      // src="https://t4.ftcdn.net/jpg/01/22/26/41/240_F_122264106_LT3eZSVPB3AJSvj0cEkmrG2FMntQHaPS.jpg"
                      src={currentUser.userPhoto}
                      alt="User Avatar"
                  />{" "}
                  {/*<Avatar style={{ display: 'inline-block'}}*/}
                  {/*    className="avatar"*/}
                  {/*    src="https://t4.ftcdn.net/jpg/01/22/26/41/240_F_122264106_LT3eZSVPB3AJSvj0cEkmrG2FMntQHaPS.jpg"*/}
                  {/*/>*/}
                  <span style={{ display: 'inline-block'}} className="d-none d-md-inline-block">{currentUser.username}</span>

                </DropdownToggle>
                <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                  <DropdownItem tag={Link} to={`/userDetails/${currentUser.id}`}>
                    Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem className="text-danger">
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        Logout
                      </a>
                    </li>
                  </DropdownItem>
                </Collapse>
              </NavItem>
            </div>
        ) : (


            <div className="navbar-nav ml-auto">
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
        )}
      </Navbar>
    </>
  );
}

export default Navbar;
