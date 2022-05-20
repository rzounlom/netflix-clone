import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { magic } from "../../lib/magic-client";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const confirmLogin = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email", error);
      }
    };

    confirmLogin();
  }, []);

  const handleOnClickHome = (event) => {
    event.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (event) => {
    event.preventDefault();
    router.push("/browse/my-list");
  };
  const handleShowDropdown = () => setShowDropdown(!showDropdown);
  const handleSignout = async (event) => {
    event.preventDefault();

    try {
      await magic.user.logout();
      router.route("/login");
      const isLoggedIn = await magic.user.isLoggedIn();
      if (!isLoggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };
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
