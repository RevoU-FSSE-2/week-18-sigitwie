import React from 'react';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
      <div className="app">
          {/* <FriendshipProvider> */}
              <AppRoutes />
          {/* </FriendshipProvider> */}
      </div>
  );
};

export default App;