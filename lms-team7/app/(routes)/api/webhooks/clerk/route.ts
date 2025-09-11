import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import connectMongoDB from '@/db/connectMongoDB'
import User from '@/models/user'


export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    // CREAT User in mongodb
    if (eventType === 'user.created') {
        const {id, email_addresses, first_name, last_name, created_at} = evt.data
        const user = {

            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            dateEnrolled: created_at,
        }
        await connectMongoDB();
        await User.create(user);
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}