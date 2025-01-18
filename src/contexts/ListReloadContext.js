import React, { createContext, useContext, useState } from "react";

const ListReloadContext = createContext();

export const ListReloadProvider = ({ children }) => {
  const [reloadContactList, setReloadContactList] = useState(0);
  const [reloadChildrenList, setReloadChildrenList] = useState(0);

  const triggerContactListReload = () => {
    setReloadContactList((prev) => prev + 1);
  };

  const triggerChildrenListReload = () => {
    setReloadChildrenList((prev) => prev + 1);
  };

  return (
    <ListReloadContext.Provider
      value={{
        reloadContactList,
        triggerContactListReload,
        reloadChildrenList,
        triggerChildrenListReload,
      }}
    >
      {children}
    </ListReloadContext.Provider>
  );
};

export const useListReload = () => {
  return useContext(ListReloadContext);
};
