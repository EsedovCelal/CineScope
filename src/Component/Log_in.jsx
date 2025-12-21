const Log_in = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex">
        <label for="username">
          Username:
          <input className="border" type="text" />
        </label>
        <label for="password">
          password:
          <input className="border" type="password" />
        </label>
      </div>
    </div>
  );
};
export default Log_in;
