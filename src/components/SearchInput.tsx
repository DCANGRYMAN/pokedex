import React, { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} placeholder="Digite aqui para buscar" />
);

export default SearchInput;