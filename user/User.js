var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  work: String,
  specialty: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
