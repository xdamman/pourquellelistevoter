/**
 * Requires
 * - process.env.MAILCHIMP_API_URL
 * - process.env.MAILCHIMP_API_KEY
 * @param {*} email 
 * @param {*} newsletter 
 */

const API_ROUTE = '/api/newsletter/register';

export function registerToNewsletter(email, newsletter) {
    if (process.browser) {
      return fetchJson(API_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ email, newsletter }),
      });
    }
  
    const username = 'anystring';
    const password = process.env.MAILCHIMP_API_KEY;
  
    const basicAuthenticationString = Buffer.from(
      [username, password].join(':'),
    ).toString('base64');
  
    return fetch(process.env.MAILCHIMP_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuthenticationString}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        members: [
          {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
              PROFILE: newsletter,
            },
          },
        ],
        update_existing: true,
      }),
    });
  }