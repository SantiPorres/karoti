import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      {/* <Hero /> */}
      <main className="flex-1 flex flex-col gap-12 px-4">
        <div>
          <h2 className="font-bold text-xl mb-4">Welcome</h2>
          <p>This is simply a task management application.</p>
        </div>

        <hr />

        <h2 className="font-bold text-xl mb-4 text-center">Just go ahead and sign up!</h2>
      </main>
    </>
  );
}
