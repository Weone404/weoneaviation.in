/**
 * Email Obfuscation Utility
 * Prevents email scraping by spam bots by encoding emails
 * Emails are decoded at runtime via JavaScript, not visible in HTML source
 */

// Email addresses encoded in base64 (obfuscated in source)
const EMAIL_CONTACTS = {
  support: 'aW5mb0B3ZW9uZWF2aWF0aW9uLmlu', // info@weoneaviation.in
  admin: 'd2VvbmVhdmlhdGlvbkBnbWFpbC5jb20=', // weoneaviation8@gmail.com (Note: should be domain email)
};

/**
 * Decode an obfuscated email address
 * @param {string} key - The key in EMAIL_CONTACTS to decode
 * @returns {string} - The decoded email address
 */
export function decodeEmail(key) {
  if (!EMAIL_CONTACTS[key]) return '';
  try {
    return atob(EMAIL_CONTACTS[key]);
  } catch (e) {
    console.error('Error decoding email:', e);
    return '';
  }
}

/**
 * Encode an email address to base64 (for creating new obfuscated entries)
 * Use this during development, then hardcode the result into EMAIL_CONTACTS
 * @param {string} email - The email address to encode
 * @returns {string} - Base64 encoded email
 */
export function encodeEmail(email) {
  return btoa(email);
}

/**
 * Get a mailto link with obfuscated email
 * Returns data attributes and onClick handler instead of href
 * @param {string} key - The email key
 * @returns {object} - Object with data attributes for the link
 */
export function getMailtoLink(key) {
  const email = decodeEmail(key);
  return {
    email,
    onClick: (e) => {
      e.preventDefault();
      window.location.href = `mailto:${email}`;
    },
  };
}

/**
 * Get contact form redirect (preferred method)
 * Instead of exposing email, redirect to contact form
 * @returns {string} - Path to contact form
 */
export function getContactFormPath() {
  return '/contact';
}
