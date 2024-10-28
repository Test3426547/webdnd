import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we're in the project root
process.chdir(path.resolve(__dirname));

// Install Poetry if it's not already installed
try {
  execSync('which poetry');
} catch (error) {
  console.log('Installing Poetry...');
  execSync('curl -sSL https://install.python-poetry.org | python3 -');
  // Add Poetry to PATH
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  process.env.PATH = `${homeDir}/.local/bin:${process.env.PATH}`;
}

// Create a new directory for the backend
execSync('mkdir -p backend');
process.chdir('backend');

// Initialize Poetry
try {
  execSync('poetry init --no-interaction --name="fastapi-backend" --description="FastAPI backend for Next.js app" --author="Your Name <your.email@example.com>" --python="^3.9"');
} catch (error) {
  console.error('Error initializing Poetry project:', error);
  process.exit(1);
}

// Add dependencies
execSync('poetry add fastapi uvicorn supabase-py jinja2 python-dotenv google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client twilio apscheduler');

// Create blog_updates.py file
const blogUpdatesPy = `
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

router = APIRouter()

class BlogPost(BaseModel):
    title: str
    content: str
    author: str

@router.post("/api/blog/post")
async def create_blog_post(post: BlogPost, background_tasks: BackgroundTasks):
    try:
        # Save the blog post to the database
        post_id = save_blog_post(post)
        
        # Send notifications to subscribers
        background_tasks.add_task(notify_subscribers_new_post, post)
        
        return {"message": "Blog post created successfully", "post_id": post_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def save_blog_post(post: BlogPost):
    # Implement logic to save the blog post to your database
    # Return the post ID
    pass

def notify_subscribers_new_post(post: BlogPost):
    subscribers = get_newsletter_subscribers()
    for subscriber in subscribers:
        send_email(
            to=subscriber.email,
            subject=f"New Blog Post: {post.title}",
            body=f"""
            <h1>{post.title}</h1>
            <p>By {post.author}</p>
            <p>{post.content[:200]}...</p>
            <a href="https://spectrumwebco.com.au/blog/{post.id}">Read more</a>
            """
        )

def get_newsletter_subscribers():
    # Implement logic to get newsletter subscribers from your database
    pass

def send_email(to: str, subject: str, body: str):
    # Implement email sending logic
    pass
`;

fs.writeFileSync('blog_updates.py', blogUpdatesPy);

// Create newsletter_automation.py file
const newsletterAutomationPy = `
// ... newsletter automation code as provided ...
`;

fs.writeFileSync('newsletter_automation.py', newsletterAutomationPy);

// Create main.py file
const mainPy = `
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
from jinja2 import Environment, FileSystemLoader
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import base64
from google.oauth2 import service_account
from googleapiclient.discovery import build
from dotenv import load_dotenv
from blog_updates import router as blog_router
from newsletter_automation import router as newsletter_router, shutdown_event

load_dotenv()

app = FastAPI()

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Initialize Jinja2 environment
env = Environment(loader=FileSystemLoader("templates"))

# Google Workspace setup
SCOPES = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_KEY = os.getenv("SERVICE_ACCOUNT_KEY")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
DELEGATED_ACCOUNT = os.getenv("DELEGATED_ACCOUNT")

def get_google_service(service_name):
    creds = service_account.Credentials.from_service_account_info(
        eval(base64.b64decode(SERVICE_ACCOUNT_KEY)),
        scopes=SCOPES
    )
    delegated_creds = creds.with_subject(DELEGATED_ACCOUNT)
    return build(service_name, 'v1', credentials=delegated_creds)

def send_email(to, subject, body):
    service = get_google_service('gmail')
    message = MIMEMultipart()
    message['to'] = to
    message['subject'] = subject
    message.attach(MIMEText(body, 'html'))
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode('utf-8')
    service.users().messages().send(userId=DELEGATED_ACCOUNT, body={'raw': raw_message}).execute()

# Add Twilio setup
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER")
ADMIN_PHONE_NUMBER = "+61432588330"

twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Add SMS notification function
def send_sms_notification(message):
    twilio_client.messages.create(
        body=message,
        from_=TWILIO_FROM_NUMBER,
        to=ADMIN_PHONE_NUMBER
    )

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    mobileNumber: str = None
    message: str

class NewsletterSubscription(BaseModel):
    email: EmailStr

@app.post("/api/contact")
async def submit_contact_form(form: ContactForm, background_tasks: BackgroundTasks):
    try:
        # Insert the form data into Supabase
        data, count = supabase.table("contact_submissions").insert({
            "name": form.name,
            "email": form.email,
            "mobile_number": form.mobileNumber,
            "message": form.message
        }).execute()
        
        # Send email to admin
        admin_template = env.get_template("admin_email.html")
        admin_html = admin_template.render(form.__dict__)
        background_tasks.add_task(send_email, ADMIN_EMAIL, "New Contact Form Submission", admin_html)
        
        # Send email to user
        user_template = env.get_template("user_email.html")
        user_html = user_template.render(form.__dict__)
        background_tasks.add_task(send_email, form.email, "Thank you for contacting Spectrum", user_html)
        
        # Send SMS notification
        sms_message = f"New contact form submission received from {form.name}. Check your admin email for details."
        background_tasks.add_task(send_sms_notification, sms_message)
        return {"message": "Form submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/subscribe")
async def subscribe_to_newsletter(subscription: NewsletterSubscription, background_tasks: BackgroundTasks):
    try:
        # Insert the subscription data into Supabase
        data, count = supabase.table("newsletter_subscriptions").insert({
            "email": subscription.email
        }).execute()
        
        # Send confirmation email
        template = env.get_template("newsletter_confirmation.html")
        html = template.render(email=subscription.email)
        background_tasks.add_task(send_email, subscription.email, "Welcome to Spectrum's Newsletter", html)
        
        return {"message": "Subscribed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/handle_contact")
async def handle_contact(contact_id: int):
    try:
        supabase.table("contact_submissions").update({"status": "handled"}).eq("id", contact_id).execute()
        cancel_follow_up_reminder(contact_id)
        return {"message": "Contact handled successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("shutdown")
def shutdown():
    shutdown_event()

# Include routers
app.include_router(blog_router)
app.include_router(newsletter_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

fs.writeFileSync('main.py', mainPy);

// Create email templates
const templatesDir = path.join('templates');
fs.mkdirSync(templatesDir, { recursive: true });

const adminEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        /* Tailwind-inspired styles */
        body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #1f2937; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        p { margin-bottom: 16px; }
        ul { list-style-type: none; padding: 0; }
        li { margin-bottom: 8px; }
        a { color: #2563eb; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Contact Form Submission</h1>
        <p>Hi Ove,</p>
        <p>
            Please be advised a submission has been made on
            <a href="https://spectrumwebco.com.au">https://spectrumwebco.com.au</a>.
        </p>
        <p>Please see below for the client's information:</p>
        <ul>
            <li><strong>Name:</strong> {{name}}</li>
            <li><strong>Email:</strong> {{email}}</li>
            <li><strong>Mobile Number:</strong> {{mobileNumber}}</li>
            <li><strong>Message:</strong> {{message}}</li>
        </ul>
        <p>
            Please check your inbox for a sent email, you should be able to continue the conversation with them directly, if applicable.
        </p>
        <p>Kind Regards,<br/>AutoBot</p>
    </div>
</body>
</html>
`;

const userEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting Spectrum</title>
    <style>
        /* Tailwind-inspired styles */
        body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #1f2937; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        p { margin-bottom: 16px; }
        .signature { font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank you for contacting Spectrum</h1>
        <p>Hi {{name}},</p>
        <p>Thank you for expressing an interest in working with Spectrum. We appreciate you taking the time to reach out to us.</p>
        <p>We've received your message and our team is reviewing it. We'll get back to you as soon as possible with more information or to schedule a follow-up conversation.</p>
        <p>If you have any additional information, such as project details, images, or links that you'd like to share, please feel free to reply to this email. This email thread serves as a direct line of communication between you and our team.</p>
        <p>We look forward to the possibility of working together and creating something amazing for your business.</p>
        <p class="signature">Kind Regards,<br/>The Spectrum Team</p>
    </div>
</body>
</html>
`;

const newsletterConfirmationTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Spectrum's Newsletter</title>
    <style>
        /* Tailwind-inspired styles */
        body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #1f2937; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        p { margin-bottom: 16px; }
        .button { display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Spectrum's Newsletter</h1>
        <p>Thank you for subscribing to our newsletter. We're excited to share our latest updates, insights, and offers with you.</p>
        <p>You'll be receiving our newsletters at this email address: {{email}}</p>
        <p>If you ever wish to unsubscribe, you can do so by clicking the button below:</p>
        <p>
            <a href="https://spectrumwebco.com.au/unsubscribe?email={{email}}" class="button">Unsubscribe</a>
        </p>
        <p>We hope you enjoy our content!</p>
        <p>Best regards,<br/>The Spectrum Team</p>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(templatesDir, 'admin_email.html'), adminEmailTemplate);
fs.writeFileSync(path.join(templatesDir, 'user_email.html'), userEmailTemplate);
fs.writeFileSync(path.join(templatesDir, 'newsletter_confirmation.html'), newsletterConfirmationTemplate);

// Create start script
const startScript = `
#!/bin/bash
poetry run uvicorn main:app --host 0.0.0.0 --port 8000
`;

fs.writeFileSync('start.sh', startScript);
execSync('chmod +x start.sh');

// Create .env file
const envContent = `
ADMIN_EMAIL=ove@3three.com.au
DELEGATED_ACCOUNT=ove@3three.com.au
SERVICE_ACCOUNT_KEY=your_base64_encoded_service_account_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=your_twilio_phone_number
`;

fs.writeFileSync('.env', envContent);

// Return to project root and update Next.js config
process.chdir('..');
const nextConfigPath = 'next.config.mjs';
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

if (!nextConfig.includes('async rewrites()')) {
  const configInsert = `
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to FastAPI
      },
    ]
  },
`;
  nextConfig = nextConfig.replace('const nextConfig = {', `const nextConfig = {\n${configInsert}`);
  fs.writeFileSync(nextConfigPath, nextConfig);
}

// Add console logging
console.log('FastAPI backend setup complete. To run the server:');
console.log('1. Navigate to the backend directory');
console.log('2. Ensure all environment variables are set (SUPABASE_URL, SUPABASE_KEY, SERVICE_ACCOUNT_KEY, ADMIN_EMAIL, DELEGATED_ACCOUNT, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER)');
console.log('3. Run: ./start.sh');
console.log('Next.js configuration updated.');
