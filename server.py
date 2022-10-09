# Python 3 server example
import base64
from cgitb import text
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
import logging
from _LetterDimension import Compute_Dimension
from urllib.parse import urlparse

hostName = "localhost"
serverPort = 5001

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
    def _json(self, message):
        """This just generates an HTML document that includes `message`
        in the body. Override, or re-write this do do more interesting stuff.
        """
        content = f"<html><body><h1>{message}</h1></body></html>"
        return content.encode("utf8")  # NOTE: must return a bytes object!

    def do_POST(self):
        query = urlparse(self.path).query
        query_components = dict(qc.split("=") for qc in query.split("&"))
        unit = query_components["unit"]

        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        logging.info("POST request,\nPath: %s\nHeaders:\n%s\n\nBody:\n%s\n",
                str(self.path), str(self.headers), post_data.decode('utf-8'))

        text_imageBase64 = json.loads(post_data.decode('utf-8'))['neonText']
        text_imageBase64 = text_imageBase64.replace('data:image/png;base64,','')
        text_imageBase64 = bytes(text_imageBase64,'utf-8')
        fh = open("imageToSave.png", "wb")
        decoded_data = base64.b64decode((text_imageBase64))

        fh = open("imageToSave.png", "wb")
        fh.write(decoded_data)
        fh.close()
        print("Selected Format" + unit)
        # Computing Dimensions!
        result = Compute_Dimension("imageToSave.png",unit)

        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Expose-Headers", "Authorization")
        self.send_header("Content-type", "application/json")
        # self.send_header("body", data)
        self.end_headers()
        # print(result)
        encoded = base64.b64encode(open("computedImage.png", "rb").read())

        data = json.dumps({'charactersImg':result,'singleImage':str(encoded)})

        # self.wfile.write(bytes(data,'utf-8'))
        self.wfile.write(data.encode())
        # self.wfile.write(data)



if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
