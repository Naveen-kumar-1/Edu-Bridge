export const template = (templateType, code) => {
  if (templateType === "sendloginmail") {
    const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 20px !important;
          }
          .code-box {
            font-size: 24px !important;
            padding: 10px 20px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: #f4f4f4;">
      <div
        class="container"
        style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif; background: #f4f4f4; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
      >
        <div
          style="background-color: #fff; padding: 30px; border-radius: 8px; text-align: center;"
        >
          <h2 style="color: #2c3e50; margin-bottom: 10px;">
            Welcome to
            <span
              style="color: #ffffff; background: #3d3d3d; padding: 3px 20px; border-radius: 6px;"
              >Edu-Bridge</span
            >
          </h2>
          <p style="font-size: 16px; color: #555;">
            We received a login request for your Edu-Bridge account.
          </p>
          <p style="margin: 30px 0; font-size: 18px; color: #333;">
            Use the verification code below to proceed:
          </p>
  
          <!-- Verification Code -->
          <div
            class="code-box"
            style="display: inline-block; background: #3d3d3d; color: #ffffff; font-size: 32px; font-weight: bold; padding: 10px 30px; border-radius: 6px; margin: 0 auto;"
          >
            ${code}
          </div>
  
          <p style="font-size: 14px; color: #888; margin-top: 20px;">
            This code will expire in 10 minutes. Do not share it with anyone.
          </p>
          <hr
            style="margin: 30px 0; border: none; border-top: 1px solid #eee;"
          />
          <p style="font-size: 12px; color: #aaa;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="font-size: 12px; color: #aaa;">– Edu Bridge Team</p>
        </div>
      </div>
    </body>
  </html>`;
    return htmlTemplate;
  } else if (templateType === "resendloginmail") {
    const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 20px !important;
          }
          .code-box {
            font-size: 24px !important;
            padding: 10px 20px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: #f4f4f4;">
      <div
        class="container"
        style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif; background: #f4f4f4; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
      >
        <div
          style="background-color: #fff; padding: 30px; border-radius: 8px; text-align: center;"
        >
          <h2 style="color: #2c3e50; margin-bottom: 10px;">
            Login Verification
            <span
              style="color: #ffffff; background: #3d3d3d; padding: 3px 20px; border-radius: 6px;"
              >Resent</span
            >
          </h2>
          <p style="font-size: 16px; color: #555;">
            We've resent your login verification code as requested.
          </p>
          <p style="margin: 30px 0; font-size: 18px; color: #333;">
            Use this new verification code below:
          </p>
  
          <!-- Verification Code -->
          <div
            class="code-box"
            style="display: inline-block; background: #3d3d3d; color: #ffffff; font-size: 32px; font-weight: bold; padding: 10px 30px; border-radius: 6px; margin: 0 auto;"
          >
            ${code}
          </div>
  
          <p style="font-size: 14px; color: #888; margin-top: 20px;">
            This new code will expire in 10 minutes. The previous code is no longer valid.
          </p>
          <hr
            style="margin: 30px 0; border: none; border-top: 1px solid #eee;"
          />
          <p style="font-size: 12px; color: #aaa;">
            If you didn't request this, please secure your account.
          </p>
          <p style="font-size: 12px; color: #aaa;">– Edu Bridge Team</p>
        </div>
      </div>
    </body>
  </html>`;
    return htmlTemplate;
  } else if (templateType === "sendregistermail") {
    const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 20px !important;
          }
          .code-box {
            font-size: 24px !important;
            padding: 10px 20px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: #f4f4f4;">
      <div
        class="container"
        style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif; background: #f4f4f4; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
      >
        <div
          style="background-color: #fff; padding: 30px; border-radius: 8px; text-align: center;"
        >
          <h2 style="color: #2c3e50; margin-bottom: 10px;">
            Welcome to
            <span
              style="color: #ffffff; background: #3d3d3d; padding: 3px 20px; border-radius: 6px;"
              >Edu-Bridge</span
            >
          </h2>
          <p style="font-size: 16px; color: #555;">
            Thank you for registering with Edu-Bridge!
          </p>
          <p style="margin: 30px 0; font-size: 18px; color: #333;">
            Complete your registration with this verification code:
          </p>
  
          <!-- Verification Code -->
          <div
            class="code-box"
            style="display: inline-block; background: #3d3d3d; color: #ffffff; font-size: 32px; font-weight: bold; padding: 10px 30px; border-radius: 6px; margin: 0 auto;"
          >
            ${code}
          </div>
  
          <p style="font-size: 14px; color: #888; margin-top: 20px;">
            This code will expire in 10 minutes. Please verify your email soon.
          </p>
          <hr
            style="margin: 30px 0; border: none; border-top: 1px solid #eee;"
          />
          <p style="font-size: 12px; color: #aaa;">
            If you didn't register, please ignore this email.
          </p>
          <p style="font-size: 12px; color: #aaa;">– Edu Bridge Team</p>
        </div>
      </div>
    </body>
  </html>`;
    return htmlTemplate;
  } else if (templateType === "resendregistermail") {
    const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            padding: 20px !important;
          }
          .code-box {
            font-size: 24px !important;
            padding: 10px 20px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background: #f4f4f4;">
      <div
        class="container"
        style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif; background: #f4f4f4; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
      >
        <div
          style="background-color: #fff; padding: 30px; border-radius: 8px; text-align: center;"
        >
          <h2 style="color: #2c3e50; margin-bottom: 10px;">
            Registration Verification
            <span
              style="color: #ffffff; background: #3d3d3d; padding: 3px 20px; border-radius: 6px;"
              >Resent</span
            >
          </h2>
          <p style="font-size: 16px; color: #555;">
            We've resent your registration verification code as requested.
          </p>
          <p style="margin: 30px 0; font-size: 18px; color: #333;">
            Use this new verification code to complete your registration:
          </p>
  
          <!-- Verification Code -->
          <div
            class="code-box"
            style="display: inline-block; background: #3d3d3d; color: #ffffff; font-size: 32px; font-weight: bold; padding: 10px 30px; border-radius: 6px; margin: 0 auto;"
          >
            ${code}
          </div>
  
          <p style="font-size: 14px; color: #888; margin-top: 20px;">
            This new code will expire in 10 minutes. The previous code is no longer valid.
          </p>
          <hr
            style="margin: 30px 0; border: none; border-top: 1px solid #eee;"
          />
          <p style="font-size: 12px; color: #aaa;">
            If you didn't request this, please ignore this email.
          </p>
          <p style="font-size: 12px; color: #aaa;">– Edu Bridge Team</p>
        </div>
      </div>
    </body>
  </html>`;
    return htmlTemplate;
  }

  return "";
};
