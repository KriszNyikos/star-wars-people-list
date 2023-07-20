export interface DropDownSelectorProps {
    items: Array<{name: string, id: string}>;
    type: string;
    onChange: (e: any) => void;
}
   