from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from io import BytesIO

app = FastAPI()

def check_lighting(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    avg_brightness = np.mean(gray)
    
    if avg_brightness < 80:
        return "The lighting is too low. Please increase the brightness."
    elif avg_brightness > 180:
        return "The lighting is too bright. Please reduce the brightness."
    else:
        return "Lighting is adequate."

def check_angle(image):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    
    if len(faces) == 0:
        return "No face detected. Please ensure your face is visible."
    else:
        (x, y, w, h) = faces[0]
        face_center = (x + w//2, y + h//2)
        image_center = (image.shape[1] // 2, image.shape[0] // 2)
        angle_x = (face_center[0] - image_center[0]) / float(image.shape[1])
        angle_y = (face_center[1] - image_center[1]) / float(image.shape[0])
        
        if abs(angle_x) > 0.1 or abs(angle_y) > 0.1:
            return "Your face is not centered or properly angled. Please adjust your position."
        else:
            return "Face angle is good."

@app.post("/check-image/")
async def check_image(file: UploadFile = File(...)):
    try:
        
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        
        lighting_result = check_lighting(image)
        angle_result = check_angle(image)

        return JSONResponse(content={
            "lighting": lighting_result,
            "angle": angle_result
        }, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)