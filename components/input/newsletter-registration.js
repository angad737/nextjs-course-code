import { useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./newsletter-registration.module.css";
import {
  setNotification,
  clearNotification,
} from "../../store/notification-slice";

function NewsletterRegistration() {
  const dispatch = useDispatch();
  const inputEmail = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const email = inputEmail.current.value;
    console.log(`User ${email} is registering...`);
    dispatch(
      setNotification({
        message: `User ${email} is registering...`,
        status: "pending",
        title: "Signing Up...",
      })
    );

    fetch("/api/newsletter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("User registered successfully");
          dispatch(
            setNotification({
              message: `User ${email} is registered for the newsletter`,
              status: "success",
              title: "Signed Up!",
            })
          );
        } else {
          console.log("User registration failed");
          dispatch(
            setNotification({
              message: `Something Went wrong...`,
              status: "error",
              title: "Signed Up failed :/",
            })
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputEmail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
