const mongoose =  require('mongoose')

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected Database");
  })

  .catch((err) => {
    console.log("Connection Failed:", err.message);
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
  })

  mongoose.connection.on('error', (err) => {
    console.log(err.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
  })

  process.on('SIGNT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })