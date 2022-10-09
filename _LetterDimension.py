
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
  cv2.imshow('Google Logo',image)
  # thinned = cv2.ximgproc.thinning(image)
  # print("thinned")
  # thinned = cv2.bitwise_not(thinned)
  # # cv2_imshow(thinned)
  # cv2.imshow('thinned',thinned)
  # count=np.sum(thinned==255)
  # print('Stroke Length',thinned.shape)
  # print('Stroke Length',count)
  img = cv2.imread(selected_picture, -1)
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  temp_image= cv2.imread(selected_picture)
  gray= cv2.cvtColor(temp_image, cv2.COLOR_BGR2GRAY)
  edges= cv2.Canny(gray,30,200)
  contours, hierarchy= cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
  # Draw a bounding box around all contours
  dimensions = [] 
  resultArr = []
  for c in contours:
    x, y, w, h = cv2.boundingRect(c)

  # Unit Converstion
    unitConverstion = {
      "mm": 0.2645833333,
      "in":0.0104166667,
      "cm":0.0264583333
    }
    crop_img = image[y:y+h, x:x+w]
    # resultArr.append(crop_img) 
    cv2.imwrite('croped.png',crop_img)

    with open("croped.png", "rb") as image_file:
      cropedBase64 = base64.b64encode(image_file.read())
      resultArr.append(str(cropedBase64))

    temp_thinned= cv2.ximgproc.thinning(crop_img)
    temp_thinned = cv2.bitwise_not(temp_thinned)
  # cv2_imshow(thinned)
    cv2.imshow('thinned',temp_thinned)
    temp_count= np.sum(temp_thinned==0) * unitConverstion[selectedUnit]

    font = cv2.FONT_HERSHEY_SIMPLEX
    dimensions.append("{" + f"x:{x},y:{y},width:{w},height:{h}" + "}")
    # fontScale
    fontScale = .4
    # Blue color in BGR
    color = (255, 0, 0)
    # Line thickness of 2 px
    thickness = 1
      # Make sure contour area is large enough
    if (cv2.contourArea(c)) > 10:
      cv2.rectangle(image,(x,y), (x+w,y+h), (255,0,0), 1)
      d="w="+str(round(w * unitConverstion[selectedUnit],2))+",h="+str(round(w * unitConverstion[selectedUnit],2)) 
      # d="w="+str(w)+",h="+str(h)
      cv2.putText(image,d,(x,y),font,fontScale, color, thickness, cv2.LINE_AA)
      cv2.putText(image,str(temp_count),(x,y+h),font,fontScale, color, thickness, cv2.LINE_AA)
    # print(resultArr)
  # output_image = cv2.imshow('logo-awesome',image)
  cv2.imwrite('./computedImage.png',image)
  return resultArr
  # return round(count * unitConverstion[selectedUnit],2)
