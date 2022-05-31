import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useMediaQuery } from 'react-responsive';

import { getFeedback, reset } from '../features/feedback/feedbackSlice';
import { getUser } from '../features/auth/authSlice';

import Marquee from '../components/marquee.component';
import CategoryBox from '../components/categoryBox.component';
import RoadmapBox from '../components/roadmapBox.component';
import TopBarHome from '../components/topBarHome.component';
import ProductFeedback from '../components/productFeedback.component';
import EmptyFeedback from '../components/emptyFeedback.component';

import '../styles/pages/home.css';
import Sidebar from '../components/sidebar';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 738px)' });

  const { feedback, isSuccess } = useSelector((state) => state.feedback);
  const { user, isSuccess: isUserSuccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState();
  const [sortedFeedback, setSortedFeedback] = useState(feedback);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getFeedback());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (feedback) {
      if (sortOrder === 'most-upvotes') {
        const sorted =
          feedback &&
          feedback.length > 0 &&
          feedback.slice().sort((a, b) => b.upvotes - a.upvotes);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'least-upvotes') {
        const sorted = feedback.slice().sort((a, b) => a.upvotes - b.upvotes);
        setSortedFeedback(sorted);
      } else if (sortOrder === 'most-comments') {
        setSortedFeedback(
          _.orderBy(
            feedback,
            function (fdbk) {
              return (
                fdbk.comments &&
                fdbk.comments +
                  _.find(fdbk.comments, (cmnts) =>
                    cmnts.replies === undefined ? 0 : cmnts.replies.length
                  )
              );
            },
            ['asc']
          )
        );
      } else if (sortOrder === 'least-comments') {
        setSortedFeedback(
          _.orderBy(
            feedback,
            function (fdbk) {
              return (
                fdbk.comments &&
                fdbk.comments +
                  _.find(fdbk.comments, (cmnts) =>
                    cmnts.replies === undefined ? 0 : cmnts.replies.length
                  )
              );
            },
            ['desc']
          )
        );
      }
    }
  }, [feedback, sortOrder]);

  const passSortOrder = (e) => {
    setSortOrder(e);
  };

  const passIsMenuOpen = (e) => {
    setIsMenuOpen(e);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => (document.body.style.overflow = 'unset');
  }, [isMenuOpen]);

  return (
    <div className='Home'>
      <div className='Home-container'>
        <div className='Home-left'>
          <Marquee passIsMenuOpen={passIsMenuOpen} />
          {!isMobile && <CategoryBox />}
          {!isMobile && <RoadmapBox feedback={feedback} />}
        </div>
        <div className='Home-right'>
          <Sidebar isMenuOpen={isMenuOpen} feedback={feedback} />
          <TopBarHome passSortOrder={passSortOrder} />
          {feedback.length === 0 ? (
            <EmptyFeedback />
          ) : (
            <>
              {sortedFeedback.length > 0 &&
                sortedFeedback.map((feedback) => (
                  <ProductFeedback key={feedback.id} feedback={feedback} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
