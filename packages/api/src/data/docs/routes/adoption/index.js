const fs = require("fs");
const YAML = require("yaml");

const getAdoptionDetail = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/get_adoption_detail.yml", "utf8"),
);

const getAdoptionFeed = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/get_adoption_feed.yml", "utf8"),
);

const getRequestedAdoptions = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/get_requested_adoptions.yml", "utf8"),
);

const postAnimalAdoption = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/post_animal_adoption.yml", "utf8"),
);

const postCandidateAdoption = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/post_candidate_adoption.yml", "utf8"),
);

const deleteAnimalAdoption = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/delete_animal_adoption.yml", "utf8"),
);

const deleteRequestAdoption = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/delete_request_adoption.yml", "utf8"),
);

const getCreatedAdoptions = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/get_created_adoptions.yml", "utf8"),
);

const getAdoptionCandidates = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/get_adoption_candidates.yml", "utf8"),
);

const acceptAdoptionCandidate = YAML.parse(
	fs.readFileSync(
		"./src/data/docs/routes/adoption/accept_adoption_candidate.yml",
		"utf8",
	),
);

module.exports = {
	getAdoptionDetail,
	getAdoptionFeed,
	getRequestedAdoptions,
	postAnimalAdoption,
	postCandidateAdoption,
	deleteAnimalAdoption,
	deleteRequestAdoption,
	getCreatedAdoptions,
	getAdoptionCandidates,
	acceptAdoptionCandidate,
};
