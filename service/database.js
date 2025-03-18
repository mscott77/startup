const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const topicCollection = db.collection('topics');

//------------------ping database (connection check)--------------------
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

//------------------------gameplay-------------------------------------
async function setUserGameplayInfo(token, currentTopic, currentLetter){
  await userCollection.updateOne(
    { token: token }, // Find the user by token
    { $set: { currentTopic, currentLetter } } // Update only the 'token' field
);
}

function getTopicByTitle(title) {
  return topicCollection.findOne({ title: title });
}

//------------------------user info-------------------------------------
function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUserToken(userEmail, token) {
    await userCollection.updateOne(
        { email: userEmail }, // Find the user by email
        { $set: { token: token } } // Update only the 'token' field
    );
}

async function removeUser(email) {
    await userCollection.deleteOne({email: email});
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUserToken,
  removeUser,
  setUserGameplayInfo,
  getTopicByTitle,
};
