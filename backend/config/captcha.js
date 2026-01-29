require("dotenv").config();
const axios = require("axios");

async function verifyReCaptcha(token) {
    if(!token) {
        return false;
    }
    const secret = process.env.CAPTCHA_SECRET_KEY;
    const res = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
        params: {
            secret,
            response: token,
        }
    });

    return res.data.success == true;
}

module.exports = verifyReCaptcha;