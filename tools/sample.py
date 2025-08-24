from dotenv import load_dotenv
from portia import (
    Portia,
    example_tool_registry,
)
from pydantic import BaseModel, Field

load_dotenv()

# Define your desired output schema using Pydantic
class CalculationResult(BaseModel):
    output: str = Field(description="The numerical result of the calculation.")
    summary: str = Field(description="A short, human-readable summary of the result.")

# Instantiate the Portia agent
portia = Portia(tools=example_tool_registry)

# Run the query and specify the structured output schema
plan_run = portia.run(
    'add 1 + 2',
    structured_output_schema=CalculationResult
)

# The final output is now an instance of your Pydantic model
final_output_object = plan_run.outputs.final_output
print(final_output_object.model_dump_json(indent=2))


# portia = Portia(tools=example_tool_registry)
# plan_run = portia.run('add 1 + 2')
# # Access the final output object
# final_output = plan_run.outputs.final_output
# # Create a new dictionary with just the value
# output_dict = {
#     "output": final_output.value,
#     "summary": final_output.summary
# }
# print(output_dict)

# print(plan_run.model_dump_json(indent=2))

# ***************


# converting into base64 format is taking tool much time, and is failing. 
# def encode_image(image_path: str) -> str:
#     """Convert image to base64 for model input"""
#     with open(image_path, "rb") as f:
#         return base64.b64encode(f.read()).decode("utf-8")

# tried easy ocr : not a good option ;
# tried easyOcr and opencv - cv2 still same ;

    # Get the JSON string output
    # json_result = result.model_dump_json(indent=2)
    # Parse the JSON string into a Python dictionary
    # python- json_res = json.loads(json_result)
    
# agent.run("what is brasil") # this will run directly
# plan = agent.plan('what is today weather in pune and agra?')
# plan_run = agent.run_plan(plan)
# print(f"{plan.model_dump_json(indent=2)}")