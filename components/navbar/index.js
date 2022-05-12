import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";

const Navbar = ({ username }) => {
  console.log({ username });
  const [showDropdown, setShowDropdown] = useState(false);
  // const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  const handleOnClickHome = (event) => {
    event.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (event) => {
    event.preventDefault();
    router.push("/browse/my-list");
  };
  const handleShowDropdown = () => setShowDropdown(!showDropdown);
  const handleSignout = () => alert("signed out");
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width="128px"
              height="34px"
            />
          </div>
        </a>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              {/** Expand more icon */}
              <Image
                src={"/static/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a className={styles.linkName} onClick={handleSignout}>
                      Sign out
                    </a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
