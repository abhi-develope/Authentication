import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";


export const sendVerificaionEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"

        })
        console.log("email sent successfully", response);
        
        
    } catch (error) {
        console.log(`error in sending verification${error}`);
        throw new Error(`Error sending verification email: ${error}`)
        
        
    }

}


export const sendWelcomeEmail = async (email, name) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a49d4600-231d-48f5-a1e9-8c2f8920c932",
            template_variables: {
                name: name,
                company_info_name: "Authentication Demo",
              }
        })
        console.log("welcomeEmail sent successfully", response);
        
    } catch (error) {
        console.error("Error sending welcome email", error);

        throw new Error(`Error sending welcome email: ${error}`);
        
        
    }

}