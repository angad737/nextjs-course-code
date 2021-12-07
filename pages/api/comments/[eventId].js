function handler(req, res) {
  if (req.method === "GET") {
    const eventId = req.query.eventId;
    console.log(`getting comments for ${eventId}`);
    fetch(
      `https://tester-1a095-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${eventId}.json`
    ).then((response) => {
      if (response.status === 200) {
        console.log(response.status);
        response.json().then((data) => {
          if (data) {
            res.status(200).json(data);
          } else {
            res.status(404).json({});
          }
          // res.status(200).json(data);
        });
      } else {
        console.log(`no data found for ${eventId}`);
        res.status(404).json({
          error: "Not found",
        });
      }
    });
  }
  if (req.method === "POST") {
    const eventId = req.query.eventId;
    console.log(req.query, req.body);
    const body = req.body;
    fetch(
      `https://tester-1a095-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${eventId}.json`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    ).then((response) => {
      if (response.status === 200) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(500).json({
          error: "Internal server error",
        });
      }
    });
  }
}

export default handler;
