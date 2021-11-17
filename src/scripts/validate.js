class ValidateCommon {
    validateType(isRequired, dataType, value) {
        if (isRequired) {
            if (!value || value=="") return "Trường này không được để trống";
        }
        if (value) {
            switch (dataType) {
                case "Email":
                    return this.validateEmail(value);
                default:
                    return null
            }
        }
    }
    validateEmail(value) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value))) return "Viết đúng định dạng cho phép";
    }
}
export default new ValidateCommon()