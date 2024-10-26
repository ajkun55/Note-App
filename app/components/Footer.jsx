import Link from "next/link";

function Footer() {
  return (
    <div className="border-t-4 pt-4 w-full">
      <p className="text-center">
        &copy; {new Date().getFullYear()} All Rights Reserved
      </p>
      <div className="flex items-center justify-center flex-wrap gap-5 mt-5">
        <Link
          href="/terms"
          className="font-medium hover:font-semibold hover:underline"
        >
          Terms
        </Link>
        <Link
          href="/privacy"
          className="font-medium hover:font-semibold hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/cookie"
          className="font-medium hover:font-semibold hover:underline"
        >
          Cookie Policy
        </Link>
      </div>
    </div>
  );
}

export default Footer;
