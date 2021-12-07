// function getMailProviderFromEmailId(emailId) {
//   // extract the domain from the emailId
//   const domain = emailId.split("@")[1];
//   const user = emailId.split("@")[0];
//   // return the mail provider
//   return [user, domain.split(".")[0]];
// }

function generateIdFromEmail(email) {
  // replace . with (dot) in email
  return email.replace(".", "(dot)");
}

function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    // const [user, mailProvider] = getMailProviderFromEmailId(email);
    const firebaseId = generateIdFromEmail(email);
    // TODO: Add email to database
    fetch(
      `https://tester-1a095-default-rtdb.asia-southeast1.firebasedatabase.app/users/${firebaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        res.status(200).json({
          message: "Successfully added email to database",
        });
      } else {
        res.status(500).json({
          message: "Error adding email to database",
        });
      }
    });
  }
}

export default handler;
