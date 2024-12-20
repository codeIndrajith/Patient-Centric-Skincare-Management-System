import { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { removeQuestions } from '../slices/questionsSlice';
import derma from '../assets/derma.png';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(removeQuestions());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
  };

  const searchResult = () => {
    console.log(searchQuery);
    setSearchQuery('');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="px-4">
        <Container fluid style={{ padding: '0 5%' }}>
         
          <Col className="d-flex align-items-center justify-content-between">
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                src={derma}
                alt="DermaDivine"
                className="w-50 w-md-25"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          </Col>
    

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Col className="d-flex gap-3 flex-col justify-content-end align-items-center">
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt />{' '}
                      <span style={{ color: 'white', fontWeight: '700' }}>
                        Sign In
                      </span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register" className="ms-3">
                    <Nav.Link>
                      <FaSignOutAlt />{' '}
                      <span style={{ color: 'white', fontWeight: '700' }}>
                        Sign Up
                      </span>
                    </Nav.Link>
                  </LinkContainer>
                </Col>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
