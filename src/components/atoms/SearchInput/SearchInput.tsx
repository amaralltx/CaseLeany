import { Search } from 'lucide-react';
import './SearchInput.css';

type SearchInputProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}>;

export function SearchInput({ value, onChange, placeholder = 'Procurar Pokémon...' }: SearchInputProps) {
  return (
    <label className="search-input" aria-label="Buscar Pokémon por nome">
      <Search className="search-input__icon" size={20} aria-hidden="true" />
      <input
        className="search-input__field"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </label>
  );
}
