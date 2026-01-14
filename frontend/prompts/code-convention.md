# 커밋

---

`ex) config: 백엔드 프로젝트 환경 설정`

- feat: 기능 개발
- docs: 문서 관련 작업
- refactor: 기능 변경 없이 전반적 코드 구조 변경 (ex: 필드 이름 변경 등)
- chore: 파일 내부가 아닌 파일 자체에 대한 변경 (ex: 폴더 이동 / 변경, 파일 이름 변경, 파일 삭제)
- style: 코드 컨벤션 관련 작업
- test: 테스트 코드 관련 작업
- fix: 버그 수정
- design: ui 관련 개발 및 수정
- config: 외부 라이브러리 관련 추가 및 설정 (`build.gradle`)

> **커밋 단위가 너무 커진다면 body 작성**

```markdown
config: 백엔드 프로젝트 환경 설정

- 커밋에 대한 구체적인 설명1
- 커밋에 대한 구체적인 설명2
```

# 브랜치

---

| **브랜치명**   | **설명**                                                 | **예시** | 규칙     |
| -------------- | -------------------------------------------------------- | -------- | -------- |
| main           | 배포를 위한 브랜치                                       |          | `삭제 X` |
| develop        | 기능 개발을 위한 브랜치                                  |          | `삭제 X` |
| feat/#이슈번호 | develop 브랜치에서 분기되어 이슈 단위 개발을 위한 브랜치 |

- feat/#이슈번호
- refactor/#이슈번호
- test/#이슈번호 | feature/#10 | merge 후 삭제 |
  | hotfix/#이슈번호 | 급한 이슈가 생겼을 시, main 브랜치에서 분기되어 문제를 해결하는 브랜치 | hotfix/#10 | merge 후 삭제 |

```jsx
- main
- develop (default 브랜치)
- feature/#10
- hotfix/#4
```

# PR, 코드 리뷰

---

> **Merge 규칙**

- 각 파트 전원의 Approve를 받아야 한다.
- feat → develop : `Squash and merge`
- etc) : `일반 merge`

> **코드 리뷰 시 코멘트 분류**

- 코멘트 확인 시 이모지를 달아둔다.
- 리뷰 내용 규칙 ⇒ https://soojin.ro/review/review-comments
- 오프라인 대화의 결론은 코멘트로 남겨둔다.

# 이슈 템플릿

---

> 이슈 제목

[FEAT] 이슈내용

