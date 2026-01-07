type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
};

export default function Button({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const baseClassName =
    'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition';

  const variantClassName =
    variant === 'primary'
      ? 'bg-black text-white hover:bg-zinc-800'
      : 'border border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50';

  return (
    <button className={`${baseClassName} ${variantClassName}`} onClick={onClick} type={type}>
      {label}
    </button>
  );
}
