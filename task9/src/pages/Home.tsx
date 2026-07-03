export const Home = () => {
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col h-1/3">
          <h1>Welcome to Home Page</h1>
          <p className="relative h-full w-1/2">
            This is a E-Commerce website built using FakeStoreAPI. Here u can
            experience various features like infiniteScroll, ReactContextAPI,
            Tanstack Router,Tanstack Query, React Hook Forms and Zod, etc.
          </p>
        </div>
      </div>
      <img src="public/ecom.jpg w-1/2 h-full"></img>
    </div>
  );
};
