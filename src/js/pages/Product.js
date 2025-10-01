/*
  Mission1. 도서 추가기능
  + 도서명과 가격을 입력 후 "확인" 버튼 클릭하면 도서가 추가된다.
  + 도서명과 가격을 입력 후 "엔터키" 입력 시 도서가 추가된다.
  + 입력값이 누락되었을 경우 추가되지 않는다. (예외상황)
  + 도서 추가가 완료되면 입력 필드는 초기화한다.
  + 도서 추가 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.

  Mission2. 도서 수정기능
  + 도서 정보의 "수정" 버튼 클릭시 모달 창이 뜬다
  + 모달 창이 열리면 수정할 도서의 기존 도서명과 가격이 미리 입력되어있다.
  + 모달창을 통해 신규 도서명, 가격을 입력받고 저장 버튼 클릭시 도서명과 가격을 수정할 수 있다.

  Mission3. 도서 삭제기능
  + 도서 정보의 "삭제" 버튼 클릭시 브라우저에 제공되는 confirm창을 띄운다.
  + 해당 confirm 창에서 "확인" 버튼이 클릭되면 해당 도서가 삭제된다.
  + 도서 삭제 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.
*/

/*
  + 도서 데이터를 localStorage에 저장(기록, Write)한다.
    + 신규 도서 추가시 저장
    + 기존 도서 수정시 저장
    + 기존 도서 삭제시 저장
  - 도서 데이터를 localStorage에서 읽어(조회, Read)한다.
    - 상품 관리 페이지 최초 로드 시 'IT' 카테고리의 도서 데이터를 localStorage에서 읽어온다.
    - 각 카테고리 클릭시 마다 해당 카테고리의 도서 데이터를 localStorage에서 읽어온다.

  - 'IT' 카테고리의 도서들을 관리(추가,수정,삭제)한다.
  - '기술과학' 카테고리의 도서들을 관리(추가,수정,삭제)한다.
  - '문학' 카테고리의 도서들을 관리(추가,수정,삭제)한다.
  - '역사' 카테고리의 도서들을 관리(추가,수정,삭제)한다.


*/
// 생성자 함수로 만들어봄
const $ = (selector) => document.querySelector(selector);

