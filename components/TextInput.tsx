import { InputHTMLAttributes } from "react";

export default function TextInput({
  label,
  name,
  ...props
}: Readonly<InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  name: string,
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
        <input
          name={name}
          id={name}
          className="block font-bold w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
    </div>
  )
}