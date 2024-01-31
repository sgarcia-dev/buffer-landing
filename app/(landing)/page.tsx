import { getUsers } from "@/data/users";
import Hero from "./components/Hero"
import TeamDistribution from "./components/TeamDistribution";

export default async function Landing() {
  const users = await getUsers()
  return (
    <>
      <Hero />
      <TeamDistribution users={users} />
    </>
  );
}
