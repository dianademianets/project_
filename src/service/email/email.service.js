const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {ROOT_EMAIL_PASSWORD, ROOT_EMAIL} = require('../../configs/config');
const { statusCodeEnum: statusCode } = require('../../constants/response-status-codes.enum');
const templatesInfo = require('../../email-templates');
const { ErrorHandler } = require('../../helpers');
const { errorMessage } = require('../../error');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-template')
    }
});

const sendMail = async (email, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(statusCode.BAD_REQUEST,
                errorMessage.WRONG_EMAIL_OR_PASSWORD.customCode);
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transport.sendMail({
            from: ROOT_EMAIL,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
