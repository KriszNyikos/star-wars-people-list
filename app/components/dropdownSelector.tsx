 import { DropDownSelectorProps } from "@/interfaces/DropDownSelectorProps";

export function DropDownSelector({items, type, onChange} : DropDownSelectorProps) {
  return (
    <>
     <select className="bg-gray-50 border border-gray-700 text-gray-900 focus:outline-none text-sm rounded-lg block p-2.5" placeholder={'Select ' + type} name={'dropdown_'+type} id={'dropdown_'+type} onChange={(e) => onChange(e.target.value)}>
        <option value={""}>Select {type}...</option>
        {items.map((item: any) => {
            return <option value={item.id} key={item.id}>{item.name}</option>
        })}
     </select>
    </>
  );
}
