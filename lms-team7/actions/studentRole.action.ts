import { clerkClient } from '@clerk/nextjs/server';

/**
 * user with no role gets assigned student role
 * @param id Clerk user id
 */
export async function assignStudentRole(id: string) {
    const client = await clerkClient();
	const clerkUser = await client.users.getUser(id);
	if (!clerkUser.publicMetadata?.role) {
		await client.users.updateUser(id, {
			publicMetadata: { role: 'student' },
		});
	}
}
