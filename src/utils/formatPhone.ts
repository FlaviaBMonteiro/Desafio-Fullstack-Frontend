function formatPhoneNumber(phone: string): string {
	// Remover todos os caracteres não numéricos do número de telefone
	const numericPhone = phone.replace(/\D/g, "");

	// Verificar o tamanho do número e aplicar o formato apropriado
	if (numericPhone.length === 10) {
		// (xx) xxxx-xxxx
		return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 6)}-${numericPhone.slice(6)}`;
	} else if (numericPhone.length === 11) {
		// (xx) xxxx-xxxxx
		return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 7)}-${numericPhone.slice(7)}`;
	} else {
		// Se o número não se encaixar nos formatos desejados, retorne o número original
		return phone;
	}
}
export default formatPhoneNumber;
