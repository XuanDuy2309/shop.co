import logo from './logo.svg';
import './App.css';
import {publicRouters} from "./routers";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
          <Routes>
              {
                  publicRouters.map((route,index)=>{
                      const Page= route.component;
                      return (
                          <Route key={index} path={route.path} element={<Page/>}/>
                      );
                  })
              }
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
