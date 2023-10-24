function formatPhoneNumber(phone: string): string {
	const numericPhone = phone.replace(/\D/g, "");

	if (numericPhone.length === 10) {
		return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 6)}-${numericPhone.slice(6)}`;
	} else if (numericPhone.length === 11) {
		return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 7)}-${numericPhone.slice(7)}`;
	} else {
		return phone;
	}
}
export default formatPhoneNumber;
