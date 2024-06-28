const Ad = require('../models/Ad');
const User = require('../models/User');

module.exports = {
    getAds: number => Ad
        .find()
        .sort({ _id: -1 })
        .limit(number)
        .lean(),
    getOneById: id => Ad.
        findById(id)
        .populate('appliedUsers', 'email description') // specify fields to populate (retrieve their values from db)
        .lean(),
    getAuthorEmail: authorId => User
        .findById(authorId)
        .select('email -_id'),
    create: ({ headline, location, companyName, companyDescription }, author) => Ad.create({
        headline,
        location,
        companyName,
        companyDescription,
        author,
        appliedUsers: []
    }),
    updateOwns: (userId, adId) => User.updateOne({ _id: userId }, { $push: { myAds: adId } }),
    applyUser: (adId, userId) => Ad.updateOne({ _id: adId }, { $push: { appliedUsers: userId } }),
}