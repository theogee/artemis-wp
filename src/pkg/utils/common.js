export const getFileSize = (number) => {
    if (number < 1024) {
        return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
    }
};

export const formatDate = (str) => {
    const datePickerPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

    if (datePickerPattern.test(str)) return str;

    if (str === "") return "";

    const date = new Date(str);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};
