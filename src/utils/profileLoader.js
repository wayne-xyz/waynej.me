export async function loadProfile() {
  try {
    const response = await fetch('/me.json');
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading profile:', error);
    return null;
  }
}
