const db = require('../models')
//
db.user.hasMany(db.order, {foreignKey : 'userId', onDelete: 'cascade'});
//this foreign key will add onto the order table.
//they are linked, deletion of user cascaded and deleted the order linked with 'userId
db.order.belongsTo(db.user)

db.user.hasOne(db.cart, {foreignKey: 'userId', onDelete: 'cascade'})
db.user.hasOne(db.wishlist, {foreignKey: 'userId', onDelete: 'cascade'})

db.cart.belongsTo(db.user)
db.wishlist.belongsTo(db.user)

db.cart.belongsToMany(db.item, { through: 'cart_item' });
db.item.belongsToMany(db.cart, { through: 'cart_item' });

db.item.belongsToMany(db.tag, {through: 'item_tag'})
db.tag.belongsToMany(db.item, {through: 'item_tag'})

db.wishlist.belongsToMany(db.item, { through: 'wishlist_item' });
db.item.belongsToMany(db.wishlist, { through: 'wishlist_item' });

db.record.belongsToMany(db.genre, {through: 'record_genre'})
db.genre.belongsToMany(db.record, {through: 'record_genre'})

db.record.belongsToMany(db.artist, {through: 'record_artist'})
db.artist.belongsToMany(db.record, {through: 'record_artist'})

db.record.belongsToMany(db.label, {through: 'record_label'})
db.label.belongsToMany(db.record, {through: 'record_label'})


db.record.belongsToMany(db.tag, {through: 'record_tag'})
db.tag.belongsToMany(db.record, {through: 'record_tag'})

db.record.belongsToMany(db.cart, {through: 'record_cart'})
db.cart.belongsToMany(db.record, {through: 'record_cart'})

db.artist.belongsToMany(db.label, {through: 'artist_label'})
db.label.belongsToMany(db.artist, {through: 'artist_label'})

exports.db = db;