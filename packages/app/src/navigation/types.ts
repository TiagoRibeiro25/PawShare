export type RootStackParamList = {
	OnBoarding: undefined;
	Auth: undefined;
	AdoptionFeed: undefined;
	AdoptionDetails: { id: number }; // Adoption ID
	SittingDetails: { id: number }; // Sitting ID
	ManageAdoptions: undefined;
	SittingFeed: undefined;
	Store: undefined;
	Profile: undefined;
	AddAnimal: undefined;
	AnimalProfile: { id: number }; // Animal ID
	AddDocument: undefined;
};
