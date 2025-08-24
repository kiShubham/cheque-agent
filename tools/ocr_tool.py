import os
import json
from portia import Portia, Config
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

class ChequeDetails(BaseModel):
    """
    Schema for extracting details from a cheque image.
    """
    date: str = Field(description="The date on the cheque.")
    payee: str = Field(description="The name of the payee.")
    amount_in_words: str = Field(description="The amount written in words.")
    amount_in_numbers: str = Field(description="The amount in numerical form.")
    bank_name: str = Field(description="The name of the bank.")
    branch: str = Field(description="The branch of the bank.")
    account_no: str = Field(description="The account number.")
    cheque_no: str = Field(description="The cheque number.")
    ifsc: str = Field(description="The IFSC code.")
    signatories: str = Field(description="The signatories' names.")
    micr_cheque_number: str = Field(description="The MICR cheque number.")
    micr_account_number: str = Field(description="The MICR account number.")
    branch_code: str = Field(description="The branch code from the MICR line.")

open_ai_config = Config.from_default(
    openai_api_key=api_key,
    default_model="openai/gpt-4.1"
)

agent = Portia(config=open_ai_config)

image_link = 'https://aubvzdnmfvbjxdhidrhg.supabase.co/storage/v1/object/public/public_bucket/cheq.jpg'

def extract_cheque_data(image_link: str) -> ChequeDetails | None:
    try:
        res = agent.run(
            f"Extract cheque details from the provided image. "
            f"Return ONLY valid JSON with the following fields: "
            f"date, payee, amount_in_words, amount_in_numbers, "
            f"bank_name, branch, account_no, cheque_no, ifsc, signatories, "
            f"micr_cheque_number, micr_account_number."
            f"Image: {image_link}",
            structured_output_schema=ChequeDetails
        )
        
        final_output = res.outputs.final_output.value
        return final_output
    
    except Exception as e:
        print(f"Error extracting cheque data: {str(e)}")
        return None

if __name__ == "__main__":
    cheque_detail = extract_cheque_data(image_link)
    print(type(cheque_detail))
    if cheque_detail : 
        print(json.dumps(cheque_detail.model_dump(), indent=4))
        data_dict = cheque_detail.model_dump()
        print(data_dict["date"])
        print(data_dict["payee"])
        for field, value in data_dict.items():
            print(f"{field}: {value}")

# working

 
