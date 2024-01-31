import teamData from './team.json'

const users: User[] = teamData.data.map((user) => ({
  ...user,
  salary: Number(user.salary.replace(/[^0-9.-]+/g,"")),
  start_date: new Date(user.start_date).toISOString(),
}))

export async function getUsers() {
  return users
}
