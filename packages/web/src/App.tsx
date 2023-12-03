import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import InitialLoad from "./components/InitialLoad";
import Navigation from "./navigation";

const App: React.FC = (): JSX.Element => {
	const [loading, setLoading] = useState(true);

	return (
		<div className="min-h-screen h-full bg-primaryColor p-6 flex justify-center items-center">
			{loading ? (
				<InitialLoad onLoad={() => setLoading(false)} />
			) : (
				<div className="delay-700 fade-in">
					<Router>
						<Navigation />
					</Router>
				</div>
			)}
		</div>
	);
};

export default App;
