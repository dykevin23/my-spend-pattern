### my-spend-pattern

1. feature
1. 대시보드(홈)

(이번달 기준)

[ ] 이번달 소비요약
[✓] 분류별 금액 TOP5
[✓] 자주사용하는 분류 TOP5
[ ] 금액별 TOP5
[ ] 최근 소비내역 5건

2.  내역(토스)

[✓] 탭구조(소비/수입)

2-1. 소비(1depth)

[✓] 월별소비 조회(총액)\
[ ] 롤링 메세지 (지난달 대비 소비금액표기, 가장 많이 소비한 카테고리, 지난달 이맘때와 비교)\
[✓] 소비 수단 별 리스트 & 금액(클릭시 상세 리스트)

2-1-1. 상세 리스트(2depth)

[✓] 상단 총 금액\
[✓] 카테고리 필터(tag)\
[✓] 일자 별로 표기(카테고리(tag), 금액, 사용처)\
[✓] 클릭시 상세보기

2-1-2. 상세 소비내역(3depth)

[✓] 상세내역\
[✓] 최근 3개월간 거래내역(거래횟수, 총 금액)\
[✓] 최근 3개월간 거래내역 리스트

2-2. 수입(1depth)

[ ] 월별수입 조회(총액)\
[ ] 일자 별로 표기(카테고리(tag), 금액, 입금처)

2-3. 매달 나가는 돈(고정지출)

[✓] 카테고리별 리스트

2-4. 달력(todo)

3.  입력

[ ] 탭구조(소비입력:default, 수입입력) => tab(컴포넌트)\
[ ] 입력 form => use-react-form(컴포넌트)

4. 통계

[ ] 각종 차트??

5. device
   1)app => IOS, Andriod
   2)pc

6. skills

- React.js
- javascript
- styled-component
- react-query
- recoil
- react-router(v6)

4. component

[ ] button\
[ ] radio\
[ ] card\
[ ] datepicker\
[ ] tab\
[ ] input\
[ ] form

[ ] layout\
[ ] header\
[ ] box

---

1. 디렉토리 구조

   > 1. pages => 1depth page\
   >    home, spendCare
   > 2. components => page별 component & common component\
   >    ui, common, biz
   > 3. data => atom
   > 4. api => api
   > 5. util => 각종 util

2. 화면 레이아웃 구조

1) 메인 페이지(Nav를 헤더로 포함)
   Nav에 노출되는 1depth page(pages 폴더)

2) 서브 페이지(컴포넌트 2depth이상의 화면)

3) Nav

   > 1. 홈(대시보드) : Home\
   >    1-1. 이번달 소비요약\
   >     총 지출\
   >     생활비\
   >     고정지출\
   >     육아비용\
   >    1-2. 최근 소비내역 5건\
   >    1-3. 분류별 금액 Top5\
   >    1-4. 자주사용하는 분류 Top5\
   >    1-5. 금액별 Top5
   > 2. 소비케어 : SpendCare\
   >    2-1. 소비\
   >    상세내역(info, 최근 3개월간 내역)\
   >    2-2. 수입\
   >    상세내역\
   >    2-3. 고정지출 리스트(카테고리별)\
   >    상세내역
   > 3. 추가(Todo) :
   > 4. 캘린더(Todo) : Calendar
   > 5. 통계(?) :

4) 공통 컴포넌트
   > 1. ui\
   >    tag\
   >    tab\
   >    입력 form(input 등 기본요소 포함)\
   > 2. common\
   >    상세내역\
   >    월 선택\
   >    item(건별 이용내역)
