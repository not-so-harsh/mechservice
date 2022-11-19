import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import { Modal } from 'antd';
import Login from './Login'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);
  const [user, setUser] = useState();
  const [isModalOpen, setCloseModal] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  //    console.log("user-info")

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info") || '{}')
    setUser(userInfo)
  }, [])
  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const signOut = () => {
    (localStorage.removeItem("user-info"))
    setIsLoggedin(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );
  const handleShow = (e) => {
    e.preventDefault();
    setCloseModal(true);
    setIsLoggedin(true);

  }
  const handleCancel = (e) => {
    e.preventDefault();
    setCloseModal(false);
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClickCapture={signOut} href="https://www.luohanacademy.com">
              3rd menu item 
            </a>
          ),
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
  );

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          <span className='logo-name'>
            MechService
          </span>
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader ">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  {/* <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="#0" onClick={closeMenu}>Register as mechanic</Link>
                    </li>
                  </ul> */}
                  {
                    <ul
                      className="list-reset header-nav-right"
                    >

                      {!isLoggedin ? (<li>
                        <button className="button button-primary button-wide-mobile button-sm" onClick={handleShow}>Login</button>

                      </li>) : (<li>
                        <button className="button button-primary button-wide-mobile button-sm" onClickCapture={signOut}>Logout</button>
                      </li>)}
                    </ul>}
                  <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                      {!(user && user?.email) ?
                        <Space>
                          Hover me
                          <DownOutlined />
                        </Space>
                        : user.name}
                    </a>
                  </Dropdown>


                </div>
              </nav>
              <Modal title="Please Login to continue" open={isModalOpen} onCancel={handleCancel}>
                <Login onCancel={() =>
                  setCloseModal(false)} />
              </Modal>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
