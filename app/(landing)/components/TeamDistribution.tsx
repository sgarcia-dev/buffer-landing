import { getUsers } from '@/data/users'

export default async function TeamDistribution({
  users
}: Readonly<{
  users: User[]
}>) {
  const usersByCountry: Record<string, User[]> = {}
  users.forEach((user) => {
    if (!user.country) return // skip users without country
    if (!!usersByCountry[user.country]) {
      usersByCountry[user.country].push(user)
    } else {
      usersByCountry[user.country] = [user]
    }
  })
  const countries = Object.entries(usersByCountry)
  countries.sort(([, usersA], [, usersB]) => usersB.length - usersA.length)

  return (
    <section className="py-20">
      <div className="container px-5 mx-auto">
        <h3 className="font-bold">We are a <i className="font-normal">Global</i> team</h3>
        <div className="flex flex-nowrap overflow-x-scroll gap-8 mt-8">
          {countries.map(([country, users]) => (
          <div key={country} className="bg-primary-light shadow-lg rounded-xl p-4 min-w-64">
              <h4 className="text-nowrap font-bold">{country}</h4>
              <p>
                {users.length > 3 ? `${users[0].name}, ${users[1].name}, ${users[2].name}, and ${users.length - 3} more ...` : users.map((user) => user.name).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
