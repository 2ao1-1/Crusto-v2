import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  return (
    <div className="px-4 py-10 text-center">
      <h1 className="mb-4 text-xl font-semibold text-main">
        Something went wrong 😢
      </h1>
      <p className="mb-6 text-stone-600">{error.message || error.statusText}</p>
      <LinkButton to="/">&larr; Go back to homepage</LinkButton>
    </div>
  );
}

export default Error;
