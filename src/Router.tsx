import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Bookmark from "./component/Bookmarks";
import NewsComp from "./component/NewsComp";
import About from "./pages/About";
import Error404 from "./pages/Error404";
import MainPage from "./pages/MainPage";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path='news/bookmarks' element={<Bookmark />} />
            
            <Route
                index
                element={<Navigate replace to="news" />}
            />
            <Route path="about" element={<About/>} />
            
            <Route
                element={<MainPage />}
                path='news' />

            <Route
                element={<NewsComp />}
                path='news/:id' />
            <Route path='error404' element={<Error404/>}/>
            <Route path="*" element={<Navigate to="/error404" />} />

        </Routes>);
};

export default AppRoutes;