const fs = require("fs");
const YAML = require("yaml");

const patchHandleCoins = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/store/patch_handle_coins.yml", "utf8"),
);

const patchBuyItem = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/store/patch_buy_item.yml", "utf8"),
);

module.exports = { patchHandleCoins, patchBuyItem };
