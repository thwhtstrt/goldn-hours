import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import pic from "../images/gold-icon.png";

function SearchUserList() {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState("");
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  const handleUserChange = (event) => {
    const value = event.target.value;
    setUser(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchString(user);
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    const username = event.currentTarget.dataset.username;
    navigate(`/profile/${username}`);
  };

  const fetchAccountList = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`;
    const fetchList = await fetch(listUrl);
    if (fetchList.ok) {
      const data = await fetchList.json();
      setAccounts(data);
    }
  };

  useEffect(() => {
    fetchAccountList();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-lg w-96 h-90 bg-slate-700 mt-4 d-flex flex-row-reverse align-items-center justify-content-between">
          <div>
            <div className="input-group flex flex-col items-center">
              <input
                className="w-2/3 m-4 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                type="text"
                id="usernameinput"
                name="usernameinput"
                placeholder="Search Users"
                maxLength="25"
                onChange={handleUserChange}
                value={user}
              ></input>
              <motion.button
                className="m-2 w-2/3 text-white right-2.5 bg-amber-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                onClick={handleSearchSubmit}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                Search Users
              </motion.button>
            </div>
          </div>
          <div className="p-2 flex flex-col justify-center items-center"></div>
          <table className="m-4 flex flex-col items-center table-auto;">
            <thead className=" m-3">
              <tr className="w-64 flex justify-around">
                <th>Pic</th>
                <th>Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <AnimatePresence>
              <motion.tbody exit="hidden" className="m-2">
                {accounts &&
                  accounts.map((account, i) => {
                    return (
                      (account.username
                        .toLowerCase()
                        .includes(searchString.toLowerCase()) ||
                        account.name
                          .toLowerCase()
                          .includes(searchString.toLowerCase()) ||
                        account.email
                          .toLowerCase()
                          .includes(searchString.toLowerCase())) && (
                        <motion.tr
                          initial={{
                            opacity: 0,
                            translateX: i % 2 === 0 ? 100 : -100,
                          }}
                          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.2 }}
                          className="cursor-pointer m-2"
                          key={account.username}
                          data-username={account.username}
                          onClick={handleProfileClick}
                        >
                          <motion.div
                            whileHover={{
                              scale: 1.5,
                              transition: { duration: 0.1 },
                            }}
                            className="flex justify-between items-center"
                          >
                            <motion.td
                              initial={{
                                opacity: 0,
                                translateX: -100,
                              }}
                              animate={{
                                opacity: 1,
                                translateX: 0,
                                translateY: 0,
                              }}
                              transition={{ duration: 0.3, delay: i * 0.2 }}
                            >
                              <img
                                className="my-3 mr-4 rounded-full w-6 h-6 object-cover"
                                src={account.profile_pic ?? pic}
                                alt="PROFILEPIC"
                              />
                            </motion.td>
                            <td className="">{account.name}</td>
                            <td>{account.username}</td>
                          </motion.div>
                        </motion.tr>
                      )
                    );
                  })}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    </>
  );
}
export default SearchUserList;
