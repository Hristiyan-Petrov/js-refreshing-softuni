const Ad = require('../models/Ad');
const User = require('../models/User');

module.exports = {
    getAll: async authorId => {
        let query = {};

        if (authorId) {
            let applied = (await User.findById(authorId).select('appliedToAds').lean()).appliedToAds;

            // Only show Ads where author is not the given user and user hasn't applied
            query.author = { $ne: authorId };
            query._id = { $nin: applied };
        }

        return Ad
            .find(query)
            .sort({ _id: -1 })
            .lean()
    },
    getLast3: () => Ad
        .find()
        .sort({ _id: -1 })
        .limit(3)
        .lean(),
    getUserData: (_id, path) => User
        // .findOne({ _id })
        .findOne({ _id }, { [path]: 1, email: 1, description: 1 })      // projection
        .populate({
            path,
            select: 'headline companyName location'
        })
        .lean(),
    getOneById: _id => Ad
        .findById(_id)
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
    update: async (id, { headline, location, companyName, companyDescription }) => {
        const currentAd = await Ad.findById(id);

        currentAd.headline = headline;
        currentAd.location = location;
        currentAd.companyName = companyName;
        currentAd.companyDescription = companyDescription;

        return currentAd.save();
    },
    updateOwns: (userId, adId) => User.updateOne({ _id: userId }, { $push: { myAds: adId } }),
    applyUser: async (adId, userId) => {
        try {
            await Ad.updateOne({ _id: adId }, { $push: { appliedUsers: userId } });
            await User.updateOne({ _id: userId }, { $push: { appliedToAds: adId } });
        } catch (error) {
            throw error;
        }
    },
    delete: async _id => {
        try {
            let ad = await Ad.findOne({ _id });
            console.log('found ad: ' + ad);

            let userIdsToUpdate = [...ad.appliedUsers, ad.author];

            await User.updateMany(
                { _id: { $in: userIdsToUpdate } },
                { $pull: { myAds: ad._id, appliedToAds: ad._id } }
            );

            return Ad.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}