import CounterProvider from "./Counter/CounterProvider";
import UserProvider from "./User/UserProvider";

const Provider = ({ children }) => {
  return (
    <CounterProvider>
      <UserProvider>{children}</UserProvider>
    </CounterProvider>
  );
};

export default Provider;
