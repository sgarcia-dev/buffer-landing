import Image from 'next/image'

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
    <section className="py-20 bg-primary">
      <div className="container px-5 mx-auto">
        <h3 className="font-bold text-white">We are a <i className="font-normal">Global</i> team</h3>
        <div className="flex flex-nowrap overflow-x-scroll gap-8 mt-8" tabIndex={0}>
          {countries.map(([country, users]) => (
          <div key={country} className="bg-white border-gray-300 border shadow-lg rounded-xl p-4 min-w-96">
              <h4 className="text-nowrap font-bold">{country}</h4>
              <div className="flex gap-2 flex-wrap">
                {users.slice(0, 6).map((user) => (
                  <Image key={user.name} src={`/avatars/${user.avatar}`} alt={user.name} width={40} height={40} className="rounded-full shadow-md" />
                ))}
              </div>
              {users.length > 6 && (
                <p className="text-sm text-gray-500 mt-2">+ {users.length - 6} more</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
