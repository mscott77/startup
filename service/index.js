const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//----------------------------------------user info endpoints------------------------------------
// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    console.log('successfull create')
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUserToken(user.email, user.token);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      console.log('successfull login')
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    DB.updateUserToken(user.email, '');
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
  console.log('successfull logout')
});

apiRouter.delete('/auth/removeUser', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  username = user.email
  if (user) {
    await removeUser(user.email)
    res.clearCookie(authCookieName);
    res.status(204).send({msg: `acccount deleted: ${username}`});
    console.log(`acccount deleted: ${username}`)
  }
  else{
    res.status(404).send({msg: 'User not found'})
  }
});

//----------------------------------------gameplay endpoints------------------------------------

// get users game state
apiRouter.get('/game/player/state', async (req, res) => {
  // recieve: token cookie
  // return: {"currentTopic":"fruits", "currentLetter":"b"}
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    console.log(` currentTopic: ${user.currentTopic}\n currentLetter:${user.currentLetter}`);
    res.send({currentTopic: user.currentTopic, currentLetter: user.currentLetter});
  }
  else{
    res.status(404).send({msg: 'User not found'})
  }
});

// set users game state
apiRouter.post('/game/player/state', async (req, res) => {
  // recieve token cookie, body{"currentTopic":"fruits", "currentLetter":"b"}
  // set: {"currentTopic":"fruits", "currentLetter":"b"}
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    DB.setUserGameplayInfo(user.token, req.body.currentTopic, req.body.currentLetter)
      .then(() => {
        console.log(`user: '${user.email}' gameplay info updates successfully`)
        res.status(200).send({ msg: 'User gameplay info updated successfully' }); // Success response
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ msg: 'Error updating user gameplay info' }); // Error response
      })
  }
  else{
    res.status(404).send({msg: 'User not found'})
  }
});

// get random topic list
apiRouter.get('/game/topics/getRandom', async (req, res) => {
  // recieve: nothing
  // return: random topic list: {"title":"star wars","a":["Anakin Skywalker","Alderaan","ackbar"], ...}
  const topic = await DB.getRandomTopic();
  console.log(`user requested random topic - topic provided: ${topic["title"]}`);
  res.send(topic);
});

// get specified topic list
apiRouter.get('/game/topics/getSpecified', async (req, res) => {
  // recieve: {"topicListTitle": "star wars"}
  // return: requested topicList: {"title":"star wars","a":["Anakin Skywalker","Alderaan","ackbar"], ...}
  const topic = await DB.getTopicByTitle(req.body.topicListTitle);
  if (topic) {
    console.log(` user requested and successfully fetched the topic: ${req.body.topicListTitle}`);
    res.send(topic);
  }
  else{
    res.status(404).send({msg: 'topic not found'})
  }
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});



async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user)

  return user;
}

async function removeUser(email){
  await DB.removeUser(email);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
