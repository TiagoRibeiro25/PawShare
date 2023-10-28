const { Sequelize } = require("sequelize");

/**
 * Initialize the models and their associations
 * @param {Sequelize} sequelize - Sequelize instance
 */
function init(sequelize) {
	const User = require("./user.model")(sequelize);
	const Animal = require("./animal.model")(sequelize);
	const AnimalDocument = require("./animal_document.model")(sequelize);
	const Picture = require("./picture.model")(sequelize);
	const Adoption = require("./adoption.model")(sequelize);
	const Sitting = require("./sitting.model")(sequelize);
	const Review = require("./review.model")(sequelize);
	const UsersList = require("./users_list.model")(sequelize);

	//* Associations

	// User.id - Picture.user_id
	User.hasOne(Picture, { foreignKey: "user_id", onDelete: "CASCADE" });
	Picture.belongsTo(User, { foreignKey: "user_id" });

	// User.id < Animal.owner_id
	User.hasMany(Animal, { foreignKey: "owner_id", onDelete: "CASCADE" });
	Animal.belongsTo(User, { foreignKey: "owner_id" });

	// User.id < Adoption.owner_id
	User.hasMany(Adoption, { foreignKey: "owner_id", onDelete: "CASCADE" });
	Adoption.belongsTo(User, { foreignKey: "owner_id" });

	// User.id < Sitting.owner_id
	User.hasMany(Sitting, { foreignKey: "owner_id", onDelete: "CASCADE" });
	Sitting.belongsTo(User, { foreignKey: "owner_id" });

	// User.id < UsersList.user_id
	User.hasMany(UsersList, { foreignKey: "user_id", onDelete: "CASCADE" });
	UsersList.belongsTo(User, { foreignKey: "user_id" });

	// Animal.id < Picture.animal_id
	Animal.hasMany(Picture, { foreignKey: "animal_id", onDelete: "CASCADE" });
	Picture.belongsTo(Animal, { foreignKey: "animal_id" });

	// Animal.id < Adoption.animal_id
	Animal.hasMany(Adoption, { foreignKey: "animal_id", onDelete: "CASCADE" });
	Adoption.belongsTo(Animal, { foreignKey: "animal_id" });

	// Animal.id < Sitting.animal_id
	Animal.hasMany(Sitting, { foreignKey: "animal_id", onDelete: "CASCADE" });
	Sitting.belongsTo(Animal, { foreignKey: "animal_id" });

	// Animal.id < AnimalDocument.animal_id
	Animal.hasMany(AnimalDocument, { foreignKey: "animal_id", onDelete: "CASCADE" });
	AnimalDocument.belongsTo(Animal, { foreignKey: "animal_id" });

	// Animal.picture_id - Picture.id
	Picture.hasOne(Animal, { foreignKey: "picture_id" });
	Animal.belongsTo(Picture, { foreignKey: "picture_id" });

	// Adoption.id - Review.adoption_id
	Adoption.hasOne(Review, { foreignKey: "adoption_id" });
	Review.belongsTo(Adoption, { foreignKey: "adoption_id" });

	// Adoption.id < UsersList.adoption_id
	Adoption.hasMany(UsersList, { foreignKey: "adoption_id", onDelete: "CASCADE" });
	UsersList.belongsTo(Adoption, { foreignKey: "adoption_id" });

	// Sitting.id - Review.sitting_id
	Sitting.hasOne(Review, { foreignKey: "sitting_id" });
	Review.belongsTo(Sitting, { foreignKey: "sitting_id" });

	// Sitting.id < UsersList.sitting_id
	Sitting.hasMany(UsersList, { foreignKey: "sitting_id", onDelete: "CASCADE" });

	return {
		User,
		Animal,
		AnimalDocument,
		Picture,
		Adoption,
		Sitting,
		Review,
		UsersList,
	};
}

module.exports = { init };
