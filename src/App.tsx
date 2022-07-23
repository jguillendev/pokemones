import React from 'react';
import AdminPage from './page/Admin';
import {
  RecoilRoot,
} from "recoil";
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <AdminPage />
    </RecoilRoot>
  );
}

export default App;
