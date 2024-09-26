import { Toaster } from 'react-hot-toast';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/home';
import { Providers } from './providers';

function App() {
  return (
    <div className="relative flex flex-col h-screen min-h-screen bg-background font-sans antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
        <App />
        <Toaster />
      </Providers>
    </Router>
  );
}
