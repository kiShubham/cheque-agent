import cv2

def select_signature_area(image_path, save_path="cropped_signature.png"):
    img = cv2.imread(image_path)
    clone = img.copy()

    # GUI for selecting ROI (drag mouse to draw rectangle)
    r = cv2.selectROI("Select Signature", clone, showCrosshair=True, fromCenter=False)
    x, y, w, h = r

    if w > 0 and h > 0:
        cropped = clone[y:y+h, x:x+w]
        cv2.imwrite(save_path, cropped)
        print(f"Signature cropped and saved at {save_path}")
        return save_path
    else:
        print("No region selected.")
        return None

if __name__ == "__main__":
    cropped_path = select_signature_area("sample_cheque1.jpg")
    if cropped_path:
        sig = cv2.imread(cropped_path)
        cv2.imshow("Cropped Signature", sig)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
