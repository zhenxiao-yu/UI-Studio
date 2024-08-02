import { Label } from "../ui/label";
import { Input } from "../ui/input";

const dimensionsOptions = [
  { label: "W", property: "width" },
  { label: "H", property: "height" },
];

type Props = {
  width: string;
  height: string;
  isEditingRef: React.MutableRefObject<boolean>;
  handleInputChange: (property: string, value: string) => void;
};

const Dimensions = ({
  width,
  height,
  isEditingRef,
  handleInputChange,
}: Props) => (
  <section className='flex flex-col rounded-md border-b border-primary-grey-200 bg-white shadow-sm'>
    <div className='flex flex-col gap-4 p-4'>
      {dimensionsOptions.map((item) => (
        <div key={item.label} className='flex items-center gap-3'>
          <Label
            htmlFor={item.property}
            className='text-xs font-bold text-gray-600'
          >
            {item.label}
          </Label>
          <Input
            type='number'
            id={item.property}
            placeholder='100'
            value={item.property === "width" ? width : height}
            className='w-full rounded-md border border-primary-grey-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green'
            min={10}
            onChange={(e) => handleInputChange(item.property, e.target.value)}
            onBlur={() => {
              isEditingRef.current = false;
            }}
          />
        </div>
      ))}
    </div>
  </section>
);

export default Dimensions;
