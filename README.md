# 🦖 광고회사 스튜디오 T의 급여 및 일정 관리 웹앱 서비스

<image alt="studio-t" width="800" src="https://github.com/user-attachments/assets/780fdc29-ee4b-4f92-a5a0-f0ade55a600c" style="border-radius: 20px" />

스튜디오 T는 직원들의 일정과 급여 및 정정신청을 관리할 수 있는 모바일 웹앱 서비스를 제공합니다.

이 서비스는 이 달의 급여명세서 알림, 개인의 일정 관리, 회사 일정과 동료 이벤트 조회, 급여명세서 조회 및 저장, 정정신청 관리를 할 수 있습니다.

---

## 팀명: T라미수 (이유: 다 T, T라 미숙해)

### 프로젝트 팀 소개 및 역할분담

| [<img src="https://avatars.githubusercontent.com/u/108856689?v=4" width="150" height="150"/>](https://github.com/devdeun) | [<img src="https://avatars.githubusercontent.com/u/143858798?v=4" width="150" height="150"/>](https://github.com/dhkim511) | [<img src="https://avatars.githubusercontent.com/u/34756233?v=4" width="150" height="150"/>](https://github.com/kimisadev27) | [<img src="https://avatars.githubusercontent.com/u/164488959?v=4" width="150" height="150"/>](https://github.com/sjgaru-dev) | [<img src="https://avatars.githubusercontent.com/u/27764950?s=400&u=07e0fe49d204a77b0814e7f126cda53b6fc97fd1&v=4" width="150" height="150"/>](https://github.com/clara-shin) |
| :-----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                          [@devdeun](https://github.com/devdeun)                                           |                                          [@dhkim511](https://github.com/dhkim511)                                          |                                        [@kimisadev27](https://github.com/kimisadev27)                                        |                                         [@sjgaru-dev](https://github.com/sjgaru-dev)                                         |                                                                 [@clara-shin](https://github.com/clara-shin)                                                                 |
|      UI 디자인<br/>공통 컴포넌트 개발<br/>캘린더<br/>Timepicker, Datepicker<br/>일정 등록/수정<br/>전체 디자인 수정       |             공통 컴포넌트 개발<br/>정정 신청<br/>신청 내역 수정<br/>신청 내역 삭제<br/>급여명세서 페이지 구현              |             DB구조 설계 세팅<br/> 로그인 UI, api 연동<br/> 급여명세서 api연동<br/> 급여: 정정신청 등록 api 연동              |                             프로필 페이지 <br/>(리액트 기본 CRUD 적응)<br/>firebase 사진 업로드                              |                 UI 디자인<br/> 공통 스타일 및 타입 세팅<br/> 공통 컴포넌트 개발: Button<br/>오늘의 일정 조회<br/>일정 상세보기 조회<br/>일정 삭제 기능 구현                  |

## 프로젝트 목표

- 3주 동안 집중적으로 개발을 진행하며 다양한 기능을 구현해보자.
- 이 과정에서 리액트와 타입스크립트의 핵심 개념을 이해하고 실전 경험을 통해 개발에 익숙해지자.
- 자바스크립트로만 개발했을 때와 차이점도 느껴보자.
- 리덕스의 기본개념을 이해하고 상태관리를 경험하자.

## 프로젝트 소개

프로젝트 주제:

- 사내 직원들의 급여 및 일정 관리를 위한 모바일 웹 서비스 개발

서비스가 추구하는 핵심가치:

- 모바일 퍼스트 웹 앱
- 보기만 해도 예상 가능한 직관적 UI/UX(사용자경험)
- 일정, 급여에 대한 정보를 간결하게 제공

서비스의 이용 대상:

- 타겟: 광고회사 전 직원
- 사용 규모: 20명
- 서비스 필요한 이유:
  - 젊은 연령대가 많다
  - 모바일로 일정과 급여 및 정정신청을, 쉽게 관리하고 싶다
- 페르소나
  - 김태화/50대/ 남성/ 광고회사 영업팀 부장/ 서울/ 산악회,낚시/ 갤럭시 유저/ 복잡한 것을 싫어함/ 보수적
  - 지예은/20대/ 여성/ 광고회사 신입 경리/ 서울/ 필라테스, 여행/ 아이폰 유저/Fire족을 꿈꾼다, 예쁜게 최고/ Gen Z

### 기획 및 디자인 설계

- 기획(피그잼): 예시 디자인 시안 확인하며 기능명세서, 데이터베이스 설계 및 컴포넌트 정의서 설계

- 디자인, 와이어프레임 (피그마)

### 프로젝트 기간

- 7월 22일(월) ~ 8월 9일(금) (약 3주)

- 1주차: 기획 및 설계/디자인(4일 소요), 개발환경 세팅

- 2주차: 개발 집중기간, 컴포넌트 및 페이지 개발

- 3주차: 페이지 개발, 서버연동, 테스트 및 수정

### 개발환경

- Frontend: React, TypeScript, Emotion (@emotion/react의 css 활용)
- Backend: Firebase(Authentication, Firestore, Storage)
- 번들링 및 개발도구: Vite
- 버전/이슈관리 및 협업: GitHub, Github Issues, Git Hook(husky)
- 협업 툴: Slack, Notion, Gather, ZEP
- 디자인 및 기획: Figma/Figjam

### 사용자 화면

<image alt="studio-t" width="800" src="https://github.com/user-attachments/assets/c9df010b-cc10-457d-8967-160156719c78" style="border-radius: 20px" />
