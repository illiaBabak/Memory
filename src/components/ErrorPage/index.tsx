import { BackButton } from '../BackButton';

export const ErrorPage = (): JSX.Element => {
  return (
    <>
      <div className='error-message'>
        <img src='https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png' />
        <div>
          <h2>Oops, something went wrong</h2>
          <p>Try again later</p>
        </div>
      </div>

      <BackButton />
    </>
  );
};
