import os
import cv2
import uuid
import requests
import numpy as np
from flask_cors import CORS
from flask import Flask, jsonify, request
from database import get_supabase_client
from tools.ocr_tool import extract_cheque_data
from tools.signature_crop_tool import crop_signature
from tools.signature_comparison_tool import signature_match_score


app = Flask(__name__)
CORS(app)

supabase = get_supabase_client()

# Bucket name (make sure you already created this in Supabase Storage)
BUCKET_NAME = "cheque_bucket"

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/users")
def get_users():
    try:
        response = supabase.table("auth.users").select("*").execute()
        if response.error:
            return jsonify({"error": response.error.message}), 500
        return jsonify(response.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------- ADD BANK ACCOUNT ----------
@app.route("/add-account/<id>", methods=["POST"])
def add_account(id):
    try:
        account_holder = request.form.get("account_holder")
        current_balance = request.form.get("current_balance")
        account_number = request.form.get("account_number")
        user_signature = request.files.get("user_signature")

        if not all([account_holder, current_balance, account_number, user_signature]):
            return jsonify({"error": "Missing required fields"}), 400

        # Generate a unique filename for the image
        file_ext = os.path.splitext(user_signature.filename)[1]
        file_name = f"{uuid.uuid4()}{file_ext}"

        # Upload to Supabase Storage
        res = supabase.storage.from_(BUCKET_NAME).upload(file_name, user_signature)
        if res.get("error"):
            return jsonify({"error": res["error"]["message"]}), 500

        # Get public URL
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(file_name)

        # Insert into bank_account table
        response = supabase.table("bank_account").insert({
            "user_id": id,
            "account_holder": account_holder,
            "current_balance": float(current_balance),
            "account_number": account_number,
            "user_signature": public_url
        }).execute()

        return jsonify(response.data), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------- GET USER ACCOUNTS ----------
@app.route("/accounts/<id>", methods=["GET"])
def get_accounts(id):
    try:
        response = supabase.table("bank_account").select("*").eq("user_id", id).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
  
# validate cheque  
@app.route("/validate-cheque/<id>", methods=["POST"])
def validate_cheque():
    try:
        user_id = request.form.get("id")
        account_number = request.form.get("account_number")  
        cheque_file = request.files.get("cheque_image")

        if not user_id or not cheque_file:
            return jsonify({"error": "user_id and cheque_image required"}), 400

        # 1. Upload cheque image to Supabase bucket
        file_ext = os.path.splitext(cheque_file.filename)[1]
        file_name = f"{uuid.uuid4()}{file_ext}"
        res = supabase.storage.from_(BUCKET_NAME).upload(file_name, cheque_file)
        if res.get("error"):
            return jsonify({"error": res["error"]["message"]}), 500
        cheque_url = supabase.storage.from_(BUCKET_NAME).get_public_url(file_name)

        # 2. Insert cheque record into cheques table
        cheque_insert = supabase.table("cheques").insert({
            "user_id": user_id,
            "cheque_image_url": cheque_url
        }).execute()

        cheque_id = cheque_insert.data[0]["id"]

        # 3. Extract cheque data with OCR
        cheque_data = extract_cheque_data(cheque_url)
        if not cheque_data:
            return jsonify({
                "cheque_id": cheque_id,
                "error": "Could not extract cheque details"
            }), 500

        cheque_dict = cheque_data.model_dump()

        # Prefer provided account number, else OCR-extracted
        target_account = account_number or cheque_dict.get("account_no")
        if not target_account:
            return jsonify({
                "cheque_id": cheque_id,
                "error": "Account number missing"
            }), 400

        # 4. Check account existence for this user
        acc_res = (
            supabase.table("bank_account")
            .select("*")
            .eq("user_id", user_id)
            .eq("account_number", target_account)
            .execute()
        )
        if not acc_res.data:
            return jsonify({
                "cheque_id": cheque_id,
                "error": "Account does not exist"
            }), 404
        account = acc_res.data[0]

        # 5. Check balance vs cheque amount
        try:
            cheque_amount = float(cheque_dict["amount_in_numbers"].replace(",", ""))
        except:
            cheque_amount = 0.0
        balance_ok = float(account["current_balance"]) >= cheque_amount

        # 6. Signature matching
        sig_crop = crop_signature(cheque_url)  # crop cheque signature
        specimen_url = account["user_signature"] #url - signature

        resp = requests.get(specimen_url)
        print("****res - -- -")
        print(resp)
        print("**** ---")
        
        specimen_img = cv2.imdecode(
            np.frombuffer(resp.content, np.uint8), cv2.IMREAD_COLOR
        )
        match_score = signature_match_score(sig_crop, specimen_img)

        # 7. Build response
        response = {
            "cheque_id": cheque_id,
            "cheque_data": cheque_dict,
            "account_found": True,
            "balance_ok": balance_ok,
            "account_balance": account["current_balance"],
            "cheque_amount": cheque_amount,
            "signature_match_score": match_score,
        }
        return jsonify(response), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)


""" 
# @app.post("/validate-cheque")
# def validate_cheque():
#     file = request.files["image"]
#     account_id = request.form.get("account_id")
#     img_bytes = np.frombuffer(file.read(), np.uint8)
#     img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

#     result = run_plan(img, account_id)
#     # Example UI-friendly payload: 0.92 → 92%
#     pct = round(result["probability_pass"]*100, 0)
#     return jsonify({
#         "probability": f"{pct}%",
#         "decision": result["decision"],
#         "trace": result["trace"]
#     })


"""