import { useNavigate } from 'react-router-dom';

type Props = {
  retryGame?: () => void;
};

export const BackButton = ({ retryGame }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    retryGame?.();
    navigate('/');
  };

  return (
    <div className='back' onClick={handleClick}>
      Back
    </div>
  );
};
