const Article = require("../models/Article");

const getAll = () => {
    return Article.find()
        .then(articles => {
            return articles.map(x => {        // Convert mongo obj to js obj so the format matches the client curr implementation
                x = x.toObject();
                return { ...x, objectId: x._id };
            });
        })
        .catch(err => {
            console.log('err from article service');
            console.log(err);

            throw err;
            // TODO
        });
};

const create = ({ title, category, content }, ownerId) => Article.create({
    title,
    category,
    content,
    ownerId
});

const getOneById = async id => {
    const article = await Article.findById(id).lean();
    return { ...article, objectId: article._id };
};

const edit = (id, { title, category, content }) => Article.findByIdAndUpdate(id, { title, category, content });

const deleteOne = id => {
    console.log(id);
    return Article.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    create,
    getOneById,
    edit,
    deleteOne
}