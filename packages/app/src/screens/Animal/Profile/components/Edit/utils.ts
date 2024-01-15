import utils from '../../../../../utils';
import data from '../../../data';
import { FormData, ValidateDataResult } from './types';

/**
 * Validates the provided form data for an animal.
 * @param formData The form data to validate.
 * @returns The result of the validation.
 */
const validateData = (formData: FormData): ValidateDataResult => {
	if (!utils.validateData.isValid(formData.name, 'name')) {
		return { valid: false, message: 'Please enter a valid name' };
	}

	if (!data.types.map((type) => type.value).includes(formData.type)) {
		return { valid: false, message: 'Invalid type' };
	}

	if (!data.genders.map((gender) => gender.value).includes(formData.gender)) {
		return { valid: false, message: 'Invalid gender' };
	}

	if (!data.colors.map((color) => color.value).includes(formData.color)) {
		return { valid: false, message: 'Invalid color' };
	}

	if (!data.sizes.map((size) => size.value).includes(formData.size)) {
		return { valid: false, message: 'Invalid size' };
	}

	if (!utils.validateData.isValid(formData.description, 'description')) {
		return { valid: false, message: 'Please enter a valid description' };
	}

	return { valid: true };
};

export default { validateData };
