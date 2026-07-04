export const Home = () => {
  return (
    <div className="min-h-120 flex items-center justify-center px-10 mt-3">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">
            Welcome to Our <br /> E-Commerce Store
          </h1>

          <p className="text-lg text-muted-foreground">
            This is an E-Commerce website built using FakeStoreAPI. Here you can
            experience features such as Infinite Scroll, React Context API,
            TanStack Router, TanStack Query, React Hook Form, Zod validation,
            and much more.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/ecom.jpg"
            alt="E-Commerce"
            className="w-full max-w-lg rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
