### **🧹 Prettier && Eslint Rules**

- **코드의 일관성을 위해 Prettier와 ESLint 규칙을 엄격히 준수. 가능한 규칙을 변경하거나 예외를 만들지 않도록 한다.**

### **🏗 Component Structure**

- 함수형 컴포넌트를 사용하며, 컴포넌트 선언 후 변수, 함수, useEffect, return 문을 순서대로 작성.
- 한 파일당 코드는 가능하면 100줄을 넘기지 않도록 하며, 최대 150줄을 넘기지 않는다.
- 컴포넌트 파일 구성 순서: 타입/상수 → 훅 → 핸들러 → 렌더(return)

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
- import 순서: 외부 라이브러리 → 내부 절대경로(`@/`) → 상대경로
- 타입은 반드시 `import type`으로 분리한다.

### **📚 Type Definitions**

- 커스텀 타입은 interface 대신 type 문법을 사용하며, 클래스를 사용할 때에는 interface 문법을 사용.
- 타입 선언은 많아지면 같은 폴더에 `*.types.ts`로 분리한다.
  - 예: `Button.tsx` → `Button.types.ts`, `HomeScreen.tsx` → `HomeScreen.types.ts`
- 한 파일당 100줄을 넘기지 않도록 타입/로직을 분리한다.

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
- API 에러는 `normalizeApiError`로 통일한다.

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

### **🧩 Folder Roles (FSD-lite)**

- `entities/`: 도메인 모델과 데이터 접근 (types, queries, api)
- `features/`: 유저 액션 중심 로직 (검색, 필터, 수정 등)
- `widgets/`: 재사용 가능한 화면 단위 조합
- `screens/`: 라우트 단위 화면 구성

### **🔎 React Query Rules**

- queryKey는 `src/shared/lib/reactQuery/keys.ts`에서만 정의한다.
- API 호출과 `useQuery` 연결은 분리한다.

### **📘 Storybook Rules**

- `shared/ui` 컴포넌트는 기본 스토리를 작성한다.

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
