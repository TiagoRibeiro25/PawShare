const fs = require("fs");
const YAML = require("yaml");
const routeDocs = require("../data/docs/routes/");

const info = YAML.parse(fs.readFileSync("./src/data/docs/info.yml", "utf8"));

/** @type {import("swagger-jsdoc").SwaggerDefinition} */
const swaggerDefinition = {
	openapi: "3.0.1",
	info,
	servers: [{ url: "http://localhost:5000/api/v1" }], //TODO (any): Check the enviroment and use the correct url (only after deploying)
	paths: {
		"/": { get: routeDocs.default.getHelloWorld },
		"/{any*}": { get: routeDocs.default.notFound },
		"/cronjob/unverified-users": { delete: routeDocs.cronjob.deleteUnverifiedUsers },
		"/auth/login": { post: routeDocs.auth.postLogin },
		"/auth/register": { post: routeDocs.auth.postRegister },
		"/auth/request-reset-password": { post: routeDocs.auth.postRequestResetPassword },
		"/auth/reset-password/{token}": { patch: routeDocs.auth.patchResetPassword },
		"/users/verify/{token}": { patch: routeDocs.users.patchVerifyUser },
		"/users/me": { get: routeDocs.users.getLoggedUser },
		"/users/{id}": { get: routeDocs.users.getUserProfile },
		"/users": { patch: routeDocs.users.updateUserProfile },
		"/animals/{id}": { get: routeDocs.animals.getAnimalDetail },
		"/store/coins": { patch: routeDocs.store.patchHandleCoins },
		"/store/buy/{itemId}": { patch: routeDocs.store.patchBuyItem },
		"/reviews": { post: routeDocs.review.postAddReview },
		"/adoption": {
			get: routeDocs.adoption.getAdoptionFeed,
			post: routeDocs.adoption.postAnimalAdoption,
		},
		"/adoption/{id}": {
			get: routeDocs.adoption.getAdoptionDetail,
			delete: routeDocs.adoption.deleteAnimalAdoption,
		},
		"/adoption/{id}/requested": {
			post: routeDocs.adoption.postCandidateAdoption,
			delete: routeDocs.adoption.deleteRequestAdoption,
		},
		"/adoption/requested": { get: routeDocs.adoption.getRequestedAdoptions },
		"/adoption/created": { get: routeDocs.adoption.getCreatedAdoptions },
		"/sitting": {
			get: routeDocs.sitting.getSittingFeed,
			post: routeDocs.sitting.postAnimalSitting,
		},
		"/sitting/{id}": { get: routeDocs.sitting.getSittingDetail },
		"/sitting/requested": { get: routeDocs.sitting.getRequestedSittings },
	},
};

module.exports = swaggerDefinition;
