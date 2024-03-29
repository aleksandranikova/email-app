const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport.js');
const cookieSession = require('cookie-session');

const app = express();
mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //assets
    app.use(express.static('client/build'));
    //routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);