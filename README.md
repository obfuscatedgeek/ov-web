# OV Web

This is the web interface for OV test. This will be publicly available and will be the interface with which the end-user will interact.


## Installation

  - clone the repo
  - navigate to the folder in the terminal and run `npm install`
  - Run the command `openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365` and generate SSL certifiacates.
  - Run the command `openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem` to remove password from the SSL certificates.
  - run the command `npm run start`
  - open your favourite navigator and browse to `https://localhost:4000`



