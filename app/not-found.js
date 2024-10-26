"use client";

function NotFound() {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Not Found</h1>
      <button
        onClick={handleClick}
        className="text-red-700 hover:text-red-400 font-semibold"
      >
        Go Home Page
      </button>
    </div>
  );
}

export default NotFound;
