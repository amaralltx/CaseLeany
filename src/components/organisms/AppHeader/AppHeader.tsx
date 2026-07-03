import { SearchInput } from '../../atoms/SearchInput/SearchInput';
import './AppHeader.css';

type AppHeaderProps = Readonly<{
  searchTerm: string;
  onSearchChange: (value: string) => void;
}>;

export function AppHeader({ searchTerm, onSearchChange }: AppHeaderProps) {
  return (
    <header className="app-header">
      <SearchInput value={searchTerm} onChange={onSearchChange} />
    </header>
  );
}