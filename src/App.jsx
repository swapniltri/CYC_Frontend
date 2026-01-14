import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root.jsx';
import HomePage from './pages/Home.jsx';
import TrackCalories from './pages/TrackCalorie.jsx';
import SearchFood from './pages/FoodSearch.jsx';
import AuthPage from './pages/AuthPage.jsx';
import SetGoals from './pages/GoalSet.jsx';
import { authActions } from './store/authentication-slice.js';
import api from './api/api.js';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { index: true, element: <HomePage /> },
      {
        path: 'track-calories', children: [
          { index: true, element: <TrackCalories /> },
          { path: 'search', element: <SearchFood /> },
          { path: 'setGoals', element: <SetGoals /> }
        ]
      }
    ]
  },
  {
    path: '/auth', element: <AuthPage />
  }
]);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.authentication);

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await api.post('/api/auth/refresh', {}, { withCredentials: true });

        const { accessToken, userId } = response.data;
        dispatch(authActions.setCredentials({ accessToken, userId }));
      } catch (e) {
        dispatch(authActions.logout());
      }
    }

    checkLogin();
  }, [dispatch]);

  if (isAuthenticated === "loading") {
    return <div>Loading...</div>
  }

  return <RouterProvider router={router} />
}

export default App


