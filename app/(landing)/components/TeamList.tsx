"use client"
import SelectInput from "@/components/SelectInput";
import Table from "@/components/Table";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import { InputHTMLAttributes, useEffect, useState } from "react";

const tableColumns = [
  {
    name: 'avatar',
    label: 'Avatar',
    render: (user: User) => (
      <Image src={`/avatars/${user.avatar}`} alt={user.name} width={40} height={40} className="rounded-full shadow-md" />
    )
  },
  {
    name: 'name',
    label: 'Name',
    render: (user: User) => (
      <span className="font-bold">{user.name}</span>
    )
  },
  {
    name: 'team',
    label: 'Team',
  },
  {
    name: 'role',
    label: 'Role',
  },
  {
    name: 'location',
    label: 'Location',
    render: (user: User) => [user.city, user.country].filter(Boolean).join(', '),
  },
  {
    name: 'yearsAtCompany',
    label: 'Years at Company',
    render: (user: User) => {
      const startDate = new Date(user.start_date)
      const today = new Date()
      const days = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      const years = Math.floor(days / 365) 
      const months = Math.floor((days % 365) / 30)
      return years >= 1 ? `${years} years` : `${months} months`
    },
  },
  {
    name: 'salary',
    label: 'Salary',
    render: (user: User) => `$${user.salary.toLocaleString()}`,
  }
]

export default function TeamList({ users }: Readonly<{ users: User[] }>) {
  const [nameFilter, setNameFilter] = useState('')
  const [teamFilter, setTeamFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [debouncedNameFilter, setDebouncedNameFilter] = useState('')

  const filteredUsers = users.filter(user => {
    const compare = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase())
    if (debouncedNameFilter && !compare(user.name, debouncedNameFilter)) return false
    if (teamFilter && !compare(user.team, teamFilter)) return false
    if (roleFilter && !compare(user.role, roleFilter)) return false
    if (countryFilter && !compare(user.country, countryFilter)) return false
    return true
  })

  const teamOptions = buildSelectOptions(users, 'team')
  const roleOptions = buildSelectOptions(users, 'role')
  const countryOptions = buildSelectOptions(users, 'country')

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [nameFilter]);

  return (
    <section className="py-40">
      <div className="container mx-auto px-5">
        <h2 className="text-center font-bold">Meet the Team</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <TextInput label="Name" name="name" value={nameFilter} onChange={e => setNameFilter(e.target.value)} />
          <SelectInput label="Team" name="team" value={teamFilter} onChange={e => setTeamFilter(e.target.value)} options={teamOptions} />
          <SelectInput label="Role" name="role" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} options={roleOptions} />
          <SelectInput label="Country" name="country" value={countryFilter} onChange={e => setCountryFilter(e.target.value)} options={countryOptions} />
        </div>
        <div className="mt-20 max-h-[50vh] overflow-y-scroll overflow-x-auto">
          <Table rows={filteredUsers} columns={tableColumns} />
        </div>
      </div>
    </section>
  );
}

// Builds select options from users array for a given key, by counting the number of occurrences of each value and sorting them in descending order
function buildSelectOptions(users: User[], key: keyof User) {
  const uniqueValuesDict = users.reduce((acc: Record<string, number>, user) => {
    const value = user[key]
    if (!value) return acc
    if (!!acc[value]) {
      acc[value]++
    } else {
      acc[value] = 1
    }
    return acc
  }, {})
  const uniqueValuesArray = Object.entries(uniqueValuesDict)
  uniqueValuesArray.sort((a, b) => b[1] - a[1])
  const options = uniqueValuesArray.map(([value, count]) => ({ 
    name: value,
    label: `${value} (${count})`
  }))
  // add empty option as first one
  options.unshift({ name: '', label: 'All' })
  return options
}
