
import base64
import cv2
import math
import numpy as np

# from google.colab.patches import cv2_imshow
def Compute_Dimension(imageName,selectedUnit):
  selected_picture = './{}'.format(imageName)


  image=cv2.imread(selected_picture)
  image=cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
  image = cv2.bitwise_not(image)
  # cv2_imshow(image)
  # thinned = cv2.ximgproc.thinning(image)
  # print("thinned")
  # thinned = cv2.bitwise_not(thinned)
  # # cv2_imshow(thinned)
  # cv2.imshow('thinned',thinned)
  # count=np.sum(thinned==255)
  # print('Stroke Length',thinned.shape)
  # print('Stroke Length',count)
  # img = cv2.imread(selected_picture, -1)
  # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  # temp_image= cv2.imread(selected_picture)
  # gray= cv2.cvtColor(temp_image, cv2.COLOR_BGR2GRAY)
  # edges= cv2.Canny(image,30,200)
  ret, thresh = cv2.threshold(image, 127, 255, 0)
  contours, hierarchy= cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
  # Draw a bounding box around all contours
  dimensions = [] 
  resultArr = []

  response={}
  for i in range(len(contours)):
    response[i]={}
  
  i=-1
  for c in contours:
    x, y, w, h = cv2.boundingRect(c)
    i=i+1
  # Unit Converstion
    unitConverstion = {
      "mm": 0.2645833333,
      "in":0.0104166667,
      "cm":0.0264583333
    }
    crop_img = image[y:y+h, x:x+w]
    # resultArr.append(crop_img) 
    temp_thinned= cv2.ximgproc.thinning(crop_img)
    # temp_thinned = cv2.bitwise_not(temp_thinned)
    print("Res",unitConverstion[selectedUnit])
    strokeLength= np.sum(temp_thinned==255) * unitConverstion[selectedUnit]
    # strokeLength= np.sum(temp_thinned==2)
    crop_img=cv2.bitwise_not(crop_img)
    cv2.imwrite('croped.png',crop_img)


    with open("croped.png", "rb") as image_file:
      cropedBase64 = base64.b64encode(image_file.read())
      # response.append(str(cropedBase64))
      response[i]["img"]=str(cropedBase64)


      # Make sure contour area is large enough
    if (cv2.contourArea(c)) > 5:
      response[i]["stats"]={
        "width":w*unitConverstion[selectedUnit],"height":h*unitConverstion[selectedUnit],"stroke":strokeLength
      }
    # print(resultArr)
  # output_image = cv2.imshow('logo-awesome',image)
  cv2.imwrite('./computedImage.png',image)
  return response
  # return round(count * unitConverstion[selectedUnit],2)
