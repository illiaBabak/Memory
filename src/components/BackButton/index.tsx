import { useNavigate } from 'react-router-dom';

export const BackButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className='back' onClick={() => navigate('/')}>
      Back
    </div>
  );
};
