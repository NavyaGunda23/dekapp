import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ProfilePage from "./Pages/ProfilePage";

const RouterComponent = () => {
    return(
        <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile"  element={<ProfilePage />} />
            </Routes>
            </Router>
    )
}
export default RouterComponent