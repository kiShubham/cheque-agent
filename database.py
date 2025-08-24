import os
from dotenv import load_dotenv
from supabase import create_client, Client


# Load environment variables from the .env file
load_dotenv()

# Get Supabase credentials from environment variables
# You should have these set in your .env file
SUPABASE_URL = os.getenv("SUPABASE_URL")
# SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") #using service role key
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create a global Supabase client instance
# This client can be imported and used in other files
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_supabase_client():
    """
    Returns the initialized Supabase client.
    This function can be imported and called from any other file.
    """
    return supabase

# Optional: Add a test to ensure the client is working
if __name__ == "__main__":
    try:
        # Try a simple query to verify the connection
        response = supabase.table("test_table").select("*").limit(1).execute()
        print("Successfully connected to Supabase!")
        print(f"Response data: {response.data}")
    except Exception as e:
        print(f"Failed to connect to Supabase: {e}")