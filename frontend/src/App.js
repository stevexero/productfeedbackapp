import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home.page';
import FeedbackDetail from './pages/feedbackDetail.page';
import NewFeedback from './pages/new-feedback.page';
import EditFeedback from './pages/edit-feedback.page';
import Roadmap from './pages/roadmap.page';
import Login from './pages/login.page';
import Register from './pages/register.page';

import PrivateRoute from './components/privateRoute.component';

import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Private Route */}
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/new-feedback' element={<PrivateRoute />}>
          <Route path='/new-feedback' element={<NewFeedback />} />
        </Route>
        <Route path='/feedback/:feedbackId' element={<PrivateRoute />}>
          <Route path='/feedback/:feedbackId' element={<FeedbackDetail />} />
        </Route>
        <Route
          path='/edit-feedback/feedback/:feedbackId'
          element={<PrivateRoute />}>
          <Route
            path='/edit-feedback/feedback/:feedbackId'
            element={<EditFeedback />}
          />
        </Route>
        <Route path='/roadmap' element={<PrivateRoute />}>
          <Route path='/roadmap' element={<Roadmap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
