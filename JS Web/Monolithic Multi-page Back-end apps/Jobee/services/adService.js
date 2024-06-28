const Ad = require('../models/Ad');
const User = require('../models/User');

module.exports = {
    create: ({ headline, location, companyName, companyDescription }, author) => {
        return Ad.create({
            headline,
            location,
            companyName,
            companyDescription,
            author,
            appliedUsers: []
        });
    },
    updateOwns: (userId, adId) => User.updateOne({ _id: userId }, { $push: { myAds: adId } }),
}