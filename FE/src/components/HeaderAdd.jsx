import React, { useState } from "react";
import images from "../../src/assets/loadImg";
import '../styles/HeaderAddData.css'
function HeaderAdd() {
    const [menuOpen, setMenuOpen] = useState(false);

  // Hàm để mở menu
  const openMenu = () => {
    setMenuOpen(true);
  };

  // Hàm để đóng menu
  const closeMenu = () => {
    setMenuOpen(false);
  };
   
  return (
    
    <header className="header">
    <div className="logo-container">
      <img src={images["logo.png"]} alt="Tuấn Logo" className="logo" />
    </div>

    <div className="right-container">
      VIỆT NAM
      <div className="menu">
        {/* Nút để mở menu */}
        <button onClick={openMenu}>☰</button>
      </div>
    </div>
    {/* Menu hiển thị khi trạng thái mở */}
   {menuOpen && (
    <div className="menu-content">
      <button className="close-button" onClick={closeMenu}>
        ×
      </button>
      <ul>
        <li>
          <a href="#">Điều khoản & Chính sách</a>
        </li>
        <li>
          <a href="#">Câu hỏi thường gặp</a>
        </li>
        <li>
          <a href="#">Tài Khoản Của Tôi</a>
        </li>
        <li>
          <a href="#">Hỗ trợ</a>
        </li>
        <li>
          <a href="#">Về chúng tôi</a>
        </li>
      </ul>
    </div>
  )}
  </header>
  

 

  )
}

export default HeaderAdd