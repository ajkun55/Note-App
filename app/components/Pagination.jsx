import Link from "next/link";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function Pagination({ totalPage, currentPage }) {
  if (totalPage === 1) return;
  return (
    <div className="flex items-center justify-between w-fit">
      <Link href={currentPage === 1 ? "" : `/?pageNumber=${currentPage - 1}`}>
        <IoIosArrowRoundBack
          size={50}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "cursor-not-allowed fill-slate-100" : ""
          }`}
        />
      </Link>

      {[...Array(totalPage)].map((_ele, index) => (
        <Link href={`/?pageNumber=${index + 1}`} key={index}>
          <button
            className={`w-10 h-10 mx-3 bg-black hover:bg-slate-200 text-white hover:text-black ${
              currentPage === index + 1 ? "rounded-full" : "rounded-lg"
            }`}
          >
            {index + 1}
          </button>
        </Link>
      ))}

      <Link
        href={
          currentPage === totalPage ? "" : `/?pageNumber=${currentPage + 1}`
        }
      >
        <IoIosArrowRoundForward
          size={50}
          disabled={currentPage === totalPage}
          className={`${
            currentPage === totalPage ? "cursor-not-allowed fill-slate-100" : ""
          }`}
        />
      </Link>
    </div>
  );
}

export default Pagination;
