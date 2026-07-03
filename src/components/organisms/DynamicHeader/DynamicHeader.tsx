import { ArrowLeft } from 'lucide-react';
import { SearchInput } from '../../atoms/SearchInput/SearchInput';
import './DynamicHeader.css';

type DynamicHeaderProps = Readonly<{
  title?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onBack?: () => void;
}>;

export function DynamicHeader({
  title,
  searchTerm,
  onSearchChange,
  onBack,
}: DynamicHeaderProps) {
  const hasSearch = typeof searchTerm === 'string' && onSearchChange;

  return (
    <header className="dynamic-header">
      {title ? (
        <div className="dynamic-header__top">
          {onBack ? (
            <button
              className="dynamic-header__back-button"
              type="button"
              onClick={onBack}
              aria-label="Voltar"
            >
              <ArrowLeft size={22} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ) : null}

          <h1 className="dynamic-header__title">{title}</h1>
        </div>
      ) : null}

      {hasSearch ? (
        <SearchInput value={searchTerm} onChange={onSearchChange} />
      ) : null}
    </header>
  );
}