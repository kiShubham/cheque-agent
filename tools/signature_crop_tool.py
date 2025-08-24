import cv2
import numpy as np

def crop_signature(image_path, save_path="cropped_signature.png"):
    # Read image
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Threshold to binary (emphasize ink strokes)
    _, thresh = cv2.threshold(gray, 0, 255,
                              cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL,
                                   cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        print("No signature found!")
        return None

    # Find largest contour (assume signature is the biggest blob)
    largest = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest)

    # Crop the signature region
    cropped = img[y:y+h, x:x+w]

    # Save cropped signature
    cv2.imwrite(save_path, cropped)
    print(f"Signature cropped and saved at {save_path}")
    return cropped

# Example usage:
if __name__ == "__main__":
    crop_signature("cheque_crop.png")  
