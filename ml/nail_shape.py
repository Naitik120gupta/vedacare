from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np

app = FastAPI()

@app.post("/detect-nail-shape/")
async def detect_nail_shape(file: UploadFile = File(...)):
    try:
        
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

       
        _, thresh = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY_INV)

        
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        results = []

        for contour in contours:
            if cv2.contourArea(contour) < 500:
                continue

            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / h
            hull = cv2.convexHull(contour)
            hull_area = cv2.contourArea(hull)
            solidity = cv2.contourArea(contour) / hull_area if hull_area > 0 else 0

            if aspect_ratio > 1.2:
                shape = "Square"
            elif solidity > 0.9:
                shape = "Round"
            else:
                shape = "Oval"

            results.append({"shape": shape, "bounding_box": [w, h]})

        return JSONResponse(content={"shapes": results}, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)