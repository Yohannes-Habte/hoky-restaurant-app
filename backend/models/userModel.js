import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordChangedAt: Date,
    passwordResetTokenExpires: Date,
    image: { type: String, default: 'https://i.ibb.co/4pDNDk1/avatar.png' },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Generate randomly set token for the forgot and reset password using instance methods
// createResetpasswordToken is just a name or a variable name, which stores what is coded inside it. It is possible to use another name as well.

userSchema.methods.createResetpasswordToken = function () {
  // Create reset token
  let resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetToken = hashedToken;
  this.passwordResetTokenExpires = Date.now() + 10 * 10 * 60 * 1000;

  // The user will get the decrypted reset token therefore we return resetToken. However, what is stored in the database is the encrypted reset token to block hakers from hacking user account
  return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
