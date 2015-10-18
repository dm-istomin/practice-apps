if (!process.env.CONSUMER_KEY ||  !process.env.CONSUMER_SECRET ||
!process.env.ACCESS_TOKEN_KEY || !process.env.ACCESS_TOKEN_SECRET) {
        throw {name: "ConfigurationError", message: "Missing Twitter API Credentials!" };
}

module.exports = {
  twitter: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  }
}
