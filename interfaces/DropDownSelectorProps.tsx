
export interface DropDownOption{
    name: string,
    id: string
}

export interface DropDownSelectorProps {
    items: DropDownOption[];
    type: string;
    onChange: (e: string) => void;
}
   