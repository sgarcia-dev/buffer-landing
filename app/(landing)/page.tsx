import { getUsers } from "@/data/users";
import Hero from "./components/Hero"
import TeamDistribution from "./components/TeamDistribution";
import TeamList from "./components/TeamList";

export default async function Landing() {
  const users = await getUsers()
  return (
    <>
      <Hero />
      <TeamDistribution users={users} />
      <TeamList users={users} />
    </>
  );
}
