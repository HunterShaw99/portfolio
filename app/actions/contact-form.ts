'use server';

import {
  object,
  string,
  email,
  minLength,
  optional,
  pipe,
  parse,
  isValiError,
  flatten,
  type InferInput
} from 'valibot';
import nodemailer from 'nodemailer';

// Refactored Schema using Valibot
const contactFormSchema = object({
  firstName: pipe(string(), minLength(1, 'First name is required')),
  lastName: pipe(string(), minLength(1, 'Last name is required')),
  email: pipe(string(), email('Please enter a valid email')),
  phone: pipe(string(), minLength(1, 'Phone number is required')),
  company: optional(string()),
  comments: pipe(string(), minLength(1, 'Comments are required')),
});

// InferInput is equivalent to z.infer for input data
export type ContactFormData = InferInput<typeof contactFormSchema>;

export interface ContactFormResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Sanitize user input for plain text email to prevent injection attacks
function sanitizeForEmail(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/[\r\n]+/g, ' ') // Replace line breaks with spaces to prevent header injection
    .trim();
}

// Escape HTML entities to prevent XSS in HTML emails
function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[<>&"']/g, (char) => htmlEntities[char] || char);
}

// Create Nodemailer transporter
function createTransporter() {
  // Validate required environment variables
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  try {
    // Validate the form data using Valibot's parse function
    const validatedData = parse(contactFormSchema, data);

    // Sanitize all user inputs
    const sanitizedFirstName = sanitizeForEmail(validatedData.firstName);
    const sanitizedLastName = sanitizeForEmail(validatedData.lastName);
    const sanitizedEmail = sanitizeForEmail(validatedData.email);
    const sanitizedPhone = sanitizeForEmail(validatedData.phone);
    // Handle optional field safely
    const sanitizedCompany = validatedData.company ? sanitizeForEmail(validatedData.company) : '';
    const sanitizedComments = validatedData.comments.trim();

    // Build plain text email content
    const emailContent = `
New Contact Form Submission

Name: ${sanitizedFirstName} ${sanitizedLastName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone}
${sanitizedCompany ? `Company: ${sanitizedCompany}` : ''}

Comments:
${sanitizedComments}
    `.trim();

    // Build HTML email content with proper escaping
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(sanitizedFirstName)} ${escapeHtml(sanitizedLastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(sanitizedPhone)}</p>
      ${sanitizedCompany ? `<p><strong>Company:</strong> ${escapeHtml(sanitizedCompany)}</p>` : ''}
      <p><strong>Comments:</strong></p>
      <p>${escapeHtml(sanitizedComments).replace(/\n/g, '<br>')}</p>
    `.trim();

    // Create transporter
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${sanitizedFirstName} ${sanitizedLastName}`,
      text: emailContent,
      html: htmlContent,
      replyTo: sanitizedEmail,
    });

    return {
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you soon.',
    };
  } catch (error) {
    // Check for Valibot specific error
    if (isValiError(error)) {
      // Flatten the error issues to get a simpler object structure
      // Valibot's flatten returns { nested: { key: [message] }, root: [message] }
      const flatErrors = flatten(error.issues);

      return {
        success: false,
        message: 'Please check your form for errors.',
        // We cast to Record<string, string[]> to match the interface,
        // though flatErrors.nested is already very close to this shape.
        errors: flatErrors.nested as Record<string, string[]>,
      };
    }

    console.error('Contact form submission error:', error);

    // Check if it's a transporter configuration error
    if (error instanceof Error && error.message.includes('Missing required environment variables')) {
      return {
        success: false,
        message: 'Email service is not configured. Please contact the administrator.',
      };
    }

    return {
      success: false,
      message: 'An error occurred while submitting your form. Please try again later.',
    };
  }
}