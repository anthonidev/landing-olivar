export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  project: string;
}

export async function submitLead(data: LeadData): Promise<{ success: boolean; message?: string }> {
  const apiUrl = import.meta.env.PUBLIC_LANDING_API_URL;
  console.log('API URL:', apiUrl);
  if (!apiUrl) {
    throw new Error('PUBLIC_LANDING_API_URL environment variable is not configured');
  }

  try {
    const response = await fetch(`${apiUrl}/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, message: result.message };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}