export const EmailTemplates = {
    contactUs: (name: string, message: string, email: string, phone: string, subject: string) => `
        <!DOCTYPE html>
        <html>
            <head>
                <title>New Contact Us Form Submission</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        padding: 20px;
                    }
                    .header {
                        background-color: #f8f9fa;
                        padding: 10px 20px;
                        border-bottom: 1px solid #dee2e6;
                    }
                    .content {
                        margin: 20px 0;
                    }
                    .footer {
                        background-color: #f8f9fa;
                        padding: 10px 20px;
                        border-top: 1px solid #dee2e6;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>New Contact Us Form Submission</h2>
                    </div>
                    <div class="content">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Contact:</strong> ${phone}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </div>
                    <div class="footer">
                        <p>This message was sent from the BPIT Alumni Website Contact Us form.</p>
                    </div>
                </div>
            </body>
        </html>`,

    feedback : (name: string, email: string, feedback: string) => `
        <!DOCTYPE html>
        <html>
            <head>
                <title>New Feedback Form Submission</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        padding: 20px;
                    }
                    .header {
                        background-color: #f8f9fa;
                        padding: 10px 20px;
                        border-bottom: 1px solid #dee2e6;
                    }
                    .content {
                        margin: 20px 0;
                    }
                    .footer {
                        background-color: #f8f9fa;
                        padding: 10px 20px;
                        border-top: 1px solid #dee2e6;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>New Feedback Form Submission</h2>
                    </div>
                    <div class="content">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Feedback:</strong></p>
                        <p>${feedback}</p>
                    </div>
                    <div class="footer">
                        <p>This message was sent from the BPIT Alumni Website Feedback form.</p>
                    </div>
                </div>
            </body>
        </html>`,

    news: (title: string, content: string) => `
      <h1>${title}</h1>
      <p>${content}</p>
    `,
};
  