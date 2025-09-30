/*
  Mission1. 도서 추가기능
  + 도서명과 가격을 입력 후 "확인" 버튼 클릭하면 도서가 추가된다.
  + 도서명과 가격을 입력 후 "엔터키" 입력 시 도서가 추가된다.
  + 입력값이 누락되었을 경우 추가되지 않는다. (예외상황)
  + 도서 추가가 완료되면 입력 필드는 초기화한다.
  + 도서 추가 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.

  Mission2. 도서 수정기능
  - 도서 정보의 "수정" 버튼 클릭시 모달 창이 뜬다
  - 모달 창이 열리면 수정할 도서의 기존 도서명과 가격이 미리 입력되어있다.
  - 모달창을 통해 신규 도서명, 가격을 입력받고 저장 버튼 클릭시 도서명과 가격을 수정할 수 있다.

  Mission3. 도서 삭제기능
  - 도서 정보의 "삭제" 버튼 클릭시 브라우저에 제공되는 confirm창을 띄운다.
  - 해당 confirm 창에서 "확인" 버튼이 클릭되면 해당 도서가 삭제된다.
  - 도서 삭제 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.
*/
// 생성자 함수로 만들어봄
const $ = (selector) => document.querySelector(selector);
function Product() {
  // Mission1. 도서 추가
  // 1) 엔터키 입력 또는 확인버튼 클릭시 (form submit시) 입력된 도서 정보 가져오기
  $("#book-regist-form").addEventListener("submit", (e) => {
    e.preventDefault(); // 기본이벤트 방지

    const bookName = $("#book-name-input").value;
    const bookPrice = Number($("#book-price-input").value);

    // 입력값 검증이 필요
    // bookName이 누락되었거나 bookPrice 누락되었을 경우
    if (!bookName.trim() || !bookPrice) {
      //.trim() 빈값 삭제? 찾아봐야될듯
      alert("값이 누락되었습니다. 값을 다 입력해주세요.");
      return; // 빠져 나간다?
    }

    const bookItem = `
      <li class="book-item">
        <div class="book-info">
          <span class="book-name">${bookName}</span>
          <span class="book-price">₩${bookPrice.toLocaleString()}</span>
        </div>
        <div class="book-actions">
          <button
            class="edit-btn modal-toggle-btn"
            data-modal-target="editModal"
          >
            수정
          </button>
          <button class="delete-btn">삭제</button>
        </div>
      </li>
    `;

    // 요게 헷갈리네
    $("#book-list").insertAdjacentHTML("beforeend", bookItem);

    // 입력폼 초기화
    $("#book-regist-form").reset();
    $("#book-name-input").focus();

    // 도서의 갯수 카운트
    $("#book-count").innerText = $("#book-list").children.length;
  });

  // Mission2. 도서 수정
  $("#book-list").addEventListener("click", (e) => {
    // 클릭이벤트가 발생한 요소(이벤트 대상)가 수정버튼일 때만
    if (e.target.classList.contains("edit-btn")) {
      const $bookItem = e.target.closest(".book-item");
      const bookName = $bookItem.querySelector(".book-name").innerText;
      const bookPrice = Number(
        $bookItem.querySelector(".book-price").innerText.replace(/[₩,]/g, "")
      );

      //console.log(bookName, bookPrice);

      $("#edit-book-name").value = bookName;
      $("#edit-book-price").value = bookPrice;
    }
  });
}

const product = new Product(); // 객체 생성 하듯이 해보기
