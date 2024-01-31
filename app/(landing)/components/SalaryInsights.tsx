import Table from "@/components/Table"

export default async function SalaryInsights({
  users
}: Readonly<{
  users: User[]
}>) {
  const salaryByCountry = aggregateSalary(users, 'country')
  const salaryByTeam = aggregateSalary(users, 'team')
  const salaryByRole = aggregateSalary(users, 'role')

  return (
    <section className="py-40 bg-primary-light">
      <div className="container px-5 mx-auto">
        <h2 className="font-bold text-center">Salary Insights</h2>
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          <div>
            <h5 className="font-bold">By Country</h5>
            <div className="bg-white rounded-lg p-4 max-h-[50vh] overflow-y-auto overflow-x-auto" tabIndex={0}>
              <Table
                caption="Salary table for Buffer.com employees grouped by country"
                columns={[
                  {
                    name: 'label',
                    label: 'Country',
                  },
                  {
                    name: 'salary',
                    label: 'Average Salary',
                    render: (row: any) => `$${row.salary.toLocaleString('en-US', {maximumFractionDigits: 0})}`
                  },
                ]}
                rows={salaryByCountry} />
            </div>
          </div>
          <div>
            <h5 className="font-bold">By Team</h5>
            <div className="bg-white rounded-lg p-4 max-h-[50vh] overflow-y-auto overflow-x-auto" tabIndex={0}>
              <Table
                caption="Salary table for Buffer.com employees grouped by team"
                columns={[
                  {
                    name: 'label',
                    label: 'Team',
                  },
                  {
                    name: 'salary',
                    label: 'Average Salary',
                    render: (row: any) => `$${row.salary.toLocaleString('en-US', {maximumFractionDigits: 0})}`
                  },
                ]}
                rows={salaryByTeam} />
            </div>
          </div>
          <div>
            <h5 className="font-bold">By Role</h5>
            <div className="bg-white rounded-lg p-4 max-h-[50vh] overflow-y-auto overflow-x-auto" tabIndex={0}>
              <Table
                caption="Salary table for Buffer.com employees grouped by role"
                columns={[
                  {
                    name: 'label',
                    label: 'Role',
                  },
                  {
                    name: 'salary',
                    label: 'Average Salary',
                    render: (row: any) => `$${row.salary.toLocaleString('en-US', {maximumFractionDigits: 0})}`
                  },
                ]}
                rows={salaryByRole} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function aggregateSalary(users: User[], key: keyof User) {
  const aggregatedSalaries: Record<string, number[]> = {}
  users.forEach((user) => {
    const value = user[key]
    if (!value) return
    if (!!aggregatedSalaries[value]) {
      aggregatedSalaries[value].push(user.salary)
    } else {
      aggregatedSalaries[value] = [user.salary]
    }
  })

  let aggregatedSalariesArray: [string, number][] = []
  aggregatedSalariesArray = Object.entries(aggregatedSalaries).map(([key, salaries]) => {
    const averageSalary = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length
    return [key, averageSalary]
  })
  aggregatedSalariesArray.sort(([, salaryA], [, salaryB]) => salaryB - salaryA)
  return aggregatedSalariesArray.map(([label, salary]) => ({ key, label, salary }))
}