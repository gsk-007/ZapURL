import app from "./server";

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`hello on http://localhost:${port}`)
})
