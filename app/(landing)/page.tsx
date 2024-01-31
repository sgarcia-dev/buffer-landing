import { getUsers } from "@/data/users";
import Hero from "./components/Hero"
import TeamDistribution from "./components/TeamDistribution";
import TeamList from "./components/TeamList";
import SalaryInsights from "./components/SalaryInsights";

export default async function Landing() {
  const users = await getUsers()
  return (
    <>
      <Hero />
      <TeamDistribution users={users} />
      <TeamList users={users} />
      <SalaryInsights users={users} />
    </>
  );
}
