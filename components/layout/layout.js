import { Fragment, useEffect } from "react";

import MainHeader from "./main-header";
import Notification from "../ui/notification";
import { useSelector } from "react-redux";

function Layout(props) {
  const notification = useSelector((state) => state.notification.notification);
  const { message, title, status } = notification || {};
  console.log(notification);

  useEffect(() => {}, [notification]);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification title={title} message={message} status={status} />
      )}
    </Fragment>
  );
}

export default Layout;
