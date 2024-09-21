import React, { useState } from "react";
import "../../styles/AddData.css"; // Đảm bảo file CSS được đặt đúng
import images from "../../assets/loadImg.js";
import "../../styles/HeaderAddData.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

function AddData() {
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
    <div>
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
      <section className="background_AddData">
        <div className="background_AddData_1">
          <h1>XÂY DỰNG CƠ THỂ HOÀN HẢO CỦA BẠN</h1>
          <p>THEO ĐỘ TUỔI VÀ CHỈ SỐ BMI CỦA BẠN</p>
          <div className="background_AddData_1_1">
            <div className="background_AddData_1_1_1">
              <div className="background_AddData_1_1_1_1">
                <img src={images["GetDaTa1.png"]}></img>
              </div>
              <div className="background_AddData_1_1_1_2">
                <p>
                  Tuổi: 18-29 <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
            <div className="background_AddData_1_1_1">
              <div className="background_AddData_1_1_1_1">
                <img src={images["GetDaTa2.png"]}></img>
              </div>
              <div className="background_AddData_1_1_1_2">
                <p>
                  Tuổi: 30-39 <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
            <div className="background_AddData_1_1_1">
              <div className="background_AddData_1_1_1_1">
                <img src={images["GetDaTa3.png"]}></img>
              </div>
              <div className="background_AddData_1_1_1_2">
                <p>
                  Tuổi: 40-49 <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
            <div className="background_AddData_1_1_1">
              <div className="background_AddData_1_1_1_1">
                <img src={images["GetDaTa4.png"]}></img>
              </div>
              <div className="background_AddData_1_1_1_2">
                <p>
                  Tuổi: 50 + <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddData;
