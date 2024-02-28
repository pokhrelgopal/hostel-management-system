const Error = () => {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="max-w-2xl bg-slate-100 border w-full rounded p-8 text-center text-xl text-red-600 tracking-wide font-semibold">
        An unexpected error occured while fetching data.
      </div>
    </div>
  );
};

export default Error;
