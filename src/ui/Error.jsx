import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="rounded-lg bg-white p-8 shadow-xl">
        {/* Error Status and Icon */}
        <div className="mb-4 text-3xl">😢</div>
        <h1 className="mb-2 text-xl font-semibold text-stone-700">
          {error.status ? (
            <span className="text-red-500">
              Error {error.status}: {error.statusText}
            </span>
          ) : (
            'Something went wrong'
          )}
        </h1>

        {/* Error Message */}
        <p className="mb-6 text-sm text-stone-500">
          {error.data || error.message || 'An unexpected error occurred'}
        </p>

        {/* Back Button */}
        <LinkButton to="-1">&larr; Go back</LinkButton>
      </div>
    </div>
  );
}

export default Error;
