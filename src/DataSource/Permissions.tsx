import type { PermissionsContextType } from "breezeTypesPermissions";

const PermissionsDefault: PermissionsContextType = {
	Status: {
		edit: false,
		delete: false,
		post: false,
		report: false,
	},
	Comments: {
		edit: false,
		delete: false,
		post: false,
		report: false,
	},
	Forum: {
		likesLike: false,
		adminForum: false,
		profileView: false,
	},
	isEnable: {
		enableLikes: false,
	},
};

export default PermissionsDefault;