function Product() {
  // Product내에서의 상태(변하는 데이터) - 도서

  // 도서 상태 관리를 위한 변수 (도서 추가/수정/삭제)
  this.books = [];

  // 카테고리 상태 관리를 위한 변수
  this.currentCategory = {}; // code : xx, name: xx

  // 초기화 메소드
  this.init = () => {
    // 카테고리상태 초기화
    this, (this.currentCategory = { code: "it", name: "IT" });
    renderCategory();

    // 도서상태 초기화 // ??? 조느라 못봄.. 영상 시청
    this.books = store.getLocalStorage("books") || {
      it: [],
      science: [],
      literature: [],
      history: [],
    }; // null 반환, 빈 배열로 초기화
    if (this.books.length !== 0) renderBook();
  };

  // 렌더링용 함수1. 도서 정보 렌더링
  const renderBook = () => {
    const bookItems = //
      this.books[this.currentCategory.code] // [{}, {}, ..]
        .map((book) => {
          // .map() 순행한 뒤 결과 반환
          return `
            <li class="book-item">
              <div class="book-info">
                <span class="book-name">${book.title}</span>
                <span class="book-price">₩${book.price.toLocaleString()}</span>
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
        })
        .join(""); // ['<li></li>', '<li></li>', ..] => '<li></li><li></li>'

    $("#book-list").innerHTML = bookItems;
    $("#book-count").innerText = this.books[this.currentCategory.code].length; //$("#book-list").children.length; // 현재 카테고리의 도서의 갯수
  };

  // 렌더링용 함수2. 카테고리 정보 렌더링
  const renderCategory = () => {
    $("#book-category-name").innerText = this.currentCategory.name;
    document.querySelectorAll(".category-btn").forEach((categoryBtn) => {
      categoryBtn.classList.toggle(
        "active",
        categoryBtn.dataset.categoryCode === this.currentCategory.code
      ); // toggle(클래스, boolean 클래스가 추가될 조건)
    });
  };
  // 1) [{title: xx, name:xx, categry: xx}]
  // 2) it : //

  // 기능용 함수1. 도서 추가 기능
  const registBook = () => {
    const bookName = $("#book-name-input").value; // 도서명 입력값 담을 변수
    const bookPrice = Number($("#book-price-input").value); // 가격 입력값 담을 변수

    // 입력값 유효성 검증이 필요
    // bookName이 누락되었거나 bookPrice 누락되었을 경우
    if (!bookName.trim() || !bookPrice) {
      //.trim() 빈값 삭제? 찾아봐야될듯
      alert("값이 누락되었습니다. 값을 다 입력해주세요.");
      return; // 빠져 나간다?
    }

    // {it: [], science: [], literature: [], ...}
    // 1) 도서 상태 변경 (새로운 도서 추가)
    this.books[this.currentCategory.code].push({
      // 현재 선택되어있는 카테고리 코드의 프로퍼티값
      title: bookName,
      price: bookPrice,
    });

    // 2) 변경된 도서 상태 저장
    store.setLocalStorage("books", this.books);
    renderBook();

    // 현재 this.books에 담겨있는 도서들을 다 li요소로 만들어서 한꺼번에 출력

    // 변수에 담기
    //toLocaleString() ,(금액) 표시
    // const bookItem = `
    //   <li class="book-item">
    //     <div class="book-info">
    //       <span class="book-name">${bookName}</span>
    //       <span class="book-price">₩${bookPrice.toLocaleString()}</span>
    //     </div>
    //     <div class="book-actions">
    //       <button
    //         class="edit-btn modal-toggle-btn"
    //         data-modal-target="editModal"
    //       >
    //         수정
    //       </button>
    //       <button class="delete-btn">삭제</button>
    //     </div>
    //   </li>
    // `;

    // 요게 헷갈리네
    //$("#book-list").insertAdjacentHTML("beforeend", bookItem);

    // 입력폼 초기화
    $("#book-regist-form").reset();
    $("#book-name-input").focus();

    // 도서의 갯수 카운트
  };

  // 기능용 함수2_1. 도서 수정폼에 기존데이터 출력
  const editBookForm = (e) => {
    const $bookItem = e.target.closest(".book-item");
    const bookName = $bookItem.querySelector(".book-name").innerText;
    const bookPrice = Number(
      $bookItem.querySelector(".book-price").innerText.replace(/[₩,]/g, "")
    );
    // Array.from 배열화?
    const bookIndex = Array.from($("#book-list").children).indexOf($bookItem);

    $("#edit-book-name").value = bookName;
    $("#edit-book-price").value = bookPrice;
    $("#edit-book-index").value = bookIndex;
  };

  // 기능용 함수2_2. 도서 수정 기능
  const editBook = () => {
    const editBookName = $("#edit-book-name").value;
    const editBookPrice = Number($("#edit-book-price").value);
    const editBookIndex = $("#edit-book-index").value;

    // 1) 도서 상태 변경 (기존 도서 찾아서 수정)
    this.books[this.currentCategory.code][editBookIndex] = {
      title: editBookName,
      price: editBookPrice,
    };

    // 2) 변경된 상태 기록 (덮어씌워짐)
    store.setLocalStorage("books", this.books);

    // 3) 변경된 상태 기반으로 요소 렌더링
    updateBookCount();
    // const $bookItem = $("#book-list").children[editBookIndex];
    // $bookItem.querySelector(".book-name").innerText = editBookName;
    // $bookItem.querySelector(
    //   ".book-price"
    // ).innerText = `₩${editBookPrice.toLocaleString()}`;

    //$("#book-list").innerHTML = bookItems;
    renderBook();

    $("#editModal .modal-close").click();
  };

  // 기능용 함수3. 도서 삭제 기능
  const deleteBook = (e) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      // 1) 도서 상태 변경 (기존 도서 삭제)
      const deleteBookIndex = Array.from($("#book-list").children).indexOf(
        e.target.closest(".book-item")
      );
      this.books[this.currentCategory.code].splice(deleteBookIndex, 1);

      // 2) 변경된 상태 기록
      store.setLocalStorage("books", this.books);

      // 3) 변경된 상태 기반으로 요소 렌더링
      renderBook();

      // 도서 제거
      //e.target.closest(".book-item").remove();

      // 총 도서의 갯수 카운팅해서 출력
    }
  };

  // 재사용 함수
  // const updateBookCount = () => {
  //   $("#book-count").innerText = $("#book-list").children.length;
  // };

  // 저장소 객체
  const store = {
    setLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getLocalStorage(key) {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  // Mission1. 도서 추가
  // 1) 엔터키 입력 또는 확인버튼 클릭시 (form submit시) 입력된 도서 정보 가져오기
  $("#book-regist-form").addEventListener("submit", (e) => {
    e.preventDefault(); // 기본이벤트 방지
    registBook();
  });

  // Mission2_1. 도서 수정
  $("#book-list").addEventListener("click", (e) => {
    // 클릭이벤트가 발생한 요소(이벤트 대상)가 수정버튼일 때만
    if (e.target.classList.contains("edit-btn")) {
      editBookForm(e);
    }

    // 이벤트 대상이 삭제버튼일 때
    if (e.target.classList.contains("delete-btn")) {
      deleteBook(e);
    }
  });

  // Mission2_2. 도서 수정
  // 모달창에서 수정요청시(submit, 저장클릭시) 입력된 도서명, 가격 가져오기
  $("#book-edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    editBook();
  });

  // 각 카테고리별 버튼 클릭시 => 해당 카테고리 문구가 하단 보여져야됨 + active 효과
  $(".category-select").addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
      //const currentCategoryCode = e.target.dataset.categoryCode;
      //const currentCategoryName = e.target.innerText;

      // 1) 카테고리 상태 변화
      this.currentCategory = {
        code: e.target.dataset.categoryCode,
        name: e.target.innerText,
      };

      // 변경된 카테고리 상태 기반으로 렌더링
      renderCategory();
      renderBook();
    }
  });
}

const product = new Product(); // 객체 생성 하듯이 해보기
product.init(); // 초기화 시키기
