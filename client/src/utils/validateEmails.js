const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
    const invalidEmails = emails.split(",").map(x => x.trim()).filter(x => re.test(x) === false);
    if (invalidEmails.length > 0) {
        return `These emails are invalid ${invalidEmails}`;
    }
    return;
};