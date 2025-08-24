import cv2
from skimage.metrics import structural_similarity as ssim
from tools.signature_crop_tool import crop_signature

def _orb_similarity(imgA, imgB):
    orb = cv2.ORB_create(nfeatures=1000)
    kp1, des1 = orb.detectAndCompute(imgA, None)
    kp2, des2 = orb.detectAndCompute(imgB, None)
    if des1 is None or des2 is None:
        return 0.0

    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
    matches = bf.knnMatch(des1, des2, k=2)
    good = [m for m, n in matches if len(matches) > 1 and m.distance < 0.75 * n.distance]
    
    denom = max(len(kp1) + len(kp2), 1)
    return min(1.0, (2 * len(good)) / denom)

def _prep_gray(img):
    # If already grayscale, skip conversion
    if len(img.shape) == 2:  
        g = img
    else:
        g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    g = cv2.GaussianBlur(g, (3,3), 0)
    return g

def _ssim_similarity(imgA, imgB):
    a, b = _prep_gray(imgA), _prep_gray(imgB)
    h = min(a.shape[0], b.shape[0])
    w = min(a.shape[1], b.shape[1])
    if h < 20 or w < 20:
        return 0.0
    a = cv2.resize(a, (w, h))
    b = cv2.resize(b, (w, h))
    score, _ = ssim(a, b, full=True)
    return float(max(0.0, min(1.0, score)))

def signature_match_score(sig_crop, specimen_img):
    def binarize(x):
        g = cv2.cvtColor(x, cv2.COLOR_BGR2GRAY)
        return cv2.threshold(g, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    
    if sig_crop is None or specimen_img is None:
        return 0.0

    A = binarize(sig_crop)
    B = binarize(specimen_img)
    
    orb_score  = _orb_similarity(A, B)         # structural keypoint sim
    ssim_score = _ssim_similarity(A, B)        # pixel-structure sim
    
    return 0.65*orb_score + 0.35*ssim_score

if __name__ == "__main__":
    # testing images similarity 
    # sig_crop = crop_signature('sample_cheque1.jpg')   # this gives cropped img directly
    specimen_img = cv2.imread("matching_sign.jpg")
    sig_crop = cv2.imread("sign_1.jpg")
    
    result = signature_match_score(sig_crop, specimen_img)
    print("Match Score:", result)
    
# score ≈ 0.5–1.0 → very similar , depends on quality of the image ;
# score ≈ 0.2–0.5 → partial match
# score < 0.2 → poor match - high chances of forged 
