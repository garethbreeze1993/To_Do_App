// import React, { useState } from 'react';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText
// } from 'reactstrap';
//
// const Example = (props) => {
//   const [isOpen, setIsOpen] = useState(false);
//
//   const toggle = () => setIsOpen(!isOpen);
//
//   return (
//     <div>
//       <Navbar color="light" light expand="md">
//         <NavbarBrand href="/">reactstrap</NavbarBrand>
//
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             <NavItem>
//               <NavLink href="/components/">Components</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 Options
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem>
//                   Option 1
//                 </DropdownItem>
//                 <DropdownItem>
//                   Option 2
//                 </DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>
//                   Reset
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//
//         </Collapse>
//
//       </Navbar>
//     </div>
//   );
// }
//
// export default Example;

// https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
// https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta

import React from 'react';
import PropTypes from 'prop-types';

const Nav = (props) => {
  const logged_out_nav = (
    <ul>
      <li onClick={() => props.display_form('login')}>login</li>
      <li onClick={() => props.display_form('signup')}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
