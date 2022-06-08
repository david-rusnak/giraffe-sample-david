# David's Sample Giraffe App

This app demonstrates how giraffe renders data taken from InfluxDB buckets. Clicking the `Toggle View` button switches the data to be displayed in either a heatmap form or a line graph form. Users can update data by changing the `/birddata` request inside `main.js` to match their own bucket. Users will also need to update the flux query by also retrieving it from InfluxDB.

# Getting Started

In the project directory run:

`INFLUX_URL=YOUR_BASE_URL INFLUX_TOKEN=YOUR_API_TOKEN ORG_ID=YOUR_ORG_ID node src/server/main.js`

Then, in a new tab, run either:

`yarn client-dev` 

for dev watch mode, or:

`yarn client-build`

for building. Go to `http://localhost:8617/` to view the app.
