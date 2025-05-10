import nodemailer from 'nodemailer'

export const sendVerificationMailEmail = async (toMail,Subject,Content) =>{
    try{
        if(!toMail || !Subject || !Content){
                return false;
        }
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"codemavericknk@gmail.com",
                pass:'gegv ykno xjdl tvoe'
            }
        })
        const mailOptions ={
            from : 'codemavericknk@gmail.com',
            to:toMail,
            subject:Subject,
            html:Content
        }
        const info = await transporter.sendMail(mailOptions)
        if(info){
            return true;
        }
    }catch(error){
        console.error('Error sending email:', error);
        return false;
    }
}