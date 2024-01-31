import { InputHTMLAttributes } from "react"

export default function SelectInput({
  label,
  name,
  options,
  ...props
}: Readonly<InputHTMLAttributes<HTMLSelectElement> & {
  label: string,
  name: string,
  options: { name: string, label: string }[],
}>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          name={name}
          id={name}
          className="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6 font-bold"
          {...props}
        >
          {options.map((option) => {
            return <option key={option.name} value={option.name}>{option.label}</option>
          })}
        </select>
      </div>
    </div>
  )
}