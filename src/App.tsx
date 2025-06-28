// src/App.tsx
import { HashRouter as Router } from "react-router-dom";
import { Layout } from "@/components";
import { UnAuthenticatedContents } from "@/UnAuthenticatedContents";
import { AuthenticatedContents } from "@/AuthenticatedContents";
import { ModalContent } from "./ModalContent";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

function RootApp() {
  const { isLoggedIn, setLoggedIn } = useAuthStore(); // 로그인 여부 확인

  useEffect(() => {
    if (isLoggedIn) {
      setLoggedIn(true);
      // user 정보도 localStorage에 있으면 setUser도 같이 해주면 좋음
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn]);

  if (isLoggedIn) {
    return <AuthenticatedContents />;
  }
  return <UnAuthenticatedContents />;
}

function App() {
  return (
    <>
      <Layout>
        <Router>
          <RootApp />
        </Router>
      </Layout>
      <ModalContent />
    </>
  );
}

export default App;
