import Table from "@/components/Table";
import Image from "next/image";

const tableColumns = [
  {
    name: 'avatar',
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
  return (
    <section className="py-20">
      <div className="container mx-auto px-5">
        <h2 className="text-center font-bold">Meet the Team</h2>
        <div className="mt-20 max-h-[80vh] overflow-y-scroll">
          <Table rows={users} columns={tableColumns} />
        </div>
      </div>
    </section>
  )
}