import React, { useState, useEffect } from 'react';
import Menu from './ui/Menu';

export default function Tourme({ currentRoleForUser }) {
  const [menuToggle, setMenuToggle] = useState(false);

  const menuToggleHandler = (isMenuOpen) => {
    setMenuToggle((_) => isMenuOpen);
  };

  //Handle Side Effect when Menu is Toggled
  useEffect(() => {}, [menuToggle]);

  return (
    <div>
      <Menu
        menuToggleHandler={menuToggleHandler}
        roleList={currentRoleForUser}
      />
    </div>
  );
}
