import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Menu from './ui/Menu';

export default function Tourme() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuClickHandler = () => {
    setMenuOpen((oldMenuState) => !oldMenuState);
  };

  return (
    <div>
      <Menu />
    </div>
  );
}
