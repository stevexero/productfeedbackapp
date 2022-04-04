import { useSelector, useDispatch } from 'react-redux';
import { getFeedback } from '../features/feedback/feedbackSlice';

const Button = ({ name, isChecked }) => {
  const { feedback, isLoading, isSuccess } = useSelector(
    (state) => state.feedback
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.id !== 'All') {
      dispatch(getFeedback(e.target.id.toLowerCase()));
    } else {
      dispatch(getFeedback());
    }
  };

  return (
    <>
      <input
        type='radio'
        name='category'
        id={name}
        value={name}
        defaultChecked={isChecked}
        onChange={handleChange}
      />
      <label className={`btn text-blue body-3`} htmlFor={name}>
        {name}
      </label>
    </>
  );
};

const CategoryBox = () => {
  return (
    <div className='CategoryBox'>
      <div className='container'>
        <Button name={'All'} isChecked />
        <Button name={'UI'} />
        <Button name={'UX'} />
        <Button name={'Enhancement'} />
        <Button name={'Bug'} />
        <Button name={'Feature'} />
      </div>
    </div>
  );
};
export default CategoryBox;
