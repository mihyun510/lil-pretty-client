// src/App.tsx
import { Layout, LoginModal, SignupModal } from "@/components";
import { LandingPage } from "@/pages";

function App() {
  return (
    <>
      <Layout>
        <LandingPage />
      </Layout>
      <LoginModal />
      <SignupModal />
    </>
  );
}

export default App;
