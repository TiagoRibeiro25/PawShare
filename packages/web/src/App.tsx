import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import InitialLoad from "./components/InitialLoad";
import Navigation from "./navigation";

const App: React.FC = (): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(true);

	return (
		<div className="flex items-center justify-center h-full min-h-screen p-6 bg-primaryColor">
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