- 커밋과 구분되게 [#헤더]를 적는다

```java
### ✨ Description

### ✨ Time(마감기한)
```

- 마일 스톤과 project를 할당한다.

# PR 템플릿

---

> **PR 제목**

feat: 이슈내용

- Assignee을 할당한다.
- Label을 할당한다.
  - 라벨순서: 워크플로우(feature, refactor 등등)
- Project를 할당한다.

> **풀 리퀘 내용**

- Assignees / Label 자동화
- /noti로 웹 훅(디스코드) 공지

```java
# 🚩 연관 이슈
closed #

**# 🗣️ 리뷰 요구사항 (선택)**
```

---

> **풀 리퀘 옵션 설정**

- Reviewers를 할당한다.
- Assignee을 할당한다.
- Label을 할당한다.
  - 라벨순서: 파트 - 워크플로우(feature, refactor 등등)
- Project를 할당한다.

# Tag

> 백엔드 tag 명

`v{major 기능 추가}.{minor 기능 추가}.{hotfix}`

ex. v1.1.0

<aside>
💡 **목차**

---

</aside>

---

### **🧹 Prettier && Eslint Rules**

- **코드의 일관성을 위해 Prettier와 ESLint 규칙을 엄격히 준수. 가능한 규칙을 변경하거나 예외를 만들지 않도록 한다.**

### **🏗 Component Structure**

- 함수형 컴포넌트를 사용하며, 컴포넌트 선언 후 변수, 함수, useEffect, return 문을 순서대로 작성.
- 각 파일당 코드 줄 수는 가능하면 100줄을 넘기지 않으며, 최대 150줄을 넘기지 않는다.

### **🏷️ Naming Conventions**

- **Temporary Variables**
  - 임시 변수명은 변수의 용도를 알 수 있도록 작명하며, 한 문자 변수명은 피한다.
- **Array Destructuring (State 선언)**
  - 배열 구조 분해 할당(Destructuring)을 사용하여 state를 선언할 때 모든 아이템은 camelCase로 작성하고, setter 함수 앞에 "set"을 붙여 작성.

```
const [projectId, setProjectId] = useState<number>(0);
```

- **File Structure and Folder Naming**
  - 프로젝트 내 파일과 폴더는 의미 있는 이름을 사용하여 그룹화.
  - 컴포넌트, 스타일, 유틸리티 함수 등을 적절하게 구분하여 배치.
  - 컴포넌트 파일은 해당 컴포넌트의 이름과 일치하도록 파일 이름을 지정.
  - 리소스 파일 (이미지, 폰트 등)은 assets 또는 static 폴더에 저장하여 관리.
  - 폴더명은 항상 **복수형**으로 작성한다.
    예: `components`, `hooks`, `utils`
  - 컴포넌트 내부의 폴더 및 파일은 **파스칼케이스(PascalCase)** 로 작성한다.
    ```
    src/
      components/
        @common/
        SomethingButton/
          SomethingButton.tsx
          SomethingButton.test.ts
          SomethingButton.styles.ts
    ```
  - 그 외의 유틸, 훅, 스타일 등은 **카멜케이스(camelCase)** 로 작성한다.
- 컴포넌트명 : PascalCase
- 타입명 : PascalCase
- 상수 : UPPER_SNAKE_CASE
- 이미지 : UPPER_SNAKE_CASE
- 그 외 모두 : camelCase
- 배열 변수는 `List` 접미사를 붙인다.

### **📚 Type Definitions**

- 커스텀 타입은 interface 대신 type 문법을 사용하며, 클래스를 사용할 때에는 interface 문법을 사용.

```
type FollowModalProps = {
  onClickToggleModal: () => void;
  isFollowing: number;
};
```

### **✉️ Props Handling**

- props는 구조 분해 할당(Destructuring)을 통해 다루며, 커스텀 타입 이름은 컴포넌트 이름 뒤에 "Props"를 붙여 작성.

```
function followModal({ onClickToggleModal, isFollowing }: FollowModalProps) { ... }
```

### **⚙️ API Calls and Asynchronous Operations**

- API 호출 시 async/await 구문을 활용하여 비동기 처리.

```
async function main() {
  try {
    const userId = 1;
    const userInfo = await getUserInfo(userId);
    console.log('사용자 정보:', userInfo);
  } catch (error) {
    console.error('메인 함수 실행 중 오류 발생:', error);
  }
}
```

**⚠️ Warning and Error Handling**

- 브라우저 콘솔에 나타나는 경고와 오류를 최소화하며, 가능한 모든 경고를 처리.
- 배포 환경에서는 개발자 도구를 비활성화하거나 경고를 무시하도록 설정하여 사용자 경험을 최적화.

### **⚙️ API Calls and Asynchronous Operations**

- 브라우저 콘솔에 나타나는 경고와 오류를 최소화하며, 가능한 모든 경고를 처리.
- 배포 환경에서는 개발자 도구를 비활성화하거나 경고를 무시하도록 설정하여 사용자 경험을 최적화.

### 코드 리뷰

---

- 커밋 제목은 영어로 작성하고, body는 한글로 상세히 작성한다.
- 24시가 넘으면, 코드 리뷰를 남기기 전에 언제까지 리뷰가 가능한지 슬랙 멘션으로 미리 알려준다.
- PR merge 기준 : 전원 approve
- 코드 리뷰의 기한
  - PR제출일 (월-목) : 24시간 이내
  - PR제출일 (금-일) : 48시간 이내
- PR을 확인했으면 PR 코멘트에 👍 이모티콘 남긴다.
- 확인했음은 👍 이모티콘으로 통일한다.
- 코멘트는 [제안] - [질문] / [필수] 3단계로 답글을 남긴다.
  - 단순 지적이 아니라 이유와 대안을 함께 제시
- 코드 리뷰를 남기거나 반영했을 때 → 웹훅으로 대체
- Merge한 사람이 branch를 삭제한다.
- 긴급한 사항인 경우에는 1시간 이내에 리뷰요청에 응한다.

### 리뷰어 체크포인트

- 코드의 목적과 동작이 명확한가?
- 불필요한 반복 또는 하드코딩은 없는가?
- 함수/변수명이 역할을 잘 표현하고 있는가?
- 주석이나 TODO가 남아 있지는 않은가?
- 테스트 케이스나 예외 처리가 적절히 있는가?
