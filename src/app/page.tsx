export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-background">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Welcome to LMS Platform
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Modern Learning Management System built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </main>
    </div>
  );
}
