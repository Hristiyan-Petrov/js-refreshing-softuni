const Ad = require('../models/Ad');
const User = require('../models/User');

module.exports = {
    getAll: number => Ad
        .find()
        .sort({ _id: -1 })
        .limit(number)
        .lean(),
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