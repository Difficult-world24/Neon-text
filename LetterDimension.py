
import cv2
import numpy as np
# from google.colab.patches import cv2_imshow
def Compute_Dimension(imageName):
  selected_picture = './{}'.format(imageName)


  image=cv2.imread(selected_picture)
  image=cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
  image = cv2.bitwise_not(image)
  # cv2_imshow(image)
  cv2.imshow('Google Logo',image)
  thinned = cv2.ximgproc.thinning(image)
  print("thinned")
  thinned = cv2.bitwise_not(thinned)
  # cv2_imshow(thinned)
  cv2.imshow('thinned',thinned)
  count=np.sum(thinned==0)
  print(thinned.shape)
  print(count)
  img = cv2.imread(selected_picture, -1)
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  image= cv2.imread(selected_picture)
  gray= cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  edges= cv2.Canny(gray,30,200)
  contours, hierarchy= cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
  # Draw a bounding box around all contours
  dimensions = [] 
  for c in contours:
    x, y, w, h = cv2.boundingRect(c)
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
      d="w="+str(w)+",h="+str(h)
      cv2.putText(image,d,(x,y),font,fontScale, color, thickness, cv2.LINE_AA)

  # output_image = cv2.imshow('logo-awesome',image)
  print(dimensions)
  cv2.imwrite('./computedImage.png',image)
  return dimensions 
