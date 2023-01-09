export const TYPES = {
  date: "date",
  created_time: "created_time",
  select: "select",
  rich_text: "rich_text",
  title: "title",
  number: "number",
};
Object.freeze(TYPES);

export const MAINCATEGORY = [
  { code: "home", value: "주거비용", color: "#c0392b" },
  { code: "insurance", value: "보험", color: "#d35400" },
  { code: "saving", value: "저축", color: "#f39c12" },
  { code: "investment", value: "투자", color: "#f1c40f" },
  { code: "mobile", value: "통신비", color: "#16a085" },
  { code: "parent", value: "부모", color: "#1abc9c" },
  { code: "living", value: "생활비", color: "#27ae60" },
  { code: "food", value: "식비", color: "#2ecc71" },
  { code: "baby", value: "육아비용", color: "#2980b9" },
  { code: "traffic", value: "차량/교통", color: "#3498db" },
  { code: "individual", value: "개인비용", color: "#8e44ad" },
  { code: "hospital", value: "병원비", color: "#9b59b6" },
  { code: "culture", value: "문화생활", color: "#2c3e50" },
  { code: "travel", value: "여행", color: "#34495e" },
  { code: "ceremony", value: "경조사", color: "#7f8c8d" },
  { code: "etc", value: "기타", color: "#bdc3c7" },
];
Object.freeze(MAINCATEGORY);

export const SUBCATEGORY = [
  { code: "rent", value: "임대료", upperCode: "home" },
  { code: "management", value: "관리비", upperCode: "home" },
  { code: "electricity", value: "전기", upperCode: "home" },
  { code: "water", value: "수도", upperCode: "home" },
  { code: "gas", value: "가스", upperCode: "home" },
  { code: "hanwhaInsurance", value: "한화생명(도연)", upperCode: "insurance" },
  { code: "samsungInsurance", value: "삼성생명(도연)", upperCode: "insurance" },
  { code: "savings1", value: "적금(도연1)", upperCode: "saving" },
  { code: "subscription", value: "청약", upperCode: "saving" },
  { code: "stock", value: "주식", upperCode: "investment" },
  { code: "dMobile", value: "도연(통신비)", upperCode: "mobile" },
  { code: "sMobile", value: "수진(통신비)", upperCode: "mobile" },
  { code: "inLawHouse", value: "시댁", upperCode: "parent" },
  { code: "wifeInLaw", value: "처가", upperCode: "parent" },
  { code: "normal", value: "일반생활비", upperCode: "living" },
  { code: "food", value: "식자재", upperCode: "living" },
  { code: "localCurrency", value: "화폐구매비", upperCode: "living" },
  { code: "lunch", value: "점심(재택)", upperCode: "food" },
  { code: "eatOut", value: "외식(+배달)", upperCode: "food" },
  { code: "snack", value: "간식", upperCode: "food" },
  { code: "beverage", value: "주류/음료", upperCode: "food" },
  { code: "cafe", value: "카폐", upperCode: "food" },
  { code: "product", value: "육아용품", upperCode: "baby" },
  { code: "hospital", value: "병원비", upperCode: "baby" },
  { code: "event", value: "로운이행사", upperCode: "baby" },
  { code: "education", value: "놀이/교육", upperCode: "baby" },
  { code: "babyFood", value: "이유식", upperCode: "baby" },
  { code: "gasoline", value: "주유", upperCode: "traffic" },
  { code: "parking", value: "주차/통행료", upperCode: "traffic" },
  { code: "public", value: "대중교통", upperCode: "traffic" },
  { code: "taxi", value: "택시", upperCode: "traffic" },
  { code: "carInsurance", value: "자동차보험", upperCode: "traffic" },
  { code: "carManagement", value: "차량관리비", upperCode: "traffic" },
  { code: "sIndi", value: "수진용돈", upperCode: "individual" },
  { code: "dIndi", value: "도연용돈", upperCode: "individual" },
  { code: "special", value: "특별비용", upperCode: "individual" },
  { code: "dHospital", value: "도연병원", upperCode: "hospital" },
  { code: "sHospital", value: "수진병원", upperCode: "hospital" },
  { code: "movie", value: "영화/공연", upperCode: "culture" },
  { code: "subscribe", value: "OTT/구독", upperCode: "culture" },
  { code: "admission", value: "입장료", upperCode: "culture" },
  { code: "domestic", value: "국내여행", upperCode: "travel" },
  { code: "Overseas", value: "해외여행", upperCode: "travel" },
  { code: "family", value: "가족/친척", upperCode: "ceremony" },
  { code: "colleague", value: "지인/동료", upperCode: "ceremony" },
  { code: "etc", value: "기타", upperCode: "etc" },
];
Object.freeze(SUBCATEGORY);

export const WAY = [
  { code: "creditCard", value: "신용카드" },
  { code: "checkCard", value: "체크카드" },
  { code: "bankAccount", value: "현금/계좌이체" },
  { code: "pay", value: "페이" },
];
Object.freeze(WAY);

export const DETAILWAY = [
  { code: "hyundai", value: "현대카드", upperCode: "creditCard" },
  { code: "kbCard", value: "국민카드", upperCode: "checkCard" },
  { code: "kakaoCard", value: "카카오체크카드", upperCode: "checkCard" },
  { code: "kbBank", value: "국민은행", upperCode: "bankAccount" },
  { code: "toss", value: "토스페이", upperCode: "pay" },
  { code: "kakaoPay", value: "카카오페이", upperCode: "pay" },
  { code: "naver", value: "네이버페이", upperCode: "pay" },
  { code: "zero", value: "제로페이", upperCode: "pay" },
];
Object.freeze(DETAILWAY);

export const FIXTYPE = [
  { code: "fix", value: "고정지출" },
  { code: "nonFix", value: "변동지출" },
];
Object.freeze(FIXTYPE);

export const ISSPEND = [
  { code: true, value: "지출포함" },
  { code: false, value: "지출미포함" },
];
Object.freeze(ISSPEND);
