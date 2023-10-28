import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import VerifyUser from "../views/VerifyUser";

const Navigation: React.FC = () => {
	const location = useLocation();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<Routes>
			<Route path="/:token" element={<VerifyUser />} />
			<Route path="*" element={<div>Not Found</div>} />
		</Routes>
	);
};

export default Navigation;
