import Link from "next/link";
import Image from "next/image";

const Header = ({ data }) => {
  return (
    <div className="flex bg-dark-blue">
      <Link href={data.logo.href}>
        <a>
          <Image src={data.logo.src} alt="" width={320} height={60} />
        </a>
      </Link>
    </div>
  );
};

export default Header;
