import { Link, useLocation } from 'react-router-dom';

import Comments from '../components/comments.component';

const FeedbackDetail = () => {
  const location = useLocation();
  const { feedback } = location.state;

  return (
    <div className='FeedbackDetailPage'>
      <div className='container'>
        <div className='top-bar'>
          <Link to={'/'}>Back</Link>
          <br />
          <Link to={`/edit-feedback${location.pathname}`}>Edit Feedback</Link>
        </div>
        <div className='feedback-item'>
          <div className='left'>{feedback.upvotes}</div>
          <div className='middle'>
            <h3>{feedback.title}</h3>
            <p>{feedback.description}</p>
            <div>{feedback.category}</div>
          </div>
          <div className='right'>{/*  */}</div>
        </div>
        <div className='comments-container'>
          {feedback.comments &&
            feedback.comments.map((commentItem) => (
              <Comments key={commentItem.id} commentProps={commentItem} />
            ))}
        </div>
        <div className='add-comment'>
          <h3>Add Comment</h3>
          <textarea
            name=''
            id=''
            placeholder='Type your comment here'></textarea>
          <p>250 Characters left</p>
          <button>Post Comment</button>
        </div>
      </div>
    </div>
  );
};
export default FeedbackDetail;

//
