import { useState, useMemo } from "react";
import "./App.css";
import Star from "./components/Star";
import Dropdown from "./components/Dropdown";
import projectsData from "./components/data"; // data.jsx에서 가져오기
import ProductGrid from "./components/ProductGrid"; // ✅ 추가된 import

function App() {
  const [sortOption, setSortOption] = useState("like");
  const [category, setCategory] = useState("decoration");
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };
  const filteredData = useMemo(() => {
    if (category === "decoration") {
      return projectsData.filter((item) => item.id >= 1 && item.id <= 100);
    } else if (category === "furniture") {
      return projectsData.filter((item) => item.id >= 101 && item.id <= 200);
    } else if (category === "kitchen") {
      return projectsData.filter((item) => item.id >= 201 && item.id <= 300);
    }
    return projectsData;
  }, [category]);
  // 🔴 필터된 데이터에서 정렬 + 9개씩 잘라내기
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    if (sortOption === "like") {
      sorted.sort((a, b) => (b.like || 0) - (a.like || 0));
    } else if (sortOption === "lowPrice") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highPrice") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted.slice(0, 9); // 🔴 9개까지만 보여주기
  }, [filteredData, sortOption]);
  return (
    <div>
      <main>
        <div className="big_Box">
          {/* 큰네모 */}
          <div className="up_Box">
            {/* 위네모 */}
            <button
              className={`up_Box_button ${category === "furniture" ? "active" : ""}`} // 🔴 선택된 카테고리 버튼에 active 클래스 추가
              onClick={() => handleCategoryChange("furniture")} // 🔴 클릭 시 카테고리 변경
            >
              가구
            </button>
            <button
              className={`up_Box_button ${category === "kitchen" ? "active" : ""}`} // 🔴 선택된 카테고리 버튼에 active 클래스 추가
              onClick={() => handleCategoryChange("kitchen")} // 🔴 클릭 시 카테고리 변경
            >
              주방용품
            </button>
            <button
              className={`up_Box_button ${category === "decoration" ? "active" : ""}`} // 🔴 선택된 카테고리 버튼에 active 클래스 추가
              onClick={() => handleCategoryChange("decoration")} // 🔴 클릭 시 카테고리 변경
            >
              장식구
            </button>
          </div>
          <div>
            <Dropdown sortOption={sortOption} onChange={handleSortChange} />{" "}
            {/*  찜높은순 가격높은순 가격낮은순 */}
          </div>
          <div className="down_Box">
            {/* 아래래네모 */}

            <div className="grid_Box">
              <ProductGrid items={sortedData} /> {/* 그리드 배열 3 * 3 */}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer_BigBox">
          <div className="footer_BigBox_2">
            <div className="footer_BigBox_left">
              <h1>logo</h1>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            ></div>
            <div className="footer_BigBox_right">
              <button className="footer_BigBox_right_button">고객센터</button>
              <button className="footer_BigBox_right_button">아용약관</button>
              <button className="footer_BigBox_right_button">오시는길</button>
            </div>
          </div>

          <div className="footer_BigBox_right_inner_center">
            <h4>회사명명 글로벌 아카데미</h4>
            <h4>대표자 홍길동</h4>
            <h4>
              주소 : 도로명 주소: 경기도 화성시 떡전골로 97 , 지번 주소: 경기도
              화성시 병점동 527
            </h4>
            <h4>이메일 : HongGil-dong@gmail.com</h4>
            <h4>개인정보보호책임자 : 홍길동</h4>
            <h4>
              채무지급보증 안내 :당사는 고객님이 현금 결제한 금액에 대해
              채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
            </h4>
          </div>
        </div>

        <button
          className="goTopButton"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⬆️
        </button>
        <button
          className="godownButton"
          onClick={() => window.scrollTo({ top: 4000, behavior: "smooth" })}
        >
          ⬇️
        </button>
      </footer>
    </div>
  );
}

export default App;
