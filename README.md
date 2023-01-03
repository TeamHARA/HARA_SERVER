# HARA SERVER 

## HARA MARA

> <strong>고민 해결 완료~</strong>

> <strong>31th SOPT APPJAM</strong><br>
> 프로젝트 기간: 2022.12.11 ~ 2023.01.14

### Developer

<br>

|                      <img src="https://avatars.githubusercontent.com/u/61582017?v=4" width="100px;" alt=""/>                      |                      <img src="https://avatars.githubusercontent.com/u/80771842?v=4" width="100px;" alt=""/>                      |                      <img src="https://avatars.githubusercontent.com/u/99312658?v=4" width="100px;" alt=""/>                      |                      <img src="https://avatars.githubusercontent.com/u/78431728?v=4" width="100px;" alt=""/>                      |
| :-----------------------------------: | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
|                윤가영                 |                   최승빈                  |                   김예린                  |                   한유진                  |
| [kyY00n](https://github.com/kyY00n) | [csb9427](https://github.com/csb9427) | [leGit-y](https://github.com/leGit-y) | [yujindonut](https://github.com/yujindonut) |

### 🛠 개발 환경

### ⚙️ Dependencies

### ✉️ HARA Directory Tree

```bash
HARA
├── prisma
├── src
│   ├── constants
│       └── index.ts
│   ├── config
│   ├── controller
│       └── index.ts
│   ├── interfaces
│   ├── middlwares
│       └── index.ts
│   ├── modules
│   ├── router
│       └── index.ts
│   └── services
│       └── index.ts
└── 
```

### 📋 Model Diagram

![image](https://user-images.githubusercontent.com/78431728/210322575-bf1e385c-1d83-47f2-acdd-6f86d071b97e.png)

### 📧API 명세서

https://daffy-lawyer-1b8.notion.site/634f31cafc93476888b5fdb9e5c37184?v=63b654ebfce44823b2209beac83518fd

### 🙋🏻‍♀️ <strong>HARA APIs</strong>
 
|   EndPoint   |               detail               | Method | developer | done |
| :------: | :--------------------------------: | :----: | :-------: | :--: |
|   Worry  |             고민글 투표하기             |   `POST`    |   승빈    |  - 진행중  |
|          |             고민글 전체조회             |   `GET`    |   유진    |  - 진행중  |
|          |             개인 고민글 생성             |   `POST`    |   예린    |  - 진행중  |
|          |             함께 고민글 생성             |   `POST`    |   예린    |    |
|          |             함께 고민 목록 조회             |   `GET`    |   승빈    |    |
|          |             혼자 고민 목록 조회             |   `GET`    |   승빈    |    |
|          |             혼자 고민 삭제             |   `PUT`    |   유진    |    |
|          |             함께 고민 삭제             |   `PUT`    |   유진    |    |
|          |             혼자 고민 최종결정             |   `PATCH`    |   가영    |    |
|          |             함께 고민 최종결정             |   `PATCH`    |   가영    |    |
|          |             고민 목록 검색             |   `GET`    |   예린    |    |
|          |             혼자 고민 상세 조회             |   `GET`    |   예린    |    |
|          |             함께 고민 상세 조회 - 다른 유저             |   `GET`    |   예린    |    |
|          |             함께 고민 상세 조회 - 게시자 본인             |   `GET`    |   예린    |    |
|          |             고민글에 대한 댓글 조회              |   `GET`    |   예린    |    |
|          |             고민글에 대한 댓글 생성              |   `POST`    |   승빈    |    |
|  Random  |             랜덤답변             |   `GET`    |   승빈    |    |
|          |             간단 질문 입력하기             |   `POST`    |   승빈    |    |
|          |             과거 고민 목록 조회             |   `GET`    |   유진    |    |
|          |             과거 고민 상세 조회             |   `GET`    |   승빈    |    |
|   User   |             유저 정보 가져오기             |   `GET`    |   가영    |    |
|          |             유저 정보 수정하기             |   `POST`    |   승빈    |    |
|          |             유저 탈퇴하기             |   `PATCH`    |   유진    |    |
| Settings |             이용약관 조회              |   `GET`    |   승빈    |    |
|          |             만든사람들 조회              |   `GET`    |   승빈    |    |

### ✉️ Commit Messge Rules

**서버** 들의 **Git Commit Message Rules**

- 반영사항을 바로 확인할 수 있도록 작은 기능 하나라도 구현되면 커밋을 권장합니다.
- 기능 구현이 완벽하지 않을 땐, 각자 브랜치에 커밋을 해주세요.

### 📌 Commit Convention

**[태그] 제목의 형태**

| 태그 이름 |                       설명                        |
| :-------: | :-----------------------------------------------: |
|   FEAT    |             새로운 기능을 추가할 경우             |
|    FIX    |                 버그를 고친 경우                  |
|   CHORE   |                    짜잘한 수정                    |
|   DOCS    |                     문서 수정                     |
|   INIT    |                     초기 설정                     |
|   TEST    |      테스트 코드, 리펙토링 테스트 코드 추가       |
|  RENAME   | 파일 혹은 폴더명을 수정하거나 옮기는 작업인 경우  |
|   STYLE   | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 |
| REFACTOR  |                   코드 리팩토링                   |

### **커밋 타입**

- `[태그] 설명` 형식으로 커밋 메시지를 작성합니다.
- 태그는 영어를 쓰고 대문자로 작성합니다.

예시 >

```
  [FEAT] 검색 api 추가
```

### **💻 Github mangement**

**해라** 들의 WorkFlow : **Gitflow Workflow**

- Develop, Feature, Hotfix 브랜치

- 개발(develop): 기능들의 통합 브랜치

- 기능 단위 개발(feature): 기능 단위 브랜치

- 버그 수정 및 갑작스런 수정(hotfix): 수정 사항 발생 시 브랜치

- 개발 브랜치 아래 기능별 브랜치를 만들어 작성합니다.

### ✍🏻 Code Convention

[에어비앤비 코드 컨벤션](https://github.com/airbnb/javascript)

### 📍 Gitflow 규칙

- Develop에 직접적인 commit, push는 금지합니다.
- 커밋 메세지는 다른 사람들이 봐도 이해할 수 있게 써주세요.
- 작업 이전에 issue 작성 후 pullrequest 와 issue를 연동해 주세요.
- 풀리퀘스트를 통해 코드 리뷰를 전원이 코드리뷰를 진행합니다.
- 기능 개발 시 개발 브랜치에서 feature/기능 으로 브랜치를 파서 관리합니다.
- feature 자세한 기능 한 가지를 담당하며, 기능 개발이 완료되면 각자의 브랜치로 Pull Request를 보냅니다.
- 각자가 기간 동안 맡은 역할을 전부 수행하면, 각자 브랜치에서 develop브랜치로 Pull Request를 보냅니다.  
  **develop 브랜치로의 Pull Request는 상대방의 코드리뷰 후에 merge할 수 있습니다.**

### ❗️ branch naming convention

- develop
- feature/issue_number - Short Description
- release/version_number
- hotfix/issue_number - Short Description

### 📋 Code Review Convention

- P1: 꼭 반영해주세요 (Request changes)
- P2: 적극적으로 고려해주세요 (Request changes)
- P3: 웬만하면 반영해 주세요 (Comment)
- P4: 반영해도 좋고 넘어가도 좋습니다 (Approve)
- P5: 그냥 사소한 의견입니다 (Approve)

- D-0 (ASAP)

긴급한 수정사항으로 바로 리뷰해 주세요. 앱의 오류로 인해 장애가 발생하거나, 빌드가 되지 않는 등 긴급 이슈가 발생할 때 사용합니다.

- D-N (Within N days)

“Working Day 기준으로 N일 이내에 리뷰해 주세요”
