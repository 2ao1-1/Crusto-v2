import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-main font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-second hover:text-main focus:bg-second focus:text-main focus:outline-none focus:ring focus:ring-second focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    second: `bg-second inline-block text-sm rounded-full  font-semibold uppercase tracking-wide text-main transition-colors duration-300 hover:bg-second hover:text-main focus:bg-second focus:text-main focus:outline-none focus:ring focus:ring-second focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4`,
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-200 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
