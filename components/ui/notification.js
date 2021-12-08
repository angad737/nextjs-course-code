// import { useContext } from "react";

import { useDispatch } from "react-redux";
import { clearNotification } from "../../store/notification-slice";
import classes from "./notification.module.css";
// import NotificationContext from "../../store/notification-context";

function Notification(props) {
  const dispatch = useDispatch();
  // const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  const handleClose = () => {
    dispatch(clearNotification());
  };

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={handleClose}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
