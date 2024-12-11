const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  static async findOne(query) {
    await db.read();
    return db.data.users.find(user => user.email === query.email);
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = { ...data, password: hashedPassword };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  }

  static generateToken(user) {
    return jwt.sign({ id: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

module.exports = User;