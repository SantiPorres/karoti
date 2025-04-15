export default async function Home() {
  return (
    <>
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
