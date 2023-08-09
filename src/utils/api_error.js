class Error_template extends Error {
	constructor(code, message) {
		super()

		this.code = code
		this.message = message
	}

	fail() {
		
	}
}