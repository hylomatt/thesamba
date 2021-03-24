import Link from "next/link";
import Image from "next/image";

const HeaderTop = ({ data, isLoggedIn }) => {
  return (
    <div className="flex bg-medium-grey py-2 px-3">
      {isLoggedIn ? (
        <>
          <p className="mr-2">Hello,</p>
          <Link href="/vw/forum/login.php?logout=true">
            <a>Log out</a>
          </Link>
        </>
      ) : (
        <>
          <p className="mr-2">Hello!</p>
          <Link href="/vw/forum/login.php">
            <a className="mr-2">Log in</a>
          </Link>
          <p className="mr-2">or</p>
          <Link href="/vw/forum/profile.php?mode=register">
            <a className="mr-2">Register</a>
          </Link>
        </>
      )}
      <p className="mr-2">|</p>
      <Link href="/vw/contact.php">
        <a className="mr-2">Help</a>
      </Link>
      <p className="mr-2">|</p>
      <Link href="/vw/donate.php">
        <a className="mr-2">Donate</a>
      </Link>
      <p className="mr-2">|</p>
      <Link href="/vw/products/">
        <a className="mr-2">Buy Shirts</a>
      </Link>
      <div className="flex-auto"></div>
      <Link href="/vw/allbanners.php">
        <a className="mr-2">See all banner ads</a>
      </Link>
      <p className="mr-2">|</p>
      <Link href="/vw/banners.php">
        <a>Advertise on TheSamba.com</a>
      </Link>
    </div>
  );
};

export default HeaderTop;
