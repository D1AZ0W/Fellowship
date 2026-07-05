import { AlertMessage } from "#/components/AlertMessage";
import { LoginCard } from "#/components/LoginCard";

export const Login = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <AlertMessage
        title="You are Logged in!!"
        message="You are already login view the products you want to buy"
        variant="default"
      />
    );
  } else {
    return (
      <div className="flex justify-center mt-5">
        <LoginCard />
      </div>
    );
  }
};
