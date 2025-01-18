import cv2
import numpy as np
from collections import Counter
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import webcolors
from io import BytesIO
from PIL import Image

app = FastAPI()


def rgb_to_name(rgb):
    try:
        closest_name = webcolors.rgb_to_name(rgb)
        return closest_name
    except ValueError:
        closest_name = webcolors.rgb_to_hex(rgb)
        return closest_name


def process_image(image_bytes):
    image = np.array(Image.open(BytesIO(image_bytes)))
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    image = cv2.resize(image, (600, 800))
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    
    lower_skin = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin = np.array([20, 255, 255], dtype=np.uint8)

    
    skin_mask = cv2.inRange(hsv, lower_skin, upper_skin)

    
    contours, _ = cv2.findContours(skin_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    dominant_color = None

    
    for contour in contours:
        if cv2.contourArea(contour) < 500: 
            continue
        
        
        mask = np.zeros_like(image[:, :, 0])
        cv2.drawContours(mask, [contour], -1, 255, -1)

        
        masked_image = cv2.bitwise_and(image, image, mask=mask)

        
        nail_pixels = image[np.where(mask == 255)]
        if len(nail_pixels) == 0:
            continue

       
        dominant_color = Counter([tuple(color) for color in nail_pixels]).most_common(1)[0][0]

        
        break

    if dominant_color:
        color_name = rgb_to_name(dominant_color)
        return color_name
    else:
        return "No nail detected"


@app.post("/detect-nail-color/")
async def detect_nail_color(file: UploadFile = File(...)):
    image_bytes = await file.read()
    color_name = process_image(image_bytes)
    return JSONResponse(content={"color_name": color_name})