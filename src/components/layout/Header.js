import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Logo from "./partials/Logo";
import { Modal } from "antd";
import Login from "./Login";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { userContext } from "../../context/userProvider";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  className,
  navPosition,
  hideNav,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);
  const [isModalOpen, setCloseModal] = useState(false);
  const { user: userInfo, setUser: setUserInfo } = useContext(userContext);

  const nav = useRef(null);
  const hamburger = useRef(null);
  console.log(userInfo)

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  }, []);

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const signOut = () => {
    localStorage.removeItem("user-info");
    setUserInfo({});
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );
  const handleShow = (e) => {
    e.preventDefault();
    setCloseModal(true);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setCloseModal(false);
  };
  const items = userInfo.userType === 'mechanic' ? [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/Mechanic">
          Orders
        </a>
      ),
    },
  ] : [{
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Place Order
      </a>
    ),
  },];
  const menu = (
    <Menu
      items={items}
    />
  );
  
  const DropdownOption =userInfo.userType =="mechanic"?menu:[] 
  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Logo />
          <span className="logo-name">MechService</span>
          {!hideNav && (
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
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  {
                    <ul className="list-reset header-nav-right">
                      {!Object.keys(userInfo).length ? (
                        <li>
                          <button
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={handleShow}
                          >
                            Login
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            className="button button-primary button-wide-mobile button-sm"
                            onClickCapture={signOut}
                          >
                            Logout
                          </button>
                        </li>
                      )}
                    </ul>
                  }
                  {!!Object.keys(userInfo).length && (
                    <Dropdown overlay={menu}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          Welcome {userInfo.name}{userInfo.userType}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  )}
                </div>
              </nav>
              <Modal
                title="Please Login to continue"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
              >
                <Login onCancel={() => setCloseModal(false)} />
              </Modal>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
