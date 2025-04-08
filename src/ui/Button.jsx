import { Link } from 'react-router-dom';

export default function Button({ children, disabled, to }) {
  const className =
    'text-semibold inline-block rounded-full bg-yellow-400 px-4 py-3 uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4';

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}
